/**
 * Types for the grid utility module.
 * Provides a design-token-driven CSS grid class composer.
 */

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none';
export type GridRows = 1 | 2 | 3 | 4 | 5 | 6 | 'none';
export type GridFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
export type GridAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type GridJustify = 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface GridConfig {
  cols?: GridCols;
  rows?: GridRows;
  flow?: GridFlow;
  gap?: GridGap;
  gapX?: GridGap;
  gapY?: GridGap;
  align?: GridAlign;
  justify?: GridJustify;
}

export interface GridClassMap {
  cols: Record<string, string>;
  rows: Record<string, string>;
  flow: Record<GridFlow, string>;
  gap: Record<GridGap, string>;
  gapX: Record<GridGap, string>;
  gapY: Record<GridGap, string>;
  align: Record<GridAlign, string>;
  justify: Record<GridJustify, string>;
}
