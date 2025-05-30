// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initLoadingScreen();
    initManifestoAnimation();
    initGallery();
    initUtilityAnimations();
    initToasterGame();
    initCommunityTerminal();
    initErrorPopups();
    
    // Add sparks on logo hover
    const logo = document.querySelector('.main-logo');
    if (logo) {
        logo.addEventListener('mousemove', createSpark);
    }
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Automatically remove loading screen after animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 5000);
}

// Manifesto Animation
function initManifestoAnimation() {
    const paragraphs = document.querySelectorAll('.manifesto-content p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    paragraphs.forEach(p => {
        observer.observe(p);
    });
}

// Gallery
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const moreArtBtn = document.getElementById('more-art');
    
    // Open modal on gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-img');
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
            
            // Play synth sound
            playRandomSynthSound();
        });
        
        // Add distortion effect on hover
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            const randomSkew = Math.random() * 4 - 2;
            img.style.transform = `scale(1.05) skew(${randomSkew}deg, ${randomSkew}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // More art button
    if (moreArtBtn) {
        moreArtBtn.addEventListener('click', () => {
            // Randomly reorder gallery items
            const gallery = document.querySelector('.gallery-grid');
            const items = Array.from(gallery.children);
            
            items.sort(() => Math.random() - 0.5);
            items.forEach(item => gallery.appendChild(item));
            
            // Play glitch sound
            playGlitchSound();
        });
    }
}

// Utility Animations
function initUtilityAnimations() {
    const utilityIcons = document.querySelectorAll('.utility-icon');
    
    utilityIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            // Play a quick sound on hover
            playQuickBeep();
        });
    });
}

// Toaster Game
function initToasterGame() {
    const toaster = document.getElementById('toaster');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    
    if (toaster && scoreDisplay) {
        toaster.addEventListener('click', () => {
            // Increment score
            score++;
            scoreDisplay.textContent = score;
            
            // Create sparks
            for (let i = 0; i < 5; i++) {
                createGameSpark(toaster);
            }
            
            // Play toaster sound
            playToasterSound();
            
            // Vibrate if supported
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // Check for victory
            if (score >= 100) {
                // Show victory message
                showVictoryMessage();
                // Reset score
                score = 0;
                scoreDisplay.textContent = score;
            }
        });
    }
}

// Community Terminal
function initCommunityTerminal() {
    const terminalMessages = document.getElementById('terminal-messages');
    const messages = [
        '<span>vova_fan42:</span> Just bought another 10k $vova tokens! To the moon, comrades!',
        '<span>wrench_wielder:</span> Has anyone tried the Toast-Based Wallet yet?',
        '<span>soviet_hodler:</span> The SovMode turned all my apps red and now I can\'t turn it off. HELP',
        '<span>digital_oligarch:</span> viktorovich fixed my GPU by hitting it with a wrench',
        '<span>comrade_bits:</span> whoever came up with this is either genius or insane',
        '<span>retro_miner:</span> mining $vova on my old soviet calculator',
        '<span>glitch_hunter:</span> found a secret message in the source code! vova is watching',
        '<span>basement_dev:</span> this site makes my computer smell like vodka and motor oil'
    ];
    
    if (terminalMessages) {
        // Initial messages
        displayRandomMessages(terminalMessages, messages, 3);
        
        // Add new messages periodically
        setInterval(() => {
            displayRandomMessages(terminalMessages, messages, 1);
        }, 5000);
    }
}

// Error Popups
function initErrorPopups() {
    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');
    const closeError = document.querySelector('.close-error');
    
    const errorMessages = [
        'System Overload: $vova injection detected',
        'WARNING: Unauthorized wrench activity detected',
        'ERROR: Toast overburn catastrophic failure',
        'CRITICAL: Soviet protocol violation in sector 7G',
        'ALERT: Viktorovich activity detected in your system',
        'WARNING: SovMode has permanently altered your hardware'
    ];
    
    if (closeError) {
        closeError.addEventListener('click', () => {
            errorPopup.classList.remove('show');
        });
    }
    
    // Show random errors on scroll
    let lastScrollPosition = 0;
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;
        
        // Only trigger on significant scroll
        if (Math.abs(currentScrollPosition - lastScrollPosition) > 200) {
            lastScrollPosition = currentScrollPosition;
            
            // 30% chance to show error
            if (Math.random() < 0.3) {
                showRandomError(errorPopup, errorMessage, errorMessages);
            }
        }
    });
}

// Helper Functions

// Create spark effect on logo hover
function createSpark(e) {
    const logo = e.target;
    const rect = logo.getBoundingClientRect();
    
    // Calculate position relative to the logo
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create spark element
    const spark = document.createElement('div');
    spark.classList.add('spark');
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    
    // Add to logo container
    logo.parentElement.appendChild(spark);
    
    // Remove spark after animation
    setTimeout(() => {
        spark.remove();
    }, 500);
}

// Create sparks for the toaster game
function createGameSpark(element) {
    const rect = element.getBoundingClientRect();
    
    // Random position on the toaster
    const x = Math.random() * rect.width;
    const y = Math.random() * (rect.height * 0.7);
    
    // Create spark element
    const spark = document.createElement('div');
    spark.classList.add('spark');
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    
    // Add to element
    element.appendChild(spark);
    
    // Remove spark after animation
    setTimeout(() => {
        spark.remove();
    }, 500);
}

// Display random terminal messages
function displayRandomMessages(container, messages, count) {
    for (let i = 0; i < count; i++) {
        // Get random message
        const randomIndex = Math.floor(Math.random() * messages.length);
        const message = messages[randomIndex];
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('terminal-message');
        messageElement.innerHTML = message;
        
        // Add to container
        container.appendChild(messageElement);
        
        // Keep only the last 8 messages
        if (container.children.length > 8) {
            container.removeChild(container.children[0]);
        }
    }
}

// Show random error popup
function showRandomError(popup, messageElement, messages) {
    // Get random message
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageElement.textContent = messages[randomIndex];
    
    // Show popup
    popup.classList.add('show');
    
    // Play error sound
    playErrorSound();
    
    // Hide after a few seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Show victory message for toaster game
function showVictoryMessage() {
    const gameContainer = document.querySelector('.game-container');
    
    // Create message element
    const victoryMessage = document.createElement('div');
    victoryMessage.textContent = 'Glory to Vova!';
    victoryMessage.style.fontSize = '3rem';
    victoryMessage.style.color = 'var(--primary-color)';
    victoryMessage.style.textShadow = '0 0 20px var(--primary-color)';
    victoryMessage.style.position = 'absolute';
    victoryMessage.style.top = '50%';
    victoryMessage.style.left = '50%';
    victoryMessage.style.transform = 'translate(-50%, -50%)';
    victoryMessage.style.zIndex = '10';
    victoryMessage.style.animation = 'victoryPulse 1s infinite';
    
    // Create keyframe animation
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes victoryPulse {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `, styleSheet.cssRules.length);
    
    // Add to game container
    gameContainer.appendChild(victoryMessage);
    
    // Play victory sound
    playVictorySound();
    
    // Whisper voice
    playVoiceWhisper();
    
    // Remove after animation
    setTimeout(() => {
        victoryMessage.remove();
    }, 3000);
}

