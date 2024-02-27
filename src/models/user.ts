import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { role } from "./role"
import { appointment } from "./appointment"

@Entity('users')
export class user extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: Number

    @Column({name:'first_name'})
    firstName!: String

    @Column({name:'last_name'})
    lastName!:String

    @Column({name:'email'})
    email!:String

    @Column({name:'password'})
    password!: String

    @ManyToOne(()=>role,(role)=>role.users)
    @JoinColumn({name: 'role_id'})
    role!: role

    @OneToMany(()=>appointment,(appointment)=>appointment.user)
    appointments!:appointment[]
}
