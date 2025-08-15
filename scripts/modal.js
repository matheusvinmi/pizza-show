  const abrirBtn = document.getElementById('carrinho-compra');
  const modal = document.getElementById('minhaModal');
  const fecharBtn = document.querySelector('.fechar');

  abrirBtn.onclick = () => {
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
  };

  fecharBtn.onclick = () => {
    modal.style.display = 'none';
  };


  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };