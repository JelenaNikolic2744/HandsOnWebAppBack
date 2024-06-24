import { Module } from '@nestjs/common';
import { AppliancesModule } from './appliances/appliances.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123',
    username: 'postgres',
    database: 'job',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }), AppliancesModule, JobModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
