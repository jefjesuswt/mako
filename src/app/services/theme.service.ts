import {
  Injectable,
  signal,
  computed,
  effect,
  PLATFORM_ID,
  inject,
  Signal,
  WritableSignal,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export type ThemeMode = "light" | "dark" | "auto";

@Injectable({
  providedIn: "root",
})
export class Theme {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private systemPrefersDark: WritableSignal<boolean>;

  private modeSignal: WritableSignal<ThemeMode>;

  public readonly mode: Signal<ThemeMode>;

  public isDark = computed(() => {
    const currentMode = this.mode();
    if (currentMode === "auto") {
      return this.systemPrefersDark();
    }
    return currentMode === "dark";
  });

  constructor() {
    const savedMode = this.loadSavedTheme();
    this.modeSignal = signal(savedMode);
    this.mode = this.modeSignal.asReadonly();

    if (!this.isBrowser) {
      this.systemPrefersDark = signal(false);
      return;
    }

    this.systemPrefersDark = signal(this.getInitialSystemPreference());
    this.watchSystemPreference();

    this.createThemeEffect();
  }

  private loadSavedTheme(): ThemeMode {
    if (!this.isBrowser) return "auto";
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    return ["light", "dark", "auto"].includes(savedMode) ? savedMode : "auto";
  }

  private getInitialSystemPreference(): boolean {
    if (!this.isBrowser) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  private watchSystemPreference(): void {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", (e) => {
      this.systemPrefersDark.set(e.matches);
    });
  }

  private createThemeEffect(): void {
    effect(() => {
      const isDark = this.isDark();
      const mode = this.mode();

      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";

      localStorage.setItem("theme-mode", mode);
    });
  }

  setMode(mode: ThemeMode): void {
    this.modeSignal.set(mode);
  }

  toggleTheme(): void {
    this.modeSignal.update((currentMode: ThemeMode) => {
      if (currentMode === "auto") {
        return this.isDark() ? "light" : "dark";
      }
      return currentMode === "light" ? "dark" : "light";
    });
  }
}
