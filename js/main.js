// 1. TEMA DEĞİŞTİRME & LOCALSTORAGE SİSTEMİ
const darkModeBtn = document.getElementById('dark-mode-btn');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if(darkModeBtn) darkModeBtn.textContent = '☀️ Mod';
}

if(darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
            darkModeBtn.textContent = '☀️ Mod';
        } else {
            darkModeBtn.textContent = '🌙 Mod';
        }
        localStorage.setItem('theme', theme);
    });
}

function sepetSayaciniGuncelle() {
    const sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    const sayac = document.getElementById('sepet-sayac');
    if(sayac) sayac.textContent = sepet.length;
}


// 2. GERÇEK ÜRÜNLER VE DETAYLI BİLGİLERİ
const urunler = [
    { 
        id: 1, 
        ad: "iPhone 15 Pro 128 GB", 
        kategori: "telefon", 
        fiyat: 75499, 
        resim: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400",
        ozellikler: "Titanium tasarım, A17 Pro işlemci, 48 MP gelişmiş ana kamera ve USB-C bağlantısı ile en güçlü iPhone deneyimi."
    },
    { 
        id: 2, 
        ad: "MacBook Air M3 13.6\"", 
        kategori: "bilgisayar", 
        fiyat: 49999, 
        resim: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        ozellikler: "8 Çekirdekli CPU, 10 Çekirdekli GPU, 8 GB Birleşik Bellek ve 256 GB SSD. Süper ince tasarım ve 18 saate varan pil ömrü."
    },
    { 
        id: 3, 
        ad: "Razer BlackShark V2 Pro", 
        kategori: "aksesuar", 
        fiyat: 6499, 
        resim: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        ozellikler: "Kablosuz oyuncu kulaklığı. HyperSpeed Wireless teknolojisi, TriForce Titanyum 50 mm sürücüler ve çıkarılabilir süper geniş bant mikrofon."
    },
    { 
        id: 4, 
        ad: "Samsung Galaxy S24 Ultra", 
        kategori: "telefon", 
        fiyat: 69999, 
        resim: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        ozellikler: "Snapdragon 8 Gen 3 işlemci, 200 MP ana kamera, gömülü S-Pen ve yapay zeka destekli (Galaxy AI) fotoğraf düzenleme özellikleri."
    },
    { 
        id: 5, 
        ad: "Asus ROG Strix G16", 
        kategori: "bilgisayar", 
        fiyat: 58499, 
        resim: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
        ozellikler: "Intel Core i7-13650HX işlemci, NVIDIA GeForce RTX 4060 ekran kartı, 16 GB DDR5 RAM ve 512 GB NVMe PCIe 4.0 SSD."
    },
    { 
        id: 6, 
        ad: "Apple Watch Series 9 GPS", 
        kategori: "aksesuar", 
        fiyat: 16299, 
        resim: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        ozellikler: "45mm Alüminyum Kasa, S9 Sip işlemci ile ultra parlak ekran, ekrana dokunmadan kontrol sağlayan çift tıklama hareketi ve gelişmiş sağlık takibi."
    }
];

const urunlerAlani = document.getElementById('urunler-alanı');
const aramaKutusu = document.getElementById('arama-kutusu');
const kategoriButonlari = document.querySelectorAll('.kategori-btn');

function urunleriListele(liste) {
    if(!urunlerAlani) return;
    urunlerAlani.innerHTML = "";
    if(liste.length === 0) {
        urunlerAlani.innerHTML = "<p>Ürün bulunamadı.</p>";
        return;
    }
    liste.forEach(urun => {
        const kart = document.createElement('div');
        kart.classList.add('urun-kart');
        kart.innerHTML = `
            <img src="${urun.resim}" alt="${urun.ad}">
            <h3>${urun.ad}</h3>
            <p class="fiyat">${urun.fiyat.toLocaleString('tr-TR')} TL</p>
            <button class="btn" onclick="detayGoster(${urun.id})">Detaylar</button>
            <button class="btn" style="background:#10b981; margin-top:5px;" onclick="sepeteEkle(${urun.id})">Sepete Ekle</button>
        `;
        urunlerAlani.appendChild(kart);
    });
}

if(aramaKutusu) {
    aramaKutusu.addEventListener('input', (e) => {
        const aranan = e.target.value.toLowerCase();
        const filtrelenmis = urunler.filter(u => u.ad.toLowerCase().includes(aranan));
        urunleriListele(filtrelenmis);
    });
}

kategoriButonlari.forEach(btn => {
    btn.addEventListener('click', (e) => {
        kategoriButonlari.forEach(b => b.classList.remove('aktif'));
        e.target.classList.add('aktif');
        const kategori = e.target.getAttribute('data-kategori');
        if(kategori === 'hepsi') { urunleriListele(urunler); } 
        else { urunleriListele(urunler.filter(u => u.kategori === kategori)); }
    });
});

const modal = document.getElementById('urun-modal');
const modalKapat = document.querySelector('.modal-kapat');
const modalDetay = document.getElementById('modal-detay');

