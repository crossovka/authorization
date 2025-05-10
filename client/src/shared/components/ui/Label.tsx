'use client'

import * as React from 'react'

const Label = React.forwardRef<
	HTMLLabelElement,
	React.LabelHTMLAttributes<HTMLLabelElement>
>(({ children, ...props }, ref) => (
	<label ref={ref} {...props}>
		{children}
	</label>
))

Label.displayName = 'Label'

export { Label }
