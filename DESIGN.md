---
name: "MerchantCanvas"
description: "A vivid, workflow-first design system for a focused Shopify app portfolio."
colors:
  light-canvas: "#f7f9ff"
  light-paper: "#ffffff"
  light-paper-soft: "#edf2ff"
  light-ink: "#07142e"
  light-ink-soft: "#2c3953"
  light-muted: "#526079"
  light-line: "#cfd8ef"
  light-cobalt: "#164bff"
  light-cobalt-hover: "#0d3fe3"
  light-sun: "#ffd51e"
  light-promo-surface: "#e4ebff"
  light-b2b-ink: "#8b6f00"
  light-b2b-surface: "#fff0a8"
  dark-canvas: "#06131f"
  dark-paper: "#0c2131"
  dark-paper-soft: "#0a1a28"
  dark-ink: "#f5fbff"
  dark-ink-soft: "#d3e1eb"
  dark-muted: "#a8bdcc"
  dark-line: "#284154"
  dark-azure: "#3e9bff"
  dark-azure-hover: "#69b0ff"
  dark-coral: "#ff725b"
  dark-promo-surface: "#0e3155"
  dark-b2b-accent: "#ff8b77"
  dark-b2b-surface: "#4b211c"
  dark-footer: "#040c14"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.7rem, 4vw, 3.4rem)"
    fontWeight: 780
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.1rem)"
    fontWeight: 780
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.55rem, 2.8vw, 2.2rem)"
    fontWeight: 780
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.58
  action:
    fontFamily: "Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1
  label:
    fontFamily: "Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 760
    lineHeight: 1.25
rounded:
  sm: "8px"
  nav: "9px"
  field: "10px"
  md: "14px"
  card: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  section: "clamp(72px, 8vw, 104px)"
components:
  button-primary-light:
    backgroundColor: "{colors.light-cobalt}"
    textColor: "{colors.light-paper}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-primary-dark:
    backgroundColor: "{colors.dark-azure}"
    textColor: "{colors.dark-canvas}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-secondary-light:
    backgroundColor: "{colors.light-paper}"
    textColor: "{colors.light-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-secondary-dark:
    backgroundColor: "{colors.dark-paper}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  eyebrow-light:
    backgroundColor: "{colors.light-sun}"
    textColor: "{colors.light-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  eyebrow-dark:
    backgroundColor: "{colors.dark-coral}"
    textColor: "{colors.dark-canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  app-card-light:
    backgroundColor: "{colors.light-promo-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 4vw, 44px)"
  app-card-dark:
    backgroundColor: "{colors.dark-promo-surface}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 4vw, 44px)"
  input-light:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "13px 14px"
  input-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "13px 14px"
  navigation-link-light:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-ink-soft}"
    typography: "{typography.action}"
    rounded: "{rounded.nav}"
    padding: "0 12px"
    height: "40px"
  navigation-link-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-ink-soft}"
    typography: "{typography.action}"
    rounded: "{rounded.nav}"
    padding: "0 12px"
    height: "40px"
  proof-strip:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-muted}"
    typography: "{typography.label}"
    padding: "0 22px"
    height: "58px"
---

# Design System: MerchantCanvas

## Overview

**Creative North Star: "The Product Swatch Book"**

MerchantCanvas behaves like a compact product index: vivid swatches orient the visitor, precise lines separate choices, and every surface helps someone choose a real Shopify workflow. The system is direct, bright, and operational rather than theatrical. Its personality comes from confident color fields and dense sans-serif hierarchy, not oversized editorial type or decorative diagrams.

The light and dark themes are related but intentionally authored as different skies. Light mode combines clean cloud fields with cobalt and sun; dark mode combines deep-sea fields with azure and coral. Both retain the same information hierarchy, restrained geometry, and evidence-first tone.

**Key Characteristics:**

- Compact, high-weight sans-serif headlines that leave room for product meaning.
- Hard color zones that distinguish actions, products, and workflow routes.
- Precise one-pixel borders and restrained corners instead of soft, inflated cards.
- A two-theme palette with equal clarity and contrast rather than a mechanical inversion.
- Product evidence and named routes before decorative brand expression.

## Colors

The palette uses vivid signals against cool, clean neutrals: cobalt and sun in light mode; azure and coral in dark mode.

### Primary

