import { Appliance } from 'src/appliances/entities/appliances.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

@Entity('job')
export class Job {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        name: 'job_id'
    })
    jobId: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        name: 'job_name'
    })
    jobName: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        name: 'job_description'
    })
    jobDescription: string;

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
