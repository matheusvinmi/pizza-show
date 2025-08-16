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