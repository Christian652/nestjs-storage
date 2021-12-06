import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import MailOptions from './Interfaces/mail-options.interface';
import { MailerService } from '@nestjs-modules/mailer';
import MailRecoveryOptions from './Interfaces/mail-recovery-options.interface';
"use strict";
@Injectable()
export class SmtpService {
    constructor(private mailerService: MailerService) { }

    public async sendEmail(options: MailOptions) {
        try {
            await this.mailerService.sendMail({
                to: options.to,
                from: 'products@gmail.com',
                subject: options.subject,
                template: './mail',
                context: { 
                    title: options.subject,
                    text: options.text
                },
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_GATEWAY);
        }
    }

    public async sendPasswordRecoveryMail(options: MailRecoveryOptions) {
        try {
            this.mailerService.sendMail({
                to: options.to,
                from: 'products@gmail.com',
                subject: options.subject,
                template: './password-recovery',
                context: { 
                    token: options.token,
                    frontendUrl: process.env.FRONTEND_URL
                },
            });
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_GATEWAY);
        }
    }

    public async sendRawEmail(options: MailOptions) {
        try {
            return await this.mailerService.sendMail(options);
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_GATEWAY);
        }
    }
}
