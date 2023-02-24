const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
    const title = dropdown.querySelector('.dropdown__title');
    const icon = dropdown.querySelector('.dropdown__title-icon');
    const content = dropdown.querySelector('.dropdown__content');

    title.addEventListener('click', () => {
        content.classList.toggle('dropdown__content--is-visible');
        icon.classList.toggle('active');
    });

    icon.addEventListener('click', () => {
        content.classList.toggle('dropdown__content--is-visible');
        icon.classList.toggle('active');
    });
});
