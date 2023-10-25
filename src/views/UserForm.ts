import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap():{[key:string]: () => void} {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.change-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    }
  }

  onSaveClick = ():void => {
    this.model.save();
  }

  onSetNameClick = ():void => {
    const name = this.parent.querySelector('input')?.value;
    name && this.model.set({name});
  }
  onSetAgeClick = ():void => {
    this.model.setRandomAge();
  }
  onButtonClick(): void {
    console.log('Hi there');
  }

  onHeaderHover(): void {
    console.log('h1 Hovered');
  }

  template():string {
    return `
      <div>
        <input placeholder=${this.model.get('name')}></input>
        <button class="change-name">Change name</button>
        <button class="set-age">Set random age</button>
        <button class="save-model">Save User</button>
      </div>
    `
  }
}