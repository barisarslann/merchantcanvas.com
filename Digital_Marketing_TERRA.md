# MerchantCanvas Digital Marketing — TERRA

## Görev

MerchantCanvas için AEO öncelikli arama niyeti, entity anlatımı ve içerik
stratejisti olarak çalış. Güncel arama ortamını araştır, sayfa rollerini
netleştir, içerik cannibalization’ını engelle ve doğrulanmış metin
optimizasyonlarını uygula. Yalnızca öneri listesi üretip durma; güvenli içerik
değişikliklerini kodda tamamla.

Önerilen model: **TERRA**

## Kullanılacak marketing skill’leri

Bu projeye kurulan `coreyhaines31/marketingskills` paketini aktif olarak kullan.
İlgili adıma başlamadan önce her seçili skill’in `SKILL.md` dosyasını tamamen
oku.

TERRA için zorunlu skill sırası:

1. `.agents/skills/product-marketing/SKILL.md`
2. `.agents/skills/ai-seo/SKILL.md`
3. `.agents/skills/content-strategy/SKILL.md`
4. `.agents/skills/copy-editing/SKILL.md`
5. `.agents/skills/site-architecture/SKILL.md`
6. `.agents/skills/seo-audit/SKILL.md` — on-page ve intent kontrolleri için
7. `.agents/skills/analytics/SKILL.md` — measurement önerileri için

`schema` skill’ini görünür içerik ile yapılandırılmış veri sözleşmesinin
uyumunu kontrol etmek için oku; schema kodunu değiştirmeyi SOL’a bırak.

Skill kullanımında üstünlük sırası:

1. Kullanıcının güncel talebi ve `AGENTS.md`
2. `PRODUCT.md`, doğrulanmış ürün repoları ve görünür site gerçekleri
3. Güncel birincil kaynaklar ve tarihli search-landscape gözlemleri
4. Bu TERRA çalışma planı
5. Kurulan marketing skill checklist’leri

Marketing skill içindeki sabit meta-description uzunluğu, ilk 100 kelimede
keyword, 40–60 kelimelik answer block, `llms.txt`, `/pricing.md`, OKF, crawler
erişimi veya görünürlük yüzdeleri gibi önerileri ranking garantisi olarak
uygulama. İnsanlar için doğal ve kanıtlanabilir içerik her zaman öncelikli.

`.agents/product-marketing.md`, mevcut `PRODUCT.md` dosyasına yönlendiren bir
köprüdür. Yeni ve çelişkili bir product-marketing kaynağı oluşturma.

## Başarı tanımı

Kullanıcılar, arama motorları ve AI cevap sistemleri şu sorulara hızlı, doğru ve
alıntılanabilir cevap bulabilmeli:

- MerchantCanvas nedir?
- Hangi Shopify iş akışlarına odaklanır?
- MultiTier Discounts ne yapar, kimler içindir ve ne zaman uygun değildir?
- B2B Quote Approvals ne yapar, kimler içindir ve ne zaman uygun değildir?
- İki uygulama arasındaki fark nedir?
- Fiyat, plan sınırı ve availability durumu nedir?
- Shopify quantity breaks nasıl planlanır?
- Shopify B2B quote approval workflow nasıl kurulmalıdır?

Metinler doğal, güvenilir ve ürün kanıtlarıyla uyumlu olmalı; keyword stuffing
ve yapay “AI-friendly” dil kullanılmamalı.

## Başlamadan önce

Şunları oku:

1. `AGENTS.md`
2. `PRODUCT.md`
3. `DESIGN.md`
4. `app/content/site.ts`
5. Homepage, apps, product ve resource page dosyaları
6. `app/components/ProductPage.tsx`
7. `app/components/ArticleLayout.tsx`
8. `public/llms.txt`
9. SOL tarafından hazırlandıysa:
   - `docs/marketing/SOL_TECHNICAL_AUDIT.md`
   - `docs/marketing/SOL_CONTENT_CONTRACT.md`

Ürün gerçeklerini gerektiğinde şu kaynak repolarla doğrula:

- `F:\Shopify\multi-tier-discounts`
- `F:\Shopify\b2b-quote-approvals`

## Güncel araştırma politikası

Arama niyeti ve cevap yüzeyleri güncel olduğu için web araştırması yap. Şunları
birbirinden ayır:

- Birincil/resmi ürün ve platform gerçekleri
- Güncel SERP örüntüleri
- Rakip positioning’i
- Tahmin veya yorum

Teknik ve ürün iddialarında resmi kaynakları tercih et. Search volume veya
traffic verisine erişimin yoksa sayı uydurma; önceliği intent, business fit,
SERP composition ve product evidence ile gerekçelendir.

## Çalışma sınırları

- ClickUp kesinlikle read-only.
- Kullanıcı açıkça istemedikçe deploy, push, PR veya harici platform değişikliği
  yapma.
- Kanıtsız testimonial, rating, install count, revenue uplift, compatibility
  veya “best” iddiası yazma.
