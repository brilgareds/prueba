const express = require('express');
const router = express.Router();
import { Response } from '../models';

//Consultar Categorias
router.get('/', (req: any, res: any) =>  {
	res.status(200).send(
		new Response("The API is working on it.")
	);
});
module.exports = router;