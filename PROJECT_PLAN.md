# Global Sea Yat Kiralama/Satış Web Sitesi - Proje Planı



## 📋 Proje Özeti

Modern, görsel ağırlıklı, minimal metinli yat kiralama ve satış web sitesi.

**Teknoloji:** Next.js 14+ (App Router), Tailwind CSS, TypeScript

**Diller:** İngilizce ve Lehçe (i18n)



---



## 🎨 Tasarım Prensipleri



### Genel Atmosfer

- ✨ Parlak, aydınlık ve davetkar renk paleti

- 🖼️ Büyük, yüksek kaliteli görseller (görsel ağırlıklı)

- ✍️ Minimal metin (sadece gerekli bilgiler)

- 📱 Tam responsive tasarım

- 🌊 Lüks ve profesyonel his



### İlham Kaynakları

- Ana sayfa ve destinasyonlar: Patrick Marine Charters Mediterranean sayfası

- Hizmetler bölümü: Patrick Marine Charters Charter Management sayfası

- Renk paleti: Global Sea'den daha mutlu/parlak renkler



---



## 📐 Site Yapısı ve Sayfalar



### 1. Ana Sayfa (Homepage) 🏠

**ÖNCELİK: YÜKSEK - En önemli sayfa**



#### Bileşenler:

- **Hero Section**

  - Tam ekran yüksek kaliteli yat videosu/carousel

  - Basit başlık + alt başlık

  - CTA butonları (İletişim, Yatları Keşfet)



- **Öne Çıkan Yatlar (Featured Yachts)**

  - 3-4 öne çıkan yat kartı

  - Büyük görseller

  - Minimal bilgi (isim, uzunluk, fiyat)

  - Hover efektleri



- **Destinasyonlar Önizleme**

  - Grid layout (2-3 popüler destinasyon)

  - Büyük arka plan görselleri

  - Overlay ile destinasyon adı



- **Hizmetler Önizleme**

  - 3-4 ana hizmet kartı

  - İkonlar + kısa açıklama



- **Neden Biz? (Why Choose Us)**

  - İstatistikler / özellikler

  - Minimal metin, büyük sayılar



- **İşbirliği Yaptığımız Şirketler**

  - Logo grid



- **Newsletter / CTA Section**

  - İletişime geçin çağrısı



### 2. Yatlar Sayfası (Yachts) ⛵

#### Özellikler:

- Grid/list görünüm toggle

- Filtreleme sistemi:

  - Uzunluk

  - Kapasite

  - Fiyat aralığı

  - Destinasyon

  - Özellikler (jakuzi, jetski, vb.)

- Yat kartları:

  - Ana görsel + galeri önizleme

  - Temel özellikler (uzunluk, kabin, kapasite)

  - Fiyat

  - "Detayları Gör" butonu



### 3. Yat Detay Sayfası (Yacht Detail)

#### Bileşenler:

- Tam ekran görsel galerisi (lightbox)

- Özet bilgiler (sidebar veya üst kısım)

- Özellikler ve donanımlar (ikonlar ile)

- Teknik detaylar (minimal tablo)

- Müsaitlik takvimi (opsiyonel)

- İletişim formu / WhatsApp butonu

- İlgili yatlar



### 4. Destinasyonlar (Destinations) 🌍

#### Yapı:

- Hero section (harita veya büyük görsel)

- Destinasyon kartları (grid)

  - Akdeniz

  - Ege

  - Karayipler

  - vb.

- Her kart: Büyük görsel + overlay metin

- Hover efekti



#### Destinasyon Detay Sayfası:

- Büyük banner görsel

- Kısa açıklama (2-3 paragraf)

- Galeri

- Bu destinasyondaki yatlar

- Popüler rotalar / yerler

- İklim bilgisi (opsiyonel)



### 5. Hizmetler (Services) 🛟

**İlham:** Patrick Marine Charters Charter Management sayfası



#### Hizmet Kategorileri:

- Yat Satışı (ana hizmet)

- Yat Kiralama

- Yat Yönetimi

- Mürettebat Seçimi

- Yasal ve İdari Destek

- Pazarlama ve İçerik Üretimi

- Tekne Fuarları ve Etkinlikler



#### Sunum:

