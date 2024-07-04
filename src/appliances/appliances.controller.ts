import { Body, Controller, ValidationPipe, Post, Delete, Get } from '@nestjs/common';
import { AppliancesDto } from './dto/appliances.dto';
import { AppliancesService, Message } from './appliances.service';
import { AppliancesRepository } from './appliances.repository';

@Controller('appliances')
export class AppliancesController {
    constructor(private readonly appliancesService: AppliancesService, private appliancesRepository: AppliancesRepository) { }

    /**
     * @description Returns a string if email sent successfully
     * @return Promise<Message>
     * @memberof AppliancesController
     */
    @Post()
    async createJob(
        @Body(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                whitelist: true,
            }),
        )
        applianceDto: AppliancesDto): Promise<Message> {
        return await this.appliancesService.handleAppliance(applianceDto);
    }
}
