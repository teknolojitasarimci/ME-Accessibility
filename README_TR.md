# ME Erişilebilirlik - Kapsamlı Dokümantasyon

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Size](https://img.shields.io/badge/size-%3C50kb-orange.svg)


## 📋 İçindekiler

1. [Giriş](#giriş)
2. [Özellikler](#özellikler)
3. [Kurulum](#kurulum)
4. [Kullanım](#kullanım)
5. [Klavye Kısayolları](#klavye-kısayolları)
6. [WCAG Uyumluluğu](#wcag-uyumluluğu)
7. [Tarayıcı Desteği](#tarayıcı-desteği)
8. [Geliştirme ve Katkı](#geliştirme-ve-katkı)
9. [Lisans](#lisans)

---

## 🌟 Giriş

ME Access, dijital uçurumu kapatmak ve her bireyin web içeriğine eşit erişimini sağlamak amacıyla geliştirilmiş, "önce tasarım" (design-first) felsefesini benimseyen profesyonel bir erişilebilirlik katmanıdır. Piyasadaki çoğu çözümün aksine, kurumsal kimliğinizi bozmayan modern bir estetik sunar.

### Neden ME Access?

- ✅ **Sıfır Bağımlılık**: Hiçbir harici kütüphaneye ihtiyaç duymaz
- ✅ **Vanilla JavaScript**: Pure JavaScript ile maksimum performans
- ✅ **Glassmorphism UI**: Apple tasarım dilinden esinlenen modern arayüz
- ✅ **WCAG 2.1 Uyumlu**: Uluslararası erişilebilirlik standartlarına uygun
- ✅ **Klavye Desteği**: Fare kullanmadan tüm özelliklere erişim
- ✅ **Kalıcı Hafıza**: Kullanıcı tercihleri tarayıcıda saklanır

---

## 🚀 Özellikler

### 1. Yazı Boyutu Kontrolü
Sayfadaki metin boyutunu %70 ile %200 arasında istediğiniz gibi ayarlayabilirsiniz.

### 2. Sesli Okuma (TTS)
Tarayıcının yerleşik ses sentezleyicisini kullanarak:
- Seçili metni okuma
- Tüm sayfayı okuma
- Okuma hızı ayarı (0.5x - 2x)

### 3. Okuma Yardımcıları

#### Okuma Rehberi
Fareyi takip eden sarı renkli bir çizgi ile okuma odaklanmasını artırır. Göz takibi zorluğu çekenler için odaklanmayı %60 artırır.

#### Okuma Maskesi
Sadece aktif satırı gösteren bir maske ile dikkat dağınıklığını azaltır.

### 4. Görsel Ayarlar

| Mod | Açıklama |
|-----|----------|
| Yüksek Kontrast | Siyah beyaz modu |
| Solgun Renkler | Grayscale modu |
| Düşük Doygunluk | %50 doygunluk azaltma |
| Yüksek Doygunluk | %200 doygunluk artırma |

### 5. Yazı Tipleri

#### Disleksi Dostu Font
Disleksi kullanıcıları için optimize edilmiş Comic Sans benzeri font.

#### Okunaklı Font
Gelişmiş okunabilirlik için optimize edilmiş sans-serif font.

### 6. Metin Aralıkları
- Harf aralığı (letter-spacing)
- Satır aralığı (line-height)
- Kelime boşluğu (word-spacing)

### 7. Renk Kişiselleştirme
9 farklı renk seçeneği ile:
- Metin rengi
- Başlık rengi
- Arkaplan rengi

### 8. Özel İmleç
- Beyaz imleç
- Siyah imleç

### 9. Ek Özellikler
- Bağlantı vurgulama
- Görsel gizleme
- Metin hizalama (sol, orta, sağ)
- Klavye kısayolları

---

## 📦 Kurulum

### Basit Kurulum

1. `mebi-erisilebilirlik.js` dosyasını projenize ekleyin
2. HTML dosyanızın `</body>` etiketinden önce aşağıdaki kodu ekleyin:

```html
<script src="mebi-erisilebilirlik.js"></script>
```

### Blogger Entegrasyonu

1. Blogger admin paneline giriş yapın
2. **Tema** > **HTML'i Düzenle** seçeneğine tıklayın
3. `</body>` etiketini bulun
4. Aşağıdaki kodu `</body>` etiketinden önce ekleyin:

```html
<!-- ME Access Widget -->
<script src="URL_TO_YOUR_JS_FILE" async></script>
```

### GitHub Pages Entegrasyonu

1. Reponuza `mebi-erisilebilirlik.js` dosyasını yükleyin
2. `index.html` dosyanızda referans verin:
```html
<script src="mebi-erisilebilirlik.js"></script>
```

---

## 🎮 Kullanım

### Panel Kullanımı

Widget'ı kullanmak için:
1. Sağ alttaki erişilebilirlik ikonuna tıklayın
2. Açılan panelden istediğiniz ayarı seçin
3. Ayarlar otomatik kaydedilir

### Varsayılan Ayarlar

| Ayar | Değer |
|------|-------|
| Font Boyutu | %100 |
| Kontrast | Normal |
| Doygunluk | Normal |
| Harf Aralığı | Kapalı |
| Satır Aralığı | Kapalı |
| Kelime Boşluğu | Kapalı |

---

## ⌨️ Klavye Kısayolları

| Kısayol | İşlev |
|---------|-------|
| `ALT + A` | Erişilebilirlik Panelini Aç/Kapat |
| `ALT + R` | Tüm Ayarları Fabrika Ayarlarına Döndür |
| `ALT + O` | Sesli Okumayı Başlat |
| `ALT + K` | Yüksek Kontrast Modunu Aktif Et |
| `ALT + +` | Yazı Boyutunu Artır |
| `ALT + -` | Yazı Boyutunu Azalt |
| `ESC` | Panelı Anında Kapat |

---

## ✅ WCAG Uyumluluğu

ME Access, W3C'nin Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.1 standardını tam olarak karşılar:

### Karşılanan Standartlar

| Kriter | Açıklama | Durum |
|--------|----------|-------|
| 2.5.5 Dokunma Hedefi Boyutu | Minimum 44x44px | ✅ 65px |
| 2.1.1 Klavye | Klavye ile tüm fonksiyonlara erişim | ✅ |
| 1.4.3 Kontrast | 4.5:1 kontrast oranı | ✅ |
| 3.2.4 Tutarlı Tanımlama | Tutarlı navigasyon | ✅ |
| 4.1.2 Ad, Rol, Değer | ARIA etiketleri | ✅ |

### ARIA Uyumluluğu

Tüm kontroller için uygun ARIA etiketleri tanımlanmıştır:
- `aria-label`: Buton etiketleri
- `aria-expanded`: Panel durumu
- `aria-pressed`: Toggle butonlar
- `aria-hidden`: Dekoratif öğeler
- `role="dialog"`: Panel kapsayıcısı

---

## 🌐 Tarayıcı Desteği

| Tarayıcı | Sürüm | Durum |
|----------|-------|-------|
| Chrome | 60+ | ✅ Tam Destek |
| Firefox | 55+ | ✅ Tam Destek |
| Safari | 11+ | ✅ Tam Destek |
| Edge | 79+ | ✅ Tam Destek |
| Opera | 67+ | ✅ Tam Destek |
| IE 11 | - | ⚠️ Sınırlı |

### Notlar
- Text-to-Speech (TTS) özelliği tarayıcı desteğine bağlıdır
- Glassmorphism efektleri tüm modern tarayıcılarda çalışır
- Geriye dönük uyumluluk için CSS fallback'ler mevcuttur

---

## 🛠️ Geliştirme ve Katkı

### Proje Yapısı

```
mebis-access/
├── index.html              # Demo sayfası
├── mebi-erisilebilirlik.js # Ana widget dosyası
├── README_TR.md            # Türkçe dokümantasyon
├── README_EN.md            # English documentation
├── blogger-guide.md        # Blogger entegrasyon rehberi
└── LICENSE                 # MIT Lisansı
```

### Geliştirme Ortamı

1. Projeyi klonlayın:
```bash
git clone https://github.com/teknolojitasarimci/ME-Accessibility.git
```

2. Değişikliklerinizi yapın

3. Test edin:
```bash
# index.html'i tarayıcıda açın
```

### Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit yapın (`git commit -am 'Yeni özellik eklendi'`)
4. Push yapın (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

```
MIT License

Copyright (c) 2024 ME Access

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Künye ve Geliştirici

- **Baş Geliştirici**: Mürsel EREN
- **E-posta**: teknolojitasarimci@hotmail.com
- **Web**: [www.teknolojitasarimci.com](http://www.teknolojitasarimci.com) | [www.posteryap.com](http://www.posteryap.com)
- **GitHub**: [github.com/teknolojitasarimci](https://github.com/teknolojitasarimci)
- **Telif Hakkı**: (c) Mürsel EREN. [MIT Lisansı](LICENSE) ile sunulmuştur.

## ⚠️ Yasal Uyarı & Sorumluluk Reddi

Bu yazılım "olduğu gibi" (as-is) sunulmaktadır. Geliştirici; yazılımın kullanımından, entegrasyon hatalarından, veri kayıplarından veya doğabilecek doğrudan/dolaylı zararlardan sorumlu tutulamaz. Widget'ın nihai kontrolü, doğruluğu ve web sitesi üzerindeki uyumluluğu tamamen kullanıcının sorumluluğundadır.

---

⭐ **Projeyi beğendiyseniz GitHub'da yıldız vermeyi unutmayın!**
