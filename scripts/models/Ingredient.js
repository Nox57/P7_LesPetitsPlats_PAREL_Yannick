// eslint-disable-next-line require-jsdoc, no-unused-vars
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
