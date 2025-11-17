import { Injectable, signal } from "@angular/core";

export type ViewMode = "grid" | "table";
export type IconSize = "small" | "medium" | "large";

@Injectable({
  providedIn: "root",
})
export class ViewService {
  public viewMode = signal<ViewMode>("grid");

  public iconSize = signal<IconSize>("medium");
  public showLabels = signal(true);

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  setIconSize(size: IconSize): void {
    this.iconSize.set(size);
  }

  toggleLabels(): void {
    this.showLabels.update((v) => !v);
  }
}
