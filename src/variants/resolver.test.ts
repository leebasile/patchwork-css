import { describe, it, expect } from 'vitest';
import {
  resolveVariant,
  resolveVariants,
  variantsToClassString,
} from './resolver';
import type { VariantDefinition, VariantConfig } from './types';

const colorDef: VariantDefinition = {
  name: 'color',
  options: {
    primary: 'text-blue-500',
    secondary: ['text-gray-500', 'opacity-80'],
  },
  defaultOption: 'primary',
};

const sizeDef: VariantDefinition = {
  name: 'size',
  options: {
    sm: 'text-sm',
    lg: 'text-lg',
  },
};

describe('resolveVariant', () => {
  it('resolves a known option', () => {
    const result = resolveVariant(colorDef, 'secondary');
    expect(result).toEqual({
      variant: 'color',
      option: 'secondary',
      classes: ['text-gray-500', 'opacity-80'],
    });
  });

  it('falls back to defaultOption when selection is undefined', () => {
    const result = resolveVariant(colorDef, undefined);
    expect(result?.option).toBe('primary');
    expect(result?.classes).toEqual(['text-blue-500']);
  });

  it('returns null when no selection and no default', () => {
    const result = resolveVariant(sizeDef, undefined);
    expect(result).toBeNull();
  });

  it('returns null for unknown option key', () => {
    const result = resolveVariant(sizeDef, 'xl');
    expect(result).toBeNull();
  });
});

describe('resolveVariants', () => {
  const config: VariantConfig = {
    definitions: [colorDef, sizeDef],
    selected: { color: 'secondary', size: 'sm' },
  };

  it('resolves all matched variants', () => {
    const results = resolveVariants(config);
    expect(results).toHaveLength(2);
    expect(results[0].variant).toBe('color');
    expect(results[1].variant).toBe('size');
  });

  it('skips unresolvable variants', () => {
    const results = resolveVariants({ definitions: [sizeDef], selected: {} });
    expect(results).toHaveLength(0);
  });
});

describe('variantsToClassString', () => {
  it('flattens and deduplicates classes', () => {
    const resolved = resolveVariants({
      definitions: [colorDef, sizeDef],
      selected: { color: 'secondary', size: 'sm' },
    });
    const str = variantsToClassString(resolved);
    expect(str).toBe('text-gray-500 opacity-80 text-sm');
  });

  it('returns empty string for empty input', () => {
    expect(variantsToClassString([])).toBe('');
  });
});
