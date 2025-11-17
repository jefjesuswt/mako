import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TitleBar } from "../components/shared/custom-title-bar/title-bar";
import { MenuBar } from "../components/shared/menu-bar/menu-bar";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [RouterOutlet, TitleBar, MenuBar],
  template: `
    <div class="h-screen flex flex-col">
      <app-title-bar />
      <app-menu-bar />
      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
