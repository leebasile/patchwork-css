/**
 * CSS @layer utilities for patchwork-css
 * Provides helpers for organising styles into cascade layers.
 */

export type LayerOrder = string[];

export interface LayerConfig {
  name: string;
  order?: LayerOrder;
}

export interface ResolvedLayer {
  name: string;
  declaration: string;
  wrap: (css: string) => string;
}

/**
 * Builds the @layer order declaration string.
 * e.g. ["reset", "base", "utilities"] => "@layer reset, base, utilities;"
 */
export function buildLayerOrder(order: LayerOrder): string {
  if (order.length === 0) return "";
  return `@layer ${order.join(", ")};`;
}

/**
 * Wraps a block of CSS inside a named @layer rule.
 */
export function wrapInLayer(name: string, css: string): string {
  const trimmed = css.trim();
  if (!trimmed) return "";
  return `@layer ${name} {\n${trimmed}\n}`;
}

/**
 * Resolves a LayerConfig into a ResolvedLayer with helpers.
 */
export function resolveLayer(config: LayerConfig): ResolvedLayer {
  const { name, order = [] } = config;

  const relevantOrder = order.includes(name) ? order : [name, ...order];
  const declaration = buildLayerOrder(relevantOrder);

  return {
    name,
    declaration,
    wrap: (css: string) => wrapInLayer(name, css),
  };
}

/**
 * Resolves multiple layer configs and returns ordered declaration + wrap helpers.
 */
export function resolveLayers(
  configs: LayerConfig[]
): { declaration: string; layers: ResolvedLayer[] } {
  const allNames = configs.map((c) => c.name);
  const declaration = buildLayerOrder(allNames);

  const layers = configs.map((config) =>
    resolveLayer({ ...config, order: allNames })
  );

  return { declaration, layers };
}
