/**
 * Grid utility — composes deterministic CSS grid class sets from a config object.
 */

import type { GridConfig, GridClassMap, GridCols, GridRows, GridGap } from './types';

const COLS: GridCols[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'none'];
const ROWS: GridRows[] = [1, 2, 3, 4, 5, 6, 'none'];
const GAPS: GridGap[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export function buildGridClassMap(prefix = 'grid'): GridClassMap {
  const cols = Object.fromEntries(
    COLS.map((c) => [String(c), `${prefix}-cols-${c}`])
  ) as Record<string, string>;

  const rows = Object.fromEntries(
    ROWS.map((r) => [String(r), `${prefix}-rows-${r}`])
  ) as Record<string, string>;

  const gap = Object.fromEntries(
    GAPS.map((g) => [g, `${prefix}-gap-${g}`])
  ) as GridClassMap['gap'];

  const gapX = Object.fromEntries(
    GAPS.map((g) => [g, `${prefix}-gap-x-${g}`])
  ) as GridClassMap['gapX'];

  const gapY = Object.fromEntries(
    GAPS.map((g) => [g, `${prefix}-gap-y-${g}`])
  ) as GridClassMap['gapY'];

  return {
    cols,
    rows,
    flow: {
      row: `${prefix}-flow-row`,
      col: `${prefix}-flow-col`,
      dense: `${prefix}-flow-dense`,
      'row-dense': `${prefix}-flow-row-dense`,
      'col-dense': `${prefix}-flow-col-dense`,
    },
    gap,
    gapX,
    gapY,
    align: {
      start: `${prefix}-align-start`,
      end: `${prefix}-align-end`,
      center: `${prefix}-align-center`,
      stretch: `${prefix}-align-stretch`,
      baseline: `${prefix}-align-baseline`,
    },
    justify: {
      start: `${prefix}-justify-start`,
      end: `${prefix}-justify-end`,
      center: `${prefix}-justify-center`,
      stretch: `${prefix}-justify-stretch`,
      between: `${prefix}-justify-between`,
      around: `${prefix}-justify-around`,
      evenly: `${prefix}-justify-evenly`,
    },
  };
}

export function resolveGrid(
  config: GridConfig,
  classMap: GridClassMap = buildGridClassMap()
): string[] {
  const classes: string[] = ['grid'];

  if (config.cols !== undefined) classes.push(classMap.cols[String(config.cols)]);
  if (config.rows !== undefined) classes.push(classMap.rows[String(config.rows)]);
  if (config.flow !== undefined) classes.push(classMap.flow[config.flow]);
  if (config.gap !== undefined) classes.push(classMap.gap[config.gap]);
  if (config.gapX !== undefined) classes.push(classMap.gapX[config.gapX]);
  if (config.gapY !== undefined) classes.push(classMap.gapY[config.gapY]);
  if (config.align !== undefined) classes.push(classMap.align[config.align]);
  if (config.justify !== undefined) classes.push(classMap.justify[config.justify]);

  return classes.filter(Boolean);
}

export function gridToClassString(
  config: GridConfig,
  classMap?: GridClassMap
): string {
  return resolveGrid(config, classMap).join(' ');
}
