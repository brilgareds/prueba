import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Response, Category } from '../models';
const router = require('express').Router();

router.use((req: any, res: any, next: any) => {
	if(req.headers.authorization.split(" ")[0] == "Bearer"){
		const db = new JsonDB(new Config("db", true, true, '/'));
		if(db.getData("/users/").find( ( user: any ) => user['token'] == req.headers.authorization.split(" ")[1])){
			next();
		}
		else{
			res.status(401).send(new Response("Unauthorized", null, 401));
		}
	}
	else{
		res.status(401).send(new Response("Unauthorized", null, 401));
	}
});

//Consultar Categorias
router.get('/', (req: any, res: any, next: any) => {
	const db = new JsonDB(new Config("db", true, true, '/'));
	res.status(200).send(
		new Response("", db.getData("/categories/"), 200)
	);
});

module.exports = router;