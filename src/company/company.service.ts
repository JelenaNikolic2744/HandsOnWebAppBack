import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CompanyDto, CompanyIdDto } from './dto/company.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
    constructor(private companyRepository: CompanyRepository) { }

    async createCompany(companyData: CompanyDto) {

        let foundCompany = await this.companyRepository.checkCompany(companyData.companyId)
        if (foundCompany) {
            throw new HttpException(
                'Company already exists', HttpStatus.FOUND
            );
        }

        return await this.companyRepository.saveCompany(companyData)

    }

    async getCompanies(): Promise<Company[]> {
        return await this.companyRepository.getCompanies()
    }

    async removeCompany(companyIdDto: CompanyIdDto): Promise<string> {

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
        return "Successfully deleted"
    }
}
