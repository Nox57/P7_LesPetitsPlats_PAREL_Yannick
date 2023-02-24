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

recipes.forEach((recipe) => {
    // eslint-disable-next-line max-len
    const newRecipe = new Recipe(
        recipe.id,
        recipe.name,
        recipe.time,
        recipe.ustensils,
        recipe.appliance,
        recipe.description,
        recipe.ingredients,
    );
    recipesDiv.innerHTML += newRecipe.toHTML();
});
