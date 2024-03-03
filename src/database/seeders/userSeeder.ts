import { User } from "../../models/User"
import { faker } from "@faker-js/faker";
import { Role } from "../../models/Role";

const generateUsers = () => {
    const randomUser = new User()
    const firstName = randomUser.firstName = faker.person.firstName()
    const lastName = randomUser.lastName = faker.person.lastName()
    randomUser.email = faker.internet.email({ firstName, lastName })
    randomUser.passwordHash = faker.internet.password({ length: 8, memorable: true })

    return randomUser
}

export const generateControlUsers = async () => {
    const newUser = new User()
    newUser.firstName = 'user'
    newUser.lastName = 'test'
    newUser.email = 'user@user.com'
    newUser.passwordHash = 'password'

    
    newUser.role = {
        id: 1
    } as Role
    await newUser.save()

    const newAdmin = new User()
    newAdmin.firstName = 'admin'
    newAdmin.lastName = 'test'
    newAdmin.email = 'admin@admin.com'
    newAdmin.passwordHash = 'password'

    
    newAdmin.role = {
        id: 2
    } as Role
    await newAdmin.save()

    const newSuperAdmin = new User()
    newSuperAdmin.firstName = 'super_admin'
    newSuperAdmin.lastName = 'test'
    newSuperAdmin.email = 'super_admin@super_admin.com'
    newSuperAdmin.passwordHash = 'password'

    
    newSuperAdmin.role = {
        id: 3
    } as Role
    await newSuperAdmin.save()

    console.log(`---------------------------`);
    console.log(`control users have been generated succesfully!`);
    console.log(`---------------------------`);
}

export const seederUsers = async () => {

        const users = Array.from({ length: 17 }, generateUsers)
        
        await User.save(users)

        console.log(`---------------------------`);
        console.log(`test users have been generated succesfully!`);
        console.log(`---------------------------`);
}