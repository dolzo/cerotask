# Backend de gestión de tareas CeroTask

## Requisitos previos

-   Node.js v20.14.0 o superior
-   npm v10.7.0 o superior
-   Mongodb v7.0.11 o superior

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/LeDolz/cerotask
    ```

2. Navegar al directorio del proyecto:

    ```
    cd cerotask
    ```

3. Instalar las dependencias:

    ```
    npm install
    ```

4. Iniciar el proyecto:

    ```
    node index.js
    ```

## Rutas y endpoints

### Usuarios

#### `POST /apiv1/user/create-user`

Se crea un usuario y se guarda en la base de datos.

##### Headers

-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`name=nombre&surname=apellido&email=email@email.com&password=Password1`

##### Response

```json
{
    "status": "ok",
    "message": "Usuario guardado correctamente",
    "userToSave": {
        "name": "nombre",
        "surname": "apellido",
        "email": "email@email.com",
        "password": "$2b$10$J6/ZFDly4NELAD0CRTwwueVVptLgwero4UbzsbI/ZR6ss2Q55X7Rm",
        "role": "role_user",
        "_id": "669ea56f8323a027be75f2a9",
        "created_at": "2024-07-22T18:31:11.096Z",
        "__v": 0
    }
}
```

#### `POST /apiv1/user/login`

Se inicia sesion con un usuario guardado en la base de datos.

##### Headers

-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`email=email@email.com&password=Password1`

##### Response

```json
{
    "status": "ok",
    "message": "Login exitoso",
    "user": {
        "_id": "669ea56f8323a027be75f2a9",
        "name": "nombre",
        "surname": "apellido",
        "email": "email@email.com",
        "password": "$2b$10$J6/ZFDly4NELAD0CRTwwueVVptLgwero4UbzsbI/ZR6ss2Q55X7Rm",
        "role": "role_user",
        "created_at": "2024-07-22T18:31:11.096Z",
        "__v": 0
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWVhNTZmODMyM2EwMjdiZTc1ZjJhOSIsIm5hbWUiOiJub21icmUiLCJzdXJuYW1lIjoiYXBlbGxpZG8iLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInJvbGUiOiJyb2xlX3VzZXIiLCJpYXQiOjE3MjE2NzMxMjYsImV4cCI6MTcyNDI2NTEyNn0.YpsSIFZM8YszOvjBFLv8y4Jf0XbmM5YMnAqnOA4CMP4"
}
```

#### `GET /apiv1/user/users/page/:page`

Retorna todos los usuario registrados, se debe ingresar el parametro `page` para indicar la pagina a la cual se desea acceder, cada pagina tiene un total de 10 documentos. Para usar este endpoint se requiere tener un token de autenticacion de un usuario con rol de administrador.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWVhNWNiODMyM2EwMjdiZTc1ZjJhZCIsIm5hbWUiOiJOb21icmUiLCJzdXJuYW1lIjoiQXBlbGxpZG8iLCJlbWFpbCI6ImNvcnJlb0Bwcm92ZWVkb3IuY29tIiwicm9sZSI6InJvbGVfYWRtaW4iLCJpYXQiOjE3MjMxNDg5NDMsImV4cCI6MTcyNTc0MDk0M30.FfqKIdEs9sne83lNUEihYoaixFRk74rjirSObD93PoE`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`page=1`

##### Response

```json
{
    "status": "ok",
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false,
    "users": [
        {
            "_id": "66ba27266d00dd8eef912718",
            "name": "NombreUserDos",
            "surname": "ApellidoUserDos",
            "email": "user2@cerotask.com",
            "role": "role_user",
            "created_at": "2024-08-12T15:15:50.300Z",
            "__v": 0
        },
        {
            "_id": "66ba271c6d00dd8eef912715",
            "name": "NombreUser",
            "surname": "ApellidoUser",
            "email": "user1@cerotask.com",
            "role": "role_user",
            "created_at": "2024-08-12T15:15:40.171Z",
            "__v": 0
        },
        {
            "_id": "66ba21a46d00dd8eef912712",
            "name": "NombreAdmin",
            "surname": "ApellidoAdmin",
            "email": "admin@cerotask.com",
            "role": "role_admin",
            "created_at": "2024-08-12T14:52:20.711Z",
            "__v": 0
        },
        {
            "_id": "66b1399cdefd2538f12042e4",
            "name": "nombreaaa",
            "surname": "apellidoaaa",
            "email": "email@email.coaaa",
            "role": "role_user",
            "created_at": "2024-08-05T20:44:12.621Z",
            "__v": 0
        },
        {
            "_id": "669ea5cb8323a027be75f2ad",
            "name": "Nombre",
            "surname": "Apellidohola",
            "email": "correo@proveedor.com",
            "role": "role_admin",
            "created_at": "2024-07-22T18:32:43.650Z",
            "__v": 0
        },
        {
            "_id": "669ea56f8323a027be75f2a9",
            "name": "Nombre",
            "surname": "Apellido",
            "email": "coreeo123@meme.com",
            "role": "role_user",
            "created_at": "2024-07-22T18:31:11.096Z",
            "__v": 0
        }
    ]
}
```

#### `GET /apiv1/user/users/:id`

Retorna un usuario en especifico, esto basado en el id de usuario, para este endpoint se requiere tener un token de autenticacion de un usuario con rol de administrador.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWU5ZGNmMTQ0MDIyMmExYTkzMDIyMiIsIm5hbWUiOiJub21icmUiLCJzdXJuYW1lIjoiYXBlbGxpZG8iLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvIiwicm9sZSI6InVzZXJfYWRtaW4iLCJpYXQiOjE3MjE2NzExNDUsImV4cCI6MTcyNDI2MzE0NX0.CHsfdYzCP7qAii_ja0aJCtlyQQ9ZXFtiXd-b3ZiM9Ro`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=669ea56f8323a027be75f2a9`

##### Response

```
{
    "status": "ok",
    "userFound": {
        "_id": "669ea56f8323a027be75f2a9",
        "name": "nombre",
        "surname": "apellido",
        "email": "email@email.com",
        "role": "role_user",
        "created_at": "2024-07-22T18:31:11.096Z",
        "__v": 0
    }
}
```

#### `PUT /apiv1/user/update-user/`

Se actualiza el usuario del Json web token con el cual se llame a este endpoint. No es necesario entregar todos los parametros del usuario, puesto que tan solo se tomaran en cuenta los que se entreguen para la actualizacion.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWVhNWNiODMyM2EwMjdiZTc1ZjJhZCIsIm5hbWUiOiJOb21icmUiLCJzdXJuYW1lIjoiQXBlbGxpZG8iLCJlbWFpbCI6ImNvcnJlb0BtZW1lLmNvbSIsInJvbGUiOiJyb2xlX2FkbWluIiwiaWF0IjoxNzIyNTQ1MTI0LCJleHAiOjE3MjUxMzcxMjR9.3zjTe9f_KiikLKXwg_eCVSQg3zbfUJrQp1Jk5YzMNkw`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`name=Nombre&surname=Apellido&email=correo@proveedor.com&password=Password1`

##### Response

```json
{
    "status": "ok",
    "message": "Usuario actualizado",
    "updatedUser": {
        "_id": "669ea5cb8323a027be75f2ad",
        "name": "Nombre",
        "surname": "Apellido",
        "email": "correo@proveedor.com",
        "role": "role_admin",
        "created_at": "2024-07-22T18:32:43.650Z",
        "__v": 0
    }
}
```

#### `POST /apiv1/user/delete/:id`

Se elimina al usuario especificado en el parametro de id del endpoint. Si el usuario quiere borrar a un usuario distinto a el, este deberá tener el rol `role_admin` en su token de autorización, en cambio, si el usuario desea borrarse a si mismo, lo podrá hacer teniendo el rol `role_user`.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2YjEzZTdlZTM4MGYwMTg3ZTU5OWU5MSIsIm5hbWUiOiJub21icmVCb3JyYXIiLCJzdXJuYW1lIjoiYXBlbGxpZG9Cb3JyYXIiLCJlbWFpbCI6ImVtYWlsQGJvcnJhci5jb20iLCJyb2xlIjoicm9sZV91c2VyIiwiaWF0IjoxNzIyODkxOTI3LCJleHAiOjE3MjU0ODM5Mjd9.4FCngeaWrs59NRRYySRzLSwBVdKwJUiNxn118d1s0gc`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=66b13e7ee380f0187e599e91`

##### Response

```json
{
    "status": "ok",
    "message": "Usuario eliminado",
    "deletedUser": {
        "_id": "66b13e7ee380f0187e599e91",
        "name": "nombreBorrar",
        "surname": "apellidoBorrar",
        "email": "email@borrar.com",
        "password": "$2b$10$KkjXUbeoctQzmxN1kjpOx.g3fTf3iVG3.NDFx5/vbKyw/UmeSnufm",
        "role": "role_user",
        "created_at": "2024-08-05T21:05:02.452Z",
        "__v": 0
    }
}
```

<!--> Apartado de tareas <!-->

### Tareas

#### `POST /apiv1/task/create-task`

Se crea una nueva tarea con los datos indicados en el body de la solicitud, esta requiere un usuario asignado a la tarea.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWFhYjM5YWJmMTY5NGE2MTFlNjJkNCIsIm5hbWUiOiJub21icmUiLCJzdXJuYW1lIjoiYXBlbGxpZG8iLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcyMTQxMjgyMSwiZXhwIjoxNzI0MDA0ODIxfQ.mV3_VLTD4R1pJEQwWr-Voxc8wK2hgF-VnmYt_aTl2tU`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`title=cama&descripcion=hacer la cama&user=669aab39abf1694a611e62d4`

##### Response

```json
{
    "status": "ok",
    "message": "Tarea guardada",
    "savedTask": {
        "title": "cama",
        "description": "hacer la cama",
        "completed": false,
        "user": "669aab39abf1694a611e62d4",
        "_id": "669ab168406cbe2cc759d2c3",
        "created_at": "2024-07-19T18:33:12.266Z",
        "__v": 0
    }
}
```

#### `GET /apiv1/tasks/page/:page`

Este endpoint retorna todas las tareas registradas por los usuarios que se encuentran guardadas en la base de datos. Este recibe como parametro el numero de pagina, cada pagina contiene 10 tareas. Para poder usar este endpoint se debe estas logueado como un usuario que tenga el rol de `role_admin`.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OWVhNWNiODMyM2EwMjdiZTc1ZjJhZCIsIm5hbWUiOiJOb21icmUiLCJzdXJuYW1lIjoiQXBlbGxpZG8iLCJlbWFpbCI6ImNvcnJlb0Bwcm92ZWVkb3IuY29tIiwicm9sZSI6InJvbGVfYWRtaW4iLCJpYXQiOjE3MjI5NjczOTksImV4cCI6MTcyNTU1OTM5OX0.3utnb9thWPpQCQ5FSTaUxzHG2WzUan9CE8I94lPmVHM`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`page=1`

##### Response

```json
{
    "status": "ok",
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false,
    "tasks": [
        {
            "_id": "66ba365f15a1f8e8fac3f336",
            "title": "Pasear al perro",
            "description": "Sacar a caminar a huesos",
            "completed": true,
            "user": "66ba271c6d00dd8eef912715",
            "created_at": "2024-08-12T16:20:47.118Z",
            "__v": 0
        },
        {
            "_id": "66b7a6fb85c94139f10dd95b",
            "title": "Aseo",
            "description": "lavar los platos",
            "completed": false,
            "user": "66b1399cdefd2538f12042e4",
            "created_at": "2024-08-10T17:44:27.937Z",
            "__v": 0
        },
        {
            "_id": "66b52403b1aa9cf8f9f54744",
            "title": "Tarea User",
            "description": "esta es la tarea de user normal",
            "completed": false,
            "user": "66b1399cdefd2538f12042e4",
            "created_at": "2024-08-08T20:01:07.697Z",
            "__v": 0
        },
        {
            "_id": "66b51ac96c201fc6790ee68d",
            "title": "Tareaadmin",
            "description": "esta es la tarea de admin",
            "completed": false,
            "user": "669ea56f8323a027be75f2a9",
            "created_at": "2024-08-08T19:21:45.014Z",
            "__v": 0
        },
        {
            "_id": "669ea84b8323a027be75f2b1",
            "title": "aseo",
            "description": "Ordenar la casa",
            "completed": false,
            "user": "669aab39abf1694a611e62d4",
            "created_at": "2024-07-22T18:43:23.011Z",
            "__v": 0
        },
        {
            "_id": "669ab168406cbe2cc759d2c3",
            "title": "cama",
            "description": "hacer la cama",
            "completed": false,
            "user": "669aab39abf1694a611e62d4",
            "created_at": "2024-07-19T18:33:12.266Z",
            "__v": 0
        }
    ]
}
```

#### `GET /apiv1/task/tasks/:id`

En este endpoint se obtiene una tarea en especifico mediante su id. Para poder usar este endpoint, el usuario debe ser aquel que creó la tarea, o en su defecto, tener el rol de `role_admin`.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2YjEzOTljZGVmZDI1MzhmMTIwNDJlNCIsIm5hbWUiOiJub21icmVhYWEiLCJzdXJuYW1lIjoiYXBlbGxpZG9hYWEiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvYWFhIiwicm9sZSI6InJvbGVfdXNlciIsImlhdCI6MTcyMzE0NTU1MywiZXhwIjoxNzI1NzM3NTUzfQ.x4Whjr2Ka3kcHfz4w9kvpytX6uco_KDByJPohOe5m8U`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=66b51dd0070d70eaf066afc0`

##### Response

```json
{
    "status": "ok",
    "taskFound": {
        "_id": "66b51dd0070d70eaf066afc0",
        "title": "TareaUser",
        "description": "esta es la tarea de user normal",
        "completed": false,
        "user": "66b1399cdefd2538f12042e4",
        "created_at": "2024-08-08T19:34:40.032Z",
        "__v": 0
    }
}
```

#### `GET /apiv1/task/user-tasks/:id/:page`

Con este endpoint, un usuario puede ver todas sus tareas, se debe entregar el parametro `id` mediante la url, siendo este el id del usuario al cual se accederan a sus tareas, de igual manera se debe entregar el parametro `page`, este representa el numero de la pagina, cada pagina tiene 10 documentos. Un usuario con el rol de admin puede revisar las tareas de otros usuario.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2YjEzOTljZGVmZDI1MzhmMTIwNDJlNCIsIm5hbWUiOiJub21icmVhYWEiLCJzdXJuYW1lIjoiYXBlbGxpZG9hYWEiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvYWFhIiwicm9sZSI6InJvbGVfdXNlciIsImlhdCI6MTcyMzMxMDkwOSwiZXhwIjoxNzI1ODk5MzA5fQ.CqExRq9ftm8ktHbzcusZb0igWgnGbZeVyQDIiTylZ6I`
-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=66b1399cdefd2538f12042e4&page=1`

##### Response

```json
{
    "status": "ok",
    "totalPages": 1,
    "currentPage": 1,
    "hasNextPage": false,
    "hasPrevPage": false,
    "tasks": [
        {
            "_id": "66b7a6fb85c94139f10dd95b",
            "title": "Aseo",
            "description": "lavar los platos",
            "completed": false,
            "user": "66b1399cdefd2538f12042e4",
            "created_at": "2024-08-10T17:44:27.937Z",
            "__v": 0
        },
        {
            "_id": "66b52403b1aa9cf8f9f54744",
            "title": "Tarea User",
            "description": "esta es la tarea de user normal",
            "completed": false,
            "user": "66b1399cdefd2538f12042e4",
            "created_at": "2024-08-08T20:01:07.697Z",
            "__v": 0
        }
    ]
}
```

#### `PUT /apiv1/task/update-task/:id`

Este endpoint se usa para actualizar una tarea con los parametros indicados en el cuerpo de la solicitud. Si algun parametro no es ingresado, se pasara por alto. Solamente el usuario que creo la tarea o un admin pueden actualizar dicha tarea.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2YmEyNzFjNmQwMGRkOGVlZjkxMjcxNSIsIm5hbWUiOiJOb21icmVVc2VyIiwic3VybmFtZSI6IkFwZWxsaWRvVXNlciIsImVtYWlsIjoidXNlcjFAY2Vyb3Rhc2suY29tIiwicm9sZSI6InJvbGVfdXNlciIsImlhdCI6MTcyMzQ3NTg1MywiZXhwIjoxNzI2MDY0MjUzfQ.M_oJ2qQ1l3dFkca0r4Oeum8kcqsxZsDli5agDvcPS38`

-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=66ba365f15a1f8e8fac3f336&title=Pasear al perro&description=Sacar a caminar a huesos`

##### Response

```json
{
    "status": "ok",
    "message": "actualizar tarea",
    "updatedTask": {
        "_id": "66ba365f15a1f8e8fac3f336",
        "title": "Pasear al perro",
        "description": "Sacar a caminar a huesos",
        "completed": false,
        "user": "66ba271c6d00dd8eef912715",
        "created_at": "2024-08-12T16:20:47.118Z",
        "__v": 0
    }
}
```

#### `DELETE /apiv1/task/delete/:id`

Este endpoint permite eliminar una tarea en especifico mediante su `id`, dicha tarea solo podra ser eliminada si es que el usuario que se encuentra logueado fue el que la creó, o en su defecto, si el usuario logueado tiene el rol `role_admin`.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2YmEyNzFjNmQwMGRkOGVlZjkxMjcxNSIsIm5hbWUiOiJOb21icmVVc2VyIiwic3VybmFtZSI6IkFwZWxsaWRvVXNlciIsImVtYWlsIjoidXNlcjFAY2Vyb3Rhc2suY29tIiwicm9sZSI6InJvbGVfdXNlciIsImlhdCI6MTcyMzQ3NTg1MywiZXhwIjoxNzI2MDY0MjUzfQ.M_oJ2qQ1l3dFkca0r4Oeum8kcqsxZsDli5agDvcPS38`

-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=66bc98187710354fc1f3ffef`

##### Response

```json
{
    "status": "ok",
    "message": "Tarea eliminada",
    "deletedTask": {
        "_id": "66bc98187710354fc1f3ffef",
        "title": "Aseo",
        "description": "lavar los platos",
        "completed": false,
        "user": "66ba271c6d00dd8eef912715",
        "created_at": "2024-08-14T11:42:16.674Z",
        "__v": 0
    }
}
```

#### `PATCH /apiv1/task/status/:id`

Este endpoint permite cambiar el estado del atributo `completed` de una tarea por los valores `true` o `false` según sea requerido. Esto solo podrá ser realizado por el usuario que creó la tarea o por un usuario con el rol de `role_admin`.

##### Headers

-   Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2YmEyNzFjNmQwMGRkOGVlZjkxMjcxNSIsIm5hbWUiOiJOb21icmVVc2VyIiwic3VybmFtZSI6IkFwZWxsaWRvVXNlciIsImVtYWlsIjoidXNlcjFAY2Vyb3Rhc2suY29tIiwicm9sZSI6InJvbGVfdXNlciIsImlhdCI6MTcyMzQ3NTg1MywiZXhwIjoxNzI2MDY0MjUzfQ.M_oJ2qQ1l3dFkca0r4Oeum8kcqsxZsDli5agDvcPS38`

-   Content-Type: `application/x-www-form-urlencoded`

##### Request

`id=66ba365f15a1f8e8fac3f336&status=true`

##### Response

```json
{
    "status": "ok",
    "message": "Estado actualizado",
    "updatedTask": {
        "_id": "66ba365f15a1f8e8fac3f336",
        "title": "Pasear al perro",
        "description": "Sacar a caminar a huesos",
        "completed": true,
        "user": "66ba271c6d00dd8eef912715",
        "created_at": "2024-08-12T16:20:47.118Z",
        "__v": 0
    }
}
```
