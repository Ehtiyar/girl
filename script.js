// MP3 Audio Player
let audioPlayer;
let isMusicPlaying = false;
let isMuted = false;

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Audio player'ı başlat
    initAudioPlayer();
    
    // Sayfa yüklendiğinde güzel bir giriş animasyonu
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Yüzen kalpler için rastgele pozisyonlar
    createFloatingHearts();
});

// Audio player'ı başlat
function initAudioPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    
    // Audio event listener'ları ekle
    audioPlayer.addEventListener('loadeddata', function() {
        console.log('MP3 dosyası yüklendi!');
        // Başlangıçta sessiz
        audioPlayer.muted = true;
        isMuted = true;
        updateMuteButton();
    });
    
    audioPlayer.addEventListener('play', function() {
        isMusicPlaying = true;
        updatePlayButton();
        console.log('Müzik çalıyor');
    });
    
    audioPlayer.addEventListener('pause', function() {
        isMusicPlaying = false;
        updatePlayButton();
        console.log('Müzik durdu');
    });
    
    audioPlayer.addEventListener('ended', function() {
        // Şarkı bitince tekrar başlat
        audioPlayer.currentTime = 0;
        audioPlayer.play();
        console.log('Müzik tekrar başlatıldı');
    });
    
    // Hata durumunda
    audioPlayer.addEventListener('error', function(e) {
        console.log('Müzik yükleme hatası:', e);
        alert('Müzik dosyası yüklenemedi! Lütfen test.mp3 dosyasının klasörde olduğundan emin olun.');
    });
}

// Müzik çal/durdur
function toggleMusic() {
    if (!audioPlayer) {
        console.log('Audio player henüz hazır değil');
        return;
    }
    
    try {
        if (isMusicPlaying) {
            audioPlayer.pause();
            console.log('Müzik durduruldu');
        } else {
            audioPlayer.play();
            console.log('Müzik çalınıyor');
        }
    } catch (error) {
        console.log('Müzik çalma hatası:', error);
    }
}

// Sessiz/açık
function toggleMute() {
    if (!audioPlayer) {
        console.log('Audio player henüz hazır değil');
        return;
    }
    
    try {
        if (isMuted) {
            audioPlayer.muted = false;
            isMuted = false;
            console.log('Ses açıldı');
        } else {
            audioPlayer.muted = true;
            isMuted = true;
            console.log('Ses kapatıldı');
        }
        updateMuteButton();
    } catch (error) {
        console.log('Ses kontrolü hatası:', error);
    }
}

// Play buton güncelle
function updatePlayButton() {
    const musicIcon = document.getElementById('musicIcon');
    if (isMusicPlaying) {
        musicIcon.textContent = '⏸️';
    } else {
        musicIcon.textContent = '▶️';
    }
}

// Mute buton güncelle
function updateMuteButton() {
    const muteBtn = document.getElementById('muteBtn');
    if (isMuted) {
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.textContent = '🔊';
    }
}

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
    
    // Müziği otomatik çal
    if (audioPlayer && !isMusicPlaying) {
        audioPlayer.play();
    }
    
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

// Test müzik fonksiyonu
function testMusic() {
    console.log('Müzik test başlatılıyor...');
    console.log('Audio player durumu:', audioPlayer);
    console.log('Audio player hazır mı:', audioPlayer && audioPlayer.readyState);
    
    if (audioPlayer) {
        try {
            console.log('Audio ready state:', audioPlayer.readyState);
            console.log('Audio current time:', audioPlayer.currentTime);
            console.log('Audio duration:', audioPlayer.duration);
            console.log('Audio paused:', audioPlayer.paused);
            console.log('Audio muted:', audioPlayer.muted);
            console.log('Audio volume:', audioPlayer.volume);
            
            if (audioPlayer.readyState >= 2) {
                console.log('MP3 dosyası hazır!');
                if (audioPlayer.paused) {
                    console.log('Müzik çalınıyor...');
                    audioPlayer.play();
                } else {
                    console.log('Müzik durduruluyor...');
                    audioPlayer.pause();
                }
            } else {
                console.log('MP3 dosyası henüz yüklenmedi...');
            }
        } catch (error) {
            console.log('Test hatası:', error);
        }
    } else {
        console.log('Audio player henüz hazır değil!');
    }
}

// Sayfa kapatılırken müziği durdur
window.addEventListener('beforeunload', function() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
});
