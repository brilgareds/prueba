import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Response, User } from '../models';
const router = require('express').Router();
const atob = require('atob');


//Login con Basic Auth
router.post('/', (req: any, res: any, next: any) => {
	
	if(req.headers.authorization){
		if(req.headers.authorization.split(" ")[0] == "Basic"){

			const db = new JsonDB(new Config("db", true, true, '/'));
			let attemptingUser: any = {
				username: atob( req.headers.authorization.split(" ")[1] ).split(":")[0],
				password: atob( req.headers.authorization.split(" ")[1] ).split(":")[1]
			};

			const userIndex = db.getData("/users/").findIndex( 
				(user: any) => `${user['username']}${user['password']}` == `${attemptingUser.username}${attemptingUser.password}`
			);

			if(userIndex != -1){
				const user = new User(db.getData(`/users/${userIndex}`));
				user.generateToken();
				db.push(`/users/${userIndex}/token`, user.token);
				res.status(200).send(new Response("", user, 200));
			}
			else{
				res.status(400).send(new Response("Invalid Credentials", null, 401));
			}
			
		}
		else{
			res.status(401).send(new Response("Unauthorized", null, 401));
		}
	}
	else{
		res.status(401).send(new Response("Unauthorized", null, 401));
	}
});

module.exports = router;