- Her hizmet için ayrı section

- Büyük ikonlar

- Kısa açıklama (3-5 cümle)

- İlgili görseller



### 6. Etkinlikler (Events) 🎉

**Stil:** Global Sea temasından ilham, daha mutlu renkler



#### İçerik:

- Yaklaşan etkinlikler

- Geçmiş etkinlik fotoğrafları

- Etkinlik kayıt formu

- Etkinlik takvimi



### 7. Hakkımızda (About Us) ℹ️

- Şirket hikayesi

- Takım (opsiyonel)

- Değerlerimiz

- Başarılar / sertifikalar

- İşbirliği yaptığımız firmalar



### 8. İletişim (Contact) 📞

**ÖNEMLİ:** WhatsApp entegrasyonu zorunlu



#### Bileşenler:

- İletişim formu

- İletişim bilgileri:

  - Telefon

  - E-posta

  - **WhatsApp butonu (öne çıkan)**

  - Adres

- Harita (Google Maps embed)

- Sosyal medya linkleri

- Ofis saatleri



---



## 🗂️ Teknik Yapı



### Klasör Yapısı

```

globalsea-new/

├── app/

│   ├── [locale]/

│   │   ├── layout.tsx

│   │   ├── page.tsx (Ana sayfa)

│   │   ├── yachts/

│   │   │   ├── page.tsx

│   │   │   └── [slug]/page.tsx

│   │   ├── destinations/

│   │   │   ├── page.tsx

│   │   │   └── [slug]/page.tsx

│   │   ├── services/page.tsx

│   │   ├── events/page.tsx

│   │   ├── about/page.tsx

│   │   └── contact/page.tsx

│   └── api/ (opsiyonel)

├── components/

│   ├── layout/

│   │   ├── Header.tsx

│   │   ├── Footer.tsx (büyük footer)

│   │   └── Navigation.tsx

│   ├── home/

│   │   ├── Hero.tsx

│   │   ├── FeaturedYachts.tsx

│   │   ├── DestinationPreview.tsx

│   │   └── ServicesPreview.tsx

│   ├── yachts/

│   │   ├── YachtCard.tsx

│   │   ├── YachtFilter.tsx

│   │   ├── YachtGallery.tsx

│   │   └── YachtSpecs.tsx

│   ├── destinations/

│   │   ├── DestinationCard.tsx

│   │   └── DestinationMap.tsx

│   ├── shared/

│   │   ├── Button.tsx

│   │   ├── Card.tsx

│   │   ├── ContactForm.tsx

│   │   └── WhatsAppButton.tsx

│   └── ui/ (shadcn/ui components)

├── data/

│   ├── yachts.json

│   ├── destinations.json

│   ├── services.json

│   └── translations/

│       ├── en.json

│       └── pl.json

├── public/

│   ├── images/

│   │   ├── yachts/

│   │   ├── destinations/

│   │   ├── events/

│   │   └── partners/

│   └── videos/

├── lib/

│   ├── utils.ts

│   └── i18n.ts

├── styles/

│   └── globals.css

└── types/

    ├── yacht.ts

    ├── destination.ts

    └── service.ts

```



### Yat JSON Yapısı

```json

{

  "yachts": [

    {

      "id": "yacht-001",

      "slug": "luxury-yacht-name",

      "name": {

        "en": "Luxury Yacht Name",

        "pl": "Nazwa Luksusowego Jachtu"

      },

      "featured": true,

      "images": [

        "/images/yachts/yacht-001/main.jpg",

        "/images/yachts/yacht-001/deck.jpg",

        "/images/yachts/yacht-001/interior-1.jpg"

      ],

      "thumbnail": "/images/yachts/yacht-001/thumbnail.jpg",

      "description": {

        "en": "Brief description...",

        "pl": "Krótki opis..."

      },

      "specifications": {

        "length": 45,

        "lengthUnit": "m",

        "cabins": 5,

        "guests": 10,

        "crew": 7,

        "yearBuilt": 2020,

        "builder": "Builder Name",

        "cruisingSpeed": 12,

        "maxSpeed": 18

      },

      "amenities": [

        "jacuzzi",

        "jetski",

        "wifi",

        "airConditioning",

        "waterToys"

      ],

      "destinations": ["mediterranean", "caribbean"],

      "pricing": {

        "weeklyFrom": 50000,

        "currency": "EUR",

        "salePriceFrom": 5000000

      },

      "forSale": true,

      "forCharter": true

    }

  ]

}

```



