import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobDto, JobIdDto } from './dto/job.dto';
import { JobRepository } from './job.repository';
import { Job } from './entities/job.entity';
import { CompanyRepository } from 'src/company/company.repository';

@Injectable()
export class JobService {
    constructor(private jobRepository: JobRepository, private companyRepository: CompanyRepository) { }

    /**
     * @description Check if company and job exists and saves it
     * @return Promise<Job>
     * @memberof JobService
     */
    async createJob(jobData: JobDto):Promise<Job> {

        let existsCompany = await this.companyRepository.checkCompany(jobData.companyId)
        if(!existsCompany){
            throw new HttpException(
                'Company does not exists', HttpStatus.FOUND
            );  
        }

        let foundJob = await this.jobRepository.existsJob(jobData)
        if(foundJob){
            throw new HttpException(
                'Job already exists', HttpStatus.FOUND
            ); 
        }

        return await this.jobRepository.saveJob(jobData)
       
    }

    /**
     * @description Return a list of jobs
     * @return Promise<Job[]>
     * @memberof JobService
     */
    async getJobs(): Promise<Job[]> {
        return await this.jobRepository.getJobs()
    }

    /**
     * @description Removes a job by job ID
     * @return Promise<string>
     * @memberof JobService
     */
    async removeJob(jobIdDto: JobIdDto): Promise<string> {

        let foundJob = await this.jobRepository.checkJob(jobIdDto.jobId)
        if (!foundJob) {
            throw new HttpException(
                'Job does not exists', HttpStatus.NOT_FOUND
            );
        }

        let deleted =  await this.jobRepository.removeJob(jobIdDto.jobId)
        if(!deleted){
            throw new HttpException(
                'Job not deleted successfully', HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return "Successfully deleted"
    }
}
