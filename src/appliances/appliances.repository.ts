import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Appliance } from './entities/appliances.entity';
import { AppliancesDto } from './dto/appliances.dto';

@Injectable()
export class AppliancesRepository extends Repository<Appliance> {

    constructor(dataSource: DataSource) {
        super(Appliance, dataSource.createEntityManager());
    }

    /**
   * @description Returns user after it is saved in database
   * @return Promise<User>
   * @memberof UserRepository
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

    async existsAppliance(appliancesDto: AppliancesDto): Promise<Appliance> {
        return await this.createQueryBuilder('appliance')
            .where('job_id = :jobId', { jobId: appliancesDto.jobId })
            .andWhere('user_email = :userEmail', { userEmail: appliancesDto.userEmail })
            .getOne()
    }
}
