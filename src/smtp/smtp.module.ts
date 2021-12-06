import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { SmtpService } from './smtp.service';
@Module({
  providers: [SmtpService],
  exports: [
    SmtpService
  ],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        ignoreTLS: process.env.SMTP_SECURE !== 'false',
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      },
      defaults: {
        from: 'noreply@products.app',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class SmtpModule { }

