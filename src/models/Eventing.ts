type Callback = () => void;
export class Eventing {
  events:{[key:string]: Callback[]} = {};

  on = (eventName:string, callback: Callback) => {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  } 

  trigger = (eventName: string): void => {
    this.events[eventName]?.forEach(e => e());
  }
}