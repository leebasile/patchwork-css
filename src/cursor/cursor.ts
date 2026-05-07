import type { CursorConfig, CursorClassMap, CursorKeyword } from './types';

const CURSOR_KEYWORDS = new Set<CursorKeyword>([
  'auto', 'default', 'pointer', 'wait', 'text', 'move', 'help',
  'not-allowed', 'none', 'context-menu', 'progress', 'cell',
  'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop',
  'grab', 'grabbing', 'zoom-in', 'zoom-out',
]);

export function isCursorKeyword(value: string): value is CursorKeyword {
  return CURSOR_KEYWORDS.has(value as CursorKeyword);
}

export function normaliseCursorValue(value: string): string {
  if (isCursorKeyword(value)) return value;
  // Treat as url() if not a known keyword
  if (value.startsWith('url(')) return value;
  return `url(${value}), auto`;
}

export function buildCursorClassMap(config: CursorConfig): CursorClassMap {
  const prefix = config.prefix ?? 'cursor';
  const map: CursorClassMap = {};
  for (const [token, value] of Object.entries(config.cursors)) {
    const className = `${prefix}-${token}`;
    map[token] = className;
  }
  return map;
}

export function formatCursorCSS(config: CursorConfig): string {
  const prefix = config.prefix ?? 'cursor';
  const lines: string[] = [];
  for (const [token, value] of Object.entries(config.cursors)) {
    const className = `${prefix}-${token}`;
    const cssValue = normaliseCursorValue(value);
    lines.push(`.${className} { cursor: ${cssValue}; }`);
  }
  return lines.join('\n');
}

export function resolveCursor(
  token: string,
  config: CursorConfig,
): string | undefined {
  const map = buildCursorClassMap(config);
  return map[token];
}
