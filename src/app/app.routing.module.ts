import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-cases',
    },
    {
        path: 'my-cases',
        loadComponent: () => import('./cases/routes/my-cases/my-cases.route').then(component => component.MyCasesRoute),
    },
    {
        path: 'my-cases/:id',
        loadComponent: () => import('./cases/routes/case/case.route').then(component => component.CaseRoute),
    },
    {
        path: 'create-case',
        loadComponent: () => import('./cases/routes/create-case/create-case.route').then(component => component.CreateCaseRoute),
    },
    {
        path: 'archives',
        loadComponent: () => import('./archives/archives.route').then(component => component.ArchivesRoute),
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {

}