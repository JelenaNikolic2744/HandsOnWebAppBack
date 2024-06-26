import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyRepository extends Repository<Company> {

    constructor(dataSource: DataSource) {
        super(Company, dataSource.createEntityManager());
    }

    /**
   * @description Returns user after it is saved in database
   * @return Promise<User>
   * @memberof UserRepository
   */
    async saveCompany(company: CompanyDto): Promise<any> {
        let newCompany = this.create({
            companyName: company.companyName
        })
        return await this.save(newCompany)
    }

    async checkCompany(companyId: number): Promise<Company> {
        return await this.createQueryBuilder('company')
            .where('company_id = :companyId', { companyId: companyId })
            .getOne()

    }

    async getCompanies(): Promise<Company[]> {
        return await this.createQueryBuilder('company')
            .getMany()

    }

    async removeCompany(companyId: number): Promise<DeleteResult> {
        return await this.createQueryBuilder()
            .delete()
            .from(Company)
            .where("company_id = :companyId", { companyId: companyId })
            .execute();
    }
}
