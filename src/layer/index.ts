/**
 * @module layer
 * CSS @layer utilities for cascade layer management.
 *
 * @example
 * ```ts
 * import { resolveLayer, resolveLayers, buildLayerOrder, wrapInLayer } from 'patchwork-css/layer';
 *
 * const { declaration, layers } = resolveLayers([
 *   { name: 'reset' },
 *   { name: 'base' },
 *   { name: 'utilities' },
 * ]);
 *
 * // declaration => "@layer reset, base, utilities;"
 * const utilitiesCSS = layers[2].wrap('.mt-4 { margin-top: 1rem; }');
 * // => "@layer utilities {\n.mt-4 { margin-top: 1rem; }\n}"
 * ```
 */

export type { LayerOrder, LayerConfig, ResolvedLayer } from "./layer";
export {
  buildLayerOrder,
  wrapInLayer,
  resolveLayer,
  resolveLayers,
} from "./layer";
