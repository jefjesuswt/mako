import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Game, GameCompatibility } from "../../../interfaces/game.interface";

@Component({
  selector: "app-game-table",
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: "./game-table.html",
  styles: [
    `
      .status-cell,
      .favorite-cell,
      .icon-cell {
        width: 48px;
      }
      .compatibility-cell {
        width: 100px;
      }
      .actions-cell {
        width: 120px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTable {
  dataSource = input.required<Game[]>();
  playStop = output<Game>();
  settings = output<Game>();
  favorite = output<Game>();

  displayedColumns: string[] = [
    "status",
    "favorite",
    "icon",
    "name",
    "compatibility",
    "region",
    "version",
    "playtime",
    "actions",
  ];

  onPlayStopClick(game: Game): void {
    this.playStop.emit(game);
  }
  onSettingsClick(game: Game): void {
    this.settings.emit(game);
  }
  onFavoriteClick(game: Game): void {
    this.favorite.emit(game);
  }

  getCompatClass(compat: GameCompatibility): string {
    return `compat-${compat.toLowerCase().replace("-", "")}`;
  }
}
