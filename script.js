// Sample role data
const rolesData = {
    Assistant: ['Virtual Assistant', 'Personal Assistant'],
    Business: ['Marketing Strategist', 'Business Analyst'],
    Coding: ['Python Developer', 'JavaScript Developer'],
    Copywriting: ['Content Writer', 'SEO Copywriter'],
    Design: ['Graphic Designer', 'UX/UI Designer'],
    Education: ['English Teacher', 'Science Tutor'],
    Finances: ['Financial Advisor', 'Accountant'],
    Health: ['Nutritionist', 'Fitness Trainer'],
    Legal: ['Legal Advisor', 'Contract Specialist'],
    Marketing: ['Marketing Manager', 'Brand Strategist'],
    Productivity: ['Productivity Coach', 'Time Management Expert'],
    'Project Management': ['Project Manager', 'Scrum Master'],
    SaaS: ['SaaS Product Manager', 'SaaS Sales'],
    SEO: ['SEO Specialist', 'Content Strategist'],
    Travel: ['Travel Planner', 'Travel Blogger']
};

function filterRoles() {
    const category = document.getElementById("category").value;
    const roleDropdown = document.getElementById("role");
    roleDropdown.innerHTML = '<option value="" disabled selected>Select a role...</option>'; // Reset roles
    if (rolesData[category]) {
        rolesData[category].forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleDropdown.appendChild(option);
        });
    }
}

function generatePrompt() {
    const category = document.getElementById("category").value;
    const role = document.getElementById("role").value;
    const task = document.getElementById("query").value;

    if (!category) {
        alert("The 'category' field is required. Please provide select a category.");
        return;
    }
    // Check if Task is filled
    if (!task) {
        alert("The 'Task' field is required. Please provide a task description.");
        return;
    }
	
    // Check if Category is filled but Role is not
    if (category && !role) {
        alert("The 'Role' field is required when a Category is selected. Please select a role.");
        return;
    }

    const context = document.getElementById("context").value;
    const format = document.getElementById("format").value;
    const writingStyle = document.getElementById("writingStyle").value;
    const tone = document.getElementById("tone").value;
    const examples = document.getElementById("examples").value;

    const templates = [
        () => {
            let prompt = `I want you to act as a ${role}.`;
            prompt += ` Your task is to assist me with ${task}.`;
            prompt += context ? ` Please consider ${context}.` : '';
            prompt += writingStyle ? ` Use a ${writingStyle} style.` : '';
            prompt += tone ? ` Ensure the tone is ${tone}.` : '';
            prompt += examples ? ` Start with: ${examples}.` : '';
            return prompt;
        },
        () => {
            let prompt = `${role ? `Imagine you are a ${role}.` : ''}`;
            prompt += ` Your task is to ${task}.`;
            prompt += context ? ` Keep in mind: ${context}.` : '';
            prompt += format ? ` Format the response as ${format}.` : '';
            prompt += writingStyle ? ` Adopt a ${writingStyle} style.` : '';
            prompt += tone ? ` Maintain a ${tone} tone.` : '';
            prompt += examples ? ` Begin with: ${examples}.` : '';
            return prompt;
        },
        () => {
            let prompt = `${role ? `You are a ${role}.` : ''}`;
            prompt += ` I need your assistance with ${task}.`;
            prompt += context ? ` Consider ${context}.` : '';
            prompt += writingStyle ? ` I'd like the response to be in a ${writingStyle} style.` : '';
            prompt += tone ? ` The tone should be ${tone}.` : '';
            prompt += examples ? ` Here is an example to start with: ${examples}.` : '';
            return prompt;
        },
        () => {
            let prompt = `${role ? `As a ${role}, ` : ''}`;
            prompt += `your task is to guide me through ${task}.`;
            prompt += context ? ` Focus on ${context}.` : '';
            prompt += format ? ` Please format the response as ${format}.` : '';
            prompt += writingStyle ? ` Write in a ${writingStyle} style.` : '';
            prompt += tone ? ` Ensure the tone is ${tone}.` : '';
            prompt += examples ? ` Start with: ${examples}.` : '';
            return prompt;
        }
    ];

    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    const finalPrompt = selectedTemplate().trim();

    document.getElementById("generated-prompt").innerText = finalPrompt;
}



function copyPrompt() {
    const promptText = document.getElementById("generated-prompt").innerText;
    navigator.clipboard.writeText(promptText).then(() => {
        const copyMessage = document.getElementById("copy-message");
        copyMessage.innerText = "Copied to clipboard!";
        setTimeout(() => {
            copyMessage.innerText = "";
        }, 2000);
    });
}

// Scroll page up when a field is selected
document.querySelectorAll('select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
