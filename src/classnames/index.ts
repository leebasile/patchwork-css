/**
 * @module classnames
 *
 * Utilities for composing deterministic CSS class strings from
 * design token configs and conditional class entries.
 *
 * @example
 * ```ts
 * import { composeClasses, classesFromTokens } from 'patchwork-css/classnames';
 *
 * const cls = composeClasses(
 *   'btn',
 *   ['btn--active', isActive],
 *   ['btn--disabled', isDisabled]
 * );
 * // => 'btn btn--active'
 *
 * const tokenCls = classesFromTokens({ color: 'primary', size: 'md' }, 'ds-');
 * // => 'ds-color-primary ds-size-md'
 * ```
 */

export type {
  ClassCondition,
  ClassEntry,
  ClassConfig,
} from './composer';

export {
  composeClasses,
  classesFromTokens,
  mergeClassConfigs,
} from './composer';
