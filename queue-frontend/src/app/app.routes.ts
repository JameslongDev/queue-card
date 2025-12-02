import { Routes } from '@angular/router';
import { It051Component } from './it05-1/it05-1.component';
import { It052Component } from './it05-2/it05-2.component';
import { It053Component } from './it05-3/it05-3.component';

export const routes: Routes = [
  { path: '', redirectTo: 'it05-1', pathMatch: 'full' },
  { path: 'it05-1', component: It051Component },
  { path: 'it05-2', component: It052Component },
  { path: 'it05-3', component: It053Component },
];
