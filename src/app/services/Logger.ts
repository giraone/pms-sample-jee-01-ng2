import {Injectable } from 'angular2/angular2';

@Injectable()
export class Logger {

  error( msg1: string, msg2?: Object ) {
    console.log( msg1, msg2 );
  }

  warning( msg1: string, msg2?: Object ) {
    console.log( msg1, msg2 );
  }

  info( msg1: string, msg2?: Object ) {
    console.log( msg1, msg2 );
  }

  debug( msg1: string, msg2?: Object ) {
    console.log( msg1, msg2 );
  }
}
