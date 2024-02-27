import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { user } from "./user"
import { service } from "./service"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('appointments')
export class appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: Number

    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'appointment_date' })
    appointmentDate!: Date

    // Vinculamos el campo user_id de appointments a la tabla users
    @ManyToOne(() => user, (user) => user.appointments)
    @JoinColumn({ name: 'user_id' })
    user!: user

    // Vinculamos el campo service_id de appointments a la tabla services
    @ManyToOne(() => service, (service) => service.appointments)
    @JoinColumn({ name: 'service_id' })
    service!: service
}
