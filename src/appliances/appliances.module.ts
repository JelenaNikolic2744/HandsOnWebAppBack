import { Module } from '@nestjs/common';
import { AppliancesController } from './appliances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appliance } from './entities/appliances.entity';
import { AppliancesService } from './appliances.service';
import { AppliancesRepository } from './appliances.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Appliance])],
    controllers: [AppliancesController],
    providers: [AppliancesService, AppliancesRepository],
})
export class AppliancesModule { }

