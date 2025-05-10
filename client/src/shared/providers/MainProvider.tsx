'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider, ToastProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
				<ToastProvider />
				{children}
		</TanstackQueryProvider>
	)
}
