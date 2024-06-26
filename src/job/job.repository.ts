import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobDto } from './dto/job.dto';

@Injectable()
export class JobRepository extends Repository<Job> {

    constructor(dataSource: DataSource) {
        super(Job, dataSource.createEntityManager());
    }

    /**
   * @description Returns user after it is saved in database
   * @return Promise<User>
   * @memberof UserRepository
   */
    async saveJob(job: JobDto): Promise<Job> {
        const newJob = this.create({
            jobName: job.jobName,
            jobDescription: job.jobDescription,
            companyId: job.companyId,
        });
        return await this.save(newJob)
    }

    async existsJob(job: JobDto): Promise<Job> {
        return await this.createQueryBuilder('job')
            .where('company_id = :companyId', { companyId: job.companyId })
            .andWhere('job_name = :jobName', { jobName: job.jobName })
            .getOne()
    }

    async checkJob(jobId: number): Promise<Job> {
        return await this.createQueryBuilder('job')
            .where('job_id = :jobId', { jobId: jobId })
            .getOne()

    }

    async getJobs(): Promise<Job[]> {
        return await this.createQueryBuilder('job')
            .getMany()

    }

    async removeJob(jobId: number): Promise<DeleteResult> {
        return await this.createQueryBuilder()
            .delete()
            .from(Job)
            .where("job_id = :jobId", { jobId: jobId })
            .execute();
    }
}
