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

##### Request:

```
{
    name: nombre,
    surname: apellido,
    email: email.email.com,
    password: Password1
}
```

##### Response:

```
{
    "status": "ok",
    "message": "Usuario guardado correctamente",
    "userToSave": {
        "name": "nombre",
        "surname": "apellido",
        "email": "email@email.com",
        "password": "$2b$10$RUdO7xbMYLmjhX4C7c3hL.pnHOe3y3jYSamwwIAskZ5PFg9D1ndR2",
        "_id": "66995d9e5469adba780207d0",
        "created_at": "2024-07-18T18:23:26.623Z",
        "__v": 0
    }
}
```

#### `POST /apiv1/user/login`

Se inicia sesion con un usuario guardado en la base de datos.

##### Request:

```
{
    email: email@email.com,
    password: Password1
}
```

##### Response:

```
{
    "status": "ok",
    "message": "Login exitoso",
    "user": {
        "_id": "66995d9e5469adba780207d0",
        "name": "nombre",
        "surname": "apellido",
        "email": "email@email.com",
        "password": "$2b$10$RUdO7xbMYLmjhX4C7c3hL.pnHOe3y3jYSamwwIAskZ5PFg9D1ndR2",
        "created_at": "2024-07-18T18:23:26.623Z",
        "__v": 0
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2OTk1ZDllNTQ2OWFkYmE3ODAyMDdkMCIsIm5hbWUiOiJub21icmUiLCJzdXJuYW1lIjoiYXBlbGxpZG8iLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcyMTMyODEyMSwiZXhwIjoxNzIzOTIwMTIxfQ.peL2xCrRuBkLcG_CC9nwpFji8u9_XLofuTfvBqZ0q7I"
}
```

### Tareas

#### `POST /apiv1/task/create-task`

Se crea una nueva tarea con los datos indicados en el body de la solicitud, esta requiere un usuario asignado a la tarea.

##### Headers

-   Authorization: JSON web token
-   Content-Type: multipart/form-data

##### Request

```
{
    title: cama,
    description: hacer la cama,
    user: 669aab39abf1694a611e62d4
}
```

##### Response

{
"status": "ok",
"message": "Tarea guardada",
"savedTask": {
"title": "cama",
"description": "hacer la cama",
"completed": false,
"user": "669aab39abf1694a611e62d4",
"\_id": "669ab168406cbe2cc759d2c3",
"created_at": "2024-07-19T18:33:12.266Z",
"\_\_v": 0
}
}
