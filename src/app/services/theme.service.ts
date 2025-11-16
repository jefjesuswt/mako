import { Injectable, signal, effect, PLATFORM_ID, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

type ThemeMode = "light" | "dark" | "auto";

@Injectable({
  providedIn: "root",
})
export class Theme {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Signal para el modo seleccionado por el usuario
  mode = signal<ThemeMode>("auto");

  // Signal computado para saber si está en modo oscuro
  isDark = signal<boolean>(false);

  constructor() {
    if (!this.isBrowser) return;

    // Cargar el tema guardado
    this.loadSavedTheme();

    // Escuchar cambios en las preferencias del sistema
    this.watchSystemPreference();

    // Efecto para aplicar el tema cuando cambie
    effect(() => {
      this.applyTheme(this.mode());
    });
  }

  private loadSavedTheme(): void {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;

    if (savedMode && ["light", "dark", "auto"].includes(savedMode)) {
      this.mode.set(savedMode);
    } else {
      this.mode.set("auto");
    }
  }

  private watchSystemPreference(): void {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Establecer el estado inicial
    this.updateIsDark();

    // Escuchar cambios
    mediaQuery.addEventListener("change", () => {
      if (this.mode() === "auto") {
        this.updateIsDark();
      }
    });
  }

  private applyTheme(mode: ThemeMode): void {
    const html = document.documentElement;

    // Remover clases anteriores
    html.classList.remove("light-mode", "dark-mode", "dark");

    if (mode === "light") {
      html.classList.add("light-mode");
      this.isDark.set(false);
    } else if (mode === "dark") {
      html.classList.add("dark-mode", "dark"); // 'dark' para Tailwind v4
      this.isDark.set(true);
    } else {
      // Modo auto: usar preferencia del sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDark) {
        html.classList.add("dark"); // Solo 'dark' para Tailwind en modo auto
      }
      this.updateIsDark();
    }

    // Guardar preferencia
    localStorage.setItem("theme-mode", mode);
  }

  private updateIsDark(): void {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.isDark.set(prefersDark);
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  toggleTheme(): void {
    const currentMode = this.mode();

    if (currentMode === "auto") {
      // Si está en auto, cambiar a light o dark dependiendo del estado actual
      this.mode.set(this.isDark() ? "light" : "dark");
    } else if (currentMode === "light") {
      this.mode.set("dark");
    } else {
      this.mode.set("light");
    }
  }
}
