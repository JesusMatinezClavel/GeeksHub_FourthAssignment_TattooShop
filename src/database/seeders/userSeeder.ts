import { User } from "../../models/User"
import { faker } from "@faker-js/faker";
import { AppDataSource } from "../db";
import { Role } from "../../models/Role";

const generateUsers = () => {
    const randomUser = new User()
    const firstName = randomUser.firstName = faker.person.firstName()
    const lastName = randomUser.lastName = faker.person.lastName()
    randomUser.email = faker.internet.email({ firstName, lastName })
    randomUser.passwordHash = faker.internet.password({ length: 8, memorable: true })

    return randomUser
}

const generateControlUsers = async () => {
    const newUser = new User()
    newUser.firstName = 'user'
    newUser.lastName = 'test'
    newUser.email = 'user@user.com'
    newUser.passwordHash = 'password'

    const roleUser = await Role.findOne({
        where: {
            id: 1
        }
    })
    if (!roleUser) {
        console.error('No se encontró el rol con id igual a 1');
        return;
    }
    newUser.role = roleUser
    await newUser.save()

    const newAdmin = new User()
    newAdmin.firstName = 'admin'
    newAdmin.lastName = 'test'
    newAdmin.email = 'admin@admin.com'
    newAdmin.passwordHash = 'password'

    const roleAdmin = await Role.findOne({
        where: {
            id: 2
        }
    })
    if (!roleAdmin) {
        console.error('No se encontró el rol con id igual a 2');
        return;
    }
    newAdmin.role = roleAdmin
    await newAdmin.save()

    const newSuperAdmin = new User()
    newSuperAdmin.firstName = 'super_admin'
    newSuperAdmin.lastName = 'test'
    newSuperAdmin.email = 'super_admin@super_admin.com'
    newSuperAdmin.passwordHash = 'password'

    const roleSuperAdmin = await Role.findOne({
        where: {
            id: 3
        }
    })
    if (!roleSuperAdmin) {
        console.error('No se encontró el rol con id igual a 2');
        return;
    }
    newSuperAdmin.role = roleSuperAdmin
    await newSuperAdmin.save()

    console.log(`---------------------------`);
    console.log(`control users have been generated succesfully!`);
    console.log(`---------------------------`);
}

export const seederUsers = async () => {
    try {
        await AppDataSource.initialize()

        await generateControlUsers()

        const users = Array.from({ length: 17 }, generateUsers)

        await User.save(users)

        console.log(`---------------------------`);
        console.log(`test users have been generated succesfully!`);
        console.log(`---------------------------`);

        return users
        
    } catch (error) {
        console.log(error)
    } finally {
        AppDataSource.destroy()
    }
}