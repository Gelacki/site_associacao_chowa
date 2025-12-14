document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // Lógica para mostrar/ocultar senha
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            // Verifica o tipo atual do input e o alterna
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Alterna o ícone entre "olho" e "olho cortado"
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Impede o envio padrão do formulário
            event.preventDefault(); 

            // Pega os valores dos campos de usuário e senha
            const username = document.getElementById('username').value.trim();
            const password = passwordInput.value;

            // Limpa mensagens de erro anteriores
            errorMessage.textContent = '';

            // --- LÓGICA DE AUTENTICAÇÃO (SIMULADA) ---
            // Em um site real, isso seria verificado em um servidor.

            // Credenciais do Sensei (Admin)
            if (username === 'sensei' && password === 'karate#2025') {
                console.log('Login como Sensei bem-sucedido. Redirecionando...');
                sessionStorage.setItem('userRole', 'admin'); // Armazena o tipo de usuário
                window.location.href = 'admin_dashboard.html'; // Redireciona para o painel do admin
            
            // Credenciais do Aluno
            } else if (username === 'aluno' && password === 'verde@123') {
                console.log('Login como Aluno bem-sucedido. Redirecionando...');
                sessionStorage.setItem('userRole', 'aluno'); // Armazena o tipo de usuário
                window.location.href = 'aluno_area.html'; // Redireciona para a área do aluno
            
            // Credenciais inválidas
            } else {
                console.log('Falha no login. Credenciais inválidas.');
                sessionStorage.removeItem('userRole'); // Garante que não há sessão ativa
                errorMessage.textContent = 'Usuário ou senha inválidos. Tente novamente.';
            }
        });
    }
});