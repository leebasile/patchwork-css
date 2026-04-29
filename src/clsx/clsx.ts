import type { ClsxInput, ClsxOptions, ClsxResult } from './types';

/**
 * Recursively flattens a ClsxInput into an array of raw class-name strings.
 */
function flatten(input: ClsxInput, prefix: string): string[] {
  if (!input && input !== 0) return [];

  if (typeof input === 'boolean') return [];

  if (typeof input === 'number') {
    return [prefix ? `${prefix}${input}` : String(input)];
  }

  if (typeof input === 'string') {
    if (!input.trim()) return [];
    return input
      .trim()
      .split(/\s+/)
      .map((cls) => (prefix ? `${prefix}${cls}` : cls));
  }

  if (Array.isArray(input)) {
    return input.flatMap((item) => flatten(item, prefix));
  }

  if (typeof input === 'object' && input !== null) {
    return Object.entries(input)
      .filter(([, value]) => Boolean(value))
      .flatMap(([key]) => flatten(key, prefix));
  }

  return [];
}

/**
 * Composes class names from a variety of input shapes.
 *
 * Accepts strings, numbers, arrays, and conditional objects.
 * Falsy values are safely ignored.
 *
 * @example
 * clsx('foo', { bar: true, baz: false }, ['qux']) // => 'foo bar qux'
 */
export function clsx(
  ...args: [...ClsxInput[], ClsxOptions?] | ClsxInput[]
): ClsxResult {
  const lastArg = args[args.length - 1];
  const hasOptions =
    lastArg !== null &&
    typeof lastArg === 'object' &&
    !Array.isArray(lastArg) &&
    ('deduplicate' in lastArg || 'prefix' in lastArg);

  const options: ClsxOptions = hasOptions
    ? (lastArg as ClsxOptions)
    : {};

  const inputs = (hasOptions ? args.slice(0, -1) : args) as ClsxInput[];

  const { deduplicate = true, prefix = '' } = options;

  const classes = inputs.flatMap((input) => flatten(input, prefix));

  const resolved = deduplicate
    ? Array.from(new Set(classes))
    : classes;

  return resolved.join(' ');
}
