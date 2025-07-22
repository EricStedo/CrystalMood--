let currentColor = null;
let isTherapyActive = false;
let therapyInterval = null;
let therapyTime = 300; // 5 minutes en secondes
let savedColorsArray = [];

const colorData = {
    red: {
        name: 'Rouge',
        gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        theme: 'red-theme',
        wave: '#e74c3c',
        recommendation: 'Parfait pour booster votre énergie avec PAUSE ! Le rouge stimule la vitalité et le courage. Idéal avant une présentation importante ou quand vous vous sentez fatigué.',
        meditation: 'Visualisez une flamme rouge qui réchauffe votre corps et vous donne force et courage.'
    },
    orange: {
        name: 'Orange',
        gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
        theme: 'orange-theme',
        wave: '#f39c12',
        recommendation: 'Excellente pour stimuler la créativité avec PAUSE ! L\'orange favorise l\'innovation et la joie. Parfait pour les séances de brainstorming ou quand vous manquez d\'inspiration.',
        meditation: 'Imaginez un coucher de soleil orange qui remplit votre esprit de créativité et d\'optimisme.'
    },
    yellow: {
        name: 'Jaune',
        gradient: 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)',
        theme: 'yellow-theme',
        wave: '#f1c40f',
        recommendation: 'Idéale pour la concentration avec PAUSE ! Le jaune améliore la clarté mentale et la focus. Parfait avant un examen ou une tâche complexe.',
        meditation: 'Visualisez un soleil doré qui illumine votre esprit et clarifie vos pensées.'
    },
    green: {
        name: 'Vert',
        gradient: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
        theme: 'green-theme',
        wave: '#27ae60',
        recommendation: 'Parfaite pour l\'équilibre avec PAUSE ! Le vert harmonise corps et esprit. Idéal après une journée stressante ou pour retrouver votre centre.',
        meditation: 'Imaginez-vous dans une forêt paisible, respirant l\'air pur et vous connectant à la nature.'
    },
    blue: {
        name: 'Bleu',
        gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        theme: 'blue-theme',
        wave: '#3498db',
        recommendation: 'Excellente pour la paix avec PAUSE ! Le bleu calme l\'esprit et favorise la communication. Parfait avant un entretien ou pour apaiser l\'anxiété.',
        meditation: 'Visualisez un océan calme dont les vagues bleues apportent paix et sérénité à votre être.'
    },
    indigo: {
        name: 'Indigo',
        gradient: 'linear-gradient(135deg, #6c5ce7 0%, #5f3dc4 100%)',
        theme: 'indigo-theme',
        wave: '#6c5ce7',
        recommendation: 'Parfaite pour l\'intuition avec PAUSE ! L\'indigo développe la perception subtile et la sagesse. Idéal pour la méditation et l\'introspection.',
        meditation: 'Imaginez une lumière indigo qui ouvre votre troisième œil et développe votre intuition.'
    },
    violet: {
        name: 'Violet',
        gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
        theme: 'violet-theme',
        wave: '#9b59b6',
        recommendation: 'Excellente pour la transformation avec PAUSE ! Le violet facilite les changements et élève la conscience. Parfait pour les périodes d\'évolution personnelle.',
        meditation: 'Visualisez une lumière violette qui vous enveloppe et facilite votre transformation intérieure.'
    },
    pink: {
        name: 'Rose',
        gradient: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
        theme: 'pink-theme',
        wave: '#e91e63',
        recommendation: 'Parfaite pour l\'amour de soi avec PAUSE ! Le rose guérit les blessures émotionnelles et cultive la bienveillance. Idéal après une rupture ou un conflit.',
        meditation: 'Imaginez un nuage rose qui enveloppe votre cœur de tendresse et d\'amour inconditionnel.'
    }
};

function selectColor(color) {
    currentColor = color;
    
    // Réinitialiser toutes les sélections
    document.querySelectorAll('.color-orb').forEach(orb => {
        orb.classList.remove('selected');
    });
    
    // Sélectionner la couleur cliquée
    document.querySelector(`[data-color="${color}"]`).classList.add('selected');
    
    // Changer le thème de l'application
    changeTheme(color);
    
    // Afficher les informations de la couleur
    showColorInfo(color);
    
    // Mettre à jour la recommandation
    updateRecommendation(color);
    
    // Afficher le bouton de sauvegarde
    document.getElementById('saveColorBtn').style.display = 'inline-block';
    
    // Vibration si supportée
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}

function changeTheme(color) {
    const body = document.getElementById('bodyTheme');
    const header = document.getElementById('headerTheme');
    
    // Retirer tous les thèmes
    body.className = body.className.replace(/\w+-theme/g, '');
    
    // Ajouter le nouveau thème
    if (colorData[color]) {
        body.classList.add(colorData[color].theme);
        body.style.background = colorData[color].gradient;
    }
}

function showColorInfo(color) {
    // Masquer toutes les infos
    document.querySelectorAll('.color-info').forEach(info => {
        info.classList.remove('active');
    });
    
    // Afficher l'info de la couleur sélectionnée
    const colorInfo = document.getElementById(color + 'Info');
    if (colorInfo) {
        colorInfo.classList.add('active');
    }
}

function updateRecommendation(color) {
    const recommendation = colorData[color];
    if (recommendation) {
        document.getElementById('recommendationText').textContent = recommendation.recommendation;
    }
}

function startColorTherapy() {
    if (!currentColor) {
        alert('🎨 Veuillez d\'abord choisir une couleur pour votre thérapie PAUSE !');
        return;
    }

    isTherapyActive = true;
    therapyTime = 300; // 5 minutes
    
    document.getElementById('startTherapy').style.display = 'none';
    document.getElementById('stopTherapy').style.display = 'inline-block';
    
    // Créer les vagues colorées
    createColorWaves();
    
    // Démarrer le timer et les instructions
    startTherapyTimer();
    
    // Changer le guide de respiration
    updateBreathingGuide();
}

