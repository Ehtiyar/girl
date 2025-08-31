// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde güzel bir giriş animasyonu
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Yüzen kalpler için rastgele pozisyonlar
    createFloatingHearts();
});

// Yüzen kalpler oluştur
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💝', '💗', '💓', '💞', '💟'];
    const container = document.querySelector('.floating-hearts');
    
    // Mevcut kalpleri temizle
    container.innerHTML = '';
    
    // 15 adet rastgele kalp oluştur
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(heart);
    }
}

// "Seni Affediyorum" butonuna tıklandığında
function showLove() {
    const loveMessage = document.getElementById('loveMessage');
    const buttons = document.querySelector('.buttons');
    
    // Butonları gizle
    buttons.style.display = 'none';
    
    // Aşk mesajını göster
    loveMessage.style.display = 'block';
    
    // Havai fişek efekti
    createFireworks();
    
    // Kalp yağmuru efekti
    createHeartRain();
    
    // Müzik çal (eğer tarayıcı destekliyorsa)
    playLoveMusic();
    
    // Sayfa başlığını değiştir
    document.title = 'Seni Seviyorum! ❤️';
    
    // URL'yi değiştir
    history.pushState({}, '', '#love');
}

// "Hayır" butonunu hareket ettir
function moveButton() {
    const noBtn = document.querySelector('.no-btn');
    const container = document.querySelector('.container');
    
    // Rastgele pozisyon
    const maxX = container.offsetWidth - noBtn.offsetWidth;
    const maxY = container.offsetHeight - noBtn.offsetHeight;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Buton metnini değiştir
    const messages = [
        'Gerçekten mi?',
        'Emin misin?',
        'Son kez düşün!',
        'Lütfen!',
        'Seni çok seviyorum!',
        'Bir şans daha ver!',
        'Özür dilerim!',
        'Affet beni!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    noBtn.textContent = randomMessage;
    
    // Buton boyutunu büyüt
    noBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 200);
}

// Havai fişek efekti
function createFireworks() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework-particle';
            firework.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: firework 1s ease-out forwards;
                z-index: 1000;
            `;
            
            container.appendChild(firework);
            
            // Animasyon bitince elementi kaldır
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 100);
    }
}

// Kalp yağmuru efekti
function createHeartRain() {
    const container = document.querySelector('.container');
    const hearts = ['❤️', '💕', '💖', '💝', '💗'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: 2rem;
                left: ${Math.random() * 100}%;
                top: -50px;
                animation: heartRain 3s linear forwards;
                z-index: 1000;
                pointer-events: none;
            `;
            
            container.appendChild(heart);
            
            // Animasyon bitince elementi kaldır
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

// Müzik çal
function playLoveMusic() {
    // Basit bir beep sesi (tarayıcı uyumluluğu için)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C note
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.5); // E note
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 1); // G note
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
    } catch (e) {
        console.log('Müzik çalınamadı:', e);
    }
}

// CSS animasyonları için stil ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes firework {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-400px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes heartRain {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .firework-particle {
        position: absolute;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde güzel bir giriş efekti
window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 1s ease-in-out';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 500);
});

// Fare hareketi ile kalp efekti
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Fare hareketi ile kalp izi bırak
    if (Math.random() < 0.1) {
        createMouseHeart();
    }
});

function createMouseHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${mouseX}px;
        top: ${mouseY}px;
        font-size: 1rem;
        pointer-events: none;
        z-index: 9999;
        animation: mouseHeart 2s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Mouse kalp animasyonu için CSS ekle
const mouseStyle = document.createElement('style');
mouseStyle.textContent = `
    @keyframes mouseHeart {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mouseStyle);
