import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	// Здесь можно добавить другие пропсы, если необходимо
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className = '', ...props }, ref) => {
		return (
			<button
				className={`${className}`}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'

export { Button }
