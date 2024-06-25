import { Controller, Get, Post, Delete, Body, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post()
    async createCompany(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        companyDto: CompanyDto): Promise<any> {
        return await this.companyService.createCompany(companyDto);
    }

    @Get()
    async getCompany(): Promise<Company[]> {
        return await this.jobService.getCompany();
    }

    @Delete()
    async deleteCompany(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        companyIdDto: CompanyIdDto): Promise<string> {
        return await this.companyService.removeCompany(companyIdDto);
    }
}
