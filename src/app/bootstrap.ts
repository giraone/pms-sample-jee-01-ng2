import {bootstrap, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {ProjectConstants} from './services/ProjectConstants'
import {Logger} from './services/Logger'
import {MainComponent} from './main/main.component';

import {CostCenterResource} from './cost-center/resource.api'
import {CostCenterFormComponent} from './cost-center/form.component'
import {EmployeeResource} from './employee/resource.api'
import {EmployeeFormComponent} from './employee/form.component'

//bootstrap(appComponentType: /*Type*/ any, appProviders?: Array<Type | Provider | any[]>) : Promise<ComponentRef>
bootstrap(MainComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  Logger,
  TranslateService,
  ProjectConstants,
  CostCenterResource,
  CostCenterFormComponent,
  EmployeeResource,
  EmployeeFormComponent
])
.then(
  success => console.log('MainComponent bootstraped!'),
  error =>console.log(error)
);
