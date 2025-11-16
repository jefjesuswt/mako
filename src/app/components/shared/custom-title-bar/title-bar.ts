import { Component, inject, signal } from "@angular/core";
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
      class="title-bar bg-gray-900 text-white h-8 min-h-8 px-2 flex items-center justify-between select-none"
    >
      <!-- Área arrastrable -->
      <div
        class="flex-1 h-full flex items-center cursor-move"
        (mousedown)="onDrag()"
      >
        <span class="text-sm font-medium">Mako - shadPS4 Frontend</span>
      </div>

      <!-- Toggle de tema -->
      <button
        mat-icon-button
        class="w-8 h-8 hover:bg-gray-700"
        (click)="theme.toggleTheme()"
        [matTooltip]="getThemeTooltip()"
      >
        <mat-icon class="text-base">
          {{ getThemeIcon() }}
        </mat-icon>
      </button>

      <!-- Botones de control -->
      <div class="flex gap-1">
        <button
          mat-icon-button
          class="w-8 h-8 hover:bg-gray-700"
          (click)="minimize()"
        >
          <mat-icon class="text-base">minimize</mat-icon>
        </button>
        <button
          mat-icon-button
          class="w-8 h-8 hover:bg-gray-700"
          (click)="toggleMaximize()"
        >
          <mat-icon class="text-base">{{
            isMaximized() ? "filter_none" : "crop_square"
          }}</mat-icon>
        </button>
        <button
          mat-icon-button
          class="w-8 h-8 hover:bg-red-600"
          (click)="close()"
        >
          <mat-icon class="text-base">close</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        display: block;
        -webkit-app-region: drag;
      }

      button {
        -webkit-app-region: no-drag;
      }
    `,
  ],
})
export class TitleBar {
  theme = inject(Theme);
  isMaximized = signal(false);

  async onDrag() {
    await invoke("start_drag");
  }

  async minimize() {
    await invoke("minimize_window");
  }

  async toggleMaximize() {
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

  getThemeIcon(): string {
    const mode = this.theme.mode();
    if (mode === "auto") return "brightness_auto";
    return mode === "dark" ? "dark_mode" : "light_mode";
  }

  getThemeTooltip(): string {
    const mode = this.theme.mode();
    if (mode === "auto") return "Modo automático";
    return mode === "dark" ? "Modo oscuro" : "Modo claro";
  }
}
