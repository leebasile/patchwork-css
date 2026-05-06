/**
 * @module grid
 *
 * Utility for composing CSS grid class strings from a structured config.
 *
 * @example
 * ```ts
 * import { gridToClassString, resolveGrid, buildGridClassMap } from 'patchwork-css/grid';
 *
 * const classes = gridToClassString({ cols: 3, gap: 'md', align: 'center' });
 * // => 'grid grid-cols-3 grid-gap-md grid-align-center'
 * ```
 */

export type {
  GridCols,
  GridRows,
  GridFlow,
  GridAlign,
  GridJustify,
  GridGap,
  GridConfig,
  GridClassMap,
} from './types';

export {
  buildGridClassMap,
  resolveGrid,
  gridToClassString,
} from './grid';
