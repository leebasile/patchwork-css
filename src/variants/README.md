# variants

The `variants` module lets you define named groups of mutually-exclusive class
options and resolve them to a flat, deduplicated class string at runtime.

## Concepts

| Term | Description |
|------|-------------|
| `VariantDefinition` | A named group with a map of option keys → class value(s) |
| `VariantConfig` | A set of definitions paired with the currently selected options |
| `ResolvedVariant` | The resolved output: variant name, chosen key, and class array |

## Usage

```ts
import {
  resolveVariants,
  variantsToClassString,
} from 'patchwork-css/variants';

const classes = variantsToClassString(
  resolveVariants({
    definitions: [
      {
        name: 'color',
        options: {
          primary: 'text-blue-500',
          danger: ['text-red-600', 'font-semibold'],
        },
        defaultOption: 'primary',
      },
      {
        name: 'size',
        options: { sm: 'text-sm', lg: 'text-lg' },
      },
    ],
    selected: { color: 'danger', size: 'sm' },
  })
);
// → 'text-red-600 font-semibold text-sm'
```

## API

### `resolveVariant(definition, selectedOption)`

Resolves a single `VariantDefinition` against an option key. Returns a
`ResolvedVariant` or `null` when the option cannot be resolved.

### `resolveVariants(config)`

Resolves all definitions in a `VariantConfig`, skipping entries that have no
resolvable option.

### `variantsToClassString(resolved)`

Flattens an array of `ResolvedVariant` objects into a single space-separated,
deduplicated class string ready for use in a `className` prop.
