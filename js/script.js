document.addEventListener('DOMContentLoaded', () => {
    console.log("Site de Karatê carregado com sucesso!");

    // --- VARIÁVEIS GLOBAIS E CONSTANTES ---
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const ctaButton = document.querySelector('.cta-button');
    const userRole = localStorage.getItem('userRole');
    const currentPage = window.location.pathname;

    // Usuários SIMULADOS (Em um sistema real, estes estariam em um banco de dados seguro)
    const SIMULATED_USERS = {
        // Professor / ADMIN (Pode Editar/Gerenciar)
        'professor@karate.com': { password: 'admin123', role: 'admin' },
        // NOVO Administrador Geral
        'admin@karate.com': { password: 'senhaforte123', role: 'admin' },
        // Aluno (Apenas Visualiza/Cadastra)
        'aluno@karate.com': { password: 'aluno123', role: 'aluno' }
    };

    // --- LÓGICA DE PROTEÇÃO DE ROTAS ---

    // Se estiver tentando acessar a área ADMIN e não for admin, redireciona
    if (currentPage.includes('admin_dashboard.html') && userRole !== 'admin') {
        alert("Acesso negado. Você não tem permissão de Administrador.");
        window.location.href = 'login.html';
    }

    // Se estiver tentando acessar a área ALUNO e não tiver um papel válido (aluno ou admin), redireciona
    if (currentPage.includes('aluno_area.html') && userRole !== 'aluno' && userRole !== 'admin') {
        alert("Acesso negado. Faça login como aluno.");
        window.location.href = 'login.html';
    }

    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;

            if (errorMessage) {
                errorMessage.textContent = ''; // Limpa mensagens de erro
            }
            
            const user = SIMULATED_USERS[username];

            if (user && user.password === password) {
                // Login bem-sucedido
                // Armazena o papel do usuário no armazenamento local (para simulação de acesso)
                localStorage.setItem('userRole', user.role);

                alert(`Login de sucesso! Bem-vindo(a) de volta.`);

                // Redireciona para a página inicial após o login
                window.location.href = 'index.html';

            } else {
                // Login falhou
                if (errorMessage) {
                    errorMessage.textContent = 'Credenciais inválidas. Tente novamente.';
                }
            }
        });
    }

    // --- LÓGICA DE LOGOUT ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Limpa o papel do usuário no armazenamento local
            localStorage.removeItem('userRole');
            alert("Sessão encerrada. Você foi desconectado(a).");
            // Redireciona para a página inicial ou de login
            window.location.href = 'index.html';
        });
    }

    // --- INTERATIVIDADE GERAL DO SITE ---
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Se o elemento clicado for um botão (e não um link <a>), mostra um alerta.
            if (e.target.tagName === 'BUTTON') {
                alert("Redirecionando para o Cadastro!");
                window.location.href = 'cadastro.html';
            }
        });
    }
});