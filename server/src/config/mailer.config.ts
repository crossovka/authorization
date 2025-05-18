import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

import { isDev } from '@/libs/common/utils/is-dev.util'

export const getMailerConfig = async (
	configService: ConfigService
): Promise<MailerOptions> => ({
	transport: {
		host: configService.getOrThrow<string>('MAIL_HOST'),
		port: configService.getOrThrow<number>('MAIL_PORT'),
		// если ты запускаешь в dev, то secure будет false, а должен быть true для 465.
		// secure: !isDev(configService),
		secure: true,
		auth: {
			user: configService.getOrThrow<string>('MAIL_LOGIN'),
			pass: configService.getOrThrow<string>('MAIL_PASSWORD')
		}
	},
	defaults: {
		from: `"TeaCoder Team" ${configService.getOrThrow<string>('MAIL_LOGIN')}`
	}
})
