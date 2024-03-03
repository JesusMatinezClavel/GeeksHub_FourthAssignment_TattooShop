import { Role } from "../../models/Role"

// Exportamos la función del seeder de los roles para llamarla junto con el resto de seeders
export const seederRoles = async () => {

    // Creamos el rol de user
    const roleUser = new Role()
    roleUser.rolename = 'user'
    await roleUser.save()

    // Creamos el rol de admin
    const roleAdmin = new Role()
    roleAdmin.rolename = 'admin'
    await roleAdmin.save()

    // Creamos el rol de super_admin
    const roleSuperadmin = new Role()
    roleSuperadmin.rolename = 'super_admin'
    await roleSuperadmin.save()

    // Mandamos un mensaje por consola para confirmar que los roles se han creado correctamente
    console.log(`---------------------------`);
    console.log(`Roles have been generated succesfully!`);
    console.log(`---------------------------`);
}
