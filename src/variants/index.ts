/**
 * variants — resolve named variant definitions into deterministic class sets.
 *
 * @module
 */

export type {
  VariantModifier,
  VariantMap,
  VariantDefinition,
  ResolvedVariant,
  VariantConfig,
} from './types';

export {
  resolveVariant,
  resolveVariants,
  variantsToClassString,
} from './resolver';
