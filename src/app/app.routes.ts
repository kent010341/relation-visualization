import { Routes } from '@angular/router';
import { Configuration } from './features/configuration/configuration';
import { Visualization } from './features/visualization/visualization';

export const routes: Routes = [
    { path: '', redirectTo: 'config', pathMatch: 'full' },
    { path: 'config', component: Configuration },
    { path: 'visualization', component: Visualization },
];
