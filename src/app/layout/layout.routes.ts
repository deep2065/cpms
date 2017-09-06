import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },   
    { path: 'masters', loadChildren: '../masters/masters.module#MastersModule' },
    { path: 'statistics', loadChildren: '../statistics/statistics.module#StatisticsModule' },
    { path: 'ui', loadChildren: '../ui/ui.module#UiModule' },
    { path: 'components', loadChildren: '../components/components.module#ComponentsModule' },
    { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
    { path: 'widgets', loadChildren: '../widgets/widgets.module#WidgetsModule' },
    { path: 'special', loadChildren: '../special/special.module#SpecialModule' }
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
