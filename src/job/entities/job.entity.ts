import { Appliance } from 'src/appliances/entities/appliances.entity';
import { Company } from 'src/company/entities/company.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
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
        type: 'int',
        name: 'company_id'
    })
    companyId: number;

    @OneToMany(
        type => Appliance,
        appliance => appliance.jobId,
        { eager: true },
    )
    appliances: Appliance[];

    @ManyToOne(
        type => Company,
        company => company.companyId,
        {onDelete:'CASCADE'}
    )
    @JoinColumn({ name: 'company_id' })
    company: Company;
}
