# `animate` — Animation Token Resolver

The `animate` module converts animation design tokens into deterministic CSS utility classes and stylesheet strings.

## Usage

```ts
import { resolveAnimations, animationClassMap } from 'patchwork-css/animate';

const tokens = {
  fade: {
    name: 'fadeIn',
    duration: 300,
    easing: 'ease-in-out',
    fillMode: 'both',
  },
  spin: {
    name: 'spin',
    duration: '1s',
    iterations: 'infinite',
  },
};

const { classMap, css } = resolveAnimations(tokens);
// classMap => { fade: 'anim-fade', spin: 'anim-spin' }
```

## API

### `resolveAnimations(tokens, prefix?)`

Resolves all tokens in the map. Returns `{ classMap, css }`.

- `classMap` — `Record<string, string>` mapping token keys to class names.
- `css` — A CSS string with one rule per token.

### `animationClassMap(tokens, prefix?)`

Convenience wrapper that returns only the `classMap`.

### `resolveAnimation(key, token, prefix?)`

Resolves a single token. Returns `{ key, className, css }`.

### `buildAnimationValue(token)`

Builds the CSS `animation` shorthand string from an `AnimationToken`.

### `normaliseDuration(value)`

Normalises a duration to a CSS string (`300` → `"300ms"`, `"0.3s"` → `"0.3s"`).

## Token Shape

```ts
interface AnimationToken {
  name?: string;          // @keyframes name
  duration?: string | number;
  easing?: string;
  delay?: string | number;
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}
```

## Custom Prefix

Pass a second argument to change the class prefix (default: `"anim"`):

```ts
resolveAnimations(tokens, 'motion');
// => { fade: 'motion-fade', ... }
```
