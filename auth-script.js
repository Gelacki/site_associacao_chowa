document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutBtn');

    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Impede que o link '#' seja seguido

            console.log('Logout acionado. Redirecionando para a página inicial...');
            
            // Limpa a sessão do usuário (importante para um logout real)
            sessionStorage.removeItem('userRole');

            // Redireciona o usuário para a página de login ou inicial
            window.location.href = 'index.html';
        });
    }
});