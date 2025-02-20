// Sélection des éléments Ddont on a bbesoin
const eggTypes = document.querySelectorAll('.egg-type');
const timer = document.querySelector('.timer');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const historyList = document.querySelector('.history-list');
const progressRing = document.querySelector('.progress-ring circle');

// Variables d'état
let timeLeft = 0; //temps restant en secondes
let timerId = null;
let selectedType = null; //type d'oeuf selectionné
let totalTime = 0;

// Configuration du cercle de progression
const radius = progressRing.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = circumference;

// Fonctions utilitaires


//mettre à jour la progression du cercle
function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressRing.style.strokeDashoffset = offset;
}

//formater le temps en MM:SS

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60); // 125 secondes → 2 minutes
    const secs = seconds % 60; // 125 secondes → 5 sec
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}


//ajouter une entrée dans l'historiq
function addToHistory(time) {
    const historyEntry = document.createElement('div');
    historyEntry.textContent = `${selectedType} - ${time.toLocaleTimeString()}`;
    historyList.insertBefore(historyEntry, historyList.firstFirst);
}

// Gestionnaires d'événements
//on va maintenant choisir le bouton
eggTypes.forEach(type => {
    type.addEventListener('click', () => {
        // Désactive tous les autres types
        eggTypes.forEach(t => t.classList.remove('active'));
        
        // Active celui-ci
        type.classList.add('active');
        
        // Récupère le temps
        timeLeft = parseInt(type.dataset.time);
        totalTime = timeLeft;
        
        // Récupère le type d'œuf (Mollet, Dur, etc.)
        // On prend juste le premier mot (avant le <br>)
        selectedType = type.innerText.split('\n')[0];
        console.log('Selected type:', selectedType); // Pour déboguer
        
        // Met à jour l'affichage
        timer.textContent = formatTime(timeLeft);
        setProgress(100);
    });
});

startButton.addEventListener('click', () => {
    // Vérifie qu'on peut démarrer
    if (!selectedType || timerId !== null) {
        console.log('Start failed:', {selectedType, timerId});
        return;
    }
    
    console.log('Starting timer with:', {selectedType, timeLeft}); // Pour déboguer
    
    const eggSvg = document.querySelector('.egg-svg');
    eggSvg.classList.remove('float');
    eggSvg.classList.add('cooking');
      // Change l'animation de l'œuf
    timerId = setInterval(() => {
        timeLeft--;
        timer.textContent = formatTime(timeLeft);
        const progressPercent = (timeLeft / totalTime) * 100;
        setProgress(progressPercent);
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            const now = new Date();
            addToHistory(now);
            
            eggSvg.classList.remove('cooking');
            eggSvg.classList.add('float');
            
            try {
                navigator.vibrate(200);
            } catch(e) {}
            
            alert("L'œuf est prêt !");
        }
    }, 1000);

    startButton.textContent = 'En cours';
});

stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
    
    const eggSvg = document.querySelector('.egg-svg');
    eggSvg.classList.remove('cooking');
    eggSvg.classList.add('float');
    
    if (selectedType) {
        timeLeft = parseInt(document.querySelector('.egg-type.active').dataset.time);
        totalTime = timeLeft;
        timer.textContent = formatTime(timeLeft);
        setProgress(100);
    }
});

// Log initial
console.log('Script loaded, elements found:', {
    eggTypes,
    timer,
    startButton,
    stopButton,
    progressRing
});