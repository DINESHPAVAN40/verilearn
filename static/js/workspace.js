// ==================== GUIDES CONTENT ====================

const GUIDES = {
    'logic-gates': {
        title: 'Logic Gates',
        content: `
            <div class="guide-section">
                <h4>Understanding Basic Logic Gates</h4>
                <p>Logic gates are the building blocks of digital circuits. They perform logical operations on one or more binary inputs and produce a single binary output.</p>
                
                <h4>AND Gate</h4>
                <p>The AND gate produces a HIGH output only when all inputs are HIGH.</p>
                <div class="guide-code">module and_gate(input a, input b, output y);
    assign y = a & b;
endmodule</div>

                <h4>OR Gate</h4>
                <p>The OR gate produces a HIGH output when at least one input is HIGH.</p>
                <div class="guide-code">module or_gate(input a, input b, output y);
    assign y = a | b;
endmodule</div>

                <h4>NOT Gate</h4>
                <p>The NOT gate (inverter) produces the opposite of its input.</p>
                <div class="guide-code">module not_gate(input a, output y);
    assign y = ~a;
endmodule</div>

                <h4>XOR Gate</h4>
                <p>The XOR gate produces a HIGH output when the inputs are different.</p>
                <div class="guide-code">module xor_gate(input a, input b, output y);
    assign y = a ^ b;
endmodule</div>
            </div>
        `
    },
    'flip-flops': {
        title: 'Flip-Flops & Latches',
        content: `
            <div class="guide-section">
                <h4>Sequential Logic: Flip-Flops</h4>
                <p>Flip-flops are sequential logic devices that can store a bit of information. They are essential for building counters, shift registers, and memory elements.</p>
                
                <h4>D Flip-Flop (Rising Edge Triggered)</h4>
                <p>The D flip-flop captures the input at the rising edge of the clock.</p>
                <div class="guide-code">module d_flipflop(input D, input CLK, output Q, output Q_bar);
    reg q_reg;
    
    always @(posedge CLK)
        q_reg <= D;
    
    assign Q = q_reg;
    assign Q_bar = ~q_reg;
endmodule</div>

                <h4>SR Latch</h4>
                <p>A SR (Set-Reset) latch is an asynchronous device with SET and RESET inputs.</p>
                <div class="guide-code">module sr_latch(input S, input R, output Q, output Q_bar);
    assign Q = ~(R | Q_bar);
    assign Q_bar = ~(S | Q);
endmodule</div>

                <h4>Counter with Clock</h4>
                <p>A simple counter that increments on each clock pulse.</p>
                <div class="guide-code">module counter(input CLK, input RESET, output [3:0] COUNT);
    reg [3:0] count_reg;
    
    always @(posedge CLK or posedge RESET)
        if (RESET)
            count_reg <= 0;
        else
            count_reg <= count_reg + 1;
    
    assign COUNT = count_reg;
endmodule</div>
            </div>
        `
    },
    'fsm': {
        title: 'State Machines (FSM)',
        content: `
            <div class="guide-section">
                <h4>Finite State Machines</h4>
                <p>FSMs are sequential circuits that transition between different states based on inputs and clock signals. They are used in controllers and timing circuits.</p>
                
                <h4>FSM Structure</h4>
                <p>A typical FSM has three parts: current state register, next state logic, and output logic.</p>
                <div class="guide-code">module simple_fsm(input CLK, input RESET, input X, output Y);
    parameter S0 = 2'b00, S1 = 2'b01, S2 = 2'b10;
    reg [1:0] current_state, next_state;
    
    always @(posedge CLK or posedge RESET)
        if (RESET)
            current_state <= S0;
        else
            current_state <= next_state;
    
    always @(*) begin
        case(current_state)
            S0: next_state = X ? S1 : S0;
            S1: next_state = X ? S2 : S0;
            S2: next_state = X ? S2 : S0;
            default: next_state = S0;
        endcase
    end
    
    assign Y = (current_state == S2);
endmodule</div>

                <h4>Traffic Light Controller</h4>
                <p>Example: A simple traffic light that cycles: RED → GREEN → YELLOW → RED</p>
                <div class="guide-code">// States: 00=RED, 01=GREEN, 10=YELLOW
// Add your traffic light implementation here</div>
            </div>
        `
    },
    'testbench': {
        title: 'Writing Testbenches',
        content: `
            <div class="guide-section">
                <h4>Testbench Basics</h4>
                <p>A testbench is a Verilog module that instantiates your design and applies test signals to verify its correctness.</p>
                
                <h4>Testbench Structure</h4>
                <div class="guide-code">\`timescale 1ns / 1ps

module testbench;
    // Declare signals
    reg clk, reset;
    wire output_signal;
    
    // Instantiate the design under test (DUT)
    my_module uut (
        .clk(clk),
        .reset(reset),
        .output(output_signal)
    );
    
    // Generate clock
    initial begin
        clk = 0;
        forever #5 clk = ~clk;  // 10ns period
    end
    
    // Test stimuli
    initial begin
        reset = 1;
        #10 reset = 0;
        
        // Add your test cases here
        #100 \$finish;
    end
    
    // Monitor output
    initial begin
        \$monitor("Time=%t, Output=%b", \$time, output_signal);
    end
endmodule</div>

                <h4>Common Testbench Statements</h4>
                <p><strong>\$display</strong> - Print messages to console</p>
                <p><strong>\$monitor</strong> - Continuously monitor signals</p>
                <p><strong>#delay</strong> - Wait for specified time</p>
                <p><strong>\$finish</strong> - End simulation</p>
            </div>
        `
    }
};

