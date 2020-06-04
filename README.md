## API para Prueba Técnica de ingreso a Takúm Soluciones

### Despliegue de la API

1.  Instalar las dependecias requeridas con el comando `npm install`.
2.  Ejecutar el comando `npm start` para iniciar la API.
3. Verificar su funcionamiento a través de `http://localhost:8001/`.

------------

### Usuarios para prueba
Los siguientes Usuarios son los que deberán funcionar correctamente para el funcionamiento del aplicativo a desarrollar:

Usuario 1
- **Usuario:** JohnDoe
- **Contraseña:** menInBlack97

Usuario 2
 - **Usuario:** AnaFlowers
 - **Contraseña:** iwannatravel
 
 

------------
### Estructura de Modelos

**Usuario**
```json
{
            "id": "number",
            "username": "string",
            "firstname": "string",
            "lastname": "string",
            "password": "string",
            "token": "string"
}
```

**Producto**
```json
{
            "id": "number",
            "name": "string",
            "description": "string",
            "image": "string",
            "price": "number",
            "category_id": "number"
}
```
**Categoria**
```json
{
            "id": "number",
            "name": "string"
}
```


------------

#### ¡Buena suerte!