# MultiTier Discounts Meta pilot kontrol listesi

**Güncellendi:** 2026-08-04
**Durum:** Kurulum onaylı; harcama ve yayın hâlâ kilitli
**Hesap ayarları:** USD, UTC
**Pilot pazarlar:** ABD, Birleşik Krallık, Kanada, Avustralya
**Kesin üst sınır:** Yedi günde en fazla 1.600 TRY karşılığı

## Benim yapacaklarım

- [x] Meta reklam hesabının kalıcı para birimi olarak USD'yi onayladım.
- [x] Meta raporlama saat dilimi olarak UTC'yi onayladım.
- [x] Harcamasız Meta hesabı, Sayfa, domain ve Dataset/Pixel varlıklarının
  oluşturulmasına izin verdim.
- [ ] Sanal kartı doğrudan Meta **Billing & payments** alanına ekledim. Kart
  bilgilerini sohbete, Git'e veya bu dosyaya yazmadım.
- [ ] Privacy sayfasını işletme sahibi olarak son kez okuyup onayladım.
- [ ] Terms sayfasını işletme sahibi olarak son kez okuyup onayladım.
- [ ] Duraklatılmış kampanyanın son önizlemesini inceleyip onayladım.
- [ ] Ölçüm ve ödeme kontrolleri geçtikten sonra yayını açıkça yetkilendirdim.

## Codex'in yapacakları

- [x] MerchantCanvas Meta reklam hesabını USD ve UTC ile oluşturdu.
- [x] Hesapta ödeme yöntemi ve harcama olmadığını doğruladı.
- [x] MerchantCanvas Facebook Sayfasını oluşturdu/bağladı.
- [x] `merchantcanvas.com` domainini ekleyip doğruladı.
- [x] MerchantCanvas Dataset/Pixel'i oluşturup reklam hesabına bağladı.
- [x] Pixel'i mevcut advertising-consent kapısından geçecek şekilde yapılandırdı.
- [x] Advertising consent öncesinde Meta scripti veya konfigürasyonu olmadığını
  doğruladı.
- [x] Advertising consent sonrasında tek PageView ve PII içermeyen, tekrarsız
  `InstallIntent` olayını doğruladı.
- [x] GA4 property raporlamasını MerchantCanvas Realtime'da doğruladı.
- [ ] Meta event seçicisi güncellenince `InstallIntent` custom conversion'ını
  oluşturacak.
- [ ] 1.600 TRY üst sınırını aktivasyon anında USD'ye çevirip aşağı yuvarlayacak.
- [ ] Bir kampanya, bir ad seti ve iki reklamı duraklatılmış durumda oluşturacak.
- [ ] Google Ads ve Shopify App Store Ads'in kapalı kaldığını doğrulayacak.
- [ ] Son duraklatılmış önizlemeyi ve ölçüm sözleşmesini bana sunacak.

## Pilot güvenlik sınırları

- [x] `install_intent`, tamamlanmış Shopify kurulumu olarak raporlanmayacak.
- [x] Kurulum, kaldırma ve ücretli plan aktivasyonları Shopify Partner Dashboard
  kanıtıyla izlenecek.
- [x] Teşvikli yorum, uydurma kanıt veya doğrulanamayan iddia kullanılmayacak.
- [x] Ölçüm arızası, politika reddi veya güvensiz ödeme davranışında durulacak.
- [x] 800 TRY harcamada doğrulanmış InstallIntent yoksa tanı için duraklatılacak.
- [x] Yedi günlük 1.600 TRY karşılığı kesin üst sınır aşılmayacak.
