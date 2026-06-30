document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. ANIMATION INTERACTIVE DU LOGO (VIBRATIONS / SHAKE)
       ========================================== */
    const kiloutrouLogo = document.getElementById('kiloutrou-logo');
    const logoCard = document.querySelector('.logo-card');

    const triggerLogoVibration = () => {
        if (!kiloutrouLogo) return;
        
        // Evite de relancer si déjà en cours
        if (kiloutrouLogo.classList.contains('vibrate-animation')) return;

        kiloutrouLogo.classList.add('vibrate-animation');

        kiloutrouLogo.addEventListener('animationend', function handler() {
            kiloutrouLogo.classList.remove('vibrate-animation');
            kiloutrouLogo.removeEventListener('animationend', handler);
        });
    };

    if (kiloutrouLogo) {
        kiloutrouLogo.addEventListener('mouseenter', triggerLogoVibration);
        if (logoCard) {
            logoCard.addEventListener('click', triggerLogoVibration);
        }
    }


    /* ==========================================
       2. LE FLIP 3D DES CARTES D'ÉQUIPEMENTS
       ========================================== */
    const cards = document.querySelectorAll('.service-item-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });


    /* ==========================================
       3. NAVIGATION MOBILE (MENU BURGER)
       ========================================== */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }


    /* ==========================================
       4. FORMULAIRE DE LOCATION & CONFETTIS INDUSTRIELS
       ========================================== */
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalClientName = document.getElementById('modalClientName');
    const modalEquipement = document.getElementById('modalEquipement');
    const modalOption = document.getElementById('modalOption');
    const confettiContainer = document.getElementById('confettiContainer');

    const triggerConfetti = () => {
        if (!confettiContainer) return;
        confettiContainer.innerHTML = ''; 
        
        // Palette Kiloutou : Jaune, Noir/Gris, Orange/Rouge, Blanc
        const colors = [
            '#FFD200', // Jaune
            '#1E1E1E', // Anthracite
            '#FF4500', // Orange-Rouge
            '#FFFFFF', // Blanc
            '#FFCC00'  // Jaune clair
        ];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-particle');

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomSize = Math.random() * 8 + 6; 
            const randomLeft = Math.random() * 100; 
            const randomDuration = Math.random() * 2.5 + 1.5; 
            const randomDelay = Math.random() * 0.3;

            confetti.style.backgroundColor = randomColor;
            confetti.style.width = `${randomSize}px`;
            confetti.style.height = `${randomSize}px`;
            confetti.style.left = `${randomLeft}vw`;
            confetti.style.animationDuration = `${randomDuration}s`;
            confetti.style.animationDelay = `${randomDelay}s`;
            
            // Un peu de variété de formes (ronds et carrés)
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.borderRadius = '2px';
            }

            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, (randomDuration + randomDelay) * 1000);
        }
    };

    if (bookingForm && successModal) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('clientName').value;
            const equipementSelect = document.getElementById('equipementSelect');
            const equipementText = equipementSelect.options[equipementSelect.selectedIndex].text;
            const optionSelect = document.getElementById('optionSelect');
            const optionText = optionSelect.options[optionSelect.selectedIndex].text;

            // Remplissage de la modale
            modalClientName.textContent = name;
            modalEquipement.textContent = equipementText;
            modalOption.textContent = optionText;

            // Affichage de la modale
            successModal.classList.add('active');

            // Lancement des confettis
            triggerConfetti();

            // Vibration du logo en arrière plan
            triggerLogoVibration();
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                successModal.classList.remove('active');
                bookingForm.reset();
            });
        }

        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                bookingForm.reset();
            }
        });
    }


    /* ==========================================
       5. EFFETS DE SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================== */
    const revealElements = document.querySelectorAll('.concept-card, .service-item-card, .compare-table, .booking-wrapper');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(element => {
            element.classList.add('reveal-hidden');
            revealObserver.observe(element);
        });
    }

});
