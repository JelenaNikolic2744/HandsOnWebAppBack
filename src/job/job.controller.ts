import { Body, Controller, ValidationPipe, Post, Delete, Get } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto, JobIdDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { Message } from 'src/appliances/appliances.service';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    /**
     * @description Returns a created job
     * @return Promise<Job>
     * @memberof JobController
     */
    @Post()
    async createJob(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        job: JobDto): Promise<Job> {
        return await this.jobService.createJob(job);
    }

    /**
     * @description Returns a list of jobs
     * @return Promise<Job[]>
     * @memberof JobController
     */
    @Get()
    async getJobs(): Promise<Job[]> {
        return await this.jobService.getJobs();
    }

    /**
     * @description Returns a message if successfull delete
     * @return Promise<Message>
     * @memberof JobController
     */
    @Delete()
    async deleteTask(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        jobIdDto: JobIdDto): Promise<Message> {
        return await this.jobService.removeJob(jobIdDto);
    }
}
