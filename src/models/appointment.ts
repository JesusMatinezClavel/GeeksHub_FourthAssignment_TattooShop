import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Service } from "./Service"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('appointments')
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'appointment_date' })
    appointmentDate!: Date

    // Vinculamos el campo user_id de appointments a la tabla users
    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: 'user_id' })
    user!: User | number

    // Vinculamos el campo service_id de appointments a la tabla services
    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn({ name: 'service_id'})
    service!: Service | number
}
