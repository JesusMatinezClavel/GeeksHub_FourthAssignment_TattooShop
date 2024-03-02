import { User } from "../../models/User"
import { faker } from "@faker-js/faker";
import { AppDataSource } from "../db";

const generateUsers = () => {
    const randomUser = new User()
    randomUser.firstName = faker.person.firstName()
    randomUser.lastName = faker.person.lastName()
    randomUser.email = faker.internet.email(randomUser.firstName, randomUser.lastName)
    randomUser.passwordHash = faker.internet.password(8, true)

    return randomUser
}

export const seederUsers = async () => {
    try {
        await AppDataSource.initialize()

        const users = Array.from({ length: 3 }, generateUsers)
        console.log(users);

        await User.save(users)

        return users

    } catch (error) {
        console.log(error)
    } finally {
        await AppDataSource.destroy()
    }
}