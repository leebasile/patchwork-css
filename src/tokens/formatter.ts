import type { ResolvedTokenMap } from './types';

export type CSSVariablePrefix = string;

export interface FormatterOptions {
  prefix?: CSSVariablePrefix;
  selector?: string;
}

const DEFAULT_OPTIONS: Required<FormatterOptions> = {
  prefix: 'pw',
  selector: ':root',
};

/**
 * Converts a dot-separated token path to a CSS custom property name.
 * e.g. "color.primary.500" => "--pw-color-primary-500"
 */
export function tokenPathToCSSVar(path: string, prefix: string): string {
  const sanitized = path.replace(/\./g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
  return `--${prefix}-${sanitized}`;
}

/**
 * Formats a resolved token map into a CSS custom properties block.
 */
export function formatTokensAsCSS(
  tokens: ResolvedTokenMap,
  options: FormatterOptions = {}
): string {
  const { prefix, selector } = { ...DEFAULT_OPTIONS, ...options };

  const declarations = Object.entries(tokens)
    .map(([path, value]) => {
      const varName = tokenPathToCSSVar(path, prefix);
      return `  ${varName}: ${value};`;
    })
    .join('\n');

  if (!declarations) {
    return '';
  }

  return `${selector} {\n${declarations}\n}`;
}

/**
 * Formats a resolved token map into a flat record of CSS variable declarations.
 * Useful for inline styles or JS-in-CSS solutions.
 */
export function formatTokensAsVarRecord(
  tokens: ResolvedTokenMap,
  options: Pick<FormatterOptions, 'prefix'> = {}
): Record<string, string> {
  const prefix = options.prefix ?? DEFAULT_OPTIONS.prefix;

  return Object.fromEntries(
    Object.entries(tokens).map(([path, value]) => [
      tokenPathToCSSVar(path, prefix),
      String(value),
    ])
  );
}
