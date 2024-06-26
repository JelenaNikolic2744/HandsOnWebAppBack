import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { CompanyRepository } from 'src/company/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService, JobRepository, CompanyRepository],
})
export class JobModule { }
