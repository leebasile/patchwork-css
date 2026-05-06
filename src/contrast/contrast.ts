/**
 * contrast.ts
 * Utilities for determining accessible text colour contrast against backgrounds.
 * Uses WCAG 2.1 relative luminance formula.
 */

export type ContrastLevel = 'AA' | 'AAA';
export type ContrastResult = { ratio: number; passes: Record<ContrastLevel, boolean> };

/**
 * Convert an 8-bit channel value (0–255) to its linear RGB component.
 */
export function toLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Compute relative luminance from an [r, g, b] tuple (each 0–255).
 */
export function relativeLuminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Parse a 3- or 6-digit hex colour string to an RGB tuple.
 */
export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace(/^#/, '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  if (full.length !== 6) throw new Error(`Invalid hex colour: "${hex}"`);
  const int = parseInt(full, 16);
  return [(int >> 16) & 0xff, (int >> 8) & 0xff, int & 0xff];
}

/**
 * Calculate the WCAG contrast ratio between two hex colours.
 */
export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(hexToRgb(foreground));
  const l2 = relativeLuminance(hexToRgb(background));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

/**
 * Evaluate a foreground/background pair against WCAG AA and AAA thresholds.
 */
export function checkContrast(
  foreground: string,
  background: string,
  largeText = false
): ContrastResult {
  const ratio = contrastRatio(foreground, background);
  return {
    ratio,
    passes: {
      AA: ratio >= (largeText ? 3 : 4.5),
      AAA: ratio >= (largeText ? 4.5 : 7),
    },
  };
}

/**
 * Given a background colour, return whichever of the two candidates
 * ('black' / 'white', or custom hex values) has the higher contrast ratio.
 */
export function pickAccessibleColour(
  background: string,
  candidates: [string, string] = ['#000000', '#ffffff']
): string {
  const [a, b] = candidates;
  return contrastRatio(a, background) >= contrastRatio(b, background) ? a : b;
}
