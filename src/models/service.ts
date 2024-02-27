import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { appointment } from "./appointment"

@Entity('services')
export class service extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: Number

    @Column({name: 'service_name'})
    serviceName!: String

    @Column({name: 'description', type: 'text'})
    description!: String

    @OneToMany(()=>appointment,(appointment)=>appointment.service)
    appointments!:appointment[]
}
