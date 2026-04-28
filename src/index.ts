/**
 * patchwork-css
 * Lightweight utility library for composing deterministic CSS class sets from design token configs.
 *
 * @module patchwork-css
 */

// Tokens — design token resolution and formatting
export {
  resolveScale,
  resolveTokens,
} from './tokens/resolver';
export {
  tokenPathToCSSVar,
  formatTokensAsCSS,
  formatTokensAsVarRecord,
} from './tokens/formatter';
export type {
  TokenValue,
  TokenScale,
  TokenMap,
  ResolvedTokenMap,
} from './tokens/types';

// Compose — class set composition utilities
export {
  toClassString,
  deduplicateClasses,
  compose,
} from './compose/compose';
export type {
  ComposeInput,
  ComposeOptions,
} from './compose/types';

// Variants — variant-based class resolution
export {
  normaliseClasses,
  resolveVariant,
  resolveVariants,
  variantsToClassString,
} from './variants/resolver';
export type {
  VariantMap,
  VariantConfig,
  ResolvedVariants,
} from './variants/types';

// cx — conditional class name utility
export { cx } from './cx/cx';

// Responsive — responsive class resolution
export {
  normaliseValue,
  resolveResponsive,
  resolveResponsiveAll,
} from './responsive/resolver';
export {
  buildResponsiveClasses,
  buildResponsiveClassName,
} from './responsive/builder';
export type {
  ResponsiveValue,
  ResponsiveConfig,
} from './responsive/types';

// Shorthand — shorthand property expansion
export {
  resolveShorthand,
  resolveShorthands,
  createShorthand,
} from './shorthand/shorthand';

// Theme — multi-theme CSS compilation
export {
  resolveSelector,
  compileTheme,
  compileThemes,
  themesToCSS,
} from './theme/theme';
export type {
  ThemeConfig,
  CompiledTheme,
} from './theme/types';

// Breakpoints — media query helpers
export {
  buildMediaQuery,
  resolveBreakpoints,
  findBreakpoint,
  formatBreakpointCSS,
} from './breakpoints/breakpoints';
export type {
  Breakpoint,
  BreakpointMap,
} from './breakpoints/types';
