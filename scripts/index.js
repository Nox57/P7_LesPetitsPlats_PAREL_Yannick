// eslint-disable-next-line require-jsdoc
class Recipe {
    // eslint-disable-next-line require-jsdoc
    constructor(id, name, time, ustensils, appliance, description, ingredients) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.ustensils = ustensils.map((ustensil) => ustensil.toLowerCase());
        this.appliance = appliance;
        this.description = description;
        this.ingredients = ingredients.map((ingredient) => new Ingredient(ingredient));
    }

    // eslint-disable-next-line require-jsdoc
    toHTML() {
        const html = `  <article>
                            <div class="recipe__banner"></div>
                            <div class="title-container">
                                <h2 class="recipe__title">${this.name}</h2>
                                <span class="recipe__time"><i class="fa-regular fa-clock"></i>${this.time} min</span>
                            </div>
                            <div class="recipe__container">
                                <div class="recipe__ingredients">
                                    <ul class="ingredients-list">
                                        ${this.ingredients.map((ingredient) => ingredient.toHTML()).join('')}
                                    </ul>
                                </div>
                                <div class="recipe__instructions">
                                    <p>${this.description}</p>
                                </div>
                            </div>
                        </article>`;
        return html;
    }
}

// eslint-disable-next-line require-jsdoc
class Ingredient {
    // eslint-disable-next-line require-jsdoc
    constructor({ingredient, quantity, unit}) {
        this.ingredient = ingredient;
        this.quantity = quantity || null;
        this.unit = unit || null;
    }

    // eslint-disable-next-line require-jsdoc
    toHTML() {
        let html = `<li class="ingredient">${this.ingredient}`;
        if (this.quantity) {
            html += `: ${this.quantity}`;
            if (this.unit) {
                html += ` ${this.unit}`;
            }
        }
        html += `</li>`;
        return html;
    }
}

const recipesDiv = document.querySelector('.recipes');
const ingredientList = document.querySelector('.dropdown__list--ingredient');
const appliancetList = document.querySelector('.dropdown__list--appliance');
const ustensilList = document.querySelector('.dropdown__list--ustensil');
const currentFilters = document.querySelector('.current-filters');
const newRecipes = {list: []};
const filterIngredients = [];
const currentFilteredIngredients = [];
const filterUstensiles = [];
const currentFilteredUstensiles = [];
const filterAppliance = [];
const currentFilteredAppliance = [];

recipes.forEach((recipe) => {
    newRecipes.list.push(new Recipe(
        recipe.id,
        recipe.name,
        recipe.time,
        recipe.ustensils,
        recipe.appliance,
        recipe.description,
        recipe.ingredients,
    ));
    // We add each different ingredient in an array
    recipe.ingredients.forEach((ingredient) => {
        // filtersIngredients.push(ingredient.ingredient.toLowerCase());
        const ingredientName = ingredient.ingredient.toLowerCase();
        if (!filterIngredients.includes(ingredientName)) {
            filterIngredients.push(ingredientName);
        }
    });
    // We add each different ustensil in an array
    recipe.ustensils.forEach((ustensil) => {
        // filtersIngredients.push(ingredient.ingredient.toLowerCase());
        const ustensileName = ustensil.toLowerCase();
        if (!filterUstensiles.includes(ustensileName)) {
            filterUstensiles.push(ustensileName);
        }
    });
    // We add each different appliance in an array
    const applianceName = recipe.appliance.toLowerCase();
    if (!filterAppliance.includes(applianceName)) {
        filterAppliance.push(applianceName);
    }

    recipesDiv.insertAdjacentHTML('beforeend', newRecipes.list[newRecipes.list.length - 1].toHTML());
});

// We add each ingredient, appliance and ustensil in each dropdown
filterIngredients.forEach((ingredient) => {
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'dropdown__list__item');
    newLi.innerText = ingredient;
    newLi.addEventListener('click', function(e) {
        currentFilteredIngredients.push(ingredient);
        const spanFilter = document.createElement('span');
        const closeImg = document.createElement('img');
        spanFilter.classList.add('current-filters__span', 'current-filters__span--ingredient');
        spanFilter.innerText = ingredient;
        closeImg.setAttribute('src', 'assets/svg/close.svg');
        closeImg.addEventListener('click', function(e) {
            spanFilter.remove();
        });
        spanFilter.appendChild(closeImg);
        currentFilters.appendChild(spanFilter);
    });
    ingredientList.appendChild(newLi);
});

filterAppliance.forEach((appliance) => {
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'dropdown__list__item');
    newLi.innerText = appliance;
    newLi.addEventListener('click', function(e) {
        currentFilteredAppliance.push(appliance);
        const spanFilter = document.createElement('span');
        const closeImg = document.createElement('img');
        spanFilter.classList.add('current-filters__span', 'current-filters__span--appliance');
        spanFilter.innerText = appliance;
        closeImg.setAttribute('src', 'assets/svg/close.svg');
        closeImg.addEventListener('click', function(e) {
            spanFilter.remove();
        });
        spanFilter.appendChild(closeImg);
        currentFilters.appendChild(spanFilter);
    });
    appliancetList.appendChild(newLi);
});

filterUstensiles.forEach((ustensil) => {
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'dropdown__list__item');
    newLi.innerText = ustensil;
    newLi.addEventListener('click', function(e) {
        currentFilteredUstensiles.push(ustensil);
        const spanFilter = document.createElement('span');
        const closeImg = document.createElement('img');
        spanFilter.classList.add('current-filters__span', 'current-filters__span--ustensil');
        spanFilter.innerText = ustensil;
        closeImg.setAttribute('src', 'assets/svg/close.svg');
        closeImg.addEventListener('click', function(e) {
            spanFilter.remove();
        });
        spanFilter.appendChild(closeImg);
        currentFilters.appendChild(spanFilter);
    });
    ustensilList.appendChild(newLi);
});

const inputSearch = document.getElementById('search');
const formSearch = document.getElementById('formSearch');

formSearch.addEventListener('submit', function(e) {
    e.preventDefault();
});

inputSearch.addEventListener('input', function(e) {
    const searchTerm = inputSearch.value.toLowerCase();
    if (searchTerm.length >= 3) {
        recipesDiv.innerHTML = '';
        newRecipes.list.forEach((recipe) => {
            // eslint-disable-next-line max-len
            if (recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm)) {
                recipesDiv.insertAdjacentHTML('beforeend', recipe.toHTML());
            } else {
                const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
                if (ingredients.includes(searchTerm)) {
                    recipesDiv.insertAdjacentHTML('beforeend', recipe.toHTML());
                }
            }
        });
    } else {
        recipesDiv.innerHTML = '';
        newRecipes.list.forEach((recipe) => {
            recipesDiv.insertAdjacentHTML('beforeend', recipe.toHTML());
        });
    }
});
