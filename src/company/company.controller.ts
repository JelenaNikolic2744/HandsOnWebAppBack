import { Controller, Get, Post, Delete, Body, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto, CompanyIdDto } from './dto/company.dto';
import { Company } from './entities/company.entity';
import { Message } from 'src/appliances/appliances.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    /**
     * @description Returns a created company
     * @return Promise<Company>
     * @memberof CompanyController
     */
    @Post()
    async createCompany(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        companyDto: CompanyDto): Promise<Company> {
        return await this.companyService.createCompany(companyDto);
    }

    /**
     * @description Returns a list of companies
     * @return Promise<Company[]>
     * @memberof CompanyController
     */
    @Get()
    async getCompanies(): Promise<Company[]> {
        return await this.companyService.getCompanies();
    }

    /**
     * @description Returns message if successfull delete of company
     * @return Promise<Message>
     * @memberof CompanyController
     */
    @Delete()
    async deleteCompany(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        companyIdDto: CompanyIdDto): Promise<Message> {
        return await this.companyService.removeCompany(companyIdDto);
    }
}
