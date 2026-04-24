# `tokens` module

The `tokens` module is the foundation of **patchwork-css**. It converts a
`DesignTokenConfig` object into a flat, deterministic list of `ResolvedToken`
records that downstream modules use to generate CSS class strings.

## Usage

```ts
import { resolveTokens } from 'patchwork-css/tokens';

const tokens = resolveTokens({
  colors: { primary: '#3b82f6', danger: '#ef4444' },
  spacing: { sm: '0.5rem', md: '1rem' },
  typography: {
    fontSizes: { base: '1rem', xl: '1.25rem' },
  },
});

console.log(tokens[0]);
// {
//   property: 'color',
//   prefix: 'text',
//   key: 'primary',
//   value: '#3b82f6',
//   className: 'text-primary',
// }
```

## Supported token categories

| Config key          | CSS property   | Class prefix  |
| ------------------- | -------------- | ------------- |
| `colors`            | `color`        | `text`        |
| `spacing`           | `margin`       | `space`       |
| `borderRadius`      | `border-radius`| `rounded`     |
| `shadows`           | `box-shadow`   | `shadow`      |
| `typography.fontSizes`    | `font-size`    | `text`        |
| `typography.fontWeights`  | `font-weight`  | `font`        |
| `typography.lineHeights`  | `line-height`  | `leading`     |
| `typography.fontFamilies` | `font-family`  | `font-family` |

## Types

See [`types.ts`](./types.ts) for full TypeScript definitions.
