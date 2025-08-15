 // Scroll suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Efeito de header ao rolar
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Loading screen
        window.addEventListener('load', function() {
            const loadingScreen = document.querySelector('.loading-screen');
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Contador do carrinho
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const cartCounter = document.querySelector('.contador');
        let counter = 0;

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                counter++;
                cartCounter.textContent = counter;
                
                // Animação do contador
                cartCounter.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    cartCounter.style.transform = 'scale(1)';
                }, 300);
            });
        });

        // Controles de quantidade
        const plusButtons = document.querySelectorAll('.btn-plus');
        const minusButtons = document.querySelectorAll('.btn-minus');

        plusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const quantityElement = this.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                quantity++;
                quantityElement.textContent = quantity;
            });
        });

        minusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const quantityElement = this.parentElement.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                }
            });
        });

        function enviarPedido() {
            const cards = document.querySelectorAll('.card');
            let mensagem = "Olá, gostaria de fazer o seguinte pedido:%0A";
            let temPedido = false;
          
            cards.forEach(card => {
              const quantidade = parseInt(card.querySelector('.quantity').textContent);
              const nomePizza = card.querySelector('.card-title').textContent;
          
              if (quantidade > 0) {
                mensagem += `- ${quantidade}x ${nomePizza}%0A`;
                temPedido = true;
              }
            });
          
            if (!temPedido) {
              alert("Selecione pelo menos um item com quantidade maior que 0 para enviar o pedido.");
              return;
            }
          
            const numero = "5517981708668";
            const url = `https://wa.me/${numero}?text=${mensagem}`;
            window.open(url, '_blank');
          }
          