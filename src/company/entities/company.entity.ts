import { Appliance } from 'src/appliances/entities/appliances.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        name: 'company_id'
    })
    companyId: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true,
        name: 'company_name'
    })
    companyName: string;
    
    @OneToMany(
        type => Appliance,
        appliance => appliance.jobId,
        { eager: true },
    )
    appliances: Appliance[];
}
