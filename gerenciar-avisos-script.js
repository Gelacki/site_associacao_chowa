document.addEventListener('DOMContentLoaded', () => {
    const avisoForm = document.getElementById('avisoForm');
    const avisoDataInput = document.getElementById('avisoData');
    const avisoConteudoInput = document.getElementById('avisoConteudo');
    const listaAvisosContainer = document.getElementById('listaAvisos');

    // Função para buscar avisos do localStorage
    const getAvisos = () => {
        return JSON.parse(localStorage.getItem('muralAvisos')) || [];
    };

    // Função para salvar avisos no localStorage
    const saveAvisos = (avisos) => {
        localStorage.setItem('muralAvisos', JSON.stringify(avisos));
    };

    // Função para renderizar os avisos na tela
    const renderAvisos = () => {
        listaAvisosContainer.innerHTML = '';
        const avisos = getAvisos();

        if (avisos.length === 0) {
            listaAvisosContainer.innerHTML = '<p>Nenhum aviso cadastrado.</p>';
            return;
        }

        avisos.forEach((aviso, index) => {
            const avisoElement = document.createElement('div');
            avisoElement.className = 'aviso-item';
            avisoElement.innerHTML = `
                <p class="data"><i class="far fa-calendar-alt"></i> ${aviso.data}</p>
                <p class="conteudo">${aviso.conteudo}</p>
                <button class="cta-button" data-index="${index}" style="background-color: #c0392b; font-size: 0.8em; padding: 5px 10px;">Excluir</button>
            `;
            listaAvisosContainer.appendChild(avisoElement);
        });
    };

    // Evento para adicionar um novo aviso
    avisoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const avisos = getAvisos();
        const novoAviso = {
            data: avisoDataInput.value,
            conteudo: avisoConteudoInput.value
        };
        avisos.unshift(novoAviso); // Adiciona no início da lista
        saveAvisos(avisos);
        renderAvisos();
        avisoForm.reset();
    });

    // Evento para excluir um aviso (usando delegação de evento)
    listaAvisosContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.hasAttribute('data-index')) {
            const index = parseInt(e.target.getAttribute('data-index'), 10);
            const avisos = getAvisos();
            avisos.splice(index, 1); // Remove o aviso pelo índice
            saveAvisos(avisos);
            renderAvisos();
        }
    });

    // Renderiza os avisos ao carregar a página
    renderAvisos();
});