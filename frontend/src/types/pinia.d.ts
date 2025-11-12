import "pinia";

declare module "pinia" {
  export interface DefineStoreOptionsBase {
    id?: string;
  }
}