- Doğrulanmamış Shopify App Store/install URL ekleme.
- B2B ürünü için screenshot uydurma.
- MerchantCanvas’ı Shopify’ın kendisi veya resmi partneri gibi anlatma.
- İngilizce-first site yapısını koru.
- Onaylanan tasarımı değiştirme; içerik düzeni gerektiğinde mevcut component ve
  spacing sistemini kullan.
- Aynı keyword’ü her sayfaya zorla yerleştirme.
- AI cevap sistemleri için okunabilirlik adına kullanıcı deneyimini bozma.

## Paralel çalışma ve dosya sahipliği

SOL teknik altyapı, schema, robots, sitemap ve test hattını paralel yürütecek.

TERRA’nın birincil sahipliği:

- `app/content/site.ts`
- Homepage görünür içeriği
- `/apps` ve `/resources` görünür içeriği
- Product page’lerde veri kaynağından gelen görünür metinler
- Resource makalelerinin içerikleri
- Page-level title ve description metinleri
- İç link anchor’ları
- Content strategy ve backlog belgeleri

SOL’un alanlarına doğrudan müdahale etme:

- `app/lib/metadata.ts`
- Global metadata mimarisi
- Structured-data component ve schema graph
- `public/robots.txt`
- `public/sitemap.xml`
- Teknik regression testleri

SOL’dan teknik destek gereken noktaları `docs/marketing/TERRA_TO_SOL.md` içinde
yaz. İzole branch/worktree kullanılması tercih edilir:
`codex/digital-marketing-terra`.

## Uygulama planı

### 1. Search landscape ve entity araştırması

MerchantCanvas için güncel query evrenini çıkar:

- Branded
- Product/category
- Problem-aware
- Workflow/how-to
- Comparison/alternative
- Pricing/availability
- Agency/evaluation

Özellikle şu kümeleri araştır:

- Shopify tiered discounts
- Shopify quantity breaks
- Buy more save more Shopify
- Shopify Functions discounts
- Shopify B2B quote app
- Shopify quote approval workflow
- Shopify draft order approval
- Wholesale quote workflow

SERP’lerde şu öğeleri kaydet:

- Search intent
- Result types
- AI overview/answer patterns
- People Also Ask soruları
- Forum ve community kaynakları
- Shopify resmi içeriklerinin baskınlığı
- Rakiplerin ortak iddiaları ve kanıt boşlukları

Çıktıyı `docs/marketing/TERRA_SEARCH_RESEARCH.md` içine kaynak linkleri ve
araştırma tarihiyle yaz.

### 2. Entity ve konu mimarisi

Bir entity map oluştur:

- MerchantCanvas
- MultiTier Discounts
- B2B Quote Approvals
- Shopify
- Shopify Functions
- Discount campaign
- Quantity break
- Buy X Get Y
- Cart-value reward
- Wholesale quote
- Approval workflow
- Shopify draft order

Her entity için şunları belirle:

- Site içindeki canonical açıklama
- İlgili route
- Destekleyici kanıt
- Kullanılmaması gereken belirsiz veya riskli iddialar
- Diğer entity’lerle ilişki

Çıktıyı `docs/marketing/TERRA_ENTITY_MAP.md` içine yaz.

### 3. Query-to-page haritası

Her mevcut route’a tek bir baskın arama görevi ver. En az şu route’ları kapsa:

- `/`
- `/apps`
- `/apps/multitier-discounts`
- `/apps/b2b-quote-approvals`
- `/resources`
- `/resources/shopify-quantity-breaks-guide`
- `/resources/shopify-b2b-quote-approval-workflow`
- `/about`
- `/contact`

Her route için:

- Primary intent
- Supporting intents
- Target entity
- Kullanıcı sorusu
- Önerilen title
- Önerilen description
- H1
- Answer-first opening
- Gerekli sections
- Internal links
- CTA
- Cannibalization riski

Çıktıyı `docs/marketing/TERRA_PAGE_MAP.md` içine yaz.

### 4. AEO answer architecture

Ürün ve rehber sayfalarında cevapların alıntılanabilir olmasını sağla:

- İlk paragrafta açık tanım
- “Who it is for / not for” ayrımı
- Somut workflow adımları
- Fiyat ve availability için doğrudan, koşullu açıklama
- Gerçek kullanıcı sorularına doğal FAQ cevapları
- Comparison sorularında net kapsam farkı
- Terimlerin kısa tanımı ve ardından ayrıntı
- İlgili rehber/ürün bağlantısı

Cevapları yapay bir sabit kelime sayısına zorlamadan mümkün olan en kısa tam
cevapla başlat. Sonraki paragraflarda bağlam ve sınırları açıkla.

FAQ eklerken:

- Sorunun gerçek search/user intent’i olmalı.
- Cevap görünür sayfa içeriğinde bulunmalı.
- Aynı soru farklı sayfalarda gereksiz tekrar edilmemeli.
- Ürün gerçeği repodan doğrulanmalı.

