import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppliancesDto } from './dto/appliances.dto';
import { AppliancesRepository, JobAplliance } from './appliances.repository';
import * as nodemailer from 'nodemailer';

export interface Message {
    message: string
}

@Injectable()
export class AppliancesService {
    constructor(private appliancesRepository: AppliancesRepository) { }

    /**
     * @description If appliance does not exists saves it and sends email
     * @return Promise<string>
     * @memberof AppliancesService
     */
    async handleAppliance(applianceDto: AppliancesDto): Promise<Message> {
        let foundAppliance = await this.appliancesRepository.existsAppliance(applianceDto)
        if (foundAppliance) {
            throw new HttpException(
                'Appliance already exists', HttpStatus.FOUND
            );
        }

        await this.appliancesRepository.saveAppliance(applianceDto)

        let jobAppliance = await this.appliancesRepository.getJobAppliance(applianceDto)
        if (!jobAppliance) {
            throw new HttpException(
                'Company of appliance does not exists', HttpStatus.NOT_FOUND
            );
        }

        await this.sendEmail(applianceDto, jobAppliance)

        return { message: 'Appliance submited successfully' }
    }

    /**
     * @description Sends email
     * @return Promise<void>
     * @memberof AppliancesService
     */
    async sendEmail(applianceDto: AppliancesDto, jobAppliance: JobAplliance): Promise<void> {
        try {
            await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'madisen.bernier@ethereal.email',
                    pass: 'FcWPrYNNNMTu8AXN5d'
                }
            });

            const message = {
                from: 'Job website',
                to: `Recipient ${jobAppliance.companyname}@gmail.com`,
                subject: `Applicant for job ${jobAppliance.jobname}`,
                text: `${applianceDto.applianceText}`,
            };
            await transporter.sendMail(message);

            transporter.close();
        } catch (err) {
            console.error('Error sending email:', err.message);
            throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
