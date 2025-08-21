// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function () {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

window.addEventListener('load', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
    }, 1000);
});













// Gerenciamento do carrinho
const carrinho = {
    itens: [],
    contador: document.querySelector('.contador'),

    adicionarItem(nome, preco, quantidade) {
        const itemExistente = this.itens.find(item => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            this.itens.push({ nome, preco, quantidade });
        }

        this.atualizarContador();
    },

    calcularTotal() {
        return this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    },

    atualizarContador() {
        const totalItens = this.itens.reduce((total, item) => total + item.quantidade, 0);
        this.contador.textContent = totalItens;

        // Animação do contador
        this.contador.style.transform = 'scale(1.5)';
        setTimeout(() => this.contador.style.transform = 'scale(1)', 300);
    },

    enviarPedido() {
        // Verifica se tem itens
        if (this.itens.length === 0) {
            this.atualizarVisibilidadeBtnLimpar();
            alert("Carrinho vazio! Adicione itens primeiro.");

            return;
        }

        // pega a forma de pagamento
        const pagamento = document.querySelector('input[name="payment"]:checked').value;

        // monta a msg básica
        let msg = "Olá, quero pedir:\n\n";

        // adiciona os itens
        this.itens.forEach(item => {
            msg += `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
        });

        // adiciona total e pagamento
        msg += `\nTotal: R$ ${this.calcularTotal().toFixed(2).replace('.', ',')}`;
        msg += `\nPagamento: ${pagamento}`;
        msg += `\n\nObrigado!`;

        // Abre o zap
        window.location.href = `https://wa.me/5517981708668?text=${encodeURIComponent(msg)}`;
    },

    limparCarrinho() {
        this.itens = [];
        this.atualizarContador();
        document.querySelector('.produtos-lista').innerHTML = '<p>Carrinho vazio</p>';
    }
}

document.querySelector('.limpar-carrinho-btn').addEventListener('click', function () {
    carrinho.limparCarrinho();
});













// Eventos dos produtos
document.querySelectorAll('.card').forEach(card => {
    const quantityElement = card.querySelector('.quantity');
    const btnPlus = card.querySelector('.btn-plus');
    const btnMinus = card.querySelector('.btn-minus');
    const btnAdd = card.querySelector('.add-to-cart');

    // Controles de quantidade
    btnPlus.addEventListener('click', () => {
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    });

    btnMinus.addEventListener('click', () => {
        const quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) quantityElement.textContent = quantity - 1;
    });







    // Adicionar ao carrinho
    btnAdd.addEventListener('click', () => {
        const nome = card.querySelector('.card-title').textContent;
        const preco = parseFloat(card.querySelector('.price').textContent
            .replace('R$ ', '').replace(',', '.'));
        const quantidade = parseInt(quantityElement.textContent);

        carrinho.adicionarItem(nome, preco, quantidade);
        quantityElement.textContent = '1'; // Resetar quantidade
    });
});