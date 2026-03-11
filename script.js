/* ========================================
   RIKOS EMPREENDIMENTOS - SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENU MOBILE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animação do hambúrguer
            const spans = menuToggle.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }
        });
    }
    
    // ========================================
    // FORMULÁRIO WHATSAPP
    // ========================================
    const whatsappForm = document.getElementById('whatsappForm');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const interesse = document.getElementById('interesse').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validar campos
            if (!nome || !email || !telefone || !interesse || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Mapear interesse para texto
            const interesseTexto = {
                'cotas': 'Cotas Compartilhadas',
                'consultoria': 'Consultoria',
                'empreendimentos': 'Empreendimentos',
                'outros': 'Outros'
            };
            
            // Criar mensagem para WhatsApp
            const textoMensagem = `*Novo contato pelo site Rikos Empreendimentos*%0A%0A` +
                `*Nome:* ${nome}%0A` +
                `*E-mail:* ${email}%0A` +
                `*Telefone:* ${telefone}%0A` +
                `*Interesse:* ${interesseTexto[interesse]}%0A%0A` +
                `*Mensagem:*%0A${mensagem}`;
            
            // Número do WhatsApp da Rikos
            const numeroWhatsApp = '5531995195540';
            
            // Criar URL do WhatsApp
            const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${textoMensagem}`;
            
            // Abrir WhatsApp em nova aba
            window.open(whatsappURL, '_blank');
            
            // Limpar formulário
            whatsappForm.reset();
            
            // Mostrar mensagem de sucesso
            alert('Obrigado pelo contato! Você será redirecionado para o WhatsApp.');
        });
    }
    
    // ========================================
    // MÁSCARA DE TELEFONE
    // ========================================
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            
            if (valor.length > 11) {
                valor = valor.slice(0, 11);
            }
            
            if (valor.length > 7) {
                valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
            } else if (valor.length > 2) {
                valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
            } else if (valor.length > 0) {
                valor = `(${valor}`;
            }
            
            e.target.value = valor;
        });
    }
    
    // ========================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // ANIMAÇÃO DE ENTRADA SUAVE
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll(
        '.service-card, .benefit-card, .project-card, .example-card, .comparison-column'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
});
