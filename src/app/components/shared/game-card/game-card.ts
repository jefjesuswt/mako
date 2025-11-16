import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  isRunning?: boolean;
}

@Component({
  selector: "app-game-card",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: "./game-card.html",
  styles: [
    `
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `,
  ],
})
export class GameCard {
  @Input() game!: Game;
  @Output() playStop = new EventEmitter<Game>();
  @Output() settings = new EventEmitter<Game>();

  onPlayStop(): void {
    this.playStop.emit(this.game);
  }

  onSettings(): void {
    this.settings.emit(this.game);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESin portada%3C/text%3E%3C/svg%3E';
  }
}
