# MerchantCanvas Digital Marketing — SOL

## Görev

MerchantCanvas için AEO öncelikli teknik SEO lideri ve entegratörü olarak çalış.
Mevcut siteyi kanıta dayalı biçimde denetle, teknik sorunları uygula, ölç ve
doğrula. Yalnızca rapor üretip durma; güvenli ve doğrulanabilir düzeltmeleri
kodda tamamla.

Önerilen model: **SOL**

## Kullanılacak marketing skill’leri

Bu projeye kurulan `coreyhaines31/marketingskills` paketini aktif olarak kullan.
İlgili adıma başlamadan önce her seçili skill’in `SKILL.md` dosyasını tamamen
oku.

SOL için zorunlu skill sırası:

1. `.agents/skills/product-marketing/SKILL.md`
2. `.agents/skills/seo-audit/SKILL.md`
3. `.agents/skills/ai-seo/SKILL.md`
4. `.agents/skills/schema/SKILL.md`
5. `.agents/skills/site-architecture/SKILL.md`
6. `.agents/skills/analytics/SKILL.md`

`content-strategy` ve `copy-editing` skill’lerini yalnızca teknik bulgunun içerik
sözleşmesini veya kısa bir teknik metni etkilediği durumda yardımcı kaynak
olarak kullan. TERRA’nın görünür içerik sahipliğini devralma.

Skill kullanımında üstünlük sırası:

1. Kullanıcının güncel talebi ve `AGENTS.md`
2. `PRODUCT.md`, doğrulanmış ürün repoları ve görünür site gerçekleri
3. Güncel Google, Bing, Schema.org, Shopify ve crawler sağlayıcısı belgeleri
4. Bu SOL çalışma planı
5. Kurulan marketing skill checklist’leri

Marketing skill içindeki sabit meta-description uzunluğu, ilk 100 kelimede
keyword, 40–60 kelimelik answer block, `llms.txt`, `/pricing.md`, OKF, crawler
erişimi veya görünürlük yüzdeleri gibi önerileri ranking garantisi olarak
uygulama. Güncel birincil kaynakla doğrula ve MerchantCanvas için gerçekten
gerekli değilse ekleme.

`.agents/product-marketing.md`, mevcut `PRODUCT.md` dosyasına yönlendiren bir
köprüdür. Yeni ve çelişkili bir product-marketing kaynağı oluşturma.

## Başarı tanımı

Arama motorları ve cevap üreten sistemler aşağıdaki varlıkları, aralarındaki
ilişkileri ve her sayfanın amacını açıkça anlayabilmeli:

- MerchantCanvas: odaklı Shopify uygulamaları geliştiren ürün şirketi.
- MultiTier Discounts: Shopify Functions tabanlı promotion ve quantity-break
  iş akışı.
- B2B Quote Approvals: teklif, onay ve Shopify draft-order handoff iş akışı.
- İki mevcut rehber ve bunların ilgili ürünlerle ilişkisi.

Tüm uygulama gerçekleri kaynak kodla uyumlu kalmalı. Organik görünürlük uğruna
kanıtsız iddia, uyumluluk, müşteri sayısı, yorum, sonuç garantisi veya
doğrulanmamış App Store URL’si eklenmemeli.

## Başlamadan önce

Şunları oku:

1. `AGENTS.md`
2. `PRODUCT.md`
3. `DESIGN.md`
4. `app/content/site.ts`
5. `app/lib/metadata.ts`
6. `app/layout.tsx`
7. `app/components/StructuredData.tsx`
8. `app/components/ProductPage.tsx`
9. `app/components/ArticleLayout.tsx`
10. `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`
11. `tests/rendered-html.test.mjs`
12. `tests/routes-and-discovery.test.mjs`

Mevcut teknolojiyi koru: Next.js 16, React 19, Vinext/Vite, statik export ve
Cloudflare uyumlu çıktı. Tasarımı yeniden tasarlama.

## Güncel bilgi politikası

Teknik SEO/AEO kuralları değişebileceği için güncel araştırma yap. Teknik
kararlarda öncelikle birincil kaynakları kullan:

- Google Search Central
- Bing Webmaster Guidelines
- Schema.org
- Shopify resmi geliştirici belgeleri
- OpenAI ve diğer crawler sağlayıcılarının resmi belgeleri

`llms.txt` dosyasını destekleyici bir kolaylık olarak değerlendir; kanıtlanmış
bir ranking standardı veya indeksleme garantisi gibi sunma.

