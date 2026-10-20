import * as React from 'react'
import { cn } from '../../lib/utils'

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => <label ref={ref} className={cn('field-label', className)} {...props} />,
)
Label.displayName = 'Label'

type FieldControlProps = { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }
export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  controlId?: string
  children: (props: FieldControlProps) => React.ReactNode
}
/** Pass the supplied props to one labelable control to connect its label and messages. */
export function Field({ label, description, error, controlId, children, className, ...props }: FieldProps) {
  const generatedId = React.useId()
  const id = controlId ?? generatedId
  const describedBy = [description ? `${id}-description` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined
  return <div className={cn('bl-field', className)} {...props}>
    <Label htmlFor={id}>{label}</Label>
    {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
    {description && <p id={`${id}-description`} className="bl-field-description">{description}</p>}
    {error && <p id={`${id}-error`} className="bl-field-error" role="alert">{error}</p>}
  </div>
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 4, ...props }, ref) => <textarea ref={ref} rows={rows} className={cn('bl-input bl-textarea', className)} {...props} />,
)
Textarea.displayName = 'Textarea'

export const Checkbox = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>>(
  ({ className, ...props }, ref) => <input {...props} ref={ref} type="checkbox" className={cn('bl-choice', className)} />,
)
Checkbox.displayName = 'Checkbox'

type RadioContextValue = { name: string; disabled?: boolean }
const RadioContext = React.createContext<RadioContextValue | null>(null)
export interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: React.ReactNode
  name?: string
}
export function RadioGroup({ legend, name, disabled, className, children, ...props }: RadioGroupProps) {
  const generatedName = React.useId()
  return <RadioContext.Provider value={{ name: name ?? generatedName, disabled }}>
    <fieldset {...props} disabled={disabled} className={cn('bl-radio-group', className)}>
      <legend className="field-label">{legend}</legend>
      {children}
    </fieldset>
  </RadioContext.Provider>
}
export const RadioGroupItem = React.forwardRef<HTMLInputElement, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>>(
  ({ className, disabled, name, ...props }, ref) => {
    const group = React.useContext(RadioContext)
    return <input {...props} ref={ref} type="radio" name={group?.name ?? name} disabled={group?.disabled || disabled} className={cn('bl-choice', className)} />
  },
)
RadioGroupItem.displayName = 'RadioGroupItem'

/** Native select: use option and optgroup children for platform keyboard and mobile support. */
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => <select ref={ref} className={cn('bl-input bl-select', className)} {...props} />,
)
Select.displayName = 'Select'
