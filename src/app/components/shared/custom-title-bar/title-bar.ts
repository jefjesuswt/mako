import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Theme } from "../../../services/theme.service";

@Component({
  selector: "app-title-bar",
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatTooltipModule],
  template: `
    <mat-toolbar
      class="title-bar
             h-10 min-h-10 px-2 flex items-center justify-between select-none
             border-b border-black/10 dark:border-white/10"
    >
      <div
        class="flex-1 h-full flex items-center gap-2 cursor-move"
        (mousedown)="onDrag()"
      >
        <!-- <mat-icon class="text-lg text-blue-500">auto_awesome_mosaic</mat-icon> -->
        <img
          class="w-12 h-12 rounded-full"
          src="/assets/logos/mako-1-logo.png"
          alt="avatar"
        />
        <span class="text-sm font-medium">mako - shadPS4</span>
      </div>

      <button
        mat-icon-button
        class="w-8 h-8 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
        (click)="theme.toggleTheme()"
        [matTooltip]="themeTooltip()"
      >
        <mat-icon class="text-base">
          {{ themeIcon() }}
        </mat-icon>
      </button>

      <div class="flex">
        <button
          mat-icon-button
          class="w-8 h-8 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
          (click)="minimize()"
        >
          <mat-icon class="text-base">minimize</mat-icon>
        </button>
        <button
          mat-icon-button
          class="w-8 h-8 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
          (click)="toggleMaximize()"
        >
          <mat-icon class="text-base">{{ maximizeIcon() }}</mat-icon>
        </button>
        <button
          mat-icon-button
          class="w-8 h-8 rounded-full hover:bg-red-600 hover:text-white"
          (click)="close()"
        >
          <mat-icon class="text-base">close</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  // (REFACTOR) 7. Mover estilos de :host al decorador
  host: {
    display: "block",
    "(window:resize)": "checkMaximizedState()", // Opcional: para sincronizar si se maximiza fuera de la app
    "style.-webkit-app-region": "drag",
  },
  styles: [
    `
      /* (REFACTOR) 8. Solo los estilos de hijos se quedan aquí */
      button {
        -webkit-app-region: no-drag;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, // (REFACTOR) 9. Añadir ChangeDetection
})
export class TitleBar {
  theme = inject(Theme);
  isMaximized = signal(false);

  // (REFACTOR) 10. Convertir estado derivado a computed()
  themeIcon = computed(() => {
    const mode = this.theme.mode();
    if (mode === "auto") return "brightness_auto";
    return mode === "dark" ? "dark_mode" : "light_mode";
  });

  themeTooltip = computed(() => {
    const mode = this.theme.mode();
    if (mode === "auto") return "Modo automático";
    return mode === "dark" ? "Modo oscuro" : "Modo claro";
  });

  maximizeIcon = computed(() => {
    return this.isMaximized() ? "filter_none" : "crop_square";
  });

  // --- Métodos de Tauri ---

  async onDrag() {
    await invoke("start_drag");
  }

  async minimize() {
    await invoke("minimize_window");
  }

  async toggleMaximize() {
    // La lógica de invoke está bien
    if (this.isMaximized()) {
      await invoke("unmaximize_window");
    } else {
      await invoke("maximize_window");
    }
    this.isMaximized.update((v) => !v);
  }

  async close() {
    await invoke("close_window");
  }

  // Opcional: Sincronizar el estado si el usuario
  // maximiza/restaura usando los controles del SO.
  async checkMaximizedState() {
    // Asumiendo que tienes un comando de Tauri 'is_window_maximized'
    // const isMaximized = await invoke<boolean>('is_window_maximized');
    // this.isMaximized.set(isMaximized);
  }
}
