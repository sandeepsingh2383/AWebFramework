import { HasId } from "../models/ApiSync";
import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K extends HasId> {
  regions: {[key:string]: Element} = {};
  constructor(public parent: Element, public model: T){
    this.bindModel();
  }

  abstract template(): string;

  bindModel(): void {
    this.model.on('change', ()=>{
      this.render();
    });
  }
  eventsMap():{[key:string]: ()=>void} {
    return {}
  };
  regionsMap(): {[key: string]: string}{
    return {

    }
  } 
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      })
    }
  }

  mapRegions(fragment: DocumentFragment):void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const el = fragment.querySelector(selector);
      if (el) {
        this.regions[key] = el;
      }
    }
  }

  onRender(): void {

  }

  render():void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
    this.parent.append(templateElement.content);
  }
}