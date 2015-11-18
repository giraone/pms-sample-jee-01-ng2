import {Injectable} from 'angular2/angular2';
import {Http, Headers, RequestOptions, HTTP_PROVIDERS } from 'angular2/http';

import {ProjectConstants} from '../services/ProjectConstants';
import {Logger} from '../services/Logger';

@Injectable()
export class CostCenterResource {

  private logger: Logger;
  private http: Http;
  private baseUrl: string;

  constructor(logger: Logger, http: Http, projectConstants: ProjectConstants) {
    this.logger = logger;
    this.http = http;
    this.baseUrl = projectConstants.baseUrl + '/costcenters';
  }

  getVersion(): string {
    return "V1.0";
  }

  findById(oid:Number) {
    this.logger.debug('CostCenterResource.findById oid=' + oid);
    return this.http.get(this.baseUrl + "/" + oid)
      .map(response => response.json())
  }

  listAll() {
    this.logger.debug('CostCenterResource.listAll');
    return this.http.get(this.baseUrl)
      .map(response => response.json());
  }

  create(entity)  {
    this.logger.debug('CostCenterResource.create entity=' + entity);
    return this.http.post(this.baseUrl, JSON.stringify(entity), this.buildRequestOptions());
  }

  update(entity) {
    this.logger.debug('CostCenterResource.update entity=' + entity);
    return this.http.put(this.baseUrl+ "/" + entity.oid, JSON.stringify(entity), this.buildRequestOptions());
  }

  deleteById(oid:Number) {
    this.logger.debug('CostCenterResource.deleteById oid=' + oid);
    return this.http.delete(this.baseUrl);
  }

  summary() {
    this.logger.debug('CostCenterResource.summary');
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
let CostCenterResourceFactory = (logger: Logger, xxxService: XxxService) => {
  return new CostCenterResource(logger, xxxServer.xxx.yyy);
};
let CostCenterResourceDefinition = {
  useFactory: CostCenterResourceFactory,
  deps: [Logger, Http]
};
let COST_CENTERS_RESOURCE_PROVIDER = provide(CostCenterResource, CostCenterResourceDefinition)
*/