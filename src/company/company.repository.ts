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
    * @description Saves company and returns it
    * @return Promise<Company>
    * @memberof CompanyRepository
    */
    async saveCompany(company: CompanyDto): Promise<Company> {
        let newCompany = this.create({
            companyName: company.companyName
        })
        return await this.save(newCompany)
    }

    /**
    * @description Checks if company exists and returns a company
    * @return Promise<Company>
    * @memberof CompanyRepository
    */
    async checkCompany(companyId: number): Promise<Company> {
        return await this.createQueryBuilder('company')
            .where('company_id = :companyId', { companyId: companyId })
            .getOne()

    }

    /**
    * @description Returns list of companies
    * @return Promise<Company[]>
    * @memberof CompanyRepository
    */
    async getCompanies(): Promise<Company[]> {
        return await this.createQueryBuilder('company')
            .getMany()

    }

    /**
    * @description Returns delete result if successfull delete
    * @return Promise<DeleteResult>
    * @memberof CompanyRepository
    */
    async removeCompany(companyId: number): Promise<DeleteResult> {
        return await this.createQueryBuilder()
            .delete()
            .from(Company)
            .where("company_id = :companyId", { companyId: companyId })
            .execute();
    }
}
