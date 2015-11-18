import {Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl, Validators } from 'angular2/angular2';

import {TranslateService, TranslatePipe} from 'vendor/ng2-translate/ng2-translate';

import {Logger} from '../services/Logger';
import {ProjectConstants} from '../services/ProjectConstants';
import {CostCenterResource} from "./resource.api";
import {CostCenter} from "./entity.model";

@Component({
})
@View({
  templateUrl: 'app/cost-center/form.component.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class CostCenterFormComponent {

  private logger: Logger;
  private translate: TranslateService;
  private resourceApi: CostCenterResource;

  private entityId: string = null;
  public entity: CostCenter;

  public formGroup: ControlGroup;
  // Only with explicit controls
  //identification: AbstractControl;
  //description: AbstractControl;

  public submissionRunning: boolean = false;

  constructor(logger : Logger, translate: TranslateService, projectConstants: ProjectConstants,
              formBuilder: FormBuilder, resourceApi: CostCenterResource) {

    logger.debug('CostCenterFormComponent.CTOR');

    this.logger = logger;
    this.translate = translate;
    this.resourceApi = resourceApi;
    this.entity = new CostCenter();

    translate.setDefaultLang(projectConstants.defaultLanguage);
    translate.use(projectConstants.userLanguage);

    this.formGroup = formBuilder.group({
      "identification": ["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      "description": ["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])]
    });

    this.formGroup.controls['identification'].valueChanges.observer({next:
      (value) => {
        this.entity.identification = value;
      }}
    );

    // Only with explicit controls
    //this.identification = this.formGroup.controls['identification'];
    //this.description = this.formGroup.controls['description'];

    /*
    error TS2339: Property 'subscribe' does not exist on type 'Observable'.

    this.formGroup.controls['identification'].valueChanges.subscribe(
      (value) => {
        this.logger.debug("identification changed to: ", value);
      }
    );

    this.formGroup.valueChanges.subscribe(
      (value) => {
        this.logger.debug("formGroup changed to: ", value);
      }
    );
    */
  }

  onSubmit(value) {
    this.logger.debug('CostCenterFormComponent.onSubmit ' + (value ? JSON.stringify(value) : "null"));

    this.entity = value;

    // Sanity check!
    if (!this.entity && !this.entity.identification) {
      return;
    }

    var call;
    var successMessage;

    if (this.entityId) {
      call = this.resourceApi.update(this.entity);
      successMessage = 'costCenterDetails.successUpdate';
    }
    else {
      call = this.resourceApi.create(this.entity);
      successMessage = 'costCenterDetails.successCreate';
    }

    this.submissionRunning = true;
    try {
      call.subscribe(
        result => {
          this.logger.debug('resourceApi-call', 'Success');
          this.translate.get(successMessage).subscribe(
            data => alert(data)
          );
        },
        err => {
          this.logger.debug(err);
          alert("Error(CostCenterFormComponent): " + err);
        },
        () => {
          this.submissionRunning = false;
        })
    }
    catch (e) {
      this.submissionRunning = false;
      this.logger.error("Failed!", e);
      alert("Exception(CostCenterFormComponent): " + e);
    }
  }
}
