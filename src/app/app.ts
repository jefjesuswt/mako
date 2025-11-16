import { Component } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { TitleBar } from "./components/shared/custom-title-bar/title-bar";
import { GameCard } from "./components/shared/game-card/game-card";

interface Game {
  id: string;
  title: string;
  coverImage: string;
  isRunning?: boolean;
}

@Component({
  selector: "app-root",
  imports: [TitleBar, GameCard],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  games: Game[] = [
    {
      id: "1",
      title: "The Last of Us Part II",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg",
      isRunning: false,
    },
    {
      id: "2",
      title: "God of War",
      coverImage:
        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/250px-God_of_War_4_cover.jpg",
      isRunning: true,
    },
  ];

  handlePlayStop(game: Game): void {
    game.isRunning = !game.isRunning;
    if (game.isRunning) {
      console.log("Iniciando", game.title);
      // Aquí llamarás al backend de shadPS4
    } else {
      console.log("Deteniendo", game.title);
      // Aquí matarás el proceso
    }
  }

  handleSettings(game: Game): void {
    console.log("Abriendo configuración de", game.title);
    // Aquí abrirás un diálogo de configuración
  }

  greetingMessage = "";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();

    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
