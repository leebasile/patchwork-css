import { describe, it, expect } from 'vitest';
import { resolveSelector, compileTheme, compileThemes, themesToCSS } from './theme';
import type { ThemeDefinition } from './types';

const lightTheme: ThemeDefinition = {
  name: 'light',
  tokens: {
    color: {
      primary: '#3b82f6',
      background: '#ffffff',
    },
  },
};

const darkTheme: ThemeDefinition = {
  name: 'dark',
  tokens: {
    color: {
      primary: '#60a5fa',
      background: '#0f172a',
    },
  },
};

describe('resolveSelector', () => {
  it('uses provided selector when given', () => {
    expect(resolveSelector({ name: 'dark', selector: '.dark', tokens: {} })).toBe('.dark');
  });

  it('returns :root for name "default"', () => {
    expect(resolveSelector({ name: 'default', tokens: {} })).toBe(':root');
  });

  it('returns :root for name "root"', () => {
    expect(resolveSelector({ name: 'root', tokens: {} })).toBe(':root');
  });

  it('returns data-theme selector for other names', () => {
    expect(resolveSelector({ name: 'dark', tokens: {} })).toBe('[data-theme="dark"]');
  });
});

describe('compileTheme', () => {
  it('produces a compiled theme with css and vars', () => {
    const compiled = compileTheme(lightTheme);
    expect(compiled.name).toBe('light');
    expect(compiled.selector).toBe('[data-theme="light"]');
    expect(compiled.css).toContain('[data-theme="light"]');
    expect(compiled.css).toContain('--color-primary');
    expect(compiled.vars['--color-primary']).toBe('#3b82f6');
  });
});

describe('compileThemes', () => {
  it('returns a registry keyed by theme name', () => {
    const registry = compileThemes([lightTheme, darkTheme]);
    expect(Object.keys(registry)).toEqual(['light', 'dark']);
    expect(registry.dark.vars['--color-background']).toBe('#0f172a');
  });
});

describe('themesToCSS', () => {
  it('joins all theme css blocks', () => {
    const registry = compileThemes([lightTheme, darkTheme]);
    const css = themesToCSS(registry);
    expect(css).toContain('[data-theme="light"]');
    expect(css).toContain('[data-theme="dark"]');
  });
});
