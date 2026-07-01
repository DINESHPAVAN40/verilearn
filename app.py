from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import subprocess
import os
import uuid
from datetime import datetime
import shutil

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'verilearn-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///verilog_hub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
CORS(app)

# ==================== DATABASE MODELS ====================

class User(UserMixin, db.Model):
    """User model for authentication"""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    projects = db.relationship('Project', backref='author', lazy=True, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Project(db.Model):
    """Project model for storing user's Verilog designs"""
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    design_code = db.Column(db.Text, nullable=False)
    testbench_code = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# ==================== AUTHENTICATION ROUTES ====================

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        # Validation
        if not username or not email or not password:
            return jsonify({'error': 'All fields are required'}), 400
        
        if password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400

        # Create new user
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Registration successful! Please login.'}), 201

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            return jsonify({'success': True, 'message': 'Login successful!'}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


# ==================== MAIN ROUTES ====================

@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('workspace'))
    return redirect(url_for('login'))


@app.route('/workspace')
@login_required
def workspace():
    projects = Project.query.filter_by(user_id=current_user.id).all()
    return render_template('workspace.html', projects=projects)


# ==================== VERILOG COMPILATION ROUTES ====================

@app.route('/api/compile', methods=['POST'])
@login_required
def compile_verilog():
    """Compile and simulate Verilog code"""
    
    # Get JSON data
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'output': 'No data provided'}), 200
    
    design_code = data.get('design', '').strip()
    testbench_code = data.get('testbench', '').strip()
    
    # Validate input
    if not design_code or not testbench_code:
        return jsonify({'success': False, 'output': 'Please enter both design and testbench code'}), 200
    
    # Create temp directory for this simulation
    temp_dir = f"sim_{uuid.uuid4().hex[:8]}"
    os.makedirs(temp_dir, exist_ok=True)
    
    design_file = os.path.join(temp_dir, "design.v")
    testbench_file = os.path.join(temp_dir, "testbench.v")
    compiled_file = os.path.join(temp_dir, "sim.vvp")
    
    try:
        # Write Verilog files
        with open(design_file, 'w') as f:
            f.write(design_code)
        with open(testbench_file, 'w') as f:
            f.write(testbench_code)
        
        # Compile
        compile_cmd = ['iverilog', '-o', compiled_file, design_file, testbench_file]
        compile_proc = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=30, cwd=os.getcwd())
        
        if compile_proc.returncode != 0:
            output = f"Compilation Error:\n{compile_proc.stderr}"
            return jsonify({'success': False, 'output': output}), 200
        
        # Simulate
        simulate_cmd = ['vvp', compiled_file]
        simulate_proc = subprocess.run(simulate_cmd, capture_output=True, text=True, timeout=30, cwd=os.getcwd())
        
        output = simulate_proc.stdout if simulate_proc.returncode == 0 else simulate_proc.stderr
        
        if not output:
            output = "Simulation completed successfully!"
        
        return jsonify({'success': True, 'output': output}), 200
    
    except subprocess.TimeoutExpired:
        return jsonify({'success': False, 'output': 'Simulation timeout (>30 seconds)'}), 200
    except FileNotFoundError:
        return jsonify({'success': False, 'output': 'iverilog or vvp not found. Please install Icarus Verilog.'}), 200
    except Exception as e:
        return jsonify({'success': False, 'output': f'Error: {str(e)}'}), 200
    finally:
        # Cleanup temp directory
        try:
            shutil.rmtree(temp_dir, ignore_errors=True)
        except:
            pass


# ==================== PROJECT MANAGEMENT ROUTES ====================

@app.route('/api/project/save', methods=['POST'])
@login_required
def save_project():
    """Save a project"""
    data = request.get_json()
    title = data.get('title')
    description = data.get('description', '')
    design_code = data.get('design', '')
    testbench_code = data.get('testbench', '')
    project_id = data.get('project_id')

    if not title or not design_code or not testbench_code:
        return jsonify({'error': 'Title and code are required'}), 400

    try:
        if project_id:
            # Update existing project
            project = Project.query.get(project_id)
            if not project or project.user_id != current_user.id:
                return jsonify({'error': 'Project not found'}), 404
            project.title = title
            project.description = description
            project.design_code = design_code
            project.testbench_code = testbench_code
        else:
            # Create new project
            project = Project(
                title=title,
                description=description,
                design_code=design_code,
                testbench_code=testbench_code,
                user_id=current_user.id
            )
            db.session.add(project)

        db.session.commit()
        return jsonify({'success': True, 'project_id': project.id, 'message': 'Project saved!'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/project/<int:project_id>', methods=['GET'])
@login_required
def get_project(project_id):
    """Retrieve a project"""
    project = Project.query.get(project_id)
    if not project or project.user_id != current_user.id:
        return jsonify({'error': 'Project not found'}), 404

    return jsonify({
        'id': project.id,
        'title': project.title,
        'description': project.description,
        'design_code': project.design_code,
        'testbench_code': project.testbench_code,
        'created_at': project.created_at.isoformat(),
        'updated_at': project.updated_at.isoformat()
    }), 200


@app.route('/api/projects', methods=['GET'])
@login_required
def list_projects():
    """List all projects for current user"""
    projects = Project.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'created_at': p.created_at.isoformat(),
        'updated_at': p.updated_at.isoformat()
    } for p in projects]), 200


@app.route('/api/project/<int:project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):
    """Delete a project"""
    project = Project.query.get(project_id)
    if not project or project.user_id != current_user.id:
        return jsonify({'error': 'Project not found'}), 404

    db.session.delete(project)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Project deleted'}), 200


# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='127.0.0.1', port=5000)