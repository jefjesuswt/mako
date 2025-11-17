import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-about-dialog",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-2" mat-dialog-title>
      <mat-icon class="text-blue-500">auto_awesome_mosaic</mat-icon>
      <h2 class="mb-0 text-xl">Acerca de Mako</h2>
    </div>

    <mat-dialog-content class="text-gray-700 dark:text-gray-300">
      <p class="mt-4">
        <strong>mako</strong> es un frontend moderno y ligero para el emulador
        <strong>shadPS4</strong>.
      </p>
      <p>
        Construido con Angular, TypeScript y Tauri, provee una experiencia de
        usuario rápida y nativa en el escritorio.
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-6">
        Versión: 0.1.0 (Desarrollo)
      </p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-flat-button [mat-dialog-close]="true" cdkFocusInitial>
        Cerrar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      h2.mat-mdc-dialog-title {
        margin-bottom: 0;
      }
    `,
  ],
})
export class AboutDialog {}
