import {Injectable } from 'angular2/angular2';

@Injectable()
export class ProjectConstants {

  private _defaultLanguage: string = "de";
  private _userLanguage: string;
  private _baseUrl: string = "http://localhost:8080/PmsSample/api";

  public get defaultLanguage(): string {
    return this._defaultLanguage;
  }

  public get userLanguage(): string {
    if (!this._userLanguage) {
      var lang: string = navigator.language.split('-')[0]; // use navigator lang if available
      lang = /(de|en)/gi.test(lang) ? lang : this._defaultLanguage;
      this._userLanguage = lang;
    }
    return this._userLanguage;
  }

  public get baseUrl(): string {
    return this._baseUrl;
  }
}
