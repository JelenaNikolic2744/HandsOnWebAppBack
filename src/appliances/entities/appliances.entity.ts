import { Job } from 'src/job/entities/job.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('appliances')
export class Appliance {
    @PrimaryGeneratedColumn('increment', {
        type: 'int',
        name: 'job_id'
    })
    jobId: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true,
        name: 'user_name'
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true,
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
        job => job.jobId
    )
    @JoinColumn({ name: 'job_id' })
    job: Job;
}
