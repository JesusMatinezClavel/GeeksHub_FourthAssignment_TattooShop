import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('users')
export class User extends BaseEntity {

    // Declaramos esta columna como PrimaryGeneratedColumn porque se va a generar automáticamente
    @PrimaryGeneratedColumn()
    id!: number
    
    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'first_name' })
    firstName!: string

    @Column({ name: 'last_name' })
    lastName!: string

    @Column({ name: 'email' })
    email!: string

    @Column({ name: 'password' })
    password!: string

    // Vinculamos el campo role_id de users a la tabla roles
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: Role

    // Vinculamos users a appointments aunque no tenga una Foreign Key apuntando a appointments.
    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[]
}
