import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Appliance } from './entities/appliances.entity';
import { AppliancesDto } from './dto/appliances.dto';

export interface JobAplliance {
    jobid: number;
    username: string;
    useremail: string;
    appliancetext: string;
    jobname: string;
    jobdescription: string;
    companyname: string;
}

@Injectable()
export class AppliancesRepository extends Repository<Appliance> {

    constructor(dataSource: DataSource) {
        super(Appliance, dataSource.createEntityManager());
    }

    /**
     * @description Creates and saves appliance and returns it
     * @return Promise<Appliance>
     * @memberof AppliancesRepository
     */
    async saveAppliance(appliancesDto: AppliancesDto): Promise<Appliance> {
        const newAppliance = this.create({
            jobId: appliancesDto.jobId,
            userName: appliancesDto.userName,
            userEmail: appliancesDto.userEmail,
            applianceText: appliancesDto.applianceText,
        });
        return await this.save(newAppliance)
    }

    /**
    * @description Check if appliance exists in db by jobId
    * @return Promise<Appliance>
    * @memberof AppliancesRepository
    */
    async existsAppliance(appliancesDto: AppliancesDto): Promise<Appliance> {
        return await this.createQueryBuilder('appliance')
            .where('job_id = :jobId', { jobId: appliancesDto.jobId })
            .andWhere('user_email = :userEmail', { userEmail: appliancesDto.userEmail })
            .andWhere('user_name = :userName', { userName: appliancesDto.userName })
            .getOne()
    }

    /**
    * @description Returns job appliance interface with joined tables
    * @return Promise<JobAplliance>
    * @memberof AppliancesRepository
    */
    async getJobAppliance(appliancesDto: AppliancesDto): Promise<JobAplliance> {
        let query = await this.query(`select  appliances.job_id as jobId,
                appliances.user_name as userName,
                appliances.user_email as userEmail,
                appliances.appliance_text as applianceText,
                job.job_name as jobName,
                job.job_description as jobDescription,
                company.company_name as companyName
                from appliances left join job 
                on appliances.job_id = job.job_id
                left join company
	            on job.company_id = company.company_id
                 where appliances.job_id  = ${appliancesDto.jobId}`)
        return query[0]
    }
}