### Destinasyon JSON Yapısı

```json

{

  "destinations": [

    {

      "id": "mediterranean",

      "slug": "mediterranean",

      "name": {

        "en": "Mediterranean",

        "pl": "Morze Śródziemne"

      },

      "featured": true,

      "image": "/images/destinations/mediterranean.jpg",

      "thumbnail": "/images/destinations/mediterranean-thumb.jpg",

      "description": {

        "en": "Discover the beauty...",

        "pl": "Odkryj piękno..."

      },

      "highlights": {

        "en": ["Crystal clear waters", "Historic ports", "Gourmet dining"],

        "pl": ["Krystalicznie czysta woda", "Historyczne porty", "Wykwintne jedzenie"]

      },

      "popularRoutes": [

        {

          "en": "French Riviera to Monaco",

          "pl": "Riwiera Francuska do Monako"

        }

      ],

      "bestSeason": "May - October",

      "climate": {

        "en": "Warm Mediterranean climate",

        "pl": "Ciepły klimat śródziemnomorski"

      }

    }

  ]

}

```



---



## 🎨 Renk Paleti (Önerilen)



### Birincil Renkler

- **Ana Mavi:** `#0EA5E9` (Sky Blue - parlak, denizi çağrıştıran)

- **Koyu Mavi:** `#0369A1` (Derin deniz tonu)

- **Vurgu Rengi:** `#FBBF24` (Altın sarısı - güneş, lüks)



### İkincil Renkler

- **Beyaz:** `#FFFFFF` (temizlik, saflık)

- **Açık Gri:** `#F3F4F6` (arka planlar için)

- **Koyu Gri:** `#1F2937` (metinler için)



### Aksan Renkleri

- **Turkuaz:** `#06B6D4` (deniz tonu)

- **Mercan:** `#FB923C` (gün batımı, sıcaklık)



---



## 🌐 i18n (Çoklu Dil) Yapısı



### Desteklenen Diller

1. İngilizce (en) - Varsayılan

2. Lehçe (pl)



### Kullanılacak Kütüphane

- `next-intl` veya Next.js built-in i18n



### URL Yapısı

- İngilizce: `/en/yachts`

- Lehçe: `/pl/yachts` (jachty olabilir)



### Çeviri Dosyaları

- `data/translations/en.json`

- `data/translations/pl.json`



---



## 📱 Component Listesi



### Layout Components

1. **Header**

   - Logo

   - Navigasyon menüsü

   - Dil değiştirici

   - Mobil hamburger menü



2. **Footer** (BÜYÜK FOOTER - Patrick Marine Charters tarzı)

   - Şirket bilgileri

   - Hızlı linkler

   - İletişim bilgileri

   - Sosyal medya ikonları

   - Newsletter kayıt formu

   - Logo

   - Telif hakkı



3. **Navigation**

   - Desktop menü

   - Mobil menü

   - Aktif sayfa gösterimi



### Shared Components

1. **Button** (Variants: primary, secondary, outline, ghost)

2. **Card** (Yat kartları, destinasyon kartları için)

3. **ContactForm** (Genel iletişim formu)

4. **WhatsAppButton** (Sabit pozisyon, tüm sayfalarda)

5. **LanguageSwitcher** (EN/PL toggle)

6. **ImageGallery** (Lightbox ile)

7. **FilterDropdown** (Yat filtreleme için)

8. **Newsletter** (Email kayıt)

9. **Breadcrumb** (Navigasyon yardımı)

10. **LoadingSpinner**



### Page-Specific Components

#### Home Page

1. **Hero** (Video/carousel + CTA)

2. **FeaturedYachts** (Slider veya grid)

3. **DestinationPreview** (Grid)

4. **ServicesPreview** (Grid)

5. **WhyChooseUs** (İstatistikler)

6. **PartnersGrid** (Logo grid)



#### Yachts Page

1. **YachtCard** (Liste/grid görünüm)

2. **YachtFilter** (Sidebar veya top bar)

