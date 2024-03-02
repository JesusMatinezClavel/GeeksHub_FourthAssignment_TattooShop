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

    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}
