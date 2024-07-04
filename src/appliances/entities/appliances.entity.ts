import { Job } from 'src/job/entities/job.entity';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appliances')
export class Appliance {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'appliace_id'
    })
    appliancesId: number;

    @Column({
        type: 'int',
        name: 'job_id'
    })
    jobId: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        name: 'user_name'
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        name: 'user_email'
    })
    userEmail: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        name: 'appliance_text'
    })
    applianceText: string;

    @ManyToOne(
        type => Job,
        job => job.jobId,
        {onDelete:'CASCADE'}
    )
    @JoinColumn({ name: 'job_id' })
    job: Job;
}
