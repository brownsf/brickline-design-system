# Brickline — design system starter

An original visual direction with classic Material-inspired elevation, compact 4px corners, uppercase actions, underline inputs, and a brick / navy / parchment palette. Brickline is a working name, not a cleared brand.

## Run

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install
pnpm dev
pnpm build
```

The build type-checks TypeScript and creates a static Vite site in `dist/`.

## Use in your planned project

This is a source-owned React + TypeScript starter using shadcn conventions: `components.json`, CVA button variants, `cn`, CSS semantic tokens, Radix interaction primitives, and Tailwind v4. The components have been adapted for this theme; they are not an installed Material UI dependency. No MUI runtime is needed.

Copy `src/components/ui/`, `src/lib/utils.ts`, and the component styles into your React application. Install the dependencies declared in `package.json`. The barrel exports Button, Card, Input, Badge, Switch, Tabs, and Dialog components. Alias `@/` to your source directory. `components.json` configures future shadcn additions; review generated styles against Brickline before accepting replacements of customized components.

For tokens alone, copy `public/tokens.css` after an existing shadcn theme. Theme tokens alone change colors and radii; use Brickline's component styles for elevation, action typography, and underline input treatment. Add `.dark` to the document root to activate dark mode. `src/styles.css` contains the Tailwind semantic color mappings, reusable component rules, and playground layout rules.

## Design rules

- Brick `#B83D46` is the primary action color; Ink `#203449` provides structure.
- Parchment `#F5F1E9` adds warmth; Brass `#B78A42` is decorative, not small text on a light background.
- Use an 8px layout grid, 4px adjustments for compact controls, 4px surface corners, and circular floating actions.
- Elevation 0: canvas; 1: cards; 2: raised actions; 3: dialogs. Avoid shadows on every nested element.
- Roboto is loaded from Google Fonts with Arial/sans-serif fallback. Self-host it if your app requires offline fonts or a strict content security policy.
- Actions use uppercase 10px labels in this documentation layout. Increase control density and type sizes to suit the final product; this is a starting point, not a frozen specification.

## Included behavior

Section search/navigation, copyable color values, downloadable theme tokens, source example, theme switch, mobile navigation, buttons, checkboxes, linked switches, tabs, accessible Radix dialogs, and a demo project form that updates its preview card. Demo data and settings are memory-only and reset on reload. Avatar initials are decorative examples.

Radix provides behavior for the complex controls. The starter includes visible focus styles, labeled inputs, status announcements, and reduced-motion support. Full product-level accessibility validation will depend on the final compositions and content.

## Scope and branding

No team name, logo, bird illustration, monogram, uniform motif, or team lettering is included. The theme is independently drawn and uses its own palette. This does not establish trademark clearance or guarantee freedom from legal issues; review the eventual product name and identity before a commercial launch.

This first release is a starter, not a complete component catalog or a published npm package. Tables, menus, select/combobox, date picker, form validation, and a distribution registry can be added once the planned product's needs are defined.