// Sound Effects
function playQuickBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    setTimeout(() => {
        oscillator.stop();
    }, 100);
}

function playToasterSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 150;
    gainNode.gain.value = 0.2;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start();
    
    setTimeout(() => {
        oscillator.stop();
    }, 300);
}

function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.value = 220;
    gainNode.gain.value = 0.2;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    setTimeout(() => {
        oscillator.frequency.value = 196;
    }, 200);
    
    setTimeout(() => {
        oscillator.stop();
    }, 400);
}

function playGlitchSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.15;
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Random frequency changes
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            oscillator.frequency.value = 200 + Math.random() * 500;
            filter.frequency.value = 500 + Math.random() * 2000;
        }, i * 50);
    }
    
    setTimeout(() => {
        oscillator.stop();
    }, 500);
}

function playRandomSynthSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 8-bit style synth
    oscillator.type = 'square';
    const notes = [262, 294, 330, 349, 392, 440, 494, 523]; // C4 to C5
    oscillator.frequency.value = notes[Math.floor(Math.random() * notes.length)];
    
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    setTimeout(() => {
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    }, 200);
    
    setTimeout(() => {
        oscillator.stop();
    }, 700);
}

function playVictorySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    gainNode.gain.value = 0.2;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Victory melody
    const notes = [392, 440, 523, 659];
    const durations = [0.1, 0.1, 0.1, 0.4];
    
    let time = audioContext.currentTime;
    
    for (let i = 0; i < notes.length; i++) {
        oscillator.frequency.setValueAtTime(notes[i], time);
        time += durations[i];
    }
    
    setTimeout(() => {
        oscillator.stop();
    }, 700);
}

function playVoiceWhisper() {
    // Text-to-speech whisper
    if ('speechSynthesis' in window) {
        const message = new SpeechSynthesisUtterance('Ты не понимаешь, Вова — это сила.');
        message.lang = 'ru-RU';
        message.volume = 0.3;
        message.rate = 0.8;
        message.pitch = 0.7;
        
        window.speechSynthesis.speak(message);
    }
} 