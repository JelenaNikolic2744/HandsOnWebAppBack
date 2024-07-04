import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CompanyDto, CompanyIdDto } from './dto/company.dto';
import { CompanyRepository } from './company.repository';
import { Message } from 'src/appliances/appliances.service';

@Injectable()
export class CompanyService {
    constructor(private companyRepository: CompanyRepository) { }

    /**
     * @description If company exists, saves it
     * @return Promise<Company>
     * @memberof CompanyService
     */
    async createCompany(companyData: CompanyDto): Promise<Company> {

        let foundCompany = await this.companyRepository.checkCompany(companyData.companyId)
        if (foundCompany) {
            throw new HttpException(
                'Company already exists', HttpStatus.FOUND
            );
        }

        return await this.companyRepository.saveCompany(companyData)

    }

    /**
     * @description Get a list of companies
     * @return Promise<Company[]>
     * @memberof CompanyService
     */
    async getCompanies(): Promise<Company[]> {
        return await this.companyRepository.getCompanies()
    }

    /**
     * @description Removes a company by company ID
     * @return Promise<string>
     * @memberof CompanyService
     */
    async removeCompany(companyIdDto: CompanyIdDto): Promise<Message> {

        let foundCompany = await this.companyRepository.checkCompany(companyIdDto.companyId)
        if (!foundCompany) {
            throw new HttpException(
                'Company does not exists', HttpStatus.NOT_FOUND
            );
        }

        let deleted = await this.companyRepository.removeCompany(companyIdDto.companyId)
        if (!deleted) {
            throw new HttpException(
                'Company not deleted successfully', HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        return { message: "Successfully deleted" }
    }
}
