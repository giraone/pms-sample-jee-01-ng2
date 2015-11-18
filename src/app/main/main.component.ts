import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Routes, APP_ROUTES} from '../route.config';

import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {Logger} from '../services/Logger';
import {ProjectConstants} from '../services/ProjectConstants';

@Component({
  selector: 'main-app',
  template: `
    <h1>{{title}}</h1>
    <a [router-link]="[routes.costCenter.as]" class="router-link">Cost-Center Form</a>
    <a [router-link]="[routes.employee.as]" class="router-link">Employee Form</a>
    <a [router-link]="[routes.about.as]" class="router-link">About</a>
    <a [router-link]="[routes.test.as]" class="router-link">Test</a>
    <a [router-link]="[routes.test2.as]" class="router-link">Test2</a>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .router-link {padding: 5px;text-decoration: none;}
    .router-link:visited, .router-link:link {color: #444;}
    .router-link:hover {color: white; background-color: #1171a3; text-decoration: none;}
    .router-link.router-link-active {color: white; background-color: #52b9e9; text-decoration: none;}
  `],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  pipes: [TranslatePipe]
})
@RouteConfig(APP_ROUTES)
export class MainComponent {

  private logger: Logger;
  private translate: TranslateService;
  public language: string;
  public title: string = "App";

  public routes = Routes;

  constructor(logger: Logger, translate: TranslateService, projectConstants: ProjectConstants) {
    logger.debug('MainComponent.CTOR');

    this.logger = logger;
    this.translate = translate;
    this.translate.setDefaultLang(projectConstants.defaultLanguage);
    this.language = projectConstants.userLanguage;
    this.translate.use(this.language);

    this.translate.get("mainApp.title").subscribe(
      data => { this.title = data; }
    );
  }
}