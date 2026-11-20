import { ArticleLayout } from "../../components/ArticleLayout";
import { TrackedLink } from "../../components/TrackedLink";
import { products } from "../../content/site";
import { guideIllustrations } from "../../content/guide-illustrations";
import { pageMetadata } from "../../lib/metadata";

const path = "/tr/shopify-indirim-nasil-yapilir";
const title = "Shopify’da indirim nasıl yapılır?";
const description =
  "İndirim kodu, sepette indirim ve 2 al 1 öde, Shopify’ın kendi indirimleriyle kurulur. Kademeli indirim, ikinci ve üçüncü ürüne ayrı indirim ya da sepete kendiliğinden eklenen hediye için bir uygulama gerekir.";

export const metadata = pageMetadata(
  title,
  "Shopify’da indirim kodu oluşturma, sepette otomatik indirim, 2 al 1 öde ve kademeli indirim: hangisi Shopify’da var, hangisi için uygulama gerekir.",
  path,
);

export default function TurkishDiscountGuidePage() {
  const multiTier = products["multitier-discounts"];

  return (
    <ArticleLayout
      locale="tr"
      title={title}
      description={description}
      category="Kampanya rehberi"
      readingTime="6 dk okuma"
      reviewed="20 Kasım 2026"
      reviewedIso="2026-11-20"
      published="20 Kasım 2026"
      publishedIso="2026-11-20"
      illustration={guideIllustrations.discountsTr}
      path={path}
      takeaways={[
        "Kampanya için tek bir kod verecekseniz indirim kodu, herkese açık bir indirimse otomatik indirim kurun.",
        "“Sepette indirim”, Shopify’da otomatik indirim demektir.",
        "2 al 1 öde için Shopify’ın “X alana Y bedava” indirimi çoğu zaman yeterlidir.",
        "Kademeli indirim ve sıradaki ürüne farklı oran için Shopify bir uygulama öneriyor.",
      ]}
    >
      <p className="answer-first">
        Shopify’da her indirimin bir türü ve bir yöntemi var. Tür neyin
        indirileceğini belirler: ürün, sipariş, kargo ya da “X alana Y”.
        Yöntem, müşterinin indirimi nasıl alacağını belirler: ödeme sırasında
        kod girerek ya da hiçbir şey yapmadan, otomatik olarak. Çoğu kampanya
        için uygulama gerekmez; kademeli indirim, sıraya göre farklı oran ve
        sepete kendiliğinden eklenen hediye için gerekir.
      </p>

      <h2>Önce ne istediğinizi seçin</h2>
      <div className="article-table" role="table" aria-label="Kampanya türüne göre Shopify karşılığı">
        <div role="row" className="article-table-head">
          <span role="columnheader">İstediğiniz</span>
          <span role="columnheader">Shopify’daki karşılığı</span>
          <span role="columnheader">Uygulama gerekir mi?</span>
        </div>
        <div role="row">
          <span role="cell">E-postada paylaşılacak bir kod, örneğin KASIM15</span>
          <span role="cell">Tutar indirimi, yöntem: İndirim kodu</span>
          <span role="cell">Uygulama gerekmez</span>
        </div>
        <div role="row">
          <span role="cell">Sepette %20 indirim</span>
          <span role="cell">Tutar indirimi, yöntem: Otomatik indirim</span>
          <span role="cell">Uygulama gerekmez</span>
        </div>
        <div role="row">
          <span role="cell">Belirli bir tutarın üzerinde ücretsiz kargo</span>
          <span role="cell">Ücretsiz kargo indirimi</span>
          <span role="cell">Uygulama gerekmez</span>
        </div>
        <div role="row">
          <span role="cell">2 al 1 öde, ikinci ürüne %50</span>
          <span role="cell">X alana Y bedava</span>
          <span role="cell">Basit hali için uygulama gerekmez</span>
        </div>
        <div role="row">
          <span role="cell">3 adete %10, 5 adete %15</span>
          <span role="cell">Tek indirimde kademe yok</span>
          <span role="cell">Uygulama gerekir</span>
        </div>
        <div role="row">
          <span role="cell">İkinci ürüne %30, üçüncüye %40</span>
          <span role="cell">Shopify’da karşılığı yok</span>
          <span role="cell">Uygulama gerekir</span>
        </div>
        <div role="row">
          <span role="cell">Hediye ürünün sepete kendiliğinden eklenmesi</span>
          <span role="cell">X alana Y bedavada hediye sepete eklenmez</span>
          <span role="cell">Uygulama gerekir</span>
        </div>
      </div>

      <h2>İndirim kodu nasıl oluşturulur?</h2>
      <ol>
        <li>Shopify yöneticinizde <strong>İndirimler</strong> bölümüne gidin ve <strong>İndirim oluştur</strong>’a tıklayın.</li>
        <li><strong>Ürünlerde tutar indirimi</strong> ya da <strong>Siparişlerde tutar indirimi</strong>’ni seçin.</li>
        <li><strong>Yöntem</strong> altında <strong>İndirim kodu</strong>’nu seçin. Kodu kendiniz yazın ya da <strong>Kod oluştur</strong>’a tıklayın.</li>
        <li><strong>Değer</strong> bölümünde <strong>Yüzde</strong> ya da <strong>Sabit tutar</strong> girin.</li>
        <li>İsterseniz indirimi <strong>Belirli ürünler</strong> ya da <strong>Belirli koleksiyonlar</strong> ile sınırlayın.</li>
        <li><strong>Minimum koşullar</strong>: bir alt sepet tutarı ya da en az ürün adedi koyabilirsiniz.</li>
        <li><strong>Uygunluk</strong>: herkes, belirli müşteriler, müşteri segmentleri ya da belirli pazarlar.</li>
        <li><strong>Maksimum indirim kullanımı</strong>: toplam kullanım sayısını sınırlayın ya da müşteri başına bir kullanım koyun.</li>
        <li><strong>Kombinasyonlar</strong>: bu kodun hangi indirimlerle birlikte kullanılabileceğini seçin.</li>
        <li><strong>Etkin tarihler</strong>: başlangıç ve isterseniz bitiş tarihi. Tarihler mağazanızın saat dilimine göre işler. <strong>Kaydet</strong>’e tıklayın.</li>
      </ol>
      <p>
        Tutar indirimi kargo ücretine uygulanmaz. Menü adları Shopify’ın Türkçe
        yardım sayfasından alındı; panelinizde küçük farklar olabilir.{" "}
        <a href="https://help.shopify.com/tr/manual/discounts/discount-types/percentage-fixed-amount">
          Shopify’ın tutar indirimi yardım sayfası
        </a>
      </p>

      <h2>Sepette indirim: otomatik indirim</h2>
      <p>
        Türkiye’deki pazaryerlerinde “sepette indirim” denilen şey, Shopify’da
        otomatik indirimdir. Koşullar sağlandığında indirim sepette ve ödeme
        sayfasında kendiliğinden uygulanır; müşterinin kod girmesi gerekmez.
      </p>
      <p>
        Kurulumu indirim koduyla aynıdır. Tek fark, <strong>Yöntem</strong>{" "}
        altında <strong>Otomatik indirim</strong>’i seçip kod yerine bir başlık
        yazmanızdır. Bilmeniz gereken iki sınır var:
      </p>
      <ul>
        <li>
          Aynı anda en fazla 25 etkin otomatik indiriminiz olabilir. Uygulamaların
          kurduğu indirimler de bu sayıya dahil.
        </li>
        <li>Müşteri, indirime giren bütün ürünleri sepete kendisi eklemelidir.</li>
      </ul>

      <h2>2 al 1 öde: X alana Y bedava</h2>
      <p>“2 al 1 öde” ya da “ikinci ürüne %50” için X alana Y bedava indirimini kullanın:</p>
      <ol>
        <li><strong>İndirim oluştur</strong> → <strong>X alana Y bedava</strong>.</li>
        <li><strong>Müşteri satın alımları</strong>: en az 1 ürün; ürünleri ya da koleksiyonu seçin.</li>
        <li><strong>Müşterinin alacağı</strong>: 1 ürün; aynı ürünleri ya da koleksiyonu seçin.</li>
        <li><strong>İndirimli değerde</strong>: <strong>Ücretsiz</strong> (2 al 1 öde) ya da <strong>Yüzde</strong> 50 (ikinci ürüne %50).</li>
      </ol>
      <p>
        Otomatik indirimde iki bölümde de aynı ürün ya da koleksiyon varsa
        Shopify, müşterinin seçtiği daha ucuz ürüne indirim yapar. İndirimli
        ürün sepete kendiliğinden eklenmez; müşteri iki ürünü de kendisi
        ekler.{" "}
        <a href="https://help.shopify.com/tr/manual/discounts/discount-types/buy-x-get-y">
          Shopify’ın X alana Y bedava yardım sayfası
        </a>
      </p>

      <h2>Ne zaman uygulama gerekir?</h2>
      <p>
        Shopify’ın kendi yardım sayfası, kademeli indirim, birden çok adımlı
        indirim ya da özel uygunluk koşulu gibi gelişmiş kampanyalar için App
        Store’daki indirim uygulamalarını öneriyor. Shopify Plus mağazalarında
        Checkout Blocks da bir seçenek.{" "}
        <a href="https://help.shopify.com/tr/manual/discounts/discount-types">
          Shopify’ın indirim türleri sayfası
        </a>
      </p>
      <ul>
        <li>3 adete %10, 5 adete %15, 8 adete %20 gibi kademeler.</li>
        <li>İkinci ürüne %30, üçüncüye %40 gibi sıraya göre farklı oranlar.</li>
        <li>Hediye ürünün sepete kendiliğinden eklenmesi ve koşul bozulunca çıkarılması.</li>
        <li>Bir setin bütün parçaları sepete girince verilen indirim.</li>
        <li>Sepet tutarı arttıkça büyüyen indirim ve sepette “şu kadar kaldı” mesajı.</li>
      </ul>
      <p>
        Bir uygulama seçerken üç şeye bakın: indirimi ödeme sayfasında
        Shopify’ın kendi altyapısıyla (Shopify Functions) uygulaması,
        Shopify’ın birleştirme kurallarına uyması ve ürün sayfasında müşteriye
        bir sonraki adımı göstermesi.
      </p>
      <p>
        <strong>Örnek hesap:</strong> Sepette 300 TL, 200 TL ve 100 TL’lik üç
        farklı ürün var. Ürünler pahalıdan ucuza sıralanıyor; ikinci sıraya
        %30, üçüncüye %40 indirim var. 200 TL’lik üründen 60 TL, 100 TL’lik
        üründen 40 TL düşer; sepet 600 TL yerine 500 TL olur. Bu bir örnek
        hesap, müşteri sonucu değil.
      </p>

      <h2>MultiTier Discounts ile kurmak</h2>
      <p>
        MultiTier Discounts bizim geliştirdiğimiz bir Shopify uygulaması. App
        Store’daki adı <strong>MultiTier: Tiered Discounts</strong>.
      </p>
      <ul>
        <li>
          Kademeli ve adet indirimi, ikinci ve üçüncü ürüne ayrı indirim, X al
          Y kazan, tam set, hediye, sepet tutarı ve kargo ödülleri tek
          uygulamada.
        </li>
        <li>
          Tetikleyici ürün, koleksiyon, varyant, etiket, fiyat, adet ya da
          sepet toplamı olabilir. İndirim otomatik ya da kodlu çalışır.
        </li>
        <li>İndirim, ödeme sayfasında Shopify Functions ile uygulanır.</li>
        <li>
          Hediye kampanyalarında ürün sepete kendiliğinden eklenebilir. Bunun
          için temada uygulamanın “Gift Auto-Add” eklentisi (app embed) açık
          olmalı.
        </li>
        <li>
          Ücretsiz planda bütün standart kampanya türleri var; aynı anda 1
          kampanya açık olabilir. Starter aylık $5.99 (10 kampanya), Pro aylık
          $12.99 (sınırsız).
        </li>
        <li>Uygulamanın arayüzü Türkçe de kullanılabiliyor. Kurulum rehberi ve videolar İngilizce.</li>
      </ul>
      <p>
        Adet kademesi her sepet satırında ayrı hesaplanır. Aynı üründen 3 adet
        bir satırdır ve 3 adet kademesine girer; üç farklı üründen birer adet
        3 adet sayılmaz. Farklı ürünlere sırayla indirim vermek için sıraya
        göre indirim kuralını kullanın.
      </p>

      <h2>Yayına almadan önce test edin</h2>
      <div className="checklist-card">
        <h3>Test listesi</h3>
        <ul className="check-list">
          <li>Koşulun hemen altında ve hemen üstünde bir sepet</li>
          <li>İndirime girmeyen bir ürün eklenince ne oluyor?</li>
          <li>Ürün çıkarılınca indirim ya da hediye kalkıyor mu?</li>
          <li>Aynı üründen iki adet tek satırda ve ayrı satırlarda</li>
          <li>Başka bir kod ya da otomatik indirimle birlikte</li>
          <li>Ürün sayfası, sepet, mobil görünüm ve ödeme sayfası aynı sonucu gösteriyor mu?</li>
        </ul>
      </div>

      <div className="article-cta">
        <div>
          <p className="eyebrow">İlgili uygulama</p>
          <h2>MultiTier Discounts</h2>
          <p>
            Kademeli indirim, sıraya göre indirim, X al Y kazan, hediye ve
            sepet tutarı ödülleri tek Shopify uygulamasında; ödeme sayfasında
            Shopify Functions ile uygulanır.
          </p>
        </div>
        <TrackedLink
          className="button button-primary"
          href={multiTier.installUrl!}
          eventName="install_intent"
          eventData={{
            product: "multitier-discounts",
            placement: "resource_tr_guide_cta",
            destination: "shopify_app_store",
          }}
        >
          Shopify’dan yükle
        </TrackedLink>
      </div>
    </ArticleLayout>
  );
}
