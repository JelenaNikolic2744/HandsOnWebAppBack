import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppliancesDto } from './dto/appliances.dto';
import { AppliancesRepository } from './appliances.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppliancesService {
    constructor(private appliancesRepository: AppliancesRepository) { }


    async handleAppliance(applianceDto: AppliancesDto) {
        let foundAppliance = await this.appliancesRepository.existsAppliance(applianceDto)
        if (foundAppliance) {
            throw new HttpException(
                'Appliance already exists', HttpStatus.FOUND
            );
        }

        this.sendEmail(applianceDto)

        return await this.appliancesRepository.saveAppliance(applianceDto)
    }

    async sendEmail(applianceDto: AppliancesDto) {
        try {
            const testAccount = await nodemailer.createTestAccount();
            console.log(testAccount);

            // Use the testAccount to create a transporter and send emails
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'zachery.beer97@ethereal.email',
                    pass: 'rwvYWAK93DZCmhPgst'
                }
            });

            // Example message object
            const message = {
                from: 'Sender Name <sender@example.com>',
                to: 'Recipient <recipient@example.com>',
                subject: 'Nodemailer is working!',
                text: 'Hello from Nodemailer!',
                html: '<p>Hello from <b>Nodemailer</b>!</p>'
            };

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
