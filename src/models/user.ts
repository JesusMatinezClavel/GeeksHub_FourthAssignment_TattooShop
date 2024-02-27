import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { role } from "./role"
import { appointment } from "./appointment"

// Utilizamos el BaseEntity de typeorm para servirnos de sus métodos
@Entity('users')
export class user extends BaseEntity {

    // Declaramos esta columna como PrimaryGeneratedColumn porque se va a generar automáticamente
    @PrimaryGeneratedColumn()
    id!: Number
    
    // Dentro de @Column declaramos el nombre real del campo y cualquier otro dato a destacar (type, length) en caso de necesario
    @Column({ name: 'first_name' })
    firstName!: String

    @Column({ name: 'last_name' })
    lastName!: String

    @Column({ name: 'email' })
    email!: String

    @Column({ name: 'password' })
    password!: String

    // Vinculamos el campo role_id de users a la tabla roles
    @ManyToOne(() => role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role!: role

    // Vinculamos users a appointments aunque no tenga una Foreign Key apuntando a appointments.
    @OneToMany(() => appointment, (appointment) => appointment.user)
    appointments!: appointment[]
}
