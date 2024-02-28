import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Service } from "./Service"

@Entity('piercing_catalogue')
export class Piercing extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'piercing_name' })
    piercingName!: string

    @Column({ name: 'piercing_design' })
    piercingDesign!: string

    @Column({ name: 'piercing_description', type: 'text' })
    piercingDescription!: string

    // @ManyToMany(() => Service, (service)=>service.piercings)
    // @JoinTable()
    // services!: Service[]
}