3. **YachtGallery** (Detay sayfası için)

4. **YachtSpecs** (Teknik özellikler tablosu)

5. **RelatedYachts** (Benzer yatlar)



#### Destinations Page

1. **DestinationCard**

2. **DestinationMap** (İnteraktif harita - opsiyonel)

3. **DestinationGallery**



---



## 🔧 Teknik Gereksinimler



### Kullanılacak Teknolojiler

- **Framework:** Next.js 14+ (App Router)

- **Stil:** Tailwind CSS

- **Dil:** TypeScript

- **UI Kütüphanesi:** shadcn/ui (opsiyonel)

- **Animasyonlar:** Framer Motion

- **İkonlar:** Lucide React / Heroicons

- **Form Yönetimi:** React Hook Form + Zod

- **Carousel:** Swiper.js veya Embla Carousel

- **Lightbox:** yet-another-react-lightbox

- **i18n:** next-intl



### Performans Optimizasyonları

- Next.js Image component kullanımı

- Lazy loading

- Image optimization (WebP/AVIF)

- Static generation where possible

- SEO optimizasyonu



### SEO Gereksinimleri

- Meta tags (her sayfa için)

- Open Graph tags

- Schema.org markup (Yacht, Organization)

- Sitemap.xml

- robots.txt

- Alt texts (tüm görsellerde)



---



## 📋 Geliştirme Aşamaları



### Faz 1: Kurulum ve Yapı (1-2 gün)

- [ ] Next.js projesi oluşturma

- [ ] Tailwind CSS kurulumu

- [ ] Klasör yapısını oluşturma

- [ ] TypeScript type'ları tanımlama

- [ ] i18n yapılandırması

- [ ] Temel layout components (Header, Footer)



### Faz 2: Data Yapısı (1 gün)

- [ ] Yat JSON şeması oluşturma

- [ ] Örnek yat verileri ekleme (5-10 yat)

- [ ] Destinasyon JSON şeması

- [ ] Örnek destinasyon verileri (3-5 destinasyon)

- [ ] Servis verileri

- [ ] Çeviri dosyaları (EN/PL)



### Faz 3: Ana Sayfa (2-3 gün)

- [ ] Hero section (video/carousel)

- [ ] Featured Yachts section

- [ ] Destinations preview

- [ ] Services preview

- [ ] Why Choose Us section

- [ ] Partners grid

- [ ] Newsletter/CTA section



### Faz 4: Yatlar Sayfası (2-3 gün)

- [ ] Yatlar listing sayfası

- [ ] Filtreleme sistemi

- [ ] Yat kartları

- [ ] Yat detay sayfası

- [ ] Görsel galerisi

- [ ] İletişim formu entegrasyonu



### Faz 5: Destinasyonlar (1-2 gün)

- [ ] Destinasyonlar listing

- [ ] Destinasyon detay sayfası

- [ ] Galeri

- [ ] İlgili yatlar gösterimi



### Faz 6: Diğer Sayfalar (2 gün)

- [ ] Services sayfası

- [ ] Events sayfası

- [ ] About sayfası

- [ ] Contact sayfası (WhatsApp entegrasyonu)



### Faz 7: Shared Components (1 gün)

- [ ] WhatsApp floating button

- [ ] Contact form

- [ ] Newsletter form

- [ ] Breadcrumb

- [ ] UI components (Button, Card, vb.)



### Faz 8: Optimizasyon ve Test (1-2 gün)

- [ ] Responsive tasarım kontrolü

- [ ] Performance optimizasyonu

- [ ] SEO optimizasyonu

- [ ] Cross-browser test

- [ ] i18n kontrolü (tüm sayfalar)

- [ ] Accessibility kontrolü



### Faz 9: İçerik ve Görseller (1 gün)

- [ ] Gerçek görsel ekleme

- [ ] Metin içeriklerini tamamlama

- [ ] Logo ve partner logoları

- [ ] Final kontroller



---



## 📝 İçerik Gereksinimleri



### Görsel İhtiyaçları

1. **Yatlar:** Her yat için minimum 5-8 yüksek kaliteli fotoğraf

2. **Destinasyonlar:** Her destinasyon için 3-5 görsel

