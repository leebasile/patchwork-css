/**
 * Cursor module — patchwork-css
 *
 * Generates deterministic CSS cursor utility classes from a token config.
 *
 * @example
 * ```ts
 * import { buildCursorClassMap, formatCursorCSS } from 'patchwork-css/cursor';
 *
 * const config = {
 *   cursors: { default: 'default', pointer: 'pointer', disabled: 'not-allowed' },
 *   prefix: 'cursor',
 * };
 *
 * const map = buildCursorClassMap(config);
 * // { default: 'cursor-default', pointer: 'cursor-pointer', disabled: 'cursor-disabled' }
 *
 * const css = formatCursorCSS(config);
 * // .cursor-default { cursor: default; }
 * // .cursor-pointer { cursor: pointer; }
 * // .cursor-disabled { cursor: not-allowed; }
 * ```
 */

export type { CursorKeyword, CursorConfig, CursorClassMap } from './types';
export {
  isCursorKeyword,
  normaliseCursorValue,
  buildCursorClassMap,
  formatCursorCSS,
  resolveCursor,
} from './cursor';
