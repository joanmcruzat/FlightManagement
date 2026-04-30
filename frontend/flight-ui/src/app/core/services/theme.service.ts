import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly STORAGE_KEY = 'aero-theme';

  readonly theme = signal<Theme>(this.loadSaved());

  readonly isDark = signal<boolean>(this.loadSaved() === 'dark');

  constructor() {
    effect(() => {
      const t = this.theme();
      const html = document.documentElement;
      html.classList.remove('dark', 'light');
      html.classList.add(t);
      this.isDark.set(t === 'dark');
      localStorage.setItem(this.STORAGE_KEY, t);
    });

    document.documentElement.classList.add(this.theme());
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private loadSaved(): Theme {
    const saved = localStorage.getItem('aero-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    // Respect OS preference on first visit
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