- **Signal Cobalt** (`light-cobalt`, #164bff): Drives primary actions, promotion routes, links, focus, and selected emphasis on light surfaces.
- **Night Azure** (`dark-azure`, #3e9bff): Replaces cobalt as the primary action and promotion signal on deep-sea surfaces.

### Secondary

- **Daylight Sun** (`light-sun`, #ffd51e): Marks compact labels, selection, and small moments of orientation in light mode.
- **Signal Coral** (`dark-coral`, #ff725b): Marks compact labels, focus, selection, and urgent validation in dark mode.

### Tertiary

- **Wholesale Ochre** (`light-b2b-ink`, #8b6f00): Gives the B2B workflow a readable identity on its pale sun field.
- **Wholesale Coral** (`dark-b2b-accent`, #ff8b77): Distinguishes the B2B workflow from promotion routes in dark mode.

### Neutral

- **Cloud Canvas** (`light-canvas`, #f7f9ff): The primary light-mode page field.
- **White Paper** (`light-paper`, #ffffff): Navigation, cards, fields, and contained surfaces in light mode.
- **Blue Mist** (`light-paper-soft`, #edf2ff): Alternating light sections.
- **Midnight Ink** (`light-ink`, #07142e): Primary text and inverse light-mode surfaces.
- **Slate Copy** (`light-ink-soft`, #2c3953): Body text on light surfaces.
- **Quiet Slate** (`light-muted`, #526079): Metadata and supporting labels.
- **Cool Rule** (`light-line`, #cfd8ef): Dividers and structural borders.
- **Deep-Sea Canvas** (`dark-canvas`, #06131f): The primary dark-mode page field.
- **Harbor Paper** (`dark-paper`, #0c2131): Navigation, cards, and contained dark surfaces.
- **Deep-Sea Soft** (`dark-paper-soft`, #0a1a28): Alternating dark sections.
- **Ice Ink** (`dark-ink`, #f5fbff): Primary text on dark surfaces.
- **Mist Copy** (`dark-ink-soft`, #d3e1eb): Body text on dark surfaces.
- **Harbor Muted** (`dark-muted`, #a8bdcc): Dark-mode metadata and supporting labels.
- **Harbor Rule** (`dark-line`, #284154): Dark-mode dividers and structural borders.

**The Two-Sky Rule.** Light mode stays cobalt-and-sun; dark mode stays azure-and-coral. Never invert one palette mechanically into the other.

**The Route-First Rule.** Use vivid color to identify a workflow, action, or state; do not scatter it as decoration.

## Typography

**Display Font:** Plus Jakarta Sans (bundled from Google Fonts, with Helvetica Neue, Arial, and sans-serif fallbacks)  
**Body Font:** Plus Jakarta Sans (bundled from Google Fonts, with Helvetica Neue, Arial, and sans-serif fallbacks)

**Character:** Plus Jakarta Sans gives the portfolio a professional, contemporary voice with visibly geometric forms that do not read like a browser-default UI font. Heavy, tightly tracked headings provide confidence; calm body copy carries product detail without competing with the routes.

### Hierarchy

- **Display** (780, `clamp(2.7rem, 4vw, 3.4rem)`, 0.99): Homepage and major page offers; keep lines short and leave adjacent room for routes or evidence.
- **Headline** (780, `clamp(2rem, 3.6vw, 3.1rem)`, 1.02): Section-level decisions and major explanatory headings.
- **Title** (780, `clamp(1.55rem, 2.8vw, 2.2rem)`, 1.04): Product routes and card titles.
- **Body** (400, 1rem, 1.58): Explanations and evidence; keep primary reading lines near 48–68 characters where layout permits.
- **Action** (700, 0.9rem, 1): Buttons and navigation actions.
- **Label** (760, 0.72rem, 1.25): Eyebrows, route categories, status, and proof-strip facts.

**The Compact Voice Rule.** A headline must explain the offer before it dominates the viewport; never scale type merely to create spectacle.

## Layout

The system uses a centered 1240px maximum container with 24px desktop gutters and 16px mobile gutters. All component spacing comes from the 8, 12, 16, 24, 32, 48, and 64px scale; sections use a fluid 72–104px vertical rhythm. Primary desktop compositions pair a larger explanatory column with a smaller route or evidence column, then collapse to one column below 980px. Product and resource collections use two equal columns and collapse below 760px.

The homepage stages the offer and actions on the left, two named product routes on the right, and a four-cell proof strip beneath. Section headings keep explanation beside the heading on wide screens, then stack with a 20px gap. Mobile removes decorative hover displacement, changes the proof strip from four columns to two and then one, and keeps all core actions touch-friendly.

**The First-Viewport Rule.** The first screen must identify MerchantCanvas, name both product routes, and expose a next action without requiring interpretation.

## Elevation & Depth

The system is flat by default. One-pixel rules and tonal surface changes establish structure; low ambient shadows are reserved for the hero route selector, product screenshots, floating mobile navigation, and consent surfaces. Light mode uses a blue-cast ambient shadow (`0 18px 48px rgba(19, 43, 101, 0.12)`) and a smaller evidence shadow (`0 10px 28px rgba(19, 43, 101, 0.1)`). Dark mode uses deeper neutral shadows (`0 20px 54px rgba(0, 0, 0, 0.26)` and `0 12px 30px rgba(0, 0, 0, 0.22)`).

**The Flat-by-Default Rule.** Cards rest on color and borders; add shadow only when a surface floats, opens, or frames real product evidence.

## Shapes

Most containers use restrained 16px corners, with 14px reserved for compact menus and selected supporting panels. Fields use 10px corners and navigation links use 9px. Buttons and compact eyebrow labels use full pill geometry, while proof strips, comparison rows, workflow lists, and internal card divisions rely on hard one-pixel rules.

Circular shapes are limited to status dots and the 42px theme toggle. Workflow numbers use compact 10px rounded squares so their order is visible without looking decorative. Rounded clipping belongs to a complete container; adjacent rows inside it remain square so the product-index structure stays precise.

**The Precision-over-Plush Rule.** Use one restrained outer radius and hard internal divisions; do not turn every nested element into a rounded card.

## Components

Components feel direct, crisp, and confident: bright actions, clear borders, compact labels, and quiet state motion.

### Buttons

- **Shape:** Full pill with a 48px minimum height and 20px horizontal padding.
- **Primary:** Signal Cobalt with white text in light mode; Night Azure with Deep-Sea Canvas text in dark mode.
- **Hover / Focus:** Shift to the theme-specific primary hover color and lift by 1px over 160ms; use a 3px theme focus outline with a 4px offset.
- **Secondary / Quiet:** Paper-colored surface, current ink, and a one-pixel rule; hover moves to the promotion surface and primary border.
- **Small:** A 40px minimum height with 16px horizontal padding.

### Chips

- **Style:** Eyebrows use Daylight Sun with Midnight Ink in light mode and Signal Coral with Deep-Sea Canvas in dark mode. Padding is 5px by 9px with full pill geometry.
- **State:** Chips label category or context; they are not decorative badges or substitute buttons.

### Cards / Containers

- **Corner Style:** Restrained outer corners (16px), with square internal route divisions.
- **Background:** Paper for neutral cards; promotion and B2B surfaces provide hard workflow color zones.
- **Shadow Strategy:** Flat at rest except for the hero selector and evidence surfaces.
- **Border:** One-pixel Cool Rule or Harbor Rule.
- **Internal Padding:** Fluid 28–44px for product cards; 18–22px for compact rows.

### Inputs / Fields

- **Style:** Canvas-colored field, one-pixel structural border, 10px corners, and 13px by 14px padding.
- **Focus:** Primary border plus the global 3px visible focus outline.
- **Error / Disabled:** Invalid fields shift the border to the theme accent; labels keep required and optional status in muted text.

### Navigation

The sticky header uses a 72px grid, a production logo lockup, compact 40px links, one primary portfolio action, and a circular 42px theme toggle. Light and dark logo assets switch with the theme. At 980px, desktop links become a pill-shaped Menu trigger and a 240px bordered dropdown; each mobile route has a 48px minimum hit area.

### Product Route

The product route is the signature component. A category label, named app, short operational definition, and directional arrow sit in one colored zone. Routes stack inside a single 16px container with one-pixel internal divisions; hover shifts content by no more than 8px and the arrow by 3px.

### Proof Strip

The proof strip is a low-height evidence row rather than a metric boast. Four equal cells use muted 0.72rem labels, one-pixel divisions, and no shadow; the first fact takes the primary color. It becomes two columns and then one on small screens.

### Lists

Lists use crisp Lucide Check or X vectors rather than text glyphs or dots. The icon is 16px, aligns with the first text line, and carries meaning through shape as well as color. Divider lists never draw a rule below their final item.

### Workflow Steps

Workflow order uses 44px numbered badges on desktop and 40px badges on mobile. The gap from badge to title is 32px on desktop and 16px on mobile. Desktop separators belong to the intrinsic content height of each step rather than stretching to fill the section; mobile steps use bottom dividers except on the final item.

**The Action Hierarchy Rule.** Give each decision area one filled primary action; secondary choices use bordered buttons or directional text links.

## Do's and Don'ts

### Do:

- **Do** route visitors with named apps, workflow categories, and implementation-backed evidence.
- **Do** use Cobalt + Sun in light mode and Azure + Coral in dark mode.
- **Do** keep headings compact enough that product meaning and the next action share the first viewport.
- **Do** use one-pixel lines, restrained outer corners, and square internal divisions to make choices scannable.
- **Do** use the shared spacing scale for label-to-title, title-to-copy, and copy-to-action relationships.
- **Do** use Lucide vectors for list-state icons and remove trailing list dividers.
- **Do** preserve visible focus, reduced-motion behavior, and 40–48px interactive targets.

### Don't:

- **Don't** return to warm cream-heavy surfaces or oversized editorial serif headlines.
- **Don't** use ornamental workflow diagrams, generic SaaS dashboards, or fabricated product evidence.
- **Don't** decorate unrelated elements with both accent colors; color must carry route, action, or state meaning.
- **Don't** use text characters, tiny dots, or same-color-on-same-color labels as interface icons.
- **Don't** wrap every sentence, statistic, or nested element in its own rounded card.
- **Don't** make dark mode a simple inversion of the light palette.
