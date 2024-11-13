import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSubject = new BehaviorSubject<any[]>([
    {
      category: 'Config. da Empresa',
      icon: 'bi bi-window',
      items: [
        { label: 'Minha Empresa', link: '/consult-acc', secao: 'confempresa', restricted: false },
        { label: 'Benefícios', link: '/beneficios', secao: 'confempresa', restricted: true },
        { label: 'Áreas', link: '/areas', secao: 'confempresa', restricted: true },
        { label: 'Cargos', link: '/cargos', secao: 'confempresa', restricted: true },
        { label: 'Filiais', link: '/filiais', secao: 'confempresa', restricted: true }
      ],
      open: false,
      display: false,
      restricted: false
    },
    {
      category: 'Config. de Sistema',
      icon: 'bi bi-wrench-adjustable-circle',
      items: [
        { label: 'Gestão de Vagas', link: '/gestaovagas', secao: 'vagas', restricted: true, icon: 'bi bi-receipt-cutoff' },
        { label: 'Meu Perfil', link: '/meuperfil', secao: 'usuarios', restricted: true, icon: 'bi bi-person-bounding-box' },
        { label: 'Todos os usuários', link: '/meuperfil', secao: 'usuarios', restricted: true, icon: 'bi bi-people-fill' }
      ],
      open: false,
      display: false,
      restricted: true
    }
  ]);
  menuItems$ = this.menuItemsSubject.asObservable();

  toggleCategory(index: number) {
    const menuItems = this.menuItemsSubject.value;
    menuItems[index].open = !menuItems[index].open;
    this.menuItemsSubject.next(menuItems);
  }

  setConsultAccId(id: string) {
    const menuItems = this.menuItemsSubject.value;
    menuItems[0].items[0].link = '/consult-acc/' + id;
    this.menuItemsSubject.next(menuItems);
  }
}


