// ---------------------------------------- EXERCICE 1 -----------------------------------------------------

//création d'une table qui contient nos projets
const projets = [
	{
		id: 1,
		titre: "Portfolio",
		description: "Mon site personnel responsive.",
		tags: ["HTML", "CSS"],
	},
	{
		id: 2,
		titre: "Blog tech",
		description: "Articles sur le développement web.",
		tags: ["JS", "API"],
	},
	{
		id: 3,
		titre: "App météo",
		description: "Application de météo en temps réel.",
		tags: ["JS", "API"],
	},
	{
		id: 4,
		titre: "Refonte asso",
		description: "Nouveau site pour une association.",
		tags: ["HTML", "CSS", "Figma"],
	},
	{
		id: 5,
		titre: "Mini-jeu",
		description: "Jeu de mémoire en JavaScript.",
		tags: ["JS", "DOM"],
	},
];

//créé un conteneur sur l'élément avec l'id projets-liste
const container = document.querySelector("#projets-liste");

//créé la fonction avec l'attribut listeProjets
function affichage(listeProjets) {
	//vide le conteneur
	container.innerHTML = "";

	//on ajoute à listeProjets, pour chaque projet
	listeProjets.forEach((projet) => {
		//création de carte qui créé dans un article
		const carte = document.createElement("article");
		//on ajoute la classe carte à l'article
		carte.classList.add("carte");

		//le h3 de la carte est rempli par le titre du projet
		//le p de la carte est rempli par la desc du projet
		//création d'un div qui fait quelque chose avec des map qui change chaque elem d'un tableau
		carte.innerHTML = `
            <h3>${projet.titre}</h3> 
            <p>${projet.description}</p>
            <div class="tags">
            ${projet.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
			<button class="btn-supprimer" data-id="${projet.id}">Supprimer</button>
        `;

		//on ajoute les cartes au container
		container.append(carte);

	});

	// on prend tous les boutons supprimer et pour chacun
	document.querySelectorAll(".btn-supprimer").forEach((btn) => {
		// on ajoute un event
		btn.addEventListener("click", () => {
			// on associe la variable id à une id de notre table
			const id = Number(btn.dataset.id);
			// on trouve le projet lié à l'id
			const index = projets.findIndex(p => p.id === id);
			// on le supprime
			projets.splice(index, 1);
			affichage(projets);
			sauvegarder();
		});
		// utilisation de la fonction
	});

}

affichage(projets);

// ---------------------------------------- EXERCICE 2 -----------------------------------------------------

//création d'une variable qui prend tous les éléments avec la classe filtre
const boutonsFiltres = document.querySelectorAll(".filtre");

//pour chaque bouton
boutonsFiltres.forEach((btn) => {
	//on ajoute un event au clique
	btn.addEventListener("click", () => {
		// on enleve la classe active collé à chaque filtre
		document.querySelector(".filtre.active").classList.remove("active");
		//on la rajoute au bouton sélectionné
		btn.classList.add("active");

		// créé une variable qui contient le data tag du bouton
		const tag = btn.dataset.tag;
		//si le bouton séléctionné est 'tous' alors on affiche tous les projets
		if (tag === "tous") {
			affichage(projets);
			//sinon on créé la variable projetsFiltres qui contient les projet filté en fonction du tag dans le p
		} else {
			const projetsFiltres = projets.filter((p) => p.tags.includes(tag));
			affichage(projetsFiltres);
		}
	});
});

// ---------------------------------------- EXERCICE 2 -----------------------------------------------------

//création d'une variable qui prend l'élément avec l'id form-ajout
const form = document.querySelector("#form-ajout");

//ajout d'un évenement submit au formulaire
form.addEventListener("submit", (event) => {
	event.preventDefault(); // Empêcher le rechargement de la page

	//créé le titre sur input titre en retirant les espace de début et de fin
	const titre = document.querySelector("#input-titre").value.trim();
	//créé la desc sur input desc en retirant les espace de début et de fin
	const description = document.querySelector("#input-desc").value.trim();
	//créé le texte sur input tags en retirant les espace de début et de fin
	const tagsTexte = document.querySelector("#input-tags").value.trim();

	// ne rien faire si vide
	if (!titre || !description) return;

	const nouveauProjet = {
		id: projets.length + 1,
		titre: titre,
		description: description,
		tags: tagsTexte ? tagsTexte.split(",").map((t) => t.trim()) : [],
	};

	projets.push(nouveauProjet);
	sauvegarder();
	affichage(projets);
	form.reset(); // Vider le formulaire
});

// ---------------------------------------- EXERCICE 3 -----------------------------------------------------

// créé la fonction sauvegarde qui ajoute dans le stockage local un projet auquel on ajout les projets créés
function sauvegarder() {
	localStorage.setItem("projets", JSON.stringify(projets));
}

// créé la fonction charger
function charger() {
	// variable donnees qui cherche les items stocké et qui possède le nom 'projets'
	const donnees = localStorage.getItem("projets");
	// si il y a des donnees
	if (donnees) {
		// Remplacer le contenu du tableau (sans réassigner la variable)
		projets.length = 0;
		JSON.parse(donnees).forEach((p) => projets.push(p));
	}
}

// au chargement de la page
charger();
// affichage(projets);

// ---------------------------------------- BONUS 2 -----------------------------------------------------


const selectTri = document.querySelector('#tri');

selectTri.addEventListener('change', () => {
	const valeur = selectTri.value;
	if (valeur === 'az') {
		projets.sort((a, b) => a.titre.localeCompare(b.titre));
	} else {
		projets.sort((a, b) => b.titre.localeCompare(a.titre));
	}
	affichage(projets);
});


