import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Service } from "./Service"

@Entity("tattoo_catalogue")
export class Tattoo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'tattoo_name' })
    tattooName!: string

    @Column({ name: 'tattoo_design' })
    tattooDesign!: string

    @Column({ name: 'tattoo_description', type: 'text' })
    tattooDescription!: string

    // @ManyToMany(() => Service)
    // @JoinTable()
    // services!: Service[]
    @ManyToMany(()=>Service)
    @JoinTable({
        name: 'service_Tattoo',
        joinColumn: {
            name: 'tattoo_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'service_id',
            referencedColumnName: 'id'
        },
    })
    serviceTattoos?: Tattoo[]

}
