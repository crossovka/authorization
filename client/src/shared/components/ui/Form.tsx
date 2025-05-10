'use client'

import * as React from 'react'
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext
} from 'react-hook-form'

const Form = FormProvider

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
)

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState, formState } = useFormContext()
	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>')
	}

	return {
		id: itemContext.id,
		name: fieldContext.name,
		formItemId: `${itemContext.id}-form-item`,
		formDescriptionId: `${itemContext.id}-form-item-description`,
		formMessageId: `${itemContext.id}-form-item-message`,
		...fieldState
	}
}

type FormItemContextValue = {
	id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue
)

const FormItem = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div {...props}>{children}</div>
		</FormItemContext.Provider>
	)
}

const FormLabel = ({
	children,
	...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
	const { formItemId } = useFormField()

	return (
		<label htmlFor={formItemId} {...props}>
			{children}
		</label>
	)
}

const FormControl = ({
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return React.cloneElement(children as React.ReactElement, {
		id: formItemId,
		'aria-describedby': error
			? `${formDescriptionId} ${formMessageId}`
			: `${formDescriptionId}`,
		'aria-invalid': !!error,
		...props
	})
}

const FormDescription = ({
	children,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
	const { formDescriptionId } = useFormField()
	return <p id={formDescriptionId} {...props}>{children}</p>
}

const FormMessage = ({
	children,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
	const { error, formMessageId } = useFormField()
	const message = error?.message || children
	if (!message) return null

	return <p id={formMessageId} {...props}>{message}</p>
}

export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField
}
