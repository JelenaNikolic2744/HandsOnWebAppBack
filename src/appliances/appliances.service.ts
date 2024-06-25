import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppliancesDto } from './dto/appliances.dto';
import { AppliancesRepository, JobAplliance } from './appliances.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppliancesService {
    constructor(private appliancesRepository: AppliancesRepository) { }


    async handleAppliance(applianceDto: AppliancesDto): Promise<string> {
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

        return 'Appliance submited successfully'
    }

    async sendEmail(applianceDto: AppliancesDto, jobAppliance: JobAplliance) {
        try {
            const testAccount = await nodemailer.createTestAccount();
            console.log(testAccount);

            // Use the testAccount to create a transporter and send emails
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'madisen.bernier@ethereal.email',
                    pass: 'FcWPrYNNNMTu8AXN5d'
                }
            });
            console.log(jobAppliance.companyname)
            // Example message object
            const message = {
                from: 'Job website',
                to: `Recipient ${jobAppliance.companyname}@gmail.com`,
                subject: `Applicant for job ${jobAppliance.jobname}`,
                text: `${applianceDto.applianceText}`,
            };
            console.log(message)
            const info = await transporter.sendMail(message);
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Close the transporter when done
            transporter.close();
        } catch (err) {
            console.error('Error sending email:', err.message);
            throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
