# Tattoo's Studio📢

![Tattoo_Studio](./img/Tattoo_Studio.png)

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#objective">Objective</a></li>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#stack">Technologies used</a></li>
    <li><a href="#diagram-bd">Diagram</a></li>
    <li><a href="#Local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objective 🎯
My objective for this project was to create a functional API conected to a data base with some relations @ManyToOne

## About the project📑
This aplication has been created as an assignment for the GeeksHub's FullStackDeveloper bootcamp with the objective of developing the structure needed for the backend of a Tattoo studio's website. This API allows anyone to register in the website and check the services in it, aside from creating, updating or deleting appointments. It also allows the user with Super_admin role to delete or call users and to create, update or delete any service needed.  

## Technologies used 💻
<div align="center">
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nextjs.org/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://www.mongodb.com/es">
    <img src= "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascript-orange?style=for-the-badge&logo=javascript    "/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-grey?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>
<a href="https://www.npmjs.com/package/dotenv">
    <img src= "https://img.shields.io/badge/dotenv-blue?style=for-the-badge&logo=dotenv    "/>
</a>
<a href="https://www.npmjs.com/package/bcrypt">
    <img src= "https://img.shields.io/badge/bcrypt-%23F7DF1E?style=for-the-badge&logo=bcrypt"/>
</a>
<a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white"/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white"/>
</a>
 </div>

## DB Diagram📉
![Diagram for the first tables created](./img/Diagram_Tables.png)

## Local installation🔨
1. Clone the repository:

    `$ git clone https://github.com/JesusMatinezClavel/GeeksHub_FourthAssignment_TattooShop/tree/develop`

2. Install the dependencies

    ` $ npm install `

3. Create the file `.env` from `.env.sample` and change the values to your needs:

    Port where the server will be:

        PORT= 

    Credentials for the database:

        DB_host= 
        DB_port= 
        DB_username= 
        DB_password= 
        DB_database= 

    Token's secret:

        JWT_secret=

4. Conect our repository with the database

    `$ npm run dev`

5. Execute the migrations

    ` $ npm run run-migrations ` 

6. Execute the seeders

    ` $ npm run seed-db`

7. Import the ThunderClient collection from: 

    `./src/database/HTTP`


## Endpoints🚩
<details>
<summary>Endpoints</summary>

- AUTH
    - REGISTER

            POST localhost:4000/api/auth/register
        body:
        ``` js
            {
              "firstName": "Test",
              "lastName": "User",
              "email": "test@user.com",
              "passwordHash": "12345678"
            }
        ```

    - LOGIN

            POST localhost:4000/api/auth/login 
        body:
        ``` js
            {
              "email": "super_admin@super_admin.com",
              "password": "password"
            }
        ```
- SUPERADMIN
    - Get All Users

            GET localhost:4000/api/users?limit&page

    - Get User by Email

            POST localhost:4000/api/users?email=ejemplo@ejemplo.com

    - Update User

            Put localhost:4000/api/users/:id

    - Delete User

            DELETE localhost:4000/api/users/:id

- USERS
    - Get Own Profile

            GET localhost:4000/api/users/profile

    - Update Own Profile

            PUT localhost:4000/api/users/profile
        body:
        ``` js
            {
              "firstName": "user",
              "lastName": "test",
              "email": "user@user.com",
              "password": "password"
            }
        ```

- APPOINTMENTS
    - New Appointment

            POST localhost:4000/api/appointments
        body:
        ``` js
            {
              "date": "2022-02-03",
              "service": "3"
            }
        ```

    - Update Appointment

            PUT localhost:4000/api/appointments
        body:
        ``` js
            {
              "appointmentID": 16,
              "date": "2029-11-04",
              "service": "4"
            }
        ```

    - Get Appointments

            GET localhost:4000/api/appointments
        body:
        ``` js
            {
              "appointmentID": 16,
              "date": "2029-11-04",
              "service": "4"
            }
        ```

    - Get Appointments by ID

            GET localhost:4000/api/appointments/:id
        body:
        ``` js
            {
              "appointmentID": 16,
              "date": "2029-11-04",
              "service": "4"
            }
        ```

- SERVICES
    - Get All Services

            GET localhost:4000/api/appointments

    - Create New Service

            POST localhost:4000/api/services
        body:
        ``` js
            {
            "serviceName": "toigo",
            "description": "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
            }
        ```

    - Update Service

            PUT localhost:4000/api/services/:id
        body:
        ``` js
            {
              "serviceName": "3",
              "description": "huio"
            }
        ```

    - Delete Service

            DELETE localhost:4000/api/services/:id

</details>

## Contributions🤘
Sugestions are always welcomed!

You can do it both ways:

1. Create an issue
2. Create a fork of the repository
    - Create new branch
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Commit the changes
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Push the branch
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Open a Pull Request

## Contact📧
<a href = "mailto:jmcvalles@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/jes%C3%BAs-mart%C3%ADnez-clavel-vall%C3%A9s-913294108?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BtQmk%2FVrTShiKcofYcK6uYg%3D%3D" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>

