import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as connectRedis from 'connect-redis'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { createClient } from 'redis'

import { AppModule } from './app.module'
import { ms, StringValue } from './libs/common/utils/ms.util'
import { parseBoolean } from './libs/common/utils/parse-boolean.util'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)

	const redisUri = `redis://${config.getOrThrow('REDIS_USER')}:${config.getOrThrow('REDIS_PASSWORD')}@${config.getOrThrow('REDIS_HOST')}:${config.getOrThrow('REDIS_PORT')}`

	const redisClient = createClient({
		url: redisUri,
		legacyMode: true
	})
	await redisClient.connect().catch(console.error)

	const RedisStore = connectRedis(session)

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	app.use(
		session({
			store: new RedisStore({
				client: redisClient,
				prefix: config.getOrThrow<string>('SESSION_FOLDER')
			}),
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
				httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
				secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
				sameSite: 'lax'
			}
		})
	)

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})

	await app.listen(config.getOrThrow<number>('APPLICATION_PORT'))
}

bootstrap()
