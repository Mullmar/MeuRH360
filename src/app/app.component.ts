import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateAccComponent } from "../components/create-acc/create-acc.component";
import { IndexComponent } from '../components/index/index.component';
import { SidebarMenuComponent } from '../components/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateAccComponent, IndexComponent, SidebarMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'unisystem';
}
