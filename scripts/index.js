// eslint-disable-next-line require-jsdoc
class Recipe {
    // eslint-disable-next-line require-jsdoc
    constructor(id, name, time, ustensils, appliance, description, ingredients) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.ustensils = ustensils;
        this.appliance = appliance;
        this.description = description;
        this.ingredients = ingredients.map((ingredient) => new Ingredient(ingredient));
    }

    // eslint-disable-next-line require-jsdoc
    toHTML() {
        return `<article>
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
const applianceList = document.querySelector('.dropdown__list--appliance');
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
        const ingredientName = ingredient.ingredient.toLowerCase();
        if (!filterIngredients.some((ingredient) => ingredient.toLowerCase() === ingredientName)) {
            filterIngredients.push(ingredient.ingredient);
        }
    });
    // We add each different ustensil in an array
    recipe.ustensils.forEach((ustensil) => {
        // filtersIngredients.push(ingredient.ingredient.toLowerCase());
        const ustensilName = ustensil.toLowerCase();
        if (!filterUstensiles.some((ustensil) => ustensil.toLowerCase() === ustensilName)) {
            filterUstensiles.push(ustensil);
        }
    });
    // We add each different appliance in an array
    const applianceName = recipe.appliance.toLowerCase();
    if (!filterAppliance.some((appliance) => appliance.toLowerCase() === applianceName)) {
        filterAppliance.push(recipe.appliance);
    }

    recipesDiv.insertAdjacentHTML('beforeend', newRecipes.list[newRecipes.list.length - 1].toHTML());
});

// We add each ingredient, appliance and ustensil in each dropdown
// eslint-disable-next-line require-jsdoc
function addFilterToList(filterList, currentFilteredList, filterType) {
    filterList.forEach((filter) => {
        const newLi = document.createElement('li');
        newLi.setAttribute('class', 'dropdown__list__item');
        newLi.innerText = filter;
        newLi.addEventListener('click', function(e) {
            newLi.style.display = 'none';
            currentFilteredList.push(filter);
            const spanFilter = document.createElement('span');
            const closeImg = document.createElement('img');
            spanFilter.classList.add('current-filters__span', `current-filters__span--${filterType}`);
            spanFilter.innerText = filter;
            closeImg.setAttribute('src', 'assets/svg/close.svg');
            closeImg.addEventListener('click', function(e) {
                spanFilter.remove();
                newLi.style.display = 'block';
                const index = currentFilteredList.indexOf(filter);
                if (index > -1) {
                    currentFilteredList.splice(index, 1);
                }
            });
            spanFilter.appendChild(closeImg);
            currentFilters.appendChild(spanFilter);
        });
        if (filterType === 'ingredient') {
            ingredientList.appendChild(newLi);
        } else if (filterType === 'appliance') {
            applianceList.appendChild(newLi);
        } else if (filterType === 'ustensil') {
            ustensilList.appendChild(newLi);
        }
    });
}

// Adding filters to dropdown
addFilterToList(filterIngredients, currentFilteredIngredients, 'ingredient');
addFilterToList(filterAppliance, currentFilteredAppliance, 'appliance');
addFilterToList(filterUstensiles, currentFilteredUstensiles, 'ustensil');

const inputSearch = document.getElementById('search');
const formSearch = document.getElementById('formSearch');

formSearch.addEventListener('submit', function(e) {
    e.preventDefault();
});

inputSearch.addEventListener('input', function(e) {
    const searchTerm = inputSearch.value.toLowerCase();
    if (searchTerm.length >= 3) {
        const filteredRecipes = filterRecipes(searchTerm, newRecipes.list);
        renderRecipes(filteredRecipes);
    } else {
        renderRecipes(newRecipes.list);
    }
});

/**
 * Filter recipes by term.
 * @param {string} searchTerm The search term.
 * @param {Array} recipes List of recipes.
 * @return {Array} List of recipes filtered by term.
 */
function filterRecipes(searchTerm, recipes) {
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        if (recipe.name.toLowerCase().includes(searchTerm)) {
            filteredRecipes.push(recipe);
            continue;
        }

        if (recipe.description.toLowerCase().includes(searchTerm)) {
            filteredRecipes.push(recipe);
            continue;
        }

        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j].ingredient;
            if (ingredient.toLowerCase().includes(searchTerm)) {
                filteredRecipes.push(recipe);
                break;
            }
        }
    }

    return filteredRecipes;
}

// eslint-disable-next-line require-jsdoc
function renderRecipes(recipes) {
    recipesDiv.innerHTML = '';
    recipes.forEach((recipe) => {
        recipesDiv.insertAdjacentHTML('beforeend', recipe.toHTML());
    });
}

// eslint-disable-next-line require-jsdoc
function searchDropdownList(inputId, listClass) {
    const inputSearch = document.getElementById(inputId);
    inputSearch.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const list = document.querySelector(`.${listClass}`);
        const items = list.querySelectorAll('.dropdown__list__item');
        items.forEach((item) => {
            const itemName = item.innerText.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

searchDropdownList('search-ingredient', 'dropdown__list--ingredient');
searchDropdownList('search-appliance', 'dropdown__list--appliance');
searchDropdownList('search-ustensil', 'dropdown__list--ustensil');
