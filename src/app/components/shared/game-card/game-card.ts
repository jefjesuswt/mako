import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Game, GameCompatibility } from "../../../interfaces/game.interface";

@Component({
  selector: "app-game-card",
  imports: [
    NgOptimizedImage,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: "./game-card.html",
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCard {
  game = input.required<Game>();
  playStop = output<Game>();
  settings = output<Game>();
  favorite = output<Game>(); // 3. (NUEVO) Output

  playStopIcon = computed(() =>
    this.game().isRunning ? "stop" : "play_arrow",
  );
  playStopTooltip = computed(() =>
    this.game().isRunning ? "Detener" : "Jugar",
  );

  onPlayStopClick(): void {
    this.playStop.emit(this.game());
  }
  onSettingsClick(): void {
    this.settings.emit(this.game());
  }
  onFavoriteClick(): void {
    this.favorite.emit(this.game());
  } // 4. (NUEVO) Handler

  // 5. (NUEVO) Helper para el badge
  getCompatClass(compat: GameCompatibility): string {
    return `compat-${compat.toLowerCase().replace("-", "")}`;
  }
}
