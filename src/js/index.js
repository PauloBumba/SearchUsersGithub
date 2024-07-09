$(document).ready(function() {
    $('#search').on('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do botão de envio
        buscarUsuario();
    });

    async function buscarUsuario() {
        const username = $('#username').val().trim(); // Obtém o nome de usuário e remove espaços extras

        if (!username) {
            alert('Por favor, insira um nome de usuário.');
            return;
        }

        const url = `https://api.github.com/users/${username}`; // URL da API do GitHub

        try {
            const response = await fetch(url);
            if (!response.ok) {
                alert(`Erro na API: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            if (data.message === 'Not Found') {
                alert('Usuário não encontrado.');
                return;
            }

            // Atualiza o conteúdo do elemento <p> com os dados do usuário
            $('#info').html(`
                <strong>Nome:</strong> ${data.name || 'Não disponível'}<br>
                <strong>Usuário:</strong> ${data.login}<br>
                <strong>Bio:</strong> ${data.bio || 'Não disponível'}<br>
                <strong>Local:</strong> ${data.location || 'Não disponível'}<br>
                <strong>Link do Perfil:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a>
            `);

            console.log(data); // Exibe os dados no console para depuração
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    }
});