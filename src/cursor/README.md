# `cursor` — patchwork-css

Generate deterministic CSS cursor utility classes from a design token config.

## Usage

```ts
import { buildCursorClassMap, formatCursorCSS, resolveCursor } from 'patchwork-css/cursor';

const config = {
  cursors: {
    default: 'default',
    pointer: 'pointer',
    disabled: 'not-allowed',
    custom: 'https://cdn.example.com/cursors/hand.png',
  },
  prefix: 'cursor',
};
```

### `buildCursorClassMap(config)`

Returns a map of token names to generated CSS class strings.

```ts
const map = buildCursorClassMap(config);
// { default: 'cursor-default', pointer: 'cursor-pointer', ... }
```

### `formatCursorCSS(config)`

Returns a CSS string with one rule per token.

```ts
const css = formatCursorCSS(config);
// .cursor-pointer { cursor: pointer; }
// .cursor-disabled { cursor: not-allowed; }
// .cursor-custom { cursor: url(https://cdn.example.com/cursors/hand.png), auto; }
```

### `resolveCursor(token, config)`

Looks up a single token and returns its class name, or `undefined` if not found.

```ts
resolveCursor('pointer', config); // 'cursor-pointer'
resolveCursor('missing', config); // undefined
```

## Custom Cursors

Any value that is not a recognised CSS cursor keyword and does not already start
with `url(` will be automatically wrapped: `url(<value>), auto`.

## Types

| Type | Description |
|---|---|
| `CursorKeyword` | Union of all standard CSS cursor keywords |
| `CursorConfig` | Input config with `cursors` map and optional `prefix` |
| `CursorClassMap` | Output map of token → class name |
