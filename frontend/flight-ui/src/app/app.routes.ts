import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            { path: '', redirectTo: 'flights', pathMatch: 'full' },
            {
                path: 'flights',
                loadComponent: () =>
                    import('./pages/flights/flights.component').then(m => m.FlightsComponent),
            },
            {
                path: 'passengers',
                loadComponent: () =>
                    import('./pages/passengers/passengers.component').then(m => m.PassengersComponent),
            },
        ],
    },
    { path: '**', redirectTo: '' },
];