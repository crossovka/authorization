'use client'

import React from 'react'
import styles from './Switch.module.css'

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
	({ className, ...props }, ref) => {
		return (
			<label className={`${styles.switch} ${className || ''}`}>
				<input type='checkbox' ref={ref} {...props} />
				<span className={styles.slider} />
			</label>
		)
	}
)

Switch.displayName = 'Switch'