### 5. Mevcut sayfaların içerik optimizasyonu

Öncelik sırası:

1. Product pages
2. Homepage ve `/apps`
3. İki mevcut resource article
4. Resources hub
5. About ve contact

Her sayfada şunları iyileştir:

- Title ve description’ın intent uyumu
- H1 ve opening definition
- Heading’lerin gerçek sorulara cevap vermesi
- Belirsiz marketing ifadelerinin somutlaştırılması
- Entity isimlerinin tutarlı kullanımı
- Internal link anchor’larının açıklığı
- CTA’nın sayfa niyetiyle uyumu
- Fiyat ve availability dilinin doğruluğu

Mevcut iyi ürün dilini sırf keyword eklemek için bozma. Görsel tasarımın kompakt
ritmini koru.

### 6. İç link ve topic-cluster planı

Şu ilişkileri açık hale getir:

- Homepage → apps
- Apps hub → iki product page
- Product page → ilgili guide
- Guide → ilgili product page
- Resources hub → guides
- Guide’lar arasında yalnızca gerçekten yararlı bağ varsa cross-link
- About/contact → uygun product evaluation yolları

Anchor text hedefi açıklamalı; tekrar eden “learn more” veya aşırı exact-match
anchor kullanma.

### 7. Yeni içerik backlog’u

Mevcut iki rehberin kapsamadığı gerçek sorular için önceliklendirilmiş backlog
oluştur. Her öneri için:

- Working title
- Search intent
- Target persona
- Primary entity
- Product relevance
- Gerekli kanıt
- Önerilen outline
- Internal link hedefleri
- Risk/cannibalization notu
- Öncelik gerekçesi

Backlog’u `docs/marketing/TERRA_CONTENT_BACKLOG.md` içine yaz. Hacim verisi
yoksa uydurma skor kullanma. İlk dalgada en fazla 8 güçlü içerik öner.

### 8. İçerik değişikliklerini uygula

Araştırmayla desteklenen P0/P1 içerik düzeltmelerini kendi sahiplik alanında
uygula. Şunları koru:

- Mevcut component yapısı
- Accessibility
- Responsive tasarım
- Ürün kanıtları
- Static export
- English-first copy

Teknik schema veya metadata helper değişikliği gerekiyorsa SOL’a bırak ve
`TERRA_TO_SOL.md` dosyasına yaz.

### 9. İçerik QA

Her route için doğrula:

- Tek ve açık H1
- İlk ekranda sayfanın ne hakkında olduğu anlaşılır
- Aynı intent başka route’la yarışmıyor
- Primary entity açıkça adlandırılmış
- Answer-first içerik görünür
- Internal links doğru hedefe gidiyor
- Keyword stuffing yok
- Kanıtsız claim yok
- Metadata ile visible content çelişmiyor
- Light/dark ve mobile düzen bozulmamış

Kod değişikliğinden sonra çalıştır:

```powershell
$env:Path = 'C:\Users\brsar\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:Path
npm run typecheck
npm run lint
npm test
npm run build:pages
```

## Teslimatlar

1. `docs/marketing/TERRA_SEARCH_RESEARCH.md`
2. `docs/marketing/TERRA_ENTITY_MAP.md`
3. `docs/marketing/TERRA_PAGE_MAP.md`
4. `docs/marketing/TERRA_CONTENT_BACKLOG.md`
5. `docs/marketing/TERRA_TO_SOL.md`
6. Araştırmayla doğrulanmış içerik ve page-level metadata değişiklikleri
7. `docs/marketing/TERRA_HANDOFF.md`

Handoff dosyasında şunları yaz:

- Hangi route hangi intent’i sahiplendi
- Değişen metinler ve gerekçeleri
- Kullanılan birincil kaynaklar
- Uydurulmaması gereken iddialar
- SOL’dan beklenen teknik değişiklikler
- Sonraki içerik dalgası
- Test sonuçları

## Kabul kriterleri

- Her ana route’un benzersiz bir search intent’i var.
- MerchantCanvas ve iki ürün açık entity’ler olarak anlaşılabiliyor.
- Product definition, fit, workflow, pricing ve availability cevapları görünür.
- İçerik doğal ve kullanıcı dostu; keyword stuffing yok.
- İddialar ürün gerçekleri ve birincil kaynaklarla uyumlu.
- İç linkler ürün–rehber ilişkisini destekliyor.
- Teknik SOL alanlarına çakışan değişiklik yapılmamış.
- Typecheck, lint, test ve iki build başarılı.
- Deploy veya harici platform mutation yapılmamış.

## Başlangıç komutu

Bu dosyayı aldıktan sonra geniş bir onay sorusu sorma. Güncel search landscape
araştırmasıyla başla, entity ve page map’i çıkar, ardından güvenli P0/P1 içerik
değişikliklerini uygula. Veri veya ürün kanıtı olmayan noktaları açıkça
“unknown / requires verification” olarak işaretle.
