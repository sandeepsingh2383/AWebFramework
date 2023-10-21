import { User } from "./models/User";

const user = User.buildUser({id: 2, name: 'FName', age: 44});

user.on('save', () => {
  console.log('User has been saved', user.get('name'));
});
user.fetch();
user.set({name:'newOne'})
user.save()