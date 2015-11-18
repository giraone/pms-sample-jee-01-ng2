import {Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

import {Logger} from '../services/Logger';
import {ProjectConstants} from '../services/ProjectConstants';

@Component({
})
@View({
  templateUrl: 'app/about/about.component.html',
  directives: [CORE_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class AboutComponent {

  private logger: Logger;
  private translate: TranslateService;
  public language: string;

  constructor(logger: Logger, translate: TranslateService, projectConstants: ProjectConstants) {

    logger.debug('AboutComponent.CTOR');

    this.logger = logger;
    this.translate = translate;
    this.translate.setDefaultLang(projectConstants.defaultLanguage);
    this.language = projectConstants.userLanguage;
    this.translate.use(this.language);

    /*
     translate.getTranslation("fr").observer({
     next: (value) => {
     this.language = value;
     }
     });
     */
  }

  loadTranslation(lang: string): void {
    this.logger.debug('AboutComponent.loadTranslation ' + lang);
    this.translate.getTranslation(lang).subscribe(
      data => alert("language: " + data.language),
      err => {
        this.logger.error(err);
        alert("Error");
      },
      () => this.logger.debug('getTranslation Complete')
    );
  }

  testTranslation(key: string, interpolateParams?: Object): void {
    this.logger.debug('AboutComponent.testTranslation ' + key);
    this.translate.get(key, interpolateParams).subscribe(
      data => alert("Translation of " + key + " is " + data)
    );
  }
}
