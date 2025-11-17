export type GameCompatibility = "Perfect" | "Playable";

export interface Game {
  id: string;
  icon: string;
  name: string;
  coverImage: string;
  isRunning?: boolean;

  compatibility: GameCompatibility;
  serial: string;
  region: string;
  firmware: string;
  size: string;
  version: string;
  playtime: string;
  path: string;
  favorite: boolean;
}
