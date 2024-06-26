import { Job } from 'src/job/entities/job.entity';
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
        type => Job,
        job => job.companyId
    )
    job: Job[];
}
