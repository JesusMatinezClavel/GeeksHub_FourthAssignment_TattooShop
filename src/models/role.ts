import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { user } from "./user"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('roles')
export class role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: Number

    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'name' })
    name !: String

    // Vinculamos roles a users aunque roles no tenga una Foreign Key
    @OneToMany( ()=>user,(user)=>user.role)
    users!: user[]
}