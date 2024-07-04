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
     * @description Saves company and returns it
     * @return Promise<Job>
     * @memberof JobRepository
     */
    async saveJob(job: JobDto): Promise<Job> {
        const newJob = this.create({
            jobName: job.jobName,
            jobDescription: job.jobDescription,
            companyId: job.companyId,
        });
        return await this.save(newJob)
    }

    /**
    * @description Check if job exists in db by job name and company id
    * @return Promise<Job>
    * @memberof JobRepository
    */
    async existsJob(job: JobDto): Promise<Job> {
        return await this.createQueryBuilder('job')
            .where('company_id = :companyId', { companyId: job.companyId })
            .andWhere('job_name = :jobName', { jobName: job.jobName })
            .getOne()
    }

    /**
    * @description Checks if job exists in db by job id
    * @return Promise<Job>
    * @memberof JobRepository
    */
    async checkJob(jobId: number): Promise<Job> {
        return await this.createQueryBuilder('job')
            .where('job_id = :jobId', { jobId: jobId })
            .getOne()

    }

    /**
    * @description Get lists of job
    * @return Promise<Job[]>
    * @memberof JobRepository
    */
    async getJobs(): Promise<Job[]> {
        return await this.query(`select  
                job.job_id as jobId,
                job.job_name as jobName,
                job.job_description as jobDescription,
                company.company_name as companyName
                from job 
                left join company
	            on job.company_id = company.company_id`)
        
    }

    /**
    * @description Delete job and returns delete result
    * @return Promise<DeleteResult>
    * @memberof JobRepository
    */
    async removeJob(jobId: number): Promise<DeleteResult> {
        return await this.createQueryBuilder()
            .delete()
            .from(Job)
            .where("job_id = :jobId", { jobId: jobId })
            .execute();
    }
}
