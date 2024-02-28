import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('roles')
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'name' })
    name !: string

    // Vinculamos roles a users aunque roles no tenga una Foreign Key
    @OneToMany( ()=>User,(user)=>user.role)
    users!: User[]
}