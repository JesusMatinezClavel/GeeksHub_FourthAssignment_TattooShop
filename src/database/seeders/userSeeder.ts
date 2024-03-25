import { User } from "../../models/User"
import { faker } from "@faker-js/faker";
import { Role } from "../../models/Role";
import bcrypt from "bcrypt";

// Generamos Users aleatorios con faker
const generateUsers = () => {
    const randomUser = new User()
    const firstName = randomUser.firstName = faker.person.firstName()
    const lastName = randomUser.lastName = faker.person.lastName()
    // Generamos el email a partir del firstName y el lastName
    randomUser.email = faker.internet.email({ firstName, lastName })
    // Generamos una contraseña y la hasheamos
    randomUser.passwordHash = bcrypt.hashSync((faker.internet.password({ length: 8, memorable: true }) + faker.number.int({ min: 0, max: 9 })), 8)

    return randomUser
}

// Generamos los 3 usuarios de control básicos
export const generateControlUsers = async () => {
    const newUser = new User()
    newUser.firstName = 'user'
    newUser.lastName = 'test'
    newUser.email = 'user@user.com'
    newUser.passwordHash = bcrypt.hashSync('Pwd1233456', 8)
    newUser.role = {
        id: 1
    } as Role
    await newUser.save()

    const newAdmin = new User()
    newAdmin.firstName = 'admin'
    newAdmin.lastName = 'test'
    newAdmin.email = 'admin@admin.com'
    newAdmin.passwordHash = bcrypt.hashSync('Pwd1233456', 8)
    newAdmin.role = {
        id: 2
    } as Role
    await newAdmin.save()

    const newSuperAdmin = new User()
    newSuperAdmin.firstName = 'super_admin'
    newSuperAdmin.lastName = 'test'
    newSuperAdmin.email = 'super_admin@super_admin.com'
    newSuperAdmin.passwordHash = bcrypt.hashSync('Pwd1233456', 8)
    newSuperAdmin.role = {
        id: 3
    } as Role
    await newSuperAdmin.save()

    console.log(`---------------------------`);
    console.log(`control users have been generated succesfully!`);
    console.log(`---------------------------`);
}

export const seederUsers = async () => {

    // Creamos un Array con los 17 usuarios generados por generateUsers
    const users = Array.from({ length: 17 }, generateUsers)

    // Guardamos los usuarios generados
    await User.save(users)

    console.log(`---------------------------`);
    console.log(`test users have been generated succesfully!`);
    console.log(`---------------------------`);
}