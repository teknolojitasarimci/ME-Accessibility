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

-----------

# ME Access - Comprehensive Documentation

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Size](https://img.shields.io/badge/size-%3C50kb-orange.svg)


## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Keyboard Shortcuts](#keyboard-shortcuts)
6. [WCAG Compliance](#wcag-compliance)
7. [Browser Support](#browser-support)
8. [Development and Contribution](#development-and-contribution)
9. [License](#license)

---

## 🌟 Introduction

ME Access is a professional accessibility layer built with a "design-first" philosophy to bridge the digital divide. Unlike legacy solutions, it provides high-end accessibility without compromising your corporate aesthetic. It ensures that every individual, regardless of their abilities, can access web content equally.

### Why ME Access?

- ✅ **Zero Dependencies**: No external libraries required
- ✅ **Vanilla JavaScript**: Pure JavaScript for maximum performance
- ✅ **Glassmorphism UI**: Modern interface inspired by Apple design language
- ✅ **WCAG 2.1 Compliant**: International accessibility standards
- ✅ **Keyboard Support**: Access all features without a mouse
- ✅ **Persistent Storage**: User preferences saved in browser

---

## 🚀 Features

### 1. Font Size Control
Adjust page text size freely between 70% and 200%.

### 2. Text-to-Speech (TTS)
Using the browser's built-in speech synthesizer:
- Read selected text
- Read entire page
- Adjust reading speed (0.5x - 2x)

### 3. Reading Aids

#### Reading Ruler
Yellow line that follows the mouse to increase reading focus. Increases focus by 60% for users with reading difficulties.

#### Reading Mask
Mask showing only the active line to reduce distraction.

### 4. Visual Settings

| Mode | Description |
|------|-------------|
| High Contrast | Black and white mode |
| Grayscale | Grayscale mode |
| Low Saturation | 50% saturation reduction |
| High Saturation | 200% saturation increase |

### 5. Font Types

#### Dyslexia-Friendly Font
Comic Sans-like font optimized for users with dyslexia.

#### Readable Font
Optimized sans-serif font for enhanced readability.

### 6. Text Spacing
- Letter spacing (letter-spacing)
- Line height (line-height)
- Word spacing (word-spacing)

### 7. Color Customization
9 different color options for:
- Text color
- Heading color
- Background color

### 8. Custom Cursor
- White cursor
- Black cursor

### 9. Additional Features
- Link highlighting
- Image hiding
- Text alignment (left, center, right)
- Keyboard shortcuts

---

## 📦 Installation

### Basic Installation

1. Add `mebi-erisilebilirlik.js` to your project
2. Add the following code before the `</body>` tag in your HTML:

```html
<script src="mebi-erisilebilirlik.js"></script>
```

### Blogger Integration

1. Log in to Blogger admin panel
2. Go to **Theme** > **Edit HTML**
3. Find the `</body>` tag
4. Add the following code before `</body>`:

```html
<!-- ME Access Widget -->
<script src="URL_TO_YOUR_JS_FILE" async></script>
```

### GitHub Pages Integration

1. Upload `mebi-erisilebilirlik.js` to your repository
2. Reference it in your `index.html`:
```html
<script src="mebi-erisilebilirlik.js"></script>
```

---

## 🎮 Usage

### Using the Panel

To use the widget:
1. Click the accessibility icon in the bottom right
2. Select your desired setting from the panel
3. Settings are saved automatically

### Default Settings

| Setting | Value |
|---------|-------|
| Font Size | 100% |
| Contrast | Normal |
| Saturation | Normal |
| Letter Spacing | Off |
| Line Height | Off |
| Word Spacing | Off |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `ALT + A` | Toggle Accessibility Panel |
| `ALT + R` | Reset All Settings to Default |
| `ALT + O` | Start Text-to-Speech |
| `ALT + K` | Toggle High Contrast Mode |
| `ALT + +` | Increase Font Size |
| `ALT + -` | Decrease Font Size |
| `ESC` | Close Panel Immediately |

---

## ✅ WCAG Compliance

ME Access fully complies with W3C's Web Content Accessibility Guidelines (WCAG) 2.1:

### Supported Standards

| Criterion | Description | Status |
|-----------|-------------|--------|
| 2.5.5 Touch Target Size | Minimum 44x44px | ✅ 65px |
| 2.1.1 Keyboard | Keyboard access to all functions | ✅ |
| 1.4.3 Contrast | 4.5:1 contrast ratio | ✅ |
| 3.2.4 Consistent Identification | Consistent navigation | ✅ |
| 4.1.2 Name, Role, Value | ARIA labels | ✅ |

### ARIA Compliance

Appropriate ARIA labels are defined for all controls:
- `aria-label`: Button labels
- `aria-expanded`: Panel state
- `aria-pressed`: Toggle buttons
- `aria-hidden`: Decorative elements
- `role="dialog"`: Panel container

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 11+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| Opera | 67+ | ✅ Full Support |
| IE 11 | - | ⚠️ Limited |

### Notes
- Text-to-Speech (TTS) feature depends on browser support
- Glassmorphism effects work in all modern browsers
- CSS fallbacks are available for backward compatibility

---

## 🛠️ Development and Contribution

### Project Structure

```
mebis-access/
├── index.html              # Demo page
├── mebi-erisilebilirlik.js # Main widget file
├── README_TR.md            # Turkish documentation
├── README_EN.md            # English documentation
├── blogger-guide.md        # Blogger integration guide
└── LICENSE                 # MIT License
```

### Development Environment

1. Clone the project:
```bash
git clone https://github.com/teknolojitasarimci/ME-Accessibility.git
```

2. Make your changes

3. Test it:
```bash
# Open index.html in a browser
```

### Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'New feature added'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

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

## 👨‍💻 Credits & Developer

- **Lead Developer**: Mürsel EREN
- **Email**: teknolojitasarimci@hotmail.com
- **Web**: [www.teknolojitasarimci.com](http://www.teknolojitasarimci.com) | [www.posteryap.com](http://www.posteryap.com)
- **GitHub**: [github.com/teknolojitasarimci](https://github.com/teknolojitasarimci)
- **Copyright**: (c) Mürsel EREN. Released under the [MIT License](LICENSE).

## ⚠️ Legal Disclaimer

This software is provided "as is", without warranty of any kind. The developer cannot be held liable for any direct or indirect damages, data loss, or integration errors resulting from the use of this software. The final control, accuracy, and compatibility of the widget on the website are the sole responsibility of the user.

---

⭐ **If you like the project, don't forget to star it on GitHub!**
