'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { Button } from '@/shared/components/ui'
import { authService } from '../services'

export function AuthSocial() {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth by provider'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oauthByProvider(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)
		if (response) {
			router.push(response.url)
		}
	}

	return (
		<>
			<div>
				<Button onClick={() => onClick('google')}>
					<FaGoogle />
					<span>Google</span>
				</Button>
				<Button onClick={() => onClick('yandex')}>
					<FaYandex />
					<span>Яндекс</span>
				</Button>
			</div>

			<div>
				<hr />
				<div>
					<span>Или</span>
				</div>
			</div>
		</>
	)
}
