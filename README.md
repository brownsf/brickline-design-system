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

## Storybook

Requires Node.js 20.19+ or 22.12+. Storybook 10.6 uses the project's React/Vite setup and Brickline styles.

```sh
pnpm storybook
```

Open `http://127.0.0.1:6006`. Use the **Theme** toolbar menu for light/dark mode, **Controls** to edit props, **Docs** for generated API documentation, and **Accessibility** to inspect issues. The theme also applies to portaled dialogs. Accessibility findings are advisory; adding the addon does not establish an accessibility pass.

```sh
pnpm typecheck
pnpm build-storybook
```

The static catalog is generated in `storybook-static/` and is excluded from Git. Type checking includes the stories, Storybook configuration, and Vite configuration. Storybook is a development dependency; the application bundle does not import the stories.

### GitHub Pages deployment

The `Deploy Storybook to GitHub Pages` workflow builds, type-checks, and deploys Storybook on every push to `main`. It can also be started from the repository's **Actions** tab with **Run workflow** on `main`.

Before the first deployment, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Push the workflow to `main` to deploy. No custom deployment secret is required; the workflow uses GitHub's built-in token with Pages and OIDC permissions limited to the deployment job.

The published catalog will be available at <https://brownsf.github.io/brickline-design-system/> after a successful deployment. The deployment job also links to the published URL in the `github-pages` environment.

The component stories live beside the UI code in `src/components/ui/*.stories.tsx`:

| Family | Examples |
| --- | --- |
| Button | All five variants, small/icon sizes, disabled, icons, floating action, and asChild link |
| Input | Empty, filled, disabled, read-only, password, validation error, and typing |
| Forms | Field/Label associations and validation, Textarea, Checkbox, Radio Group, and native Select; keyboard interaction and disabled states |
| Card | Basic surface, actions, and semantic article composition |
| Badge | Default, ready, draft, and status comparison |
| Switch | On/off, disabled states, and controlled interaction synchronized with Controls |
| Tabs | Default/alternate selection, disabled tab, card composition, and keyboard navigation |
| Dialog | Basic modal, initially open, dismissal/focus return, and a controlled project form |

Dialog stories document and exercise DialogTrigger, DialogContent, DialogTitle, DialogDescription, and DialogClose. Tabs stories include TabsList, TabsTrigger, and TabsContent. `buttonVariants` is a styling utility rather than a rendered component; its options are covered by the Button stories and Controls.

Stories with `play` functions exercise button callbacks, text entry, switch click/Space input, tab arrow keys, dialog Escape/Cancel dismissal, focus return, and form submission. Open an individual story to run its interaction steps and inspect the Interactions panel. A static build compiles these examples but does not execute browser interactions; browser execution is a separate verification step. The initially open modal is excluded from Autodocs so it cannot block the rest of the documentation page.

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

This first release is a starter, not a complete component catalog or a published npm package. Tables, menus, combobox, date picker, schema-based form validation, and a distribution registry can be added once the planned product's needs are defined.

### Form controls

Import `Field`, `Label`, `Textarea`, `Checkbox`, `RadioGroup`, `RadioGroupItem`, and `Select` from `src/components/ui`. These controls use native HTML behavior and the active light/dark theme. `Select` accepts native `option` and `optgroup` children. Checkbox and radio inputs use `checked`/`onChange` or `defaultChecked`; select and textarea use `value`/`onChange` or `defaultValue`.

`Field` connects a visible label, description, and error message to one control through a render function:

```tsx
<Field label="Project description" description="Describe your project." error={error}>
  {controlProps => <Textarea {...controlProps} name="description" required />}
</Field>
```

Wrap each checkbox or radio in a visible label, or associate a `Label` using `htmlFor` and `id`. `RadioGroup` provides a fieldset and legend and shares a generated name between its items; provide an explicit `name` for form submission. Use a different group name for each independent question. `Field` displays supplied errors; validation logic remains with the consuming form.
