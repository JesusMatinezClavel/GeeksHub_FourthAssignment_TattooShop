import { Role } from "../../models/Role"




export const seederRoles = async () => {

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
    console.log(`Roles have been generated succesfully!`);
    console.log(`---------------------------`);
}
