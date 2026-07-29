export const siteConfig = {
  name: "MerchantCanvas",
  legalName: "MerchantCanvas",
  description:
    "MerchantCanvas publishes MultiTier Discounts for Shopify promotion workflows and is preparing B2B Quote Approvals.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://merchantcanvas.com",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@merchantcanvas.com",
  navigation: [
    { label: "Apps", href: "/apps" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  annualPrice?: string;
  trial?: string;
  eligibility: string;
  presentation: "card" | "conditional";
  bestFor: string;
  limit: string;
  features: string[];
  recommended?: boolean;
};

export type Product = {
  slug: "multitier-discounts" | "b2b-quote-approvals";
  name: string;
  shortName: string;
  category: string;
  accent: "coral" | "blue";
  eyebrow: string;
  headline: string;
  definition: string;
  summary: string;
  availabilityStatus: "live" | "coming-soon";
  installUrl?: string;
  primaryAction: string;
  primaryHref: string;
  availability: string;
  for: string[];
  usefulWhen: string[];
  notFor: string[];
  workflow: { step: string; title: string; copy: string }[];
  capabilities: { title: string; copy: string }[];
  plans: Plan[];
  pricingNote: string;
  faq: { question: string; answer: string }[];
  resource: {
    title: string;
    href: string;
    linkLabel: string;
    description: string;
  };
  screenshots?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
};

export const products: Record<Product["slug"], Product> = {
  "multitier-discounts": {
    slug: "multitier-discounts",
    name: "MultiTier Discounts",
    shortName: "MultiTier",
    category: "Promotions",
    accent: "coral",
    eyebrow: "Shopify tiered promotions",
    headline:
      "Create Shopify tiered discounts and quantity-break campaigns without setup sprawl.",
    definition:
      "MultiTier Discounts is a Shopify embedded app for tiered, quantity-break, cart-value, Buy X Get Y, and gift promotions with Shopify Functions-based checkout logic.",
    summary:
      "Build buy-more-save-more, quantity-break, cart-value, Buy X Get Y, and gift campaigns with precise targeting, storefront guidance, and checkout logic that stays in Shopify.",
    availabilityStatus: "live",
    installUrl: "https://apps.shopify.com/multitier-discounts",
    primaryAction: "Install from Shopify",
    primaryHref: "https://apps.shopify.com/multitier-discounts",
    availability:
      "Live on the Shopify App Store. Free, Starter, and Pro are generally available; Plus is available only to eligible Shopify Plus stores.",
    for: [
      "Shopify merchants planning repeatable quantity or cart-value promotions",
      "Teams that need more targeting control than a basic quantity-break table",
      "Agencies evaluating promotion tooling for client storefronts",
    ],
    usefulWhen: [
      "You want shoppers to understand what they unlock before checkout",
      "A campaign needs product, collection, variant, tag, price, quantity, or cart-total targeting",
      "You need schedules, usage limits, combination rules, or campaign-level reporting",
    ],
    notFor: [
      "You only need a one-off Shopify discount code",
      "You want a general loyalty, subscriptions, or email marketing suite",
      "You cannot test theme widgets and the qualifying cart before publishing",
    ],
    workflow: [
      {
        step: "01",
        title: "Choose the offer",
        copy:
          "Start with a tiered discount, Buy X Get Y, cart-value reward, or supported gift flow.",
      },
      {
        step: "02",
        title: "Define qualification",
        copy:
          "Set the products, variants, collections, tags, quantities, prices, or cart thresholds that make the offer eligible.",
      },
      {
        step: "03",
        title: "Set the guardrails",
        copy:
          "Configure tiers, dates, limits, customer or country targeting where available, and discount combination rules.",
      },
      {
        step: "04",
        title: "Guide and apply",
        copy:
          "Use storefront widgets to explain progress, then let Shopify Functions apply qualifying checkout logic.",
      },
    ],
    capabilities: [
      {
        title: "Plan offers around the cart you actually want",
        copy:
          "Progressive percentage or fixed-amount tiers can respond to quantity, product mix, cart value, and other supported conditions.",
      },
      {
        title: "Make eligibility legible to shoppers",
        copy:
          "Product, quantity, cart-progress, cross-sell, and collection widgets help shoppers see what is missing or already unlocked.",
      },
      {
        title: "Keep campaigns operationally controlled",
        copy:
          "Scheduling, usage limits, full-set requirements, combination rules, targeting, and high-discount confirmation reduce avoidable mistakes.",
      },
      {
        title: "Review use after orders arrive",
        copy:
          "Campaign analytics track processed-order usage, affected orders, and discount totals without pretending to guarantee an uplift.",
      },
    ],
    plans: [
      {
        name: "Free",
        price: "$0",
        cadence: "forever",
        eligibility: "Available to Shopify stores",
        presentation: "card",
        bestFor: "Testing the core tiered-discount workflow",
        limit: "2 active campaigns",
        features: [
          "Percentage and quantity-break campaigns",
          "Price, product, and collection triggers",
          "Automatic discounts, schedules, and limits",
          "Discount badge widget and starter templates",
        ],
      },
      {
        name: "Starter",
        price: "$5.99",
        cadence: "per month",
        annualPrice: "$59.90 per year",
        trial: "14-day free trial",
        eligibility: "Available to Shopify stores",
        presentation: "card",
        bestFor: "Stores running a focused promotion calendar",
        limit: "10 active campaigns",
        recommended: true,
        features: [
          "Buy X Get Y and cart-value rewards",
          "Exact variant and tag targeting",
          "Percentage and fixed-amount discounts",
          "Shipping tiers, code campaigns, and analytics",
        ],
      },
      {
        name: "Pro",
        price: "$12.99",
        cadence: "per month",
        annualPrice: "$129.90 per year",
        trial: "14-day free trial",
        eligibility: "Available to Shopify stores",
        presentation: "card",
        bestFor: "Teams managing a larger promotion program",
        limit: "Unlimited active campaigns",
        features: [
          "Gift offers and gift-priority controls",
          "Currency-specific thresholds",
          "Customer-tag and country targeting",
          "All Starter campaign and analytics features",
        ],
      },
      {
        name: "Plus",
        price: "$24.99",
        cadence: "per month",
        annualPrice: "$249.90 per year",
        trial: "14-day free trial",
        eligibility: "Eligible Shopify Plus stores only",
        presentation: "conditional",
        bestFor:
          "Shopify Plus teams using the checkout mystery-gift presentation",
        limit: "Unlimited active campaigns",
        features: [
          "Everything in Pro",
          "Checkout mystery-gift presentation",
          "Shopify-managed billing",
        ],
      },
    ],
    pricingNote:
      "The public Shopify App Store listing shows Free, Starter, and Pro. The separate Plus plan is a conditional managed-billing option shown only to stores Shopify verifies as Shopify Plus.",
    faq: [
      {
        question: "Does MultiTier Discounts replace Shopify discounts?",
        answer:
          "No. It creates and manages supported campaign logic through Shopify discount infrastructure, including Shopify Functions-based checkout logic. Shopify remains the commerce and checkout platform.",
      },
      {
        question: "Can a campaign target exact variants?",
        answer:
          "Yes on paid plans. Selecting a product includes its variants, while exact variant selection is useful when specific sizes, colours, or SKUs should qualify differently.",
      },
      {
        question: "Can shoppers see progress before checkout?",
        answer:
          "Supported product and cart widgets can show locked, in-progress, and eligible states. Theme placement and cart behaviour should be tested on the live theme before a broad campaign is published.",
      },
      {
        question: "Do analytics prove a campaign increased revenue?",
        answer:
          "No. The app reports processed-order campaign usage, affected orders, and discount totals. Causal lift requires a separate measurement design.",
      },
      {
        question: "Is there a public install link?",
        answer:
          "Yes. MultiTier Discounts is live at https://apps.shopify.com/multitier-discounts. Shopify handles installation and plan confirmation.",
      },
      {
        question: "Who can choose the Plus plan?",
        answer:
          "The Plus plan is available only to stores Shopify verifies as Shopify Plus. It costs $24.99 per month or $249.90 per year, includes a 14-day free trial, and is presented separately from the three standard plans.",
      },
    ],
    resource: {
      title: "Shopify quantity breaks: a practical planning guide",
      href: "/resources/shopify-quantity-breaks-guide",
      linkLabel: "Plan Shopify quantity breaks",
      description:
        "Choose a tier structure, protect margin, decide when Shopify Functions are useful, and test the full storefront path.",
    },
    screenshots: [
      {
        src: "/images/multitier-campaign-rules.jpg",
        alt:
          "MultiTier Discounts campaign builder showing the discount rules step",
        caption:
          "The current campaign builder keeps trigger and rule decisions in a four-step workflow.",
        width: 1130,
        height: 930,
      },
      {
        src: "/images/multitier-analytics.jpg",
        alt:
          "MultiTier Discounts analytics dashboard showing campaign usage metrics",
        caption:
          "Analytics are based on processed orders and do not include historical orders from before installation.",
        width: 1080,
        height: 900,
      },
    ],
  },
  "b2b-quote-approvals": {
    slug: "b2b-quote-approvals",
    name: "B2B Quote Approvals",
    shortName: "B2B Quotes",
    category: "B2B operations",
    accent: "blue",
    eyebrow: "Shopify B2B sales operations",
    headline:
      "Approve Shopify B2B quotes and turn agreed terms into draft orders.",
    definition:
      "B2B Quote Approvals is a Shopify Admin app for creating, reviewing, approving, sharing, and converting wholesale quotes into Shopify draft orders.",
    summary:
      "Keep buyer context, proposed pricing, PO details, approval decisions, revisions, and the draft-order handoff in one operational trail instead of an inbox-and-spreadsheet chain.",
    availabilityStatus: "coming-soon",
    primaryAction: "Request a launch update",
    primaryHref:
      "/contact?product=b2b-quote-approvals&intent=launch-update",
    availability:
      "Coming soon. The app is a feature-complete local beta preparing for production hosting and final Shopify review testing; it is not publicly installable yet.",
    for: [
      "Wholesale teams that manage quotes and approvals inside Shopify operations",
      "Sales, finance, or operations teams that review value or discount thresholds",
      "Agencies assessing a focused quote-to-draft-order workflow for a client",
    ],
    usefulWhen: [
      "Quote decisions are spread across email, spreadsheets, and manual Shopify entry",
      "Buyer, company, company-location, catalog, PO, and pricing context must stay attached",
      "Approved or accepted quotes should become Shopify draft orders without re-keying line items",
    ],
    notFor: [
      "You only need a generic hide-price or request-a-quote form",
      "You need a full ERP, CRM, customer-account portal, or wholesale suite",
      "You need a public install today; the production release path is not yet verified",
    ],
    workflow: [
      {
        step: "01",
        title: "Create or receive",
        copy:
          "Build a quote in Shopify Admin or receive a narrow storefront request with buyer and line-item context.",
      },
      {
        step: "02",
        title: "Evaluate",
        copy:
          "Check totals, discount percentage, PO details, expiry, catalog context, and the approval rules that match.",
      },
      {
        step: "03",
        title: "Approve or revise",
        copy:
          "Record approvals, rejections, notes, and revisions in the quote history instead of a parallel inbox thread.",
      },
      {
        step: "04",
        title: "Hand off to Shopify",
        copy:
          "Convert an approved or accepted quote into a Shopify draft order and use Shopify for invoice and payment-link workflows.",
      },
    ],
    capabilities: [
      {
        title: "Give every quote one operational record",
        copy:
          "Keep customer or company context, line items, pricing, discounts, PO number, expiry, notes, status, and history together.",
      },
      {
        title: "Make approval thresholds explicit",
        copy:
          "Growth and Pro plans can flag quotes by total value or discount percentage; Pro adds company-aware and multi-step approval controls.",
      },
      {
        title: "Keep buyer communication structured",
        copy:
          "Tokenised buyer links support review, acceptance, rejection, revision requests, and access to a Shopify invoice link when one exists.",
      },
      {
        title: "Finish in Shopify, not beside it",
        copy:
          "Approved or accepted quotes can become Shopify draft orders, preserving the platform as the place for invoicing and payment.",
      },
    ],
    plans: [
      {
        name: "Starter",
        price: "$19",
        cadence: "per month",
        trial: "14-day free trial",
        eligibility: "Coming soon — public installation unavailable",
        presentation: "card",
        bestFor: "Smaller wholesale teams formalising quote handoff",
        limit: "25 active quotes",
        features: [
          "Quote management and history",
          "Manual storefront quote-request entry",
          "Shopify draft-order conversion",
          "Buyer and line-item context",
        ],
      },
      {
        name: "Growth",
        price: "$39",
        cadence: "per month",
        trial: "14-day free trial",
        eligibility: "Coming soon — public installation unavailable",
        presentation: "card",
        bestFor: "Teams that need repeatable approval control",
        limit: "250 active quotes",
        recommended: true,
        features: [
          "Everything in Starter",
          "Total and discount approval rules",
          "Visual storefront product and variant picker",
          "Shopify draft-order conversion",
        ],
      },
      {
        name: "Pro",
        price: "$79",
        cadence: "per month",
        trial: "14-day free trial",
        eligibility: "Coming soon — public installation unavailable",
        presentation: "card",
        bestFor: "Higher-volume or multi-stakeholder quote desks",
        limit: "Unlimited active quotes",
        features: [
          "Everything in Growth",
          "Company-aware and multi-step approvals",
          "Merchant notifications",
          "Signed outbound webhooks and integrations",
        ],
      },
    ],
    pricingNote:
      "These recurring monthly prices, trial terms, limits, and gates are verified in the current billing implementation. Annual billing and a public install path are not advertised because they are not yet configured for release.",
    faq: [
      {
        question: "Is this a generic request-a-quote form?",
        answer:
          "No. A narrow storefront request entry exists, but the product is centred on the internal approval desk, quote history, buyer decisions, and Shopify draft-order handoff.",
      },
      {
        question: "What makes a quote require approval?",
        answer:
          "Growth and Pro plans can evaluate active rules based on quote total or discount percentage. Pro can add company-aware and compact multi-step approval workflows.",
      },
      {
        question: "Does the app take payment?",
        answer:
          "No. Approved or accepted quotes can become Shopify draft orders. Shopify remains responsible for its invoice and payment-link flow.",
      },
      {
        question: "Does this website claim Shopify Plus compatibility?",
        answer:
          "No. Final store-plan compatibility will be published only after production and review testing. The current public description is limited to the implemented Shopify Admin and B2B workflow.",
      },
      {
        question: "Can I install it now?",
        answer:
          "A public install URL is not yet verified. Contact MerchantCanvas to discuss pilot fit or receive a launch update.",
      },
    ],
    resource: {
      title: "A practical Shopify B2B quote approval workflow",
      href: "/resources/shopify-b2b-quote-approval-workflow",
      linkLabel: "Plan a Shopify B2B quote approval workflow",
      description:
        "Map the handoffs from request to approval, revision, draft order, and buyer decision without building a second commerce system.",
    },
  },
};

export const productList = Object.values(products);

export const resources = [
  {
    slug: "shopify-quantity-breaks-guide",
    category: "Promotion operations",
    title: "Shopify quantity breaks: a practical planning guide",
    description:
      "How to structure buy-more-save-more tiers, protect margin, choose checkout logic, and test the full shopper path.",
    question:
      "How should a Shopify merchant plan quantity breaks that are understandable to shoppers and safe to operate?",
    readingTime: "9 min read",
    reviewed: "27 July 2026",
    href: "/resources/shopify-quantity-breaks-guide",
    linkLabel: "Read the quantity-break planning guide",
    accent: "coral",
  },
  {
    slug: "shopify-b2b-quote-approval-workflow",
    category: "B2B operations",
    title: "A practical Shopify B2B quote approval workflow",
    description:
      "A clear operating model for quote intake, review, approval, revision, buyer response, and draft-order conversion.",
    question:
      "What should a structured quote approval workflow look like for a Shopify B2B team?",
    readingTime: "10 min read",
    reviewed: "27 July 2026",
    href: "/resources/shopify-b2b-quote-approval-workflow",
    linkLabel: "Read the B2B quote workflow guide",
    accent: "blue",
  },
] as const;
