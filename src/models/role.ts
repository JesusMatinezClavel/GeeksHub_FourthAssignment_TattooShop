import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { user } from "./user"

@Entity('roles')
export class role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: Number

    @Column({ name: 'name' })
    name !: String

    @OneToMany( ()=>user,(user)=>user.role)
    users!: user[]
}