function detayGoster(id) {
    const urun = urunler.find(u => u.id === id);
    if(!urun || !modalDetay) return;
    modalDetay.innerHTML = `
        <img src="${urun.resim}" style="max-width:100%; height:200px; object-fit:contain; display:block; margin:0 auto 15px; border-radius:8px;">
        <h2 style="font-size:1.4rem; margin-bottom:10px; color:var(--primary-color);">${urun.ad}</h2>
        <p style="margin:10px 0; color:var(--text-color); font-size:0.95rem; line-height:1.5; text-align:justify;">
            <strong>Ürün Açıklaması:</strong><br>${urun.ozellikler}
        </p>
        <hr style="border:0; border-top:1px solid #cbd5e1; margin:15px 0;">
        <div style="display:flex; justify-content:between; align-items:center; flex-wrap:wrap; gap:10px;">
            <span class="fiyat" style="font-size:1.4rem; margin:0;">${urun.fiyat.toLocaleString('tr-TR')} TL</span>
            <button class="btn" style="background:#10b981; margin-left:auto;" onclick="sepeteEkle(${urun.id}); modal.style.display='none';">Sepete Ekle</button>
        </div>
    `;
    if(modal) modal.style.display = "flex";
}
if(modalKapat) { modalKapat.addEventListener('click', () => modal.style.display = "none"); }

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// 3. SEPET VE SEPETTEKİ VERİLERİN İŞLENMESİ
function sepeteEkle(id) {
    const urun = urunler.find(u => u.id === id);
    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    sepet.push(urun);
    localStorage.setItem('sepet', JSON.stringify(sepet));
    sepetSayaciniGuncelle();
    alert(`${urun.ad} sepete eklendi!`);
}

function sepetiListele() {
    const sepetListesiAlani = document.getElementById('sepet-listesi');
    const sepetToplamAlani = document.getElementById('sepet-toplam');
    const toplamAdetAlani = document.getElementById('toplam-adet');
    if (!sepetListesiAlani) return;

    const sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    sepetListesiAlani.innerHTML = "";

    if (sepet.length === 0) {
        sepetListesiAlani.innerHTML = "<p>Sepetiniz şu anda boş.</p>";
        if(sepetToplamAlani) sepetToplamAlani.textContent = "0";
        if(toplamAdetAlani) toplamAdetAlani.textContent = "0";
        return;
    }

    let toplamFiyat = 0;
    sepet.forEach((urun, index) => {
        toplamFiyat += urun.fiyat;
        const eleman = document.createElement('div');
        eleman.classList.add('sepet-eleman');
        eleman.innerHTML = `
            <img src="${urun.resim}" alt="${urun.ad}">
            <div class="sepet-eleman-bilgi"><h4>${urun.ad}</h4><p>${urun.fiyat.toLocaleString('tr-TR')} TL</p></div>
            <button class="sepet-sil-btn" onclick="sepettenUrunSil(${index})">Sil</button>
        `;
        sepetListesiAlani.appendChild(eleman);
    });

    if(sepetToplamAlani) sepetToplamAlani.textContent = toplamFiyat.toLocaleString('tr-TR');
    if(toplamAdetAlani) toplamAdetAlani.textContent = sepet.length;
}

function sepettenUrunSil(index) {
    let sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    sepet.splice(index, 1);
    localStorage.setItem('sepet', JSON.stringify(sepet));
    sepetiListele();
    sepetSayaciniGuncelle();
}

const sepetiBosaltBtn = document.getElementById('sepeti-bosalt-btn');
if (sepetiBosaltBtn) {
    sepetiBosaltBtn.addEventListener('click', () => {
        if(confirm("Sepeti boşaltmak istediğinize emin misiniz?")) {
            localStorage.removeItem('sepet');
            sepetiListele();
            sepetSayaciniGuncelle();
        }
    });
}

function siparisTamamla() {
    const sepet = JSON.parse(localStorage.getItem('sepet')) || [];
    if(sepet.length === 0) {
        alert("Sepetiniz boş olduğu için sipariş tamamlanamaz.");
        return;
    }
    alert("Siparişiniz başarıyla alındı! Teşekkür ederiz.");
    localStorage.removeItem('sepet');
    sepetiListele();
    sepetSayaciniGuncelle();
}


// 4. İLETİŞİM FORMU DOĞRULAMA (VALIDATION)
const iletisimFormu = document.getElementById('iletisim-formu');
if (iletisimFormu) {
    iletisimFormu.addEventListener('submit', function (e) {
        e.preventDefault();
        const adSoyad = document.getElementById('ad-soyad');
        const eposta = document.getElementById('eposta');
        const konu = document.getElementById('mesaj-konu');
        const mesaj = document.getElementById('mesaj-icerik');
        const basariKutusu = document.getElementById('basari-mesaji');
        let formGecerli = true;

        if (adSoyad.value.trim() === "") { adSoyad.parentElement.classList.add('hata'); formGecerli = false; } 
        else { adSoyad.parentElement.classList.remove('hata'); }

        const epostaRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!epostaRegex.test(eposta.value.trim())) { eposta.parentElement.classList.add('hata'); formGecerli = false; } 
        else { eposta.parentElement.classList.remove('hata'); }

        if (konu.value.trim() === "") { konu.parentElement.classList.add('hata'); formGecerli = false; } 
        else { konu.parentElement.classList.remove('hata'); }

        if (mesaj.value.trim().length < 10) { mesaj.parentElement.classList.add('hata'); formGecerli = false; } 
        else { mesaj.parentElement.classList.remove('hata'); }

        if (formGecerli) {
            iletisimFormu.style.display = 'none';
            if(basariKutusu) basariKutusu.style.display = 'block';
            iletisimFormu.reset();
        }
    });
}

// SAYFA YÜKLENDİĞİNDEKİ ÇALIŞMA AYARLARI
document.addEventListener('DOMContentLoaded', () => {
    urunleriListele(urunler);
    sepetiListele();
    sepetSayaciniGuncelle();
});