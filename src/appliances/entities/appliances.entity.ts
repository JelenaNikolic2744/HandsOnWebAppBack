import { Job } from 'src/job/entities/job.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('appliances')
export class Appliance {
    @Column({
        type: 'int',
        name: 'job_id'
    })
    jobId: number;

    @PrimaryColumn({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true,
        name: 'user_name'
    })
    userName: string;

    @PrimaryColumn({
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
