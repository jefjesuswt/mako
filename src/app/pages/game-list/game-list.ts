import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { GameCard } from "../../components/shared/game-card/game-card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { GameTable } from "../../components/shared/game-table/game-table";
import { Game } from "../../interfaces/game.interface";
import { ViewMode, ViewService } from "../../services/view.service";
// NO necesitamos NgIf para este enfoque

@Component({
  selector: "app-game-list",
  standalone: true,
  imports: [GameCard, GameTable, MatButtonToggleModule, MatIconModule],
  templateUrl: "./game-list.html",
  changeDetection: ChangeDetectionStrategy.OnPush,

  styles: [
    `
      .view-container {
        position: relative;
        min-height: 400px;
      }

      .grid-view,
      .table-view {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transition:
          opacity 0.3s ease-in-out,
          filter 0.3s ease-in-out;
      }

      .inactive-view {
        opacity: 0;
        filter: blur(5px);
        pointer-events: none;
        transition-duration: 0.2s;
      }

      .active-view {
        opacity: 1;
        filter: blur(0);
        pointer-events: auto;
        transition-duration: 0.3s;
      }
    `,
  ],
})
export class GameList {
  private viewService = inject(ViewService);
  viewMode = this.viewService.viewMode;

  games = signal<Game[]>([
    {
      id: "1",
      name: "The Last of Us Part II",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg",
      icon: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg",
      isRunning: false,
      compatibility: "Playable",
      serial: "CUSA10237",
      region: "USA",
      firmware: "9.00",
      size: "78.3 GB",
      version: "1.09",
      playtime: "12h 45m",
      path: "/games/TLOU2.pkg",
      favorite: true,
    },
    {
      id: "2",
      name: "God of War",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/250px-God_of_War_4_cover.jpg",
      icon: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/250px-God_of_War_4_cover.jpg",
      isRunning: true,
      compatibility: "Perfect",
      serial: "CUSA07408",
      region: "EUR",
      firmware: "9.00",
      size: "45.1 GB",
      version: "1.33",
      playtime: "30h 15m",
      path: "/games/GoW.pkg",
      favorite: false,
    },
  ]);

  private toggleGameProperty(
    gameId: string,
    property: "isRunning" | "favorite",
  ): void {
    this.games.update((currentGameList) =>
      currentGameList.map((game) =>
        game.id === gameId ? { ...game, [property]: !game[property] } : game,
      ),
    );
  }

  handlePlayStop(gameToToggle: Game): void {
    this.games.update((currentGameList) =>
      currentGameList.map((game) =>
        game.id === gameToToggle.id
          ? { ...game, isRunning: !game.isRunning }
          : game,
      ),
    );

    const updatedGame = this.games().find((g) => g.id === gameToToggle.id);
    if (updatedGame?.isRunning) {
      console.log("Iniciando", updatedGame.name);
    } else {
      console.log("Deteniendo", updatedGame?.name);
    }
  }

  handleFavorite(gameToToggle: Game): void {
    this.toggleGameProperty(gameToToggle.id, "favorite");
    console.log("Favorito cambiado:", gameToToggle.name);
  }

  handleSettings(game: Game): void {
    console.log("Abriendo configuración de", game.name);
  }

  setViewMode(mode: ViewMode): void {
    this.viewService.setViewMode(mode);
  }
}