function stopColorTherapy() {
    isTherapyActive = false;
    
    if (therapyInterval) {
        clearInterval(therapyInterval);
    }
    
    document.getElementById('startTherapy').style.display = 'inline-block';
    document.getElementById('stopTherapy').style.display = 'none';
    
    // Nettoyer les vagues
    document.getElementById('colorWaves').innerHTML = '';
    
    // Reset du timer
    document.getElementById('therapyTimer').textContent = '5:00';
    document.getElementById('breathingGuide').textContent = 
        'Installez-vous confortablement et laissez-vous baigner par les vibrations colorées';
}

function createColorWaves() {
    const wavesContainer = document.getElementById('colorWaves');
    const waveColor = colorData[currentColor].wave;
    
    // Créer plusieurs vagues avec des délais différents
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.className = 'wave';
            wave.style.background = `radial-gradient(circle, ${waveColor}40, transparent)`;
            wave.style.left = '50%';
            wave.style.top = '50%';
            wave.style.transform = 'translate(-50%, -50%)';
            wave.style.width = '50px';
            wave.style.height = '50px';
            wave.style.animationDelay = i * 0.8 + 's';
            
            wavesContainer.appendChild(wave);
            
            // Supprimer la vague après l'animation
            setTimeout(() => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            }, 4000);
        }, i * 800);
    }
    
    // Récréer les vagues en boucle
    if (isTherapyActive) {
        setTimeout(createColorWaves, 4000);
    }
}

function startTherapyTimer() {
    therapyInterval = setInterval(() => {
        therapyTime--;
        
        const minutes = Math.floor(therapyTime / 60);
        const seconds = therapyTime % 60;
        document.getElementById('therapyTimer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Messages guidés pendant la thérapie
        updateTherapyGuidance();
        
        if (therapyTime <= 0) {
            stopColorTherapy();
            alert('🌟 Votre séance de chromothérapie PAUSE est terminée ! Prenez quelques instants pour ressentir les bienfaits.');
        }
    }, 1000);
}

function updateBreathingGuide() {
    const meditation = colorData[currentColor].meditation;
    document.getElementById('breathingGuide').textContent = meditation;
}

function updateTherapyGuidance() {
    const timeLeft = therapyTime;
    const guide = document.getElementById('breathingGuide');
    
    if (timeLeft === 240) { // 4 minutes restantes
        guide.textContent = 'Respirez profondément et laissez la couleur pénétrer chaque cellule de votre corps avec PAUSE...';
    } else if (timeLeft === 180) { // 3 minutes
        guide.textContent = 'Ressentez les vibrations colorées qui harmonisent votre énergie grâce à PAUSE...';
    } else if (timeLeft === 120) { // 2 minutes
        guide.textContent = 'Laissez cette couleur thérapeutique transformer votre état émotionnel...';
    } else if (timeLeft === 60) { // 1 minute
        guide.textContent = 'Dernière minute : intégrez pleinement les bienfaits de cette couleur PAUSE...';
    } else if (timeLeft === 30) { // 30 secondes
        guide.textContent = 'Préparez-vous doucement à revenir, en gardant les bénéfices de cette séance PAUSE...';
    }
}

function saveCurrentColor() {
    if (currentColor && !savedColorsArray.includes(currentColor)) {
        savedColorsArray.push(currentColor);
        updateSavedColorsDisplay();
        alert(`💎 ${colorData[currentColor].name} a été ajouté à votre palette personnelle PAUSE !`);
    }
}

function updateSavedColorsDisplay() {
    const container = document.getElementById('savedColors');
    container.innerHTML = '';
    
    savedColorsArray.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'saved-color';
        colorDiv.style.background = colorData[color].gradient;
        colorDiv.title = colorData[color].name;
        colorDiv.onclick = () => selectColor(color);
        container.appendChild(colorDiv);
    });
}

function selectCustomColor(event) {
    const spectrum = document.getElementById('colorSpectrum');
    const selector = document.getElementById('spectrumSelector');
    const rect = spectrum.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Limiter entre 0 et 100%
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    
    // Positionner le sélecteur
    selector.style.left = clampedPercentage + '%';
    
    // Calculer la couleur basée sur le pourcentage
    const hue = (clampedPercentage / 100) * 360;
    const color = `hsl(${hue}, 80%, 60%)`;
    const rgbColor = hslToRgb(hue / 360, 0.8, 0.6);
    
    // Mettre à jour l'affichage
    document.getElementById('customColorDisplay').style.background = color;
    document.getElementById('customColorName').textContent = getColorName(hue);
    
    // Appliquer le thème personnalisé
    applyCustomTheme(color);
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function getColorName(hue) {
    if (hue < 30) return 'Rouge Personnalisé PAUSE';
    if (hue < 60) return 'Orange Personnalisé PAUSE';
    if (hue < 120) return 'Jaune Personnalisé PAUSE';
    if (hue < 180) return 'Vert Personnalisé PAUSE';
    if (hue < 240) return 'Bleu Personnalisé PAUSE';
    if (hue < 300) return 'Indigo Personnalisé PAUSE';
    return 'Violet Personnalisé PAUSE';
}

function applyCustomTheme(color) {
    document.getElementById('bodyTheme').style.background = 
        `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`;
}

// Initialisation
window.onload = function() {
    // Afficher les infos par défaut
    document.getElementById('defaultInfo').classList.add('active');
    
    // Simuler quelques couleurs sauvegardées après 2 secondes
    setTimeout(() => {
        savedColorsArray = ['green', 'blue'];
        updateSavedColorsDisplay();
    }, 2000);
};