# compose

The `compose` module provides a lightweight, type-safe API for building
deterministic CSS class strings from **variant configs** — similar in spirit to
`cva` or `stitches`, but designed to integrate naturally with patchwork-css
design tokens.

## Usage

```ts
import { compose } from "patchwork-css/compose";

const btn = compose({
  base: "btn",
  variants: {
    size: { sm: "btn-sm", md: "btn-md", lg: "btn-lg" },
    intent: { primary: "btn-primary", danger: "btn-danger" },
  },
  defaultVariants: { size: "md", intent: "primary" },
  compoundVariants: [
    { variants: { size: "lg", intent: "danger" }, classes: "btn-loud" },
  ],
});

btn();                            // "btn btn-md btn-primary"
btn({ size: "lg" });              // "btn btn-lg btn-primary"
btn({ size: "lg", intent: "danger" }); // "btn btn-lg btn-danger btn-loud"
```

## API

### `compose(config)(selection?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `config.base` | `string \| string[]` | Classes always applied |
| `config.variants` | `Record<string, ClassVariantMap>` | Named variant groups |
| `config.defaultVariants` | `Record<string, string>` | Fallback variant values |
| `config.compoundVariants` | `CompoundVariant[]` | Classes applied when multiple variants match |

Returns a **resolver function** that accepts a `VariantSelection` and returns a
space-separated, deduplicated `string`.

## Design goals

- **Deterministic** — same inputs always produce the same output.
- **Zero runtime dependencies** — pure function, no external libraries.
- **Tree-shakeable** — only import what you use.
