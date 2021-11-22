import { makeObservable, observable } from "mobx";

export default class ActivityStore1 {
  description = "Hello World from Mob X1";
  constructor() {
    makeObservable(this, {
      description: observable,
    });
  }
}
