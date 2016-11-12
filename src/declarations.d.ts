/*
 Declaration files are how the Typescript compiler knows about the type information(or shape) of an object.
 They're what make intellisense work and make Typescript know all about your code.

 A wildcard module is declared below to allow third party libraries to be used in an app even if they don't
 provide their own type declarations.

 To learn more about using third party libraries in an Ionic app, check out the docs here:
 http://ionicframework.com/docs/v2/resources/third-party-libs/

 For more info on type definition files, check out the Typescript docs here:
 https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
 */
declare module '*'
;

declare namespace PouchDB {
  import Options = PouchDB.Core.Options;
  export interface Database<Content extends Core.Encodable> {
    sync(remoteDB: Database<Content>): SyncObject;
    sync(remoteDB: Database<Content>, options: SyncOptions): SyncObject;
  }

  export interface SyncOptions extends Options {
    live: boolean;
    retry: boolean;

    //Filter Options
    filter: any;
    doc_ids: Array<string>;
    query_params: any;
    view: any;

    //Advanced Options
    since: any;
    heartbeat: any;
    timeout: number;
    batch_size: number;
    batches_limit: number;
    back_off_function: any;
  }

  export interface SyncObject {
    cancel();
  }
}