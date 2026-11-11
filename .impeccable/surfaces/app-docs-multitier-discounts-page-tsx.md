---
version: 1
slug: "app-docs-multitier-discounts-page-tsx"
primary_target: "app/docs/multitier-discounts/page.tsx"
related_targets: ["app/docs/multitier-discounts/GuideControls.tsx","app/docs/multitier-discounts/guide.module.css","app/docs/page.tsx"]
---

Scope: the MTD merchant manual and its documentation index inside the established MerchantCanvas site. Mode: Read. Root DESIGN.md remains the visual authority; this brief records only the built documentation surface.

Reader job: locate a campaign task, follow the illustrated instructions, open an optional tutorial, and test the real cart. The manual contains 17 anchored sections and 13 tutorial disclosures. Original section, tutorial and alias IDs, source edition dates, cautions and synthetic-demo labels remain intact.

First viewport: a compact breadcrumb and title lead into the source edition note and links to first setup, product plans and setup help. Desktop contents sit beside the first chapter rather than forming a separate marketing hero. The /docs index provides one direct route to this manual.

Reading layout: the desktop grid uses a 245px contents column and a flexible article with a 48px gap; at 980px it becomes 200px with a 28px gap. Contents are sticky below the site header and scroll within the viewport. At 760px and below, the layout becomes one column and a native collapsed contents disclosure replaces the desktop navigation. Prose paragraphs have a 75ch maximum; the article allows wider figures and locally scrollable tables.

Visual treatment: the surface inherits MerchantCanvas typography and semantic light/dark colors. The manual uses fixed rem heading sizes, a 1.75 reading line-height, one-pixel section rules, and 8px image, table and tutorial enclosures. Links use the existing interactive accent and underlines. The 29 guide screenshots and 13 tutorial posters have physical width/height attributes; no decorative imagery replaces the real demo evidence.

Tutorial behavior: native details/summary controls preserve reading and keyboard affordances. A matching tutorial hash opens its disclosure without connecting to YouTube. Only the explicit Load YouTube video action mounts the privacy-enhanced iframe, which then receives focus. Closing the disclosure unloads it. English transcript, YouTube, caption-file and tutorial-permalink links remain available independently of the embed. There is no popup or modal player.

Continuation: product/plan and support links remain part of the manual, with application-policy links kept distinct from website policies. The original guide host remains unchanged and reachable; publishing this copy does not move the application, authentication or installation flow, and does not certify all production configurations.
