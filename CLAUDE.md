@AGENTS.md

# MerchantCanvas — Claude Code notları

Shopify uygulamaları için marka/portföy sitesi (vinext, Cloudflare Pages'e statik export) ve `growth/` altında pazarlama işletim belleği. Node ≥22.13. Ürün gerçeği `PRODUCT.md`, tasarım `DESIGN.md`; ikisini burada tekrar yazma.

## Dış dünya yetkisi
- Hazırlık yetki değildir. Mail, topluluk/Reddit/LinkedIn paylaşımı, yorum, reklam, harcama, yayın ve hesap/abonelik açma için her seferinde o oturumda açık onay iste. Varsayılan: mail gönderme, yayınlama, harcama yapma, MTD koduna dokunma.
- `growth/control.json` yetki sınırıdır; `false` alanlarını ben açıkça söylemeden `true` yapma. Growth işinde önce `growth/README.md` okuma sırasını izle.
- Outreach kapasitesi (`control.json`): günde en fazla 15 yeni mağaza, 10 aktif görüşmede yeni ilk mail yok, gönderim alıcının yerel mesai saatinde. Kapasite gönderim izni değildir.
- Pazar: global, İngilizce (ABD/GB/CA/AU), USD raporlama. TRY/İstanbul hedefleme yok; Google Ads ve Shopify App Store Ads kapalı. Site, reklam, outreach ve App Store metinleri İngilizce.
- Giriş, 2FA, CAPTCHA ve şifre adımlarını ben yaparım; şifre/kodu sohbete yazdırma.
- `growth/` içine şifre, e-posta, mağaza adı/alanı, müşteri yazışması koyma. Yerel veri `growth/outreach/local/` ve `growth/prospecting/local/` altında (gitignored).
- Saatlik MTD inbox izleme otomasyonu (`mtd-sat-yan-tlar-n-kontrol-et`) Codex tarafında, repo dışında çalışır ve Claude'a taşınmadı. Ben söylemeden yeni otomasyon kurma, Codex'tekini durdurma veya çift izleme başlatma. Kurallar `growth/owner/MTD_HOURLY_INBOX_MONITOR.md` içinde.
- Sonuçları takip ekranına kaydet: `growth/owner/organic-growth-hub.html` (`node growth/owner/serve-organic-hub.mjs`, 127.0.0.1:4318).

## Doğruluk
- Sahte yorum/puan/müşteri/kurulum sayısı yok; yorum yokken puan şeması ekleme. Toplulukta geliştirici olduğumuzu açıkla; metin AI kokmasın, doğrulanabilir olsun.
- Ürün iddiası yalnızca `PRODUCT.md` ve kaynak repo/App Store ile doğrulanmış olanla yapılır. B2B Quote Approvals "coming soon" (kurulum linki yok).
- Kardeş repolar (MTD, b2b-quote-approvals, BundleCanvas/fugazzi-cyoapp-main) yalnız okunur referanstır (AGENTS.md sınırı).
- Geçici dosyayı repo içinde `/.runtime/` altında tut (gitignored), iş bitince sil. Claude'un varsayılan repo-dışı scratchpad'i AGENTS.md sınırına aykırıdır.

## Tasarım
- Light: Cobalt + Sun, dark: Azure + Coral. Her UI değişikliğini iki temada ayrı kontrol et; dark'ta mavi ikon/metin/border coral olsun, hero'lar genel renkten ayrılmasın.
- Sevmediklerim: dev başlıklar, krem/ağır yüzeyler, süslü diyagramlar, ne yaptığımızı anlatmayan karmaşık hero. Netlik referansı bogos.io (kopyalama).
- İkonlar hazır ücretsiz setten, pikselli olmasın. Listenin son öğesinde alt border yok. Boşluklar dengeli (bir üstte bir altta dev boşluk yok).

## Komutlar ve yayın
- `npm run typecheck`, `npm run lint`, `npm test` (önce build, sonra `node --test`). Değişen alana odaklan; commit'ten önce `npm test`.
- `main`'e push, GitHub'a bağlı Cloudflare Pages'i canlıya alır (`npm run build:pages`, çıktı `out`). Push yalnız "yayına al" dediğimde. Sonra `scripts/verify-live-*.mjs` ile canlıyı doğrula; bunlar HTTP/kaynak kontrolüdür, GA4/Meta teslimini kanıtlamaz.
- MTD rehberi: `scripts/import-mtd-guide.mjs`. `public/docs/multitier-discounts/tutorials/**` hash'li ve bayt-kesin (`.gitattributes`); yeniden yazma. barisarslan.com.tr'deki orijinal rehberi ben söylemeden kaldırma/değiştirme.
- Codex skill'leri `.agents/skills/` altında (schema, seo-audit, ai-seo, analytics, copy-editing, impeccable). Claude otomatik yüklemez; gerekirse ilgili `SKILL.md`'yi oku.
