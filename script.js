// ---------------------------------------- EXERCICE 1 -----------------------------------------------------


// 1. Sélectionner les éléments
const boutonBurger = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

boutonBurger.addEventListener('click', () => {
	menu.classList.toggle('is-open');

	const isOpen = menu.classList.contains('is-open');
	boutonBurger.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && menu.classList.contains('is-open')) {
		menu.classList.remove('is-open');
		boutonBurger.setAttribute('aria-expanded', false);
		boutonBurger.focus();
	}
});


// ---------------------------------------- EXERCICE 2 -----------------------------------------------------


const btnOpen = document.querySelector('.modal-open');
const btnClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

// --- Fonctions de gestion ---

function ouvrirModale() {
	modal.classList.add('is-visible');
	modal.setAttribute('aria-hidden', 'false');
	// Optionnel : mettre le focus sur le bouton de fermeture pour l'accessibilité
	btnClose.focus();
}

function fermerModale() {
	modal.classList.remove('is-visible');
	modal.setAttribute('aria-hidden', 'true');
	// On rend le focus au bouton qui a ouvert la modale
	btnOpen.focus();
}

// --- Écouteurs d'événements ---

// Clic sur les boutons
btnOpen.addEventListener('click', ouvrirModale);
btnClose.addEventListener('click', fermerModale);

// Fermeture avec la touche Échap
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
		fermerModale();
	}
});

// Fermeture au clic sur le fond (overlay)
modal.addEventListener('click', (event) => {
	if (event.target === modal) {
		fermerModale();
	}
});


// ---------------------------------------- EXERCICE 3 -----------------------------------------------------


const questions = document.querySelectorAll('.faq-question');

questions.forEach((question) => {
	question.addEventListener('click', () => {
		const reponse = question.nextElementSibling;
		const estDejaOuverte = reponse.classList.contains('is-visible');

		// Fermer toutes les réponses
		document.querySelectorAll('.faq-answer').forEach((r) => {
			r.classList.remove('is-visible');
		});

		// Si elle n'était pas ouverte, l'ouvrir
		if (!estDejaOuverte) {
			reponse.classList.add('is-visible');
		}
	});
});


// ---------------------------------------- EXERCICE 2 -----------------------------------------------------


const btnTheme = document.querySelector('#theme-toggle')

btnTheme.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	const isDark = document.body.classList.contains('dark');
	btnTheme.textContent = isDark ? '☀️ Clair' : '🌙 Sombre';
});