## Çalışma sınırları

- ClickUp kesinlikle read-only.
- Kullanıcı açıkça istemedikçe deploy, push, PR, arama motoru submission veya
  harici hesap değişikliği yapma.
- Mevcut analytics/advertising consent davranışını bozma.
- Kanıtsız içerik ve schema üretme.
- FAQ schema yalnızca sayfada kullanıcıya görünen sorularla eşleşmeli.
- Gerçekten çok dilli bir site kurulmadan `hreflang` ekleme.
- Her sitemap tarihi için gerçek bir değişiklik kaynağı yoksa sahte `lastmod`
  üretme.
- Görsel tasarımı ve onaylanmış light/dark sistemi koru.

## Paralel çalışma ve dosya sahipliği

TERRA içerik ve arama niyeti hattını paralel yürütecek.

SOL’un birincil sahipliği:

- `app/lib/metadata.ts`
- `app/layout.tsx`
- `app/components/StructuredData.tsx`
- `app/components/ProductPage.tsx` içindeki schema üretimi
- `app/components/ArticleLayout.tsx` içindeki schema üretimi
- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`
- SEO/AEO doğrulama testleri
- Teknik raporlar

TERRA’nın sahip olduğu pazarlama metinlerini gereksiz yere değiştirme:

- `app/content/site.ts`
- Homepage, apps, resources ve ürün sayfalarının görünür metinleri
- Page-level title/description metinleri
- Yeni içerik brief’leri

Teknik bir değişiklik TERRA alanına dokunmak zorundaysa bunu
`docs/marketing/SOL_TO_TERRA.md` içinde açıkça belirt. İzole branch/worktree
kullanılması tercih edilir: `codex/digital-marketing-sol`.

## Uygulama planı

### 1. Kanıta dayalı baseline audit

Tüm public route’ları üretim çıktısından tara:

- Status code ve crawl edilebilirlik
- Tek ve doğru canonical
- Unique title, description ve H1
- Heading hiyerarşisi
- Index/noindex durumu
- Robots, sitemap ve canonical tutarlılığı
- İç linkler ve kırık linkler
- Open Graph ve X metadata
- Structured data parse edilebilirliği
- Rendered HTML içinde ana içeriğin bulunması
- 404 ve bilinmeyen route davranışı

Bulguları `docs/marketing/SOL_TECHNICAL_AUDIT.md` içine P0/P1/P2 olarak yaz.
Her bulgu için kanıt, etkilenen route, önerilen değişiklik ve doğrulama yöntemi
ver.

### 2. Teknik SEO temeli

Gerekli olduğu kanıtlanan düzeltmeleri uygula:

- Metadata helper ve canonical üretimi
- Absolute URL tutarlılığı
- Route-level metadata sözleşmesi
- Robots ve sitemap kapsamı
- Social preview metadata
- Statik export altında 404/crawl davranışı
- İç link grafiği ve orphan-page kontrolü
- Gereksiz duplicate veya çelişkili metadata temizliği
- URL ve trailing-slash davranışının tutarlılığı

Title veya description için katı karakter sayısı ezberi kullanma. Benzersizlik,
arama niyeti, okunabilirlik ve SERP truncation riskini birlikte değerlendir.

### 3. Entity ve structured-data mimarisi

Gerçek içerikle uyumlu, stabil `@id` kullanan bir graph tasarla. Uygun olduğu
ölçüde şu varlıkları değerlendir:

- `Organization`
- `WebSite`
- `WebPage`
- `SoftwareApplication`
- `Article`
- `BreadcrumbList`
- `FAQPage`
- `Offer`

Şunları özellikle doğrula:

- MerchantCanvas Organization tüm sayfalarda aynı kimliği kullanıyor.
- Product sayfaları Organization provider ile doğru bağlanıyor.
- Article sayfaları publisher, author, mainEntityOfPage ve gerçek tarihleri
  doğru kullanıyor.
- Offer fiyatı, para birimi, plan adı ve availability metni görünür içerikle
  çelişmiyor.
- FAQ schema görünür FAQ ile birebir eşleşiyor.
- Shopify ile ilişki, resmi Shopify şirketiymiş izlenimi üretmiyor.
- B2B ürünü için bulunmayan screenshot, review veya install URL eklenmiyor.

Schema değişiklikleri için rendered HTML testleri ekle.

### 4. AEO teknik hazırlığı

Sayfaların kısa ve doğrudan cevapları makine tarafından çıkarılabilir şekilde
sunup sunmadığını denetle:

- Ürün tanımı
- Kimler için olduğu
- Ne zaman yararlı olduğu
- Ne zaman uygun olmadığı
- İş akışı
- Fiyat/plan sınırları
- Availability
- Sık sorulan sorular
- İlgili rehber

Görünür içeriği schema ile değiştirmeye çalışma. Eksik answer block veya content
gereksinimlerini `docs/marketing/SOL_CONTENT_CONTRACT.md` içinde TERRA’ya ver.

AI crawler politikalarını güncel resmi belgelerle doğrula. Robots kararlarını
belgele; kullanıcı isteği olmadan crawler’ları engelleme veya erişim politikasını
stratejik olarak değiştirme.

### 5. Performans ve render denetimi

SEO’yu etkileyen teknik kaliteyi kontrol et:

- Server-rendered ana içerik
- Font ve image loading
- Büyük görsellerin ölçüleri
- Layout shift riski
- Consent öncesi üçüncü taraf script davranışı
- Navigation ve mobile menu erişilebilirliği
- Core Web Vitals için belirgin kod riskleri

Gerçek field data yoksa laboratuvar ölçümünü kullanıcı verisi gibi sunma.

### 6. Ölçüm planı

`docs/marketing/SOL_MEASUREMENT_PLAN.md` oluştur:

- Google Search Console ve Bing Webmaster Tools kurulum checklist’i
- Index coverage ve sitemap takibi
- Branded/non-branded query grupları
- Product ve resource landing-page performansı
- AI referral sınıflandırması için ölçülebilir referrer yaklaşımı
- Contact intent ve product-selection dönüşümleri
- Haftalık ve aylık KPI tanımları

Erişim yoksa harici platformlarda işlem yapma; uygulanabilir manuel adımları
listele.

### 7. Test ve doğrulama

En az şu kontrolleri otomatikleştir:

- Public route’lar 200
- Bilinmeyen route doğru 404
- Her indexable route’ta tek canonical
- Title ve description mevcut
- Canonical/sitemap host tutarlılığı
- Sitemap’te yalnızca gerçek public route’lar
- Robots sitemap adresi doğru
- JSON-LD parse edilebilir
- Product FAQ ve Offer schema görünür içerikle uyumlu
- Internal link hedefleri geçerli
- Structured data içinde doğrulanmamış install/review iddiası yok

Sonunda çalıştır:

```powershell
$env:Path = 'C:\Users\brsar\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:Path
npm run typecheck
npm run lint
npm test
npm run build:pages
```

## Teslimatlar

1. `docs/marketing/SOL_TECHNICAL_AUDIT.md`
2. `docs/marketing/SOL_CONTENT_CONTRACT.md`
3. `docs/marketing/SOL_MEASUREMENT_PLAN.md`
4. Gerekli teknik kod değişiklikleri
5. Yeni veya geliştirilmiş SEO/AEO regression testleri
6. `docs/marketing/SOL_HANDOFF.md`

Handoff dosyasında şunları yaz:

- Ne değişti
- Neden değişti
- Hangi bulgular bilinçli olarak uygulanmadı
- TERRA’dan beklenen içerik değişiklikleri
- Kullanıcının manuel yapması gereken platform işlemleri
- Test sonuçları

## Kabul kriterleri

- Teknik kararlar güncel birincil kaynaklarla desteklenmiş.
- Her public route tek, doğru ve indexlenebilir kimliğe sahip.
- Robots, sitemap, canonical ve internal links birbiriyle çelişmiyor.
- Structured data yalnızca doğrulanmış ve görünür gerçekleri anlatıyor.
- AEO answer yapısı ürün sayfalarında saniyeler içinde bulunabiliyor.
- Site tasarımı ve kullanıcı deneyimi bozulmamış.
- Typecheck, lint, test ve iki build başarılı.
- Deploy veya harici submission yapılmamış.

## Başlangıç komutu

Bu dosyayı aldıktan sonra geniş bir onay sorusu sorma. Önce baseline audit’i
çıkar, güncel resmi kaynakları doğrula, ardından güvenli P0/P1 değişikliklerini
uygula. Gerçek bir kullanıcı kararı veya yeni yetki gerektiren noktaları açıkça
ayır.
