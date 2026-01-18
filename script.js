document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // 2. Animated Chart Logic
    const chartContainer = document.getElementById('revenueChart');
    if (chartContainer) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartContainer.classList.add('active');
                    // Animate bars
                    const bars = chartContainer.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        const targetHeight = bar.getAttribute('data-height');
                        setTimeout(() => {
                            bar.style.height = targetHeight;
                        }, 200); // Slight delay
                    });
                    // Stop observing
                    chartObserver.unobserve(chartContainer);
                }
            });
        }, { threshold: 0.5 });
        chartObserver.observe(chartContainer);
    }


    // 3. Sticky CTA Logic
    const stickyCta = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        if (!stickyCta || !heroSection) return;

        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show sticky CTA when Hero is scrolled past
        if (heroBottom < 0) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    });


    // 4. AI Widget Logic (Simulation)
    const aiToggle = document.querySelector('.ai-toggle');
    const aiWindow = document.querySelector('.ai-window');
    const aiClose = document.querySelector('.ai-close');
    const aiMessages = document.getElementById('ai-messages');
    const aiControls = document.getElementById('ai-controls');

    let isChatStarted = false;

    // Toggle Window
    aiToggle.addEventListener('click', () => {
        aiWindow.classList.toggle('hidden');
        aiToggle.classList.remove('pulsate'); // Stop pulsating once clicked
        if (!isChatStarted) {
            startChatSimulation();
            isChatStarted = true;
        }
    });

    aiClose.addEventListener('click', () => {
        aiWindow.classList.add('hidden');
    });

    // Helper: Add Message
    function addMessage(text, sender = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerText = text;
        aiMessages.appendChild(msgDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    // Helper: Typing Indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing');
        typingDiv.innerText = 'typing...';
        typingDiv.id = 'typing-indicator';
        aiMessages.appendChild(typingDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    // Simulation Flow
    function startChatSimulation() {
        showTyping();
        setTimeout(() => {
            removeTyping();
            addMessage("Здравствуйте! Я AI-ассистент агентства SINTEZ. 🤖");

            setTimeout(() => {
                showTyping();

                setTimeout(() => {
                    removeTyping();
                    addMessage("Я проанализировал данные вашей клиники. Вижу большой потенциал роста. Чем могу помочь по стратегии?");
                    showSuggestions(['Сколько стоит?', 'Какие гарантии?', 'Как начать?']);
                }, 1000);

            }, 500);

        }, 1000);
    }

    function showSuggestions(options) {
        aiControls.innerHTML = ''; // Clear old buttons
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('suggestion-btn');
            btn.innerText = opt;
            btn.onclick = () => handleUserChoice(opt);
            aiControls.appendChild(btn);
        });
    }

    function handleUserChoice(choice) {
        // User sends message
        addMessage(choice, 'user');
        aiControls.innerHTML = ''; // Remove buttons

        showTyping();

        // Bot responds based on choice
        setTimeout(() => {
            removeTyping();
            let response = "";
            let nextOptions = [];

            if (choice === 'Сколько стоит?') {
                response = "Стратегическое сопровождение стоит $2,300/мес. Это инвестиция в системный бизнес, а не просто расходы на рекламу.";
                nextOptions = ['Какие гарантии?', 'Связаться с человеком'];
            } else if (choice === 'Какие гарантии?') {
                response = "Важно понимать: первые 3 месяца — это фундамент. Мы строим цифровую экосистему и стратегию. Результат накапливается постепенно, но именно этот этап гарантирует устойчивый рост в будущем.";
                nextOptions = ['Сколько стоит?', 'Хочу начать'];
            } else if (choice === 'Как начать?' || choice === 'Хочу начать') {
                response = "Отличное решение! Нужно просто подтвердить намерения. Я передам контакт основателю.";
                nextOptions = ['Связаться в Telegram'];
            } else if (choice === 'Связаться с человеком' || choice === 'Связаться в Telegram') {
                response = "Переключаю вас на личный чат с основателем Александром.";
                setTimeout(() => {
                    window.open('https://t.me/omelnickiy', '_blank');
                }, 1500);
                return;
            }

            addMessage(response);
            if (nextOptions.length > 0) showSuggestions(nextOptions);

        }, 1200);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

