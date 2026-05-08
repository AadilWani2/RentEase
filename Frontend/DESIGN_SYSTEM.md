# Design System Document: The Editorial Noir

## 1. Overview & Creative North Star
**Creative North Star: "The Obsidian Gallery"**

This design system is not a template; it is a curated digital environment. It moves away from the "boxy" constraints of standard social media platforms and embraces the aesthetics of high-end editorial magazines and luxury dark-mode interfaces. 

To achieve a "High-End" feel, we rely on **Tonal Depth** and **Intentional Asymmetry**. Instead of centering everything, we use whitespace (or "dark-space") as a structural element. Elements should feel like they are floating in a deep, vast space, organized by weight and light rather than rigid lines. This system prioritizes the content as art, using the `primary` and `secondary` accents only to guide the eye toward interactive "light sources" within the charcoal void.

---

## 2. Colors: Tonal Architecture
The palette is rooted in deep charcoals to reduce eye strain and elevate the perceived value of imagery.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** 1px solid lines are the hallmark of generic UI. In this system, boundaries are defined strictly through background shifts. For example, a feed post (`surface-container-low`) sits on the main `background` without a stroke. The change in hex value is the border.

### Surface Hierarchy & Nesting
We use a "Physical Stack" mental model. The darker the surface, the "further back" it sits.
*   **Base Level:** `surface` (#0e0e0e) — The infinite canvas.
*   **Secondary Level:** `surface-container-low` (#131313) — For main content cards.
*   **Interaction Level:** `surface-container-high` (#201f1f) — For hovered states or nested comments.
*   **Floating Level:** `surface-container-highest` (#262626) — For modals and temporary overlays.

### The "Glass & Gradient" Rule
To break the flatness of dark mode, use **Glassmorphism**. Floating headers or navigation bars should use `surface` at 70% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** For high-impact CTAs, use a linear gradient from `primary` (#bd9dff) to `primary-dim` (#8952f0) at a 135-degree angle. This adds "soul" and a sense of liquid light.

---

## 3. Typography: Editorial Authority
We pair **Plus Jakarta Sans** (Display/Headlines) with **Inter** (Body/Labels) to create a sophisticated tension between modern geometry and utilitarian legibility.

*   **Display & Headlines (Plus Jakarta Sans):** Use `display-lg` for impactful quotes or hero moments. The tight letter-spacing and bold weight convey authority.
*   **Body & Titles (Inter):** `body-md` is our workhorse. Inter’s tall x-height ensures that even at `0.875rem`, text remains razor-sharp against the dark `surface`.
*   **Hierarchy Tip:** Never use pure white (#ffffff) for secondary metadata. Use `on-surface-variant` (#adaaaa) to create a natural visual recession for timestamps or view counts.

---

## 4. Elevation & Depth: Light & Shadow

### The Layering Principle
Avoid the "Shadow Gallery." Instead of adding shadows to every card, use **Tonal Layering**. A `surface-container-low` card placed on a `surface` background creates a "Soft Lift." 

### Ambient Shadows
If an element must float (like a FAB or a Dropdown), use a shadow that mimics a soft light source:
*   **Shadow Color:** `surface-container-lowest` (#000000) at 40% opacity.
*   **Blur:** `30px` to `50px`.
*   **Spread:** `-5px` (to keep the shadow tucked and elegant).

### The "Ghost Border" Fallback
In rare cases where accessibility requires a container edge (e.g., an input field), use a **Ghost Border**: `outline-variant` (#484847) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-dim`), `on-primary` text, `full` roundedness. No shadow.
*   **Secondary:** Ghost style. No fill, `Ghost Border` (20% opacity), `primary` text color.
*   **Interaction:** On hover, the `surface-tint` should create a subtle outer glow (glow-spread: 2px).

### Cards (Posts)
*   **Style:** `surface-container-low` background, `xl` (0.75rem) corner radius.
*   **Spacers:** Absolutely no dividers. Use `1.5rem` of vertical padding between content blocks (text vs. image).
*   **Media:** Images should have a `sm` (0.125rem) ghost border to separate dark photography from the dark UI.

### Inputs & Search
*   **Base:** `surface-container-highest` fill, `md` roundedness. 
*   **State:** On focus, transition the border to a 50% opacity `primary` color and apply a subtle backdrop-blur.

### Signature Component: The "Reaction Glow"
Instead of standard gray buttons for "Like" or "Share," use a `tertiary-container` (#fe81a4) subtle glow behind the icon when active. This mimics a neon light reflecting off a dark street.

---

## 6. Do's and Don'ts

### Do
*   **DO** use extreme vertical spacing. High-end design needs room to breathe.
*   **DO** use `tertiary` (#ff97b2) for "High-Energy" interactions like notifications or live status.
*   **DO** use asymmetrical layouts (e.g., a left-aligned headline with a right-aligned timestamp) to create an editorial feel.

### Don'ts
*   **DON'T** use 100% white (#ffffff) for long-form body text; it causes "halation" on dark backgrounds. Use `on-surface` at 90% opacity.
*   **DON'T** use sharp corners. This system relies on the `xl` (0.75rem) and `lg` (0.5rem) tokens to feel organic and premium.
*   **DON'T** use standard "Drop Shadows." Use tonal shifts first, glassmorphism second, and ambient blurs only as a last resort.
