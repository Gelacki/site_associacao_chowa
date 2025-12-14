document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const allCategory = 'all';

    /**
     * Filtra os itens da galeria com base na categoria selecionada.
     * @param {string} category - A categoria para filtrar.
     */
    function filterGallery(category) {
        galleryItems.forEach(item => {
            const isInCategory = item.classList.contains(category);

            // Esconde o item para a transição de CSS funcionar
            item.classList.remove('show');
            item.classList.add('hide');

            if (isInCategory || category === allCategory) {
                // Usa um pequeno timeout para criar um efeito de fade-in suave
                setTimeout(() => {
                    item.classList.remove('hide');
                    item.classList.add('show');
                }, 10); // Delay para a transição CSS
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            filterGallery(category);
        });
    });

    // Inicializa a galeria clicando no botão "Todas" para garantir que o estado 'active' esteja correto.
    const initialFilterButton = document.querySelector(`.filter-btn[data-category="${allCategory}"]`);
    initialFilterButton?.click();
});