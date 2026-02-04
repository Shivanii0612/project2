/**
 * Orvia — Personalized Learning Onboarding
 * =========================================
 * Pure UI state management for onboarding flow.
 * No AI logic, no backend calls — just UI transitions.
 */

// =============================================
// State (Client-side only)
// =============================================
const state = {
    currentStep: 1,
    name: '',
    career: ''
};

// Career display names
const careerNames = {
    'web': 'Web Development',
    'mobile': 'Mobile Development',
    'data': 'Data Science / ML',
    'devops': 'DevOps / Cloud'
};

// =============================================
// DOM Elements
// =============================================
const steps = {
    1: document.getElementById('step1'),
    2: document.getElementById('step2'),
    3: document.getElementById('step3')
};

const progressBar = document.getElementById('progressBar');
const nameInput = document.getElementById('nameInput');
const continueBtn = document.getElementById('continueBtn');
const displayName = document.getElementById('displayName');
const careerOptions = document.getElementById('careerOptions');
const backBtn = document.getElementById('backBtn');
const viewRoadmapBtn = document.getElementById('viewRoadmapBtn');

// =============================================
// Progress Bar
// =============================================
function updateProgress() {
    const progress = ((state.currentStep - 1) / 2) * 100;
    progressBar.style.width = `${progress}%`;
}

// =============================================
// Step Transitions
// =============================================
function goToStep(stepNumber) {
    // Exit animation for current step
    const currentStepEl = steps[state.currentStep];
    currentStepEl.classList.add('exit');

    setTimeout(() => {
        // Hide current step
        currentStepEl.classList.remove('active', 'exit');

        // Update state
        state.currentStep = stepNumber;
        updateProgress();

        // Show new step
        steps[stepNumber].classList.add('active');

        // Focus management
        if (stepNumber === 1) {
            nameInput.focus();
        }
    }, 300);
}

// =============================================
// Step 1: Name Input
// =============================================
function handleNameInput() {
    const value = nameInput.value.trim();
    state.name = value;

    // Enable/disable continue button
    continueBtn.disabled = value.length === 0;
}

function handleContinue() {
    if (state.name.length === 0) return;

    // Update display name in Step 2
    displayName.textContent = state.name;

    // Go to Step 2
    goToStep(2);
}

// =============================================
// Step 2: Career Selection
// =============================================
function handleCareerSelect(careerKey) {
    state.career = careerKey;

    // Visual feedback
    document.querySelectorAll('.career-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Short delay then proceed
    setTimeout(() => {
        // Update completion screen
        document.getElementById('selectedCareer').textContent = careerNames[careerKey];
        document.getElementById('summaryName').textContent = state.name;
        document.getElementById('summaryCareer').textContent = careerNames[careerKey];

        // Go to completion
        goToStep(3);
    }, 300);
}

function handleBack() {
    goToStep(1);
    nameInput.focus();
}

// =============================================
// Step 3: Completion
// =============================================
function handleViewRoadmap() {
    // Placeholder action — connect to your roadmap view here
    console.log('User data:', state);
    alert(`Ready to show ${state.name}'s ${careerNames[state.career]} roadmap!\n\n(Connect your roadmap view here)`);
}

// =============================================
// Event Listeners
// =============================================

// Name input
nameInput.addEventListener('input', handleNameInput);
nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !continueBtn.disabled) {
        handleContinue();
    }
});

// Continue button
continueBtn.addEventListener('click', handleContinue);

// Career buttons
careerOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.career-btn');
    if (btn) {
        handleCareerSelect(btn.dataset.career);
    }
});

// Back button
backBtn.addEventListener('click', handleBack);

// View roadmap button
viewRoadmapBtn.addEventListener('click', handleViewRoadmap);

// =============================================
// Initialize
// =============================================
updateProgress();
nameInput.focus();

console.log('Orvia onboarding initialized');
