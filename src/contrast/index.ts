/**
 * contrast/index.ts
 * Public API for the contrast module.
 *
 * Provides WCAG 2.1 colour-contrast utilities for use alongside
 * design-token and theme pipelines.
 */

export type { ContrastLevel, ContrastResult } from './contrast';

export {
  toLinear,
  relativeLuminance,
  hexToRgb,
  contrastRatio,
  checkContrast,
  pickAccessibleColour,
} from './contrast';
