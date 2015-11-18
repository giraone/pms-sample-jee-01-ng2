import {Component, View, CORE_DIRECTIVES } from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl, Validators } from 'angular2/angular2';

import {TranslateService, TranslatePipe} from 'vendor/ng2-translate/ng2-translate';

import {Logger} from '../services/Logger';
import {ProjectConstants} from '../services/ProjectConstants';
import {EmployeeResource} from "./resource.api";
import {Employee} from "./entity.model";

@Component({
})
@View({
  templateUrl: 'app/employee/form.component.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class EmployeeFormComponent {

  private logger: Logger;
  private translate: TranslateService;
  private resourceApi: EmployeeResource;

  private entityId: string = null;
  public entity: Employee;

  public formGroup: ControlGroup;

  public submissionRunning: boolean = false;

  constructor(logger : Logger, translate: TranslateService, projectConstants: ProjectConstants,
              formBuilder: FormBuilder, resourceApi: EmployeeResource) {

    logger.debug('EmployeeFormComponent.CTOR');

    this.logger = logger;
    this.translate = translate;
    this.resourceApi = resourceApi;
    this.entity = new Employee();

    translate.setDefaultLang(projectConstants.defaultLanguage);
    translate.use(projectConstants.userLanguage);

    this.formGroup = formBuilder.group({
      "personnelNumber": ["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      "lastName": ["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])],
      "firstName": ["", Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(256)])],
      "gender": ["", Validators.required]
    });

    this.formGroup.controls['personnelNumber'].valueChanges.observer({next:
      (value) => {
        this.entity.personnelNumber = value;
      }}
    );
  }

  onSubmit(value) {
    this.logger.debug('EmployeeFormComponent.onSubmit ' + (value ? JSON.stringify(value) : "null"));

    this.entity = value;

    // Sanity check!
    if (!this.entity && !this.entity.personnelNumber) {
      return;
    }

    var call;
    var successMessage;

    if (this.entityId) {
      call = this.resourceApi.update(this.entity);
      successMessage = 'employeeDetails.successUpdate';
    }
    else {
      call = this.resourceApi.create(this.entity);
      successMessage = 'employeeDetails.successCreate';
    }

    this.submissionRunning = true;
    try {
      call.subscribe(
        result => {
          this.logger.debug('employeeResource-call', 'Success');
          this.translate.get(successMessage).subscribe(
            data => alert(data)
          );
        },
        err => {
          this.logger.debug(err);
          alert("Error(EmployeeFormComponent): " + err);
        },
        () => {
          this.submissionRunning = false;
        })
    }
    catch (e) {
      this.submissionRunning = false;
      this.logger.error("Failed!", e);
      alert("Exception(EmployeeFormComponent): " + e);
    }
  }
}