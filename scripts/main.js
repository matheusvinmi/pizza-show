// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito de header ao rolar
window.addEventListener('scroll', function() {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

// Loading screen
window.addEventListener('load', function() {
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
        alert("Carrinho vazio! Adicione itens primeiro.");
        return;
    }

    // Pega a forma de pagamento
    const pagamento = document.querySelector('input[name="payment"]:checked').value;
    
    // Monta a mensagem básica
    let msg = "Olá, quero pedir:\n\n";
    
    // Adiciona os itens
    this.itens.forEach(item => {
        msg += `${item.quantidade}x ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
    });
    
    // Adiciona total e pagamento
    msg += `\nTotal: R$ ${this.calcularTotal().toFixed(2).replace('.', ',')}`;
    msg += `\nPagamento: ${pagamento}`;
    msg += `\n\nObrigado!`;
    
    // Abre o WhatsApp
    window.location.href = `https://wa.me/5517981708668?text=${encodeURIComponent(msg)}`;
}}

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

// Modal do carrinho
const modal = {
    element: document.getElementById('minhaModal'),
    produtosLista: document.querySelector('.produtos-lista'),
    checkoutSection: document.querySelector('.checkout-section'),
    
    abrir() {
        this.atualizar();
        this.element.style.display = 'flex';
    },
    
    fechar() {
        this.element.style.display = 'none';
    },
    
    atualizar() {
        this.produtosLista.innerHTML = carrinho.itens.length === 0 
            ? '<p class="carrinho-vazio">Seu carrinho está vazio</p>'
            : carrinho.itens.map(item => `
                <div class="produto-item">
                    ${item.nome} 
                    <span class="produto-quantidade">${item.quantidade}x</span>
                    <span class="produto-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
            `).join('') + `
            <div class="produto-total">
                <strong>Total:</strong>
                <span class="total-preco">R$ ${carrinho.calcularTotal().toFixed(2).replace('.', ',')}</span>
            </div>`;
        
        this.checkoutSection.style.display = carrinho.itens.length === 0 ? 'none' : 'block';
    }
};

// Eventos da modal
document.getElementById('carrinho-compra').addEventListener('click', () => modal.abrir());
document.querySelector('.fechar').addEventListener('click', () => modal.fechar());
document.querySelector('.submit-btn').addEventListener('click', e => {
    e.preventDefault();
    carrinho.enviarPedido();
});

// Fechar modal ao clicar fora
window.addEventListener('click', e => {
    if (e.target === modal.element) modal.fechar();
});