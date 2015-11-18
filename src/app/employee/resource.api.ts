import {Injectable} from 'angular2/angular2';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS } from 'angular2/http';

import {ProjectConstants} from '../services/ProjectConstants';
import {Logger} from '../services/Logger';

@Injectable()
export class EmployeeResource {

  private logger: Logger;
  private http: Http;
  private baseUrl: string;

  constructor(logger: Logger, http: Http, projectConstants: ProjectConstants) {
    this.logger = logger;
    this.http = http;
    this.baseUrl = projectConstants.baseUrl + '/employees';
  }

  getVersion(): string {
    return "V1.0";
  }

  findById(oid:Number) {
    this.logger.debug('EmployeeResource.findById oid=' + oid);
    return this.http.get(this.baseUrl + "/" + oid)
      .map(response => response.json())
  }

  listAll() {
    this.logger.debug('EmployeeResource.listAll');
    return this.http.get(this.baseUrl)
      .map(response => response.json());
  }

  create(entity)  {
    this.logger.debug('EmployeeResource.create entity=' + entity);
    return this.http.post(this.baseUrl, JSON.stringify(entity), this.buildRequestOptions());
  }

  update(entity) {
    this.logger.debug('EmployeeResource.update entity=' + entity);
    return this.http.put(this.baseUrl+ "/" + entity.oid, JSON.stringify(entity), this.buildRequestOptions());
  }

  deleteById(oid:Number) {
    this.logger.debug('EmployeeResource.deleteById oid=' + oid);
    return this.http.delete(this.baseUrl);
  }

  summary() {
    this.logger.debug('EmployeeResource.summary');
    return this.http.get(this.baseUrl + '/summary')
      .map(response => response.json())
  }

  private buildRequestOptions():RequestOptions
  {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    let requestOptions: RequestOptions = new RequestOptions();
    requestOptions.headers = headers;
    return requestOptions;
  }
}

/*
Example for Factory
let EmployeeResourceFactory = (logger: Logger, xxxService: XxxService) => {
  return new EmployeeResource(logger, xxxServer.xxx.yyy);
};
let EmployeeResourceDefinition = {
  useFactory: EmployeeResourceFactory,
  deps: [Logger, Http]
};
let COST_CENTERS_RESOURCE_PROVIDER = provide(EmployeeResource, EmployeeResourceDefinition)
*/