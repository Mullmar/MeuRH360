import { Routes } from '@angular/router';
import { IndexComponent } from '../components/index/index.component';
import { CreateAccComponent } from '../components/create-acc/create-acc.component';
import { EditAccComponent } from '../components/edit-acc/edit-acc.component';
import { ConsultAccComponent } from '../components/consult-acc/consult-acc.component';

export const routes: Routes = [
  { path: '', component: CreateAccComponent},
  { path: 'index', component: IndexComponent},
  { path: 'edit-acc', component: EditAccComponent},
  { path: 'edit-acc/:id', component: EditAccComponent},
  { path: 'consult-acc/:id', component: ConsultAccComponent}
  // { path: '**', redirectTo: 'index' }
];
