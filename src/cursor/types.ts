/**
 * Cursor utility types for patchwork-css.
 */

export type CursorKeyword =
  | 'auto'
  | 'default'
  | 'pointer'
  | 'wait'
  | 'text'
  | 'move'
  | 'help'
  | 'not-allowed'
  | 'none'
  | 'context-menu'
  | 'progress'
  | 'cell'
  | 'crosshair'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'no-drop'
  | 'grab'
  | 'grabbing'
  | 'zoom-in'
  | 'zoom-out';

export interface CursorConfig {
  /** Map of token name to cursor keyword or custom URL */
  cursors: Record<string, CursorKeyword | string>;
  /** Optional prefix for generated class names */
  prefix?: string;
}

export interface CursorClassMap {
  /** Map of token name to CSS class string */
  [token: string]: string;
}