3. **Ana Sayfa Hero:** 1 video veya 3-5 slider görseli

4. **Etkinlikler:** Etkinlik fotoğrafları

5. **Partner Logoları:** Şeffaf arka plan PNG

6. **Hizmet İkonları:** SVG veya yüksek kalite PNG



### Metin İçerikleri

- Şirket hakkında bilgi (EN/PL)

- Her hizmet için açıklama (EN/PL)

- Destinasyon açıklamaları (EN/PL)

- Footer bilgileri

- Yasal metinler (Privacy Policy, Terms)



---



## 🎯 Önemli Özellikler ve Vurgular



### Must-Have Özellikler

1. ✅ WhatsApp entegrasyonu (sabit buton + contact sayfasında)

2. ✅ İki dilli (EN/PL)

3. ✅ Büyük, etkileyici görseller

4. ✅ Minimal metin

5. ✅ Parlak, davetkar renkler

6. ✅ Büyük footer (Patrick Marine tarzı)

7. ✅ Featured Yachts bölümü

8. ✅ Yat satışı odaklı (partner logoları + iletişim)

9. ✅ Responsive tasarım

10. ✅ Hızlı yükleme süreleri



### Nice-to-Have Özellikler

- 🔹 İnteraktif harita (destinasyonlar için)

- 🔹 Müsaitlik takvimi

- 🔹 Canlı chat (WhatsApp alternatif olarak yeterli olabilir)

- 🔹 Video testimonials

- 🔹 Blog/News section

- 🔹 Virtual tour (360° yat turu)



---



## 📞 İletişim Entegrasyonları



### WhatsApp

- Floating action button (her sayfada)

- Contact sayfasında öne çıkan buton

- Yat detay sayfalarında "WhatsApp ile sorun" butonu



### Diğer İletişim Kanalları

- Email (contact form)

- Telefon

- Sosyal medya (Instagram, Facebook, LinkedIn)



---



## 🚀 Deployment Planı



### Hosting Seçenekleri

1. **Vercel** (önerilen - Next.js için optimize)

2. **Netlify**

3. **AWS Amplify**



### Domain ve SSL

- Domain adı ayarları

- SSL sertifikası (otomatik - Vercel/Netlify)



### Environment Variables

- WhatsApp numarası

- Email yapılandırması

- Analytics keys (Google Analytics, vb.)



---



## 📊 Analytics ve Tracking



### Önerilen Araçlar

- Google Analytics 4

- Google Search Console

- Facebook Pixel (opsiyonel)

- Hotjar (kullanıcı davranışı analizi)



---



## ✅ Son Kontrol Listesi



### Launch Öncesi

- [ ] Tüm sayfalar responsive

- [ ] İki dilde tam çeviri

- [ ] WhatsApp butonu çalışıyor

- [ ] Tüm formlar test edildi

- [ ] SEO meta tags tamamlandı

- [ ] Performance audit (Lighthouse)

- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)

- [ ] Mobil test (iOS, Android)

- [ ] Tüm görseller optimize edildi

- [ ] 404 sayfası tasarlandı

- [ ] Privacy Policy ve Terms eklendi

- [ ] Analytics kuruldu

- [ ] Sitemap ve robots.txt eklendi



---



## 📌 Notlar ve İpuçları



1. **Görsel Kalitesi:** Tüm görseller minimum 1920px genişliğinde olmalı

2. **Lazy Loading:** Görsel ağırlıklı site olduğu için critical

3. **Mobil First:** Tasarım mobil öncelikli yapılmalı

4. **Speed:** Core Web Vitals'a dikkat (LCP, FID, CLS)

5. **Accessibility:** WCAG 2.1 AA standartlarına uygun

6. **Cache Strategy:** Static assets için aggressive caching



---



## 📅 Tahmini Süre

**Toplam:** 10-14 iş günü (2-3 hafta)



---



## 🔗 Referanslar

- Patrick Marine Charters: https://patrickmarinecharters.com

- Patrick Marine Mediterranean: https://patrickmarinecharters.com/en/destination/the-mediterranean/

- Patrick Marine Charter Management: https://patrickmarinecharters.com/en/charter-management/



---



**Son Güncelleme:** 2025-11-15

**Proje Durumu:** Planlama Aşaması