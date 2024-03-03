import { User } from "../../models/User"
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Role } from "../../models/Role";

// Generamos un usuario aleatorio con el package faker
const generateUsers = () => {
    const randomUser = new User()
    const firstName = randomUser.firstName = faker.person.firstName()
    const lastName = randomUser.lastName = faker.person.lastName()
    // Utilizamos el first_name y last_name del user para hacer un email relacionado
    randomUser.email = faker.internet.email({ firstName, lastName })
    // Generamos una contraseña de 8 letras fáciles de recordar
    randomUser.passwordHash = bcrypt.hashSync(faker.internet.password({ length: 8, memorable: true }), 8)

    return randomUser
}

// Exportamos la función del seeder de los users de control para llamarla junto con el resto de seeders
export const generateControlUsers = async () => {

    // Creamos el usuario con el rol de user
    const newUser = new User()
    newUser.firstName = 'user'
    newUser.lastName = 'test'
    newUser.email = 'user@user.com'
    newUser.passwordHash = bcrypt.hashSync('password', 8)
    newUser.role = {
        id: 1
    } as Role // <-------- Tenemos que indicarle que este valor hace referencia al Role de la entidad User
    await newUser.save()

    // Creamos el usuario con el rol de admin
    const newAdmin = new User()
    newAdmin.firstName = 'admin'
    newAdmin.lastName = 'test'
    newAdmin.email = 'admin@admin.com'
    newAdmin.passwordHash = bcrypt.hashSync('password', 8)
    newAdmin.role = {
        id: 2
    } as Role // <-------- Tenemos que indicarle que este valor hace referencia al Role de la entidad User
    await newAdmin.save()

    // Creamos el usuario con el rol de super_admin
    const newSuperAdmin = new User()
    newSuperAdmin.firstName = 'super_admin'
    newSuperAdmin.lastName = 'test'
    newSuperAdmin.email = 'super_admin@super_admin.com'
    newSuperAdmin.passwordHash = bcrypt.hashSync('password', 8)
    newSuperAdmin.role = {
        id: 3
    } as Role // <-------- Tenemos que indicarle que este valor hace referencia al Role de la entidad User
    await newSuperAdmin.save()

    // Mandamos un mensaje por consola para confirmar que los users de control se han creado correctamente
    console.log(`---------------------------`);
    console.log(`control users have been generated succesfully!`);
    console.log(`---------------------------`);
}

// Exportamos la función del seeder de los users de test para llamarla junto con el resto de seeders
export const seederUsers = async () => {

    // Generamos un Array con 17 usuarios aletorios a partir de generateUsers
    const users = Array.from({ length: 17 }, generateUsers)
    await User.save(users)

    // Mandamos un mensaje por consola para confirmar que los users de test se han creado correctamente
    console.log(`---------------------------`);
    console.log(`test users have been generated succesfully!`);
    console.log(`---------------------------`);
}