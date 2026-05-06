import type { BorderConfig, BorderClassMap, BorderScale } from './types';

export function normaliseBorderWidth(value: string | number): string {
  if (typeof value === 'number') return `${value}px`;
  return value;
}

export function normaliseBorderStyle(value: string): string {
  const valid = ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden', 'groove', 'ridge', 'inset', 'outset'];
  if (!valid.includes(value)) {
    throw new Error(`Invalid border style: "${value}". Must be one of: ${valid.join(', ')}`);
  }
  return value;
}

export function buildBorderClassMap(scale: BorderScale, prefix = 'border'): BorderClassMap {
  const classMap: BorderClassMap = {};

  for (const [key, config] of Object.entries(scale)) {
    const classes: string[] = [];

    if (config.width !== undefined) {
      classes.push(`${prefix}-[${normaliseBorderWidth(config.width)}]`);
    }
    if (config.style !== undefined) {
      classes.push(`${prefix}-${normaliseBorderStyle(config.style)}`);
    }
    if (config.color !== undefined) {
      classes.push(`${prefix}-[${config.color}]`);
    }
    if (config.radius !== undefined) {
      classes.push(`rounded-[${config.radius}]`);
    }

    classMap[key] = classes.join(' ');
  }

  return classMap;
}

export function formatBorderCSS(scale: BorderScale, prefix = 'border'): string {
  const lines: string[] = [];

  for (const [key, config] of Object.entries(scale)) {
    const selector = `.${prefix}-${key}`;
    const declarations: string[] = [];

    if (config.width !== undefined) {
      declarations.push(`  border-width: ${normaliseBorderWidth(config.width)};`);
    }
    if (config.style !== undefined) {
      declarations.push(`  border-style: ${normaliseBorderStyle(config.style)};`);
    }
    if (config.color !== undefined) {
      declarations.push(`  border-color: ${config.color};`);
    }
    if (config.radius !== undefined) {
      declarations.push(`  border-radius: ${config.radius};`);
    }

    if (declarations.length > 0) {
      lines.push(`${selector} {\n${declarations.join('\n')}\n}`);
    }
  }

  return lines.join('\n\n');
}

export function resolveBorder(config: BorderConfig): BorderClassMap {
  const { scale, prefix } = config;
  return buildBorderClassMap(scale, prefix ?? 'border');
}
