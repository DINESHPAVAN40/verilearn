# VeriLearn Configuration File

# Flask Configuration
FLASK_DEBUG = True
FLASK_ENV = development
FLASK_HOST = 127.0.0.1
FLASK_PORT = 5000

# Database Configuration
DATABASE_URI = sqlite:///verilog_hub.db
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Security
SECRET_KEY = your-secret-key-change-in-production
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = Lax

# Verilog Compiler Settings
IVERILOG_TIMEOUT = 10  # seconds
VVP_TIMEOUT = 10       # seconds

# File Cleanup
CLEANUP_TEMP_FILES = True
TEMP_FILE_PREFIX = temp_

# Logging
LOG_LEVEL = INFO
LOG_FILE = verilog_hub.log

# User Limits
MAX_CODE_LENGTH = 100000  # characters
MAX_PROJECTS_PER_USER = 1000
