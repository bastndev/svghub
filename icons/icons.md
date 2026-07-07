# Adding icons

This folder is the single source of truth. `bun run build:icons` (part of
`bun run build`) turns every `.svg` file here into `src/core/icons.gen.ts` and
the published `svg/` output — nothing else needs to be touched.

## Folder = category, automatically

```
icons/
├── social/
│   ├── github.svg
│   └── x.svg
└── tools/          ← a new folder is a new category, no script changes needed
    └── wrench.svg
```

The generator walks every subfolder of `icons/` and reads the immediate
parent folder name as the icon's `category`. Icon **filenames must be unique
across the whole tree** (not just within a folder) — the build fails loudly
if two categories both contain e.g. `home.svg`.

## What the generator normalizes for you (don't worry about these)

Only two things are ever read out of your source file: the `viewBox`
attribute and each `<path d="...">` value. Everything else you put on the
`<svg>` or `<path>` tags — `stroke`, `stroke-width`, `fill`, `stroke-linecap`
— is discarded and replaced with a fixed style at build time:

```
fill="none" stroke="currentColor" stroke-width="2"
stroke-linecap="round" stroke-linejoin="round"
```

So stroke width/color/cap style can never drift between icons — don't spend
time matching those by hand.

The generator also strips the standard Tabler "canvas bounds" helper path
(`<path d="M0 0h24v24H0z" .../>`) if present. If your source tool doesn't
emit that helper, nothing changes — it's a no-op removal, not a requirement.

## What you're actually responsible for

1. **Path geometry** — the actual shape. Obviously can't be automated.
2. **`viewBox`** — this is the one real lever over apparent icon *size*.
   `viewBox="0 0 24 24"` is the default 24×24 canvas. A tighter box like
   `viewBox="2 2 20 20"` crops in and renders the icon visibly larger at the
   same `size=` attribute. This repo's existing icons intentionally use
   different crops per icon to make them read as the same optical size —
   that's a deliberate design decision, not an inconsistency to "fix."
   A script can't reliably judge "does this look the same size as the
   others" — that needs a human/visual check. **Use the preview page below
   before publishing any new icon.**
3. **Filename** — kebab-case, matches the icon's public name exactly
   (`arrow-up.svg` → usable as `name="arrow-up"`).


<!-- no aplicar -->
<!-- ## Before publishing a new batch: `preview/index.html`

Run `bun run build` then open `preview/index.html` (or `bun run preview` if
you add a static server) — it renders every icon currently in the registry,
grouped by category, at a fixed size. This is the fast way to eyeball a new
icon next to existing ones and catch a wrong viewBox crop before it ships. -->
