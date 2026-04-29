/**
 * @module clsx
 *
 * A flexible class-name composition utility that accepts strings, numbers,
 * arrays, and conditional objects. Supports optional deduplication and
 * class prefixing via options.
 *
 * @example
 * import { clsx } from 'patchwork-css/clsx';
 *
 * clsx('btn', { 'btn-primary': isPrimary }, ['mt-4'])
 * // => 'btn btn-primary mt-4'
 *
 * clsx('text-sm', 'text-sm', 'font-bold')
 * // => 'text-sm font-bold' (deduplicated by default)
 *
 * clsx('flex', 'items-center', { prefix: 'tw-' })
 * // => 'tw-flex tw-items-center'
 */
export { clsx } from './clsx';
export type { ClsxInput, ClsxOptions, ClsxResult, ClsxPrimitive, ClsxArray, ClsxObject } from './types';
