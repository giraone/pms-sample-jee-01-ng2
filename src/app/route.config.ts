import {Route, Router} from 'angular2/router';

import {MainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';

import {CostCenterFormComponent} from './cost-center/form.component';
import {EmployeeFormComponent} from './employee/form.component';

import {TestComponent} from './test/test.component';
import {TestComponent2} from './test/test2.component';

export var Routes = {
  about: new Route({path: '/about', as : 'About', component: AboutComponent}),

  costCenter: new Route({path: '/cost-center', as: 'CostCenter', component: CostCenterFormComponent}),
  employee: new Route({path: '/employee', as: 'Employee', component: EmployeeFormComponent}),

  test: new Route({path: '/test', as: 'Test', component: TestComponent}),
  test2: new Route({path: '/test2', as: 'Test2', component: TestComponent2})
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
