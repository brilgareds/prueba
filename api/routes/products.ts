import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Response, User, Product, Category } from '../models';
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

//Lista de Productos
router.get('/', (req: any, res: any, next: any) => {
	const db = new JsonDB(new Config("db", true, true, '/'));
	const user = new User(db.getData("/users/").find( ( user: any ) => user['token'] == req.headers.authorization.split(" ")[1]));
	const products = db.getData(`/products/`)
		.map( (product: any) => new Product(product) )
		.filter( (product: Product) => db.getData(`/user_products/user_${user.id}`).indexOf(product.id) != -1 );
	const orderedProducts: Category[] = [];
	products.forEach( (product: Product) => {
		const indexCategory = orderedProducts.findIndex( (category: Category) => category.id == product.category_id );
		if(indexCategory == -1){
			const newCategory = new Category(
				db.getData(`/categories/`).find( (category: Category) => category.id == product.category_id )
			);
			newCategory.products.push(product);
			orderedProducts.push(newCategory);
		}
		else{
			orderedProducts[indexCategory].products.push(product);
		}
	});
	res.status(200).send(
		new Response("", orderedProducts, 200)
	);
});

//Crear un Producto
router.post('/', (req: any, res: any, next: any) => {
	const db = new JsonDB(new Config("db", true, true, '/'));
	const user = new User(db.getData("/users/").find( ( user: any ) => user['token'] == req.headers.authorization.split(" ")[1]));
	const product = new Product(req.body);
	product.id = db.getData("/products[-1]")['id'] + 1;

	db.push("/products[]", product, true);
	db.push(`/user_products/user_${user.id}[]`, product.id, true);

	res.status(201).send(
		new Response("Product Created", null, 201)
	);
});

//Actualizar un producto
router.patch('/', (req: any, res: any, next: any) => {
	const db = new JsonDB(new Config("db", true, true, '/'));
	const user = new User(db.getData("/users/").find( ( user: any ) => user['token'] == req.headers.authorization.split(" ")[1]));

	const productToUpdate = new Product(req.body);
	const userProductIndex = db.getData(`/user_products/user_${user.id}`).indexOf(productToUpdate.id);

	if(userProductIndex !=-1){
		const productIndex = db.getData("/products/")
			.map( (product: any) => new Product(product) )
			.findIndex( (product: Product) => product.id == productToUpdate.id );
		db.push(`/products[${productIndex}]`, productToUpdate);
		res.status(200).send(
			new Response("Product Updated", null, 200)
		);
	}
	else{
		res.status(401).send(new Response("Unauthorized", null, 401));
	}
});


//Eliminar un producto
router.delete('/:id', (req: any, res: any, next: any) => {
	const db = new JsonDB(new Config("db", true, true, '/'));
	const user = new User(db.getData("/users/").find( ( user: any ) => user['token'] == req.headers.authorization.split(" ")[1]));

	const userProductIndex = db.getData(`/user_products/user_${user.id}`).indexOf(parseInt(req.param('id')));

	if(userProductIndex !=-1){
		const productIndex = db.getData("/products/")
			.map( (product: any) => new Product(product) )
			.findIndex( (product: Product) => product.id == parseInt(req.param('id')) );
		db.delete(`/products[${productIndex}]`);
		db.delete(`/user_products/user_${user.id}[${userProductIndex}]`);
		res.status(200).send(
			new Response("Product Deleted", null, 200)
		);
	}
	else{
		res.status(401).send(new Response("Unauthorized", null, 401));
	}
});

//Consultar un Producto
router.get('/:id', (req: any, res: any, next: any) => {
	const db = new JsonDB(new Config("db", true, true, '/'));
	const user = new User(db.getData("/users/").find( ( user: any ) => user['token'] == req.headers.authorization.split(" ")[1]));

	const userProductIndex = db.getData(`/user_products/user_${user.id}`).indexOf(parseInt(req.param('id')));

	if(userProductIndex !=-1){
		const productIndex = db.getData("/products/")
			.map( (product: any) => new Product(product) )
			.findIndex( (product: Product) => product.id == parseInt(req.param('id')) );
		res.status(200).send(
			new Response("", new Product(db.getData(`/products[${productIndex}]`)), 200)
		);
	}
	else{
		res.status(401).send(new Response("Unauthorized", null, 401));
	}
});


module.exports = router;