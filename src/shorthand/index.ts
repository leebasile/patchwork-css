/**
 * shorthand — map alias keys to one or more utility classes.
 *
 * @example
 * import { createShorthand } from 'patchwork-css/shorthand';
 *
 * const sh = createShorthand({
 *   'flex-center': ['flex', 'items-center', 'justify-center'],
 *   truncate: 'truncate',
 * });
 *
 * sh('flex-center truncate');
 * // => 'flex items-center justify-center truncate'
 */
export type { ShorthandMap, ShorthandOptions } from './shorthand';
export {
  resolveShorthand,
  resolveShorthands,
  createShorthand,
} from './shorthand';
