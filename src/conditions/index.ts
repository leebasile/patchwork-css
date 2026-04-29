/**
 * conditions — map named states (hover, focus, dark, breakpoints) to
 * CSS selectors or media queries and apply them as class prefixes.
 *
 * @example
 * ```ts
 * import { conditionsToClassString } from 'patchwork-css/conditions';
 *
 * const classes = conditionsToClassString(
 *   { base: 'text-sm', hover: 'text-blue-500', dark: 'text-white' },
 *   {
 *     hover: '&:hover',
 *     dark: '@media (prefers-color-scheme: dark)',
 *   }
 * );
 * // => 'text-sm &:hover\:text-blue-500 @media (prefers-color-scheme: dark):text-white'
 * ```
 */

export type {
  ConditionValue,
  ConditionMap,
  ResolvedCondition,
  ConditionClassMap,
  ConditionInput,
} from './types';

export {
  isMediaQuery,
  resolveConditionMap,
  resolveConditions,
  flattenConditionClasses,
  conditionsToClassString,
} from './conditions';
