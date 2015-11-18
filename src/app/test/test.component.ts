import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import {ProjectConstants} from '../services/ProjectConstants';
import {Logger} from '../services/Logger';
import {CostCenterResource} from "../cost-center/resource.api";

@Component({})
@View({
  templateUrl: 'app/test/test.component.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class TestComponent {
  logger: Logger;
  http: Http;
  costCenterResource: CostCenterResource;

  baseUrl: string;
  selectedTab: number;
  loading: boolean;
  neverUsed: boolean;
  errorOnLastCall: boolean;
  input1: string;
  output1: string;

  constructor(logger: Logger, http: Http, costCenterResource: CostCenterResource, projectConstants: ProjectConstants) {
    this.logger = logger;
    this.http = http;
    this.costCenterResource = costCenterResource;

    this.baseUrl = projectConstants.baseUrl;
    this.selectedTab = 0; //set selected tab to the 1st by default.
    this.reset();
  }

  selectTab(index) {
    this.logger.debug('Change tab to ', index);
    this.selectedTab = index;
  }

  reset() {
    this.loading = false;
    this.neverUsed = true;
    this.errorOnLastCall = false;
    this.input1 = 'CostCenterResource getVersion()=' + this.costCenterResource.getVersion();
    this.output1 = '- No results yet -';
  }

  // Using Service for summary()
  submit1() {
    this.logger.debug('Using Service for summary()', this.input1);
    this.neverUsed = false;
    this.loading = true;

    try {
      this.costCenterResource.summary().subscribe(
        result => {
          this.logger.debug('Using Service for summary()', 'Success');
          this.output1 = "summary.count=" + result.count;
        },
        err => {
          this.logger.debug(err);
          alert("Error: " + err);
        },
        () => {
          this.loading = false;
        }
      );
    }
    catch (e) {
      this.logger.error("Failed!", e);
      alert("Exception: " + e);
    }
  }

  // Using Service for listAll()
  submit2() {
    this.logger.debug('Using Service for listAll()', this.input1);
    this.neverUsed = false;
    this.loading = true;

    try {
      this.costCenterResource.listAll().subscribe(
        result => {
          this.logger.debug('Using Service for listAll()', 'Success');
          this.output1 = "Items = " + result.length;
          if (result.length > 0)
            this.output1 += " , first=" + result[0].identification;
        }
        ,
        err => {
          this.logger.debug(err);
          alert("Error: " + err);
        },
        () => {
          this.loading = false;
        })
    }
    catch (e) {
      this.logger.error("Failed!", e);
      alert("Exception: " + e);
    }
  }

// Using HTTP
  submit3() {
    this.logger.debug('Using HTTP', this.baseUrl);
    this.neverUsed = false;
    this.loading = true;

    try {
      this.http.get(this.baseUrl + '/costcenters/summary')
        // Call map on the response observable to get the parsed objects
        .map(response => response.json())
        // Subscribe to the observable to get the parsed object and attach it to the component
        .subscribe(result => {
          this.loading = false;
          this.logger.debug('Using HTTP', 'Success');
          this.output1 = "summary.count=" + result.count
        });
    }
    catch (e) {
      this.logger.error("Failed!", e);
      alert("Exception: " + e);
    }
  }
}
