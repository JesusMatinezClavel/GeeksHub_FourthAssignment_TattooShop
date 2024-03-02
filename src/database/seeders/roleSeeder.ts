import { Role } from "../../models/Role"
import { User } from "../../models/User";
import { AppDataSource } from "../db";



export const seederRoles = async () => {
    try {
        await AppDataSource.initialize()

        const roleUser = new Role()
        roleUser.rolename = 'user'
        await roleUser.save()

        const roleAdmin = new Role()
        roleAdmin.rolename = 'admin'
        await roleAdmin.save()

        const roleSuperadmin = new Role()
        roleSuperadmin.rolename = 'super_admin'
        await roleSuperadmin.save()


        console.log(`---------------------------`);
        console.log(`roles have been generated succesfully!`);
        console.log(`---------------------------`);

        const newUser = new User()
        newUser.firstName = 'user'
        newUser.lastName = 'test'
        newUser.email = 'user@user.com'
        newUser.passwordHash = 'user1234'
        await newUser.save()

        const newAdmin = new User()
        newUser.firstName = 'admin'
        newUser.lastName = 'test'
        newUser.email = 'admin@admin.com'
        newUser.passwordHash = 'admin1234'
        await newUser.save()

        const newSuperadmin = new User()
        newUser.firstName = 'super_admin'
        newUser.lastName = 'test'
        newUser.email = 'super_admin@superadmin.com'
        newUser.passwordHash = 'superadmin'
        await newUser.save()

        console.log(`---------------------------`);
        console.log(`control users have been generated succesfully!`);
        console.log(`---------------------------`);


    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}
