import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment"
import { Tattoo } from "./Tattoo"
import { Piercing } from "./Piercing"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('services')
export class Service extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'service_name' })
    serviceName!: string

    @Column({ name: 'description', type: 'text' })
    description!: string

    // Vinculamos services a appointments aunque services no tenga una Foreign Key
    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments!: Appointment[]

    // @ManyToMany(() => Tattoo, (tattoo) => tattoo.services)
    // @JoinTable()
    // tattoos!: Tattoo[]
    @ManyToMany(() => Tattoo)
    @JoinTable({
        name: 'service_task',
        joinColumn: {
            name: 'service_id',
            referencedColumnName: 'id'
        }, inverseJoinColumn: {
            name: 'tattoo_id',
            referencedColumnName: 'id'
        }
    })
    tattooServices?: Service[]
}


// @ManyToMany(()=> Piercing,(piercing)=>piercing.services)
// @JoinTable()
// piercings!: Piercing[]
// }
