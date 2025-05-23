const inputNom = document.getElementById("nom");
const inputPrenom = document.getElementById("prenom");
const inputTel = document.getElementById("tel");
const inputEmail = document.getElementById("email");
const inputSujet = document.getElementById("sujet");
const inputText = document.getElementById("text");

// Tableau contenant les champs à valider, les expressions régulières et les messages d'erreur
const inputs = [
    {
        element: inputNom,
        regex: /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{0,50}$/,
        message: "Le nom est invalide"
    },
    {
        element: inputPrenom,
        regex: /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{0,50}$/,
        message: "Le prénom est invalide"
    },
    {
        element: inputTel,
        regex: /^[0-9]{10}$/,
        message: "Le téléphone est invalide"
    },
    {
        element: inputEmail,
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "L'email est invalide"
    },
    {
        element: inputSujet,
        regex: /^[^<>{}$]{10,50}$/,
        message: "Le sujet contient des caractères non autorisés ou est trop court (min. 10 caractères)."
    },
    {
        element: inputText,
        regex: /^[^<>{}$]{10,1000}$/,
        message: "Le message contient des caractères non autorisés ou est trop court (min. 10 caractères)."
    },
]

// Ajoute un écouteur d'événement à chaque champ pour valider en temps réel
inputs.forEach(input => {
    input.element.addEventListener("input", function (e) {
        RegexTest(this, input.regex, input.message);
    });
});

// Fonction qui teste la valeur de l’input par rapport à la regex
function RegexTest(input, regex, message) {
    const inputValue = input.value;
    const parentDiv = input.parentElement;

    // Recherche un élément existant pour afficher le message d'erreur
    let errorDiv = parentDiv.querySelector(".text-danger");

    if (regex.test(inputValue)) {
        // Si la saisie est valide
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");

        // Supprime le message d'erreur s'il existe
        if (errorDiv) errorDiv.remove();
    } 
    else if (inputValue.length === 0) {
        // Si le champ est vide, on ne montre pas de message d’erreur
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");

        // Supprime le message d'erreur s'il existe
        if (errorDiv) errorDiv.remove();
    } 
    else {
        // Si la saisie est invalide
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");

        // Si aucun message d’erreur n’est affiché, on le crée
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.classList.add("text-danger", "mt-1", "small"); // Style du message
            parentDiv.appendChild(errorDiv); // Ajoute le message au parent
        }

        // Met à jour le texte du message d’erreur
        errorDiv.textContent = message;
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  let allValid = true;

  inputs.forEach(input => {
    if (!input.element.classList.contains("is-valid")) {
      allValid = false;
    }
  });

  if (allValid) {
    alert("Formulaire soumis avec succès !");
  } else {
    event.preventDefault();
    alert("Veuillez corriger les erreurs avant de soumettre le formulaire.");
  }
});

