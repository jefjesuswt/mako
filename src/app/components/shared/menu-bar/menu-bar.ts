import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { Router } from "@angular/router";

import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { ViewService } from "../../../services/view.service";
import { Theme } from "../../../services/theme.service";
import { AboutDialog } from "../about-dialog/about-dialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-menu-bar",
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: "./menu-bar.html",
  styles: [
    `
      .menu-toolbar {
        height: 2.5rem;
        min-height: 2.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBar {
  public viewService = inject(ViewService);
  public themeService = inject(Theme);
  private router = inject(Router);
  public dialog = inject(MatDialog);

  onBootGame(): void {
    console.log("Abriendo diálogo para bootear juego...");
  }

  navigateToSettings(): void {
    this.router.navigate(["/settings"]);
  }

  onOpenAbout(): void {
    this.dialog.open(AboutDialog, {
      width: "30rem",
    });
  }
}
