import { Body, Controller, ValidationPipe, Post, Delete, Get } from '@nestjs/common';
import { AppliancesDto } from './dto/appliances.dto';
import { AppliancesService } from './appliances.service';

@Controller('appliances')
export class AppliancesController {
    constructor(private readonly appliancesService: AppliancesService) { }

    @Post()
    async createJob(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        applianceDto: AppliancesDto): Promise<any> {
        return await this.appliancesService.handleAppliance(applianceDto);
    }
}
