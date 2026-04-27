import type { TokenMap } from '../tokens/types';

/**
 * A theme is a named collection of token maps.
 * Each key represents a token category (e.g. 'color', 'spacing').
 */
export type ThemeTokens = Record<string, TokenMap>;

/**
 * A theme definition with an optional CSS class selector
 * that activates the theme (e.g. '[data-theme="dark"]').
 */
export interface ThemeDefinition {
  name: string;
  selector?: string;
  tokens: ThemeTokens;
}

/**
 * A compiled theme ready for injection into CSS.
 */
export interface CompiledTheme {
  name: string;
  selector: string;
  css: string;
  vars: Record<string, string>;
}

/**
 * Registry of multiple themes keyed by theme name.
 */
export type ThemeRegistry = Record<string, CompiledTheme>;
