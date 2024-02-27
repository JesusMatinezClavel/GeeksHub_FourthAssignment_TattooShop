import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { appointment } from "./appointment"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('services')
export class service extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: Number

    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'service_name' })
    serviceName!: String

    @Column({ name: 'description', type: 'text' })
    description!: String

    // Vinculamos services a appointments aunque services no tenga una Foreign Key
    @OneToMany(() => appointment, (appointment) => appointment.service)
    appointments!: appointment[]
}
