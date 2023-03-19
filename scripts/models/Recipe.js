// eslint-disable-next-line require-jsdoc, no-unused-vars
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
