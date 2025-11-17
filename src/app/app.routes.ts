import { Routes } from "@angular/router";
import { Layout } from "./layout/layout";
import { GameList } from "./pages/game-list/game-list";

export const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      { path: "", component: GameList },
      { path: "settings", component: GameList },
    ],
  },
];
