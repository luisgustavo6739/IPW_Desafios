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

        console.log("Local: ", tipoEvento);
        console.log("Valor do aluguel: ", valorAluguel);

        Subtotal();
    });
});

//dataEvento
let dataEvento = null;
let horarioEvento = null;
let duracaoEvento = null;

function DataEvento() {
    dataEvento = document.querySelector('#dataEvento').value;
    horarioEvento = document.querySelector('#horarioEvento').value;
    duracaoEvento = ducument.querySelector('#duracaoEvento').value;

    console.log("Data: ", dataEvento);
    console.log("Horário: ", horarioEvento);
    console.log("Duração: ", duracaoEvento);
}

//atualizarSubtotal
function Subtotal() {
    const itensGastos = document.querySelector('#itensGastos');
    const valorSubtotal = document.querySelector('#valor-subtotal');

    itensGastos.innerHTML = `
        Local (${tipoLocal}) - ${valorAluguel.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })}
        `;

    valorSubtotal.textContent = valorAluguel.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
