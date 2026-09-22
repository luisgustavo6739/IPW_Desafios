//nav-overlay
const navbar = document.querySelector(".nav-overlay");

window.addEventListener("scroll", () => {
    if (window.scrollY > 55) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

//tipoEvento
let tipoEvento = null;

const botoesEvento = document.querySelectorAll('#modalEvento .modal-body button');

botoesEvento.forEach(function (button) {
    button.addEventListener('click', function () {
        tipoEvento = button.textContent;

        console.log("Tipo de evento: ", tipoEvento);
    });
});

//tipoLocal
let tipoLocal = null;
let valorAluguel = 0;

const locaisEvento = document.querySelectorAll('#modalLocal .card');

locaisEvento.forEach(function (local) {
    local.addEventListener('click', function () {
        tipoLocal = local.querySelector('.card-title').textContent;

        valorAluguel = Number(
            local.querySelector('h3').textContent
                .replace('R$', '')
                .replace('.', '')
                .replace(',', '.')
        )

        console.log("Local: ", tipoLocal);
        console.log("Valor do aluguel: ", valorAluguel);

        Subtotal();
    });
});

//dataEvento
let dataEvento = null;
let horarioEvento = "18:00";
let duracaoEvento = 1;

const data = document.querySelector('#dataEvento')
data.addEventListener('change', function () {
    dataEvento = data.value;

    console.log("Data: ", dataEvento);
});

const horario = document.querySelector('#horarioEvento')
horario.addEventListener('change', function () {
    horarioEvento = horario.value;

    console.log("Horário: ", horarioEvento);
});

const duracao = document.querySelector('#duracaoEvento')
duracao.addEventListener('change', function () {
    duracaoEvento = Number(duracao.value);

    console.log("Duração: ", duracaoEvento);

    Subtotal();
});

//valorBuffet
let valorBuffet = 0;

function calcularBuffet() {
    const comida = document.querySelector('#buffetComida');
    const bebida = document.querySelector('#buffetBebida');
    const servico = document.querySelector('#buffetServico');

    valorBuffet = 0;

    if (comida.checked) {
        valorBuffet += 70 * total;
    }

    if (bebida.checked) {
        valorBuffet += 40 * total;
    }

    if (servico.checked) {
        valorBuffet += 500;
    }

    console.log("Valor do buffet: ", valorBuffet);

    Subtotal();
}

const opcoesBuffet = document.querySelectorAll('#modalOrcamento input[type="checkbox"]');

opcoesBuffet.forEach(function (opcao) {
    opcao.addEventListener('change', function () {
        calcularBuffet();
    });
});

//atualizarSubtotal
function Subtotal() {
    const itensGastos = document.querySelector('#itensGastos');
    const valorSubtotal = document.querySelector('#valor-subtotal');

    const taxaHora = 50;
    const valorDuracao = duracaoEvento * taxaHora;

    const valorTotal = valorAluguel + valorDuracao + valorBuffet;

    itensGastos.innerHTML = `
        Local (${tipoLocal}) - ${valorAluguel.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}

    <br>

    Duração (${duracaoEvento || 0} horas) - ${valorDuracao.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}

    <br>

Buffet - ${valorBuffet.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}
    `;

    valorSubtotal.textContent = valorTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

//cadastroConvidados
let total = 0;

const formConvidado = document.querySelector('#formConvidado');
const listaConvidados = document.querySelector('#listaConvidados');
const totalConvidados = document.querySelector('#totalConvidados');

formConvidado.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.querySelector('#nomeConvidado').value;
    const telefone = document.querySelector('#telefoneConvidado').value;
    const email = document.querySelector('#emailConvidado').value;

    listaConvidados.innerHTML += `
        <tr>
            <td>${nome}</td>
            <td>${telefone}</td>
            <td>${email}</td>
            <td>
                <button class="btn btn-danger btn-sm"
                    onclick="this.parentElement.parentElement.remove(); total--; totalConvidados.textContent = total;">
                    Remover
                </button>
            </td>
        </tr>
    `;

    total++;

    totalConvidados.textContent = total;

    formConvidado.reset();

    calcularBuffet();

    gerarRelatorio();
});

const formCadastro = document.querySelector('#formCadastro');

formCadastro.addEventListener('submit', function (event) {
    event.preventDefault();

    dataEvento = document.querySelector('#dataEvento').value;
    horarioEvento = document.querySelector('#horarioEvento').value;
    duracaoEvento = Number(document.querySelector('#duracaoEvento').value);

    calcularBuffet();

    gerarRelatorio();
});

//relatório

function gerarRelatorio() {
    document.querySelector('#relatorioTipoEvento').textContent =
        tipoEvento || 'Não informado';

    document.querySelector('#relatorioData').textContent =
        dataEvento || 'Não informada';

    document.querySelector('#relatorioHorario').textContent =
        horarioEvento || 'Não informado';

    document.querySelector('#relatorioDuracao').textContent =
        duracaoEvento ? duracaoEvento + ' horas' : 'Não informada';

    document.querySelector('#relatorioLocal').textContent =
        tipoLocal || 'Não informado';

    document.querySelector('#relatorioConvidados').textContent =
        total;

    document.querySelector('#relatorioBuffet').textContent =
        valorBuffet.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    document.querySelector('#relatorioTotal').textContent =
        document.querySelector('#valor-subtotal').textContent;
}