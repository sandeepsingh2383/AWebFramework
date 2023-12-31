import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";
export class Collection <T, K>{
  models: T[] = [];
  events: Eventing = new Eventing();
  constructor(public rootUrl: string, public deserialize:(json:K) => T) {

  }
  on = this.events.on;
  trigger = this.events.trigger;
  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        const model = this.deserialize(value);
        this.models.push(model);
      });
      this.trigger('change');
    })
  }
}