// ==================== STATE MANAGEMENT ====================

let currentProject = null;

// ==================== DOM ELEMENTS ====================

const designCodeEl = document.getElementById('design-code');
const testbenchCodeEl = document.getElementById('testbench-code');
const simulateBtn = document.getElementById('simulate-btn');
const consoleOutput = document.getElementById('console-output');
const simulationStatus = document.getElementById('simulation-status');
const projectsList = document.getElementById('projects-list');
const newProjectBtn = document.getElementById('new-project-btn');
const projectModal = document.getElementById('project-modal');
const projectForm = document.getElementById('project-form');
const projectTitleInput = document.getElementById('project-title');
const projectDescriptionInput = document.getElementById('project-description');
const saveProjectBtn = document.getElementById('save-project-btn');
const deleteProjectBtn = document.getElementById('delete-project-btn');
const clearConsoleBtn = document.getElementById('clear-console');
const guideContent = document.getElementById('guide-content');
const guideItems = document.querySelectorAll('.guide-item');
const modalClose = document.querySelector('.modal-close');

// ==================== EVENT LISTENERS ====================

simulateBtn.addEventListener('click', compileAndSimulate);
newProjectBtn.addEventListener('click', showNewProjectModal);
projectForm.addEventListener('submit', handleProjectFormSubmit);
saveProjectBtn.addEventListener('click', saveCurrentProject);
deleteProjectBtn.addEventListener('click', deleteCurrentProject);
clearConsoleBtn.addEventListener('click', clearConsole);
modalClose.addEventListener('click', closeModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
});

guideItems.forEach(item => {
    item.addEventListener('click', () => showGuide(item.dataset.guide));
});

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    showGuide('logic-gates');
});

// ==================== PROJECT MANAGEMENT ====================

async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();

        projectsList.innerHTML = '';

        if (projects.length === 0) {
            projectsList.innerHTML = '<p class="loading">No projects yet. Create one!</p>';
            return;
        }

        projects.forEach(project => {
            const projectEl = document.createElement('button');
            projectEl.className = 'project-item';
            projectEl.textContent = project.title;
            projectEl.addEventListener('click', () => loadProject(project.id));
            projectsList.appendChild(projectEl);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function loadProject(projectId) {
    try {
        const response = await fetch(`/api/project/${projectId}`);
        const project = await response.json();

        currentProject = project;
        projectTitleInput.value = project.title;
        projectDescriptionInput.value = project.description || '';
        designCodeEl.value = project.design_code;
        testbenchCodeEl.value = project.testbench_code;

        // Update UI
        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove('active');
            if (item.textContent === project.title) {
                item.classList.add('active');
            }
        });

        updateConsole('Project loaded: ' + project.title, 'success');
    } catch (error) {
        console.error('Error loading project:', error);
        updateConsole('Error loading project', 'error');
    }
}

