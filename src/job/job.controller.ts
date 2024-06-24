import { Body, Controller, ValidationPipe, Post, Delete, Get } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto, JobIdDto } from './dto/job.dto';
import { Job } from './entities/job.entity';

@Controller('job')
export class JobController {
    constructor(private readonly jobService: JobService) { }

    @Post()
    async createJob(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        job: JobDto): Promise<any> {
        return await this.jobService.createJob(job);
    }

    @Get()
    async getJobs(): Promise<Job[]> {
        return await this.jobService.getJobs();
    }

    @Delete()
    async deleteTask(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        jobIdDto: JobIdDto): Promise<string> {
        return await this.jobService.removeJob(jobIdDto);
    }
}
