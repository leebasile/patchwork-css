# `grid`

Utility for composing deterministic CSS grid class strings from a structured config object.

## Usage

```ts
import { gridToClassString } from 'patchwork-css/grid';

const classes = gridToClassString({
  cols: 3,
  gap: 'md',
  align: 'center',
  justify: 'between',
});
// => 'grid grid-cols-3 grid-gap-md grid-align-center grid-justify-between'
```

## API

### `gridToClassString(config, classMap?): string`

Returns a space-separated string of CSS class names derived from the provided `GridConfig`.

### `resolveGrid(config, classMap?): string[]`

Returns an array of CSS class names. Useful when you need to merge or filter before joining.

### `buildGridClassMap(prefix?): GridClassMap`

Builds the full lookup map used internally. Pass a custom `prefix` to match your CSS naming convention (default: `'grid'`).

## Config Options

| Property  | Type         | Description                          |
|-----------|--------------|--------------------------------------|
| `cols`    | `1–12 \| 'none'` | Number of grid columns            |
| `rows`    | `1–6 \| 'none'`  | Number of grid rows               |
| `flow`    | `GridFlow`   | Grid auto-flow direction             |
| `gap`     | `GridGap`    | Uniform gap between cells            |
| `gapX`    | `GridGap`    | Horizontal gap only                  |
| `gapY`    | `GridGap`    | Vertical gap only                    |
| `align`   | `GridAlign`  | `align-items` value                  |
| `justify` | `GridJustify`| `justify-content` value              |

## Gap Scale

`none` · `xs` · `sm` · `md` · `lg` · `xl` · `2xl`
