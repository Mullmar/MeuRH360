import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { AuthService } from '../../services/authentication/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  menuItems: any[] = [];
  menuItems$: Observable<any[]>;


  constructor(private menuService: MenuService, private authService: AuthService ) {
    this.menuItems$ = this.menuService.menuItems$
    this.menuService.menuItems$.subscribe(items => this.menuItems = items);

  }

  ngOnInit(): void {

  }

  toggleCategory(index: number) {
    this.menuService.toggleCategory(index);
  }

  isRegistered(): boolean {
    return this.authService.isUserRegistered();
  }
}
