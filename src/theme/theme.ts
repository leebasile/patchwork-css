import { formatTokensAsCSS, formatTokensAsVarRecord } from '../tokens/formatter';
import { resolveTokens } from '../tokens/resolver';
import type { ThemeDefinition, CompiledTheme, ThemeRegistry } from './types';

/**
 * Derives the CSS selector for a theme.
 * Falls back to a data-attribute selector if none is provided.
 */
export function resolveSelector(definition: ThemeDefinition): string {
  if (definition.selector) return definition.selector;
  if (definition.name === 'default' || definition.name === 'root') return ':root';
  return `[data-theme="${definition.name}"]`;
}

/**
 * Compiles a ThemeDefinition into a CompiledTheme with
 * resolved CSS custom properties and a CSS block string.
 */
export function compileTheme(definition: ThemeDefinition): CompiledTheme {
  const selector = resolveSelector(definition);
  const allVars: Record<string, string> = {};
  const allLines: string[] = [];

  for (const [category, tokenMap] of Object.entries(definition.tokens)) {
    const resolved = resolveTokens(tokenMap, [category]);
    const vars = formatTokensAsVarRecord(resolved);
    const css = formatTokensAsCSS(resolved);
    Object.assign(allVars, vars);
    allLines.push(css);
  }

  const innerCSS = allLines.join('\n');
  const css = `${selector} {\n${innerCSS}\n}`;

  return { name: definition.name, selector, css, vars: allVars };
}

/**
 * Compiles multiple theme definitions into a ThemeRegistry.
 */
export function compileThemes(definitions: ThemeDefinition[]): ThemeRegistry {
  return Object.fromEntries(
    definitions.map((def) => [def.name, compileTheme(def)])
  );
}

/**
 * Merges all compiled themes into a single CSS string.
 */
export function themesToCSS(registry: ThemeRegistry): string {
  return Object.values(registry)
    .map((t) => t.css)
    .join('\n\n');
}
