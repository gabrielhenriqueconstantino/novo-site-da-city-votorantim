document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });
});


// Função para remover acentos das strings
function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove os caracteres de acento
}

// Filtro de pesquisa de linhas
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const linhas = document.querySelectorAll('.linha-container .linha');

    searchInput.addEventListener('input', function () {
        const query = removerAcentos(searchInput.value.toLowerCase()); // Normaliza e remove acentos na pesquisa
        linhas.forEach(function (linha) {
            const text = removerAcentos(linha.textContent.toLowerCase()); // Normaliza e remove acentos nas linhas
            if (text.includes(query)) {
                linha.style.display = ''; // Mostra as linhas que correspondem
            } else {
                linha.style.display = 'none'; // Esconde as linhas que não correspondem
            }
        });
    });
});

// Efeito de destaque ao passar o mouse sobre as linhas
document.addEventListener("DOMContentLoaded", function () {
    const linhas = document.querySelectorAll('.linha');

    linhas.forEach(linha => {
        linha.addEventListener('mouseover', function () {
            linhas.forEach(otherLinha => {
                if (otherLinha !== linha) {
                    otherLinha.classList.add('darker');
                }
            });
        });

        linha.addEventListener('mouseout', function () {
            linhas.forEach(otherLinha => {
                otherLinha.classList.remove('darker');
            });
        });
    });
});

// Seleção de botões de dia e partida
document.addEventListener('DOMContentLoaded', function () {
    const diaButtons = document.querySelectorAll('.btn-dia');
    const partidaButtons = document.querySelectorAll('.btn-partida');

    // Função para alternar a seleção de um botão
    function toggleButtonSelection(button, buttons) {
        if (button.classList.contains('selecionado')) {
            button.classList.remove('selecionado');
        } else {
            buttons.forEach(btn => btn.classList.remove('selecionado'));
            button.classList.add('selecionado');
        }
    }

    // Adiciona o evento de clique para os botões de "Dias Úteis", "Sábados", "Domingos"
    diaButtons.forEach(button => {
        button.addEventListener('click', function () {
            toggleButtonSelection(button, diaButtons);
            mostrarTabela(); // Atualiza a visibilidade da tabela ao clicar
        });
    });

    // Adiciona o evento de clique para os botões de "Centro", "Bairro"
    partidaButtons.forEach(button => {
        button.addEventListener('click', function () {
            toggleButtonSelection(button, partidaButtons);
            mostrarTabela(); // Atualiza a visibilidade da tabela ao clicar
        });
    });
});

// Função para verificar o dia da semana e já selecionar o botão correspondente
function selecionarDiaAtual() {
    const diaAtual = new Date().getDay(); // Obtém o dia da semana

    if (diaAtual === 6) { // Se for sábado
        document.getElementById('btn-sabados').classList.add('selecionado');
    } else if (diaAtual === 0) { // Se for domingo
        document.getElementById('btn-domingos-feriados').classList.add('selecionado');
    } else { // Se for um dia útil
        document.getElementById('btn-uteis').classList.add('selecionado');
    }

    mostrarTabela(); // Exibe a tabela correspondente ao dia ao carregar a página
}

// Função para mostrar a tabela correspondente com base nas seleções
function mostrarTabela() {
    // Primeiro, esconda todas as tabelas
    const tabelas = document.querySelectorAll('.tabela');
    tabelas.forEach(tabela => {
        tabela.style.display = 'none';
    });

    // Verificar os botões selecionados e exibir a tabela correspondente
    const diaSelecionado = document.querySelector('.btn-dia.selecionado');
    const partidaSelecionada = document.querySelector('.btn-partida.selecionado');

    // Se o botão de 'Dias Úteis' for selecionado
    if (diaSelecionado && diaSelecionado.id === 'btn-uteis') {
        if (partidaSelecionada && partidaSelecionada.id === 'btn-centro') {
            document.getElementById('uteis-centro').style.display = 'block';
        } else if (partidaSelecionada && partidaSelecionada.id === 'btn-bairro') {
            document.getElementById('uteis-bairro').style.display = 'block';
        } else {
            document.getElementById('uteis-centro').style.display = 'block';
            document.getElementById('uteis-bairro').style.display = 'block';
        }
    }
    // Se o botão de 'Sábados' for selecionado
    else if (diaSelecionado && diaSelecionado.id === 'btn-sabados') {
        if (partidaSelecionada && partidaSelecionada.id === 'btn-centro') {
            document.getElementById('sabados-centro').style.display = 'block';
        } else if (partidaSelecionada && partidaSelecionada.id === 'btn-bairro') {
            document.getElementById('sabados-bairro').style.display = 'block';
        } else {
            document.getElementById('sabados-centro').style.display = 'block';
            document.getElementById('sabados-bairro').style.display = 'block';
        }
    }
    // Se o botão de 'Domingos/feriados' for selecionado
    else if (diaSelecionado && diaSelecionado.id === 'btn-domingos-feriados') {
        if (partidaSelecionada && partidaSelecionada.id === 'btn-centro') {
            document.getElementById('domingos-centro').style.display = 'block';
        } else if (partidaSelecionada && partidaSelecionada.id === 'btn-bairro') {
            document.getElementById('domingos-tabela').style.display = 'block';
        } else {
            document.getElementById('domingos-centro').style.display = 'block';
            document.getElementById('domingos-tabela').style.display = 'block';
        }
    }
}

// Chama a função ao carregar a página
window.onload = function () {
    selecionarDiaAtual();
};

// Função para obter o dia da semana em português
function getDiaSemana() {
    const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const data = new Date();
    return dias[data.getDay()]; // Retorna o dia da semana
}

// Função para formatar o horário no formato HH:MM:SS
function getHorarioAtual() {
    const data = new Date();
    const horas = String(data.getHours()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

// Função para atualizar o texto do dia e horário
function atualizarDiaHorario() {
    const diaSemana = getDiaSemana();
    const horarioAtual = getHorarioAtual();
    const elemento = document.getElementById("dia-horario");
    elemento.textContent = `Hoje é ${diaSemana}, ${horarioAtual}`;
}

// Atualizar o texto inicialmente
atualizarDiaHorario();

// Atualizar o texto a cada segundo (para manter o horário atualizado)
setInterval(atualizarDiaHorario, 1000);