async function saveCurrentProject() {
    const title = projectTitleInput.value.trim();
    const description = projectDescriptionInput.value.trim();
    const design = designCodeEl.value;
    const testbench = testbenchCodeEl.value;

    if (!title) {
        updateConsole('Please enter a project title', 'error');
        return;
    }

    try {
        const response = await fetch('/api/project/save', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                description,
                design,
                testbench,
                project_id: currentProject?.id || null
            })
        });

        const data = await response.json();

        if (response.ok) {
            currentProject = { ...currentProject, id: data.project_id, title, description };
            updateConsole('Project saved successfully!', 'success');
            loadProjects();
        } else {
            updateConsole(data.error || 'Error saving project', 'error');
        }
    } catch (error) {
        console.error('Error saving project:', error);
        updateConsole('Error saving project', 'error');
    }
}

async function deleteCurrentProject() {
    if (!currentProject) {
        updateConsole('No project selected', 'error');
        return;
    }

    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
        const response = await fetch(`/api/project/${currentProject.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            updateConsole('Project deleted', 'success');
            currentProject = null;
            designCodeEl.value = '';
            testbenchCodeEl.value = '';
            projectTitleInput.value = '';
            projectDescriptionInput.value = '';
            loadProjects();
        } else {
            updateConsole('Error deleting project', 'error');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        updateConsole('Error deleting project', 'error');
    }
}

// ==================== COMPILATION & SIMULATION ====================

async function compileAndSimulate() {
    const design = designCodeEl.value.trim();
    const testbench = testbenchCodeEl.value.trim();

    if (!design || !testbench) {
        updateConsole('Please enter both design and testbench code', 'error');
        return;
    }

    simulateBtn.disabled = true;
    simulationStatus.textContent = 'Compiling...';
    simulationStatus.classList.remove('success', 'error');

    try {
        const response = await fetch('/api/compile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ design, testbench })
        });

        const data = await response.json();

        if (data.success) {
            simulationStatus.textContent = 'Simulation completed successfully';
            simulationStatus.classList.add('success');
            updateConsole(data.output, 'success');
        } else {
            simulationStatus.textContent = 'Compilation failed';
            simulationStatus.classList.add('error');
            updateConsole(data.output, 'error');
        }
    } catch (error) {
        console.error('Error during compilation:', error);
        simulationStatus.textContent = 'Error connecting to server';
        simulationStatus.classList.add('error');
        updateConsole('Server error: ' + error.message, 'error');
    } finally {
        simulateBtn.disabled = false;
    }
}

// ==================== CONSOLE OUTPUT ====================

function updateConsole(message, type = 'info') {
    const line = document.createElement('div');
    line.className = `console-line console-${type}`;
    line.textContent = message;

    if (consoleOutput.querySelector('.console-welcome')) {
        consoleOutput.innerHTML = '';
    }

    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
    consoleOutput.innerHTML = '<p class="console-welcome">Output cleared. Run simulation to see results...</p>';
}

// ==================== MODAL MANAGEMENT ====================

function showNewProjectModal() {
    document.getElementById('modal-title').value = '';
    document.getElementById('modal-description').value = '';
    projectModal.classList.add('active');
}

function closeModal() {
    projectModal.classList.remove('active');
}

function handleProjectFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('modal-title').value.trim();
    const description = document.getElementById('modal-description').value.trim();

    if (!title) {
        alert('Please enter a project name');
        return;
    }

    projectTitleInput.value = title;
    projectDescriptionInput.value = description;
    designCodeEl.value = '';
    testbenchCodeEl.value = '';
    currentProject = null;

    closeModal();
    updateConsole('New project created. Add your code and save!', 'success');
}

// ==================== GUIDES ====================

function showGuide(guideKey) {
    const guide = GUIDES[guideKey];
    if (!guide) return;

    guideContent.innerHTML = guide.content;

    // Update active guide button
    guideItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-guide="${guideKey}"]`).classList.add('active');
}

// ==================== UTILS ====================

function log(message) {
    console.log('[VeriLearn]', message);
}
