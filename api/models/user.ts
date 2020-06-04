const jwt = require('jsonwebtoken');
export class User {
    public id: string;
    public username: string;
    public firstname: string;
    public lastname: string;
    public token: string;

    constructor(data: any = null) {
      this.id = data ? data['id'] : null;
      this.username = data ? data['username'] : null;
      this.firstname = data ? data['firstname'] : null;
      this.lastname = data ? data['lastname'] : null;
      this.token = data ? data['token'] : null;
    }

    public generateToken(){
      this.token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
      }, 'secret');
    }
}