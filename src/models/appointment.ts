import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { user } from "./user"
import { service } from "./service"

@Entity('appointments')
export class appointment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: Number

    @Column({name:'appointment_date'})
    appointmentDate!: Date

    @ManyToOne(()=>user,(user)=>user.appointments)
    @JoinColumn({name: 'user_id'})
    user!: user

    @ManyToOne(()=>service,(service)=>service.appointments)
    @JoinColumn({name: 'service_id'})
    service!: service
}
