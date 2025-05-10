import Link from 'next/link'

export default function HomePage() {
	return (
		<div>
			<h1>Главная страница</h1>
			<Link href='/auth/login'>
				Войти в аккаунт
			</Link>
		</div>
	)
}
