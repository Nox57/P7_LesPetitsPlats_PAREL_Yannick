const dropdowns = document.querySelectorAll('.dropdown');
let currentDropdown = null;

dropdowns.forEach((dropdown) => {
    const title = dropdown.querySelector('.dropdown__title-span');
    const icon = dropdown.querySelector('.dropdown__icon');
    const content = dropdown.querySelector('.dropdown__content');
    const search = dropdown.querySelector('.dropdown__title-search');
    let isOpen = false;

    const toggleDropdown = () => {
        isOpen = !isOpen;
        content.classList.toggle('dropdown__content--is-visible', isOpen);
        icon.classList.toggle('active', isOpen);
        search.classList.toggle('display', isOpen);
        title.classList.toggle('display-none', isOpen);
    };

    const closeCurrentDropdown = () => {
        if (currentDropdown) {
            const currentContent = currentDropdown.querySelector('.dropdown__content');
            const currentIcon = currentDropdown.querySelector('.dropdown__icon');
            const currentSearch = currentDropdown.querySelector('.dropdown__title-search');
            const currentTitle = currentDropdown.querySelector('.dropdown__title-span');
            currentContent.classList.remove('dropdown__content--is-visible');
            currentIcon.classList.remove('active');
            currentSearch.classList.remove('display');
            currentTitle.classList.remove('display-none');
            isOpen = false;
            currentDropdown = null;
        }
    };

    title.addEventListener('click', () => {
        if (currentDropdown !== dropdown) {
            closeCurrentDropdown();
            currentDropdown = dropdown;
        }
        toggleDropdown();
    });

    icon.addEventListener('click', () => {
        if (currentDropdown !== dropdown) {
            closeCurrentDropdown();
            currentDropdown = dropdown;
        }
        toggleDropdown();
    });
});
