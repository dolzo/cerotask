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

-   Content-Type: application/x-www-form-urlencoded

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

-   Content-Type: application/x-www-form-urlencoded

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

#### `GET /apiv1/user/users`

Retorna todos los usuario registrados, para usar este endpoint se requiere tener un token de autenticacion de un usuario con rol de administrador.

##### Headers

-   Authorization: JSON web token
-   Content-Type: application/x-www-form-urlencoded

##### Request

No hay parametros de consulta en esta solicitud

##### Response

```json
{
    "status": "ok",
    "users": [
        {
            "_id": "669ea56f8323a027be75f2a9",
            "name": "nombre",
            "surname": "apellido",
            "email": "email@email.com",
            "password": "$2b$10$J6/ZFDly4NELAD0CRTwwueVVptLgwero4UbzsbI/ZR6ss2Q55X7Rm",
            "role": "role_user",
            "created_at": "2024-07-22T18:31:11.096Z",
            "__v": 0
        },
        {
            "_id": "669ea5cb8323a027be75f2ad",
            "name": "nombre",
            "surname": "apellido",
            "email": "email@email.co",
            "password": "$2b$10$aCxxQenZks84bEIRwHq35.eRFf8RrYkC7ImrJvJrE2I8Q0d0RcsKK",
            "role": "role_admin",
            "created_at": "2024-07-22T18:32:43.650Z",
            "__v": 0
        }
    ]
}
```

### Tareas

#### `POST /apiv1/task/create-task`

Se crea una nueva tarea con los datos indicados en el body de la solicitud, esta requiere un usuario asignado a la tarea.

##### Headers

-   Authorization: JSON web token
-   Content-Type: application/x-www-form-urlencoded

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
