import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
export { Button, buttonVariants } from './button'
export { Label, Field, Textarea, Checkbox, RadioGroup, RadioGroupItem, Select } from './forms'
export type { FieldProps, RadioGroupProps } from './forms'
export { Alert, AlertTitle, AlertDescription, Toast, ToastViewport, Spinner, Skeleton } from './feedback'
export type { AlertProps, ToastProps, SpinnerProps, FeedbackVariant } from './feedback'
export function Card({className,...props}:React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('bl-card',className)} {...props}/> }
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className,...props},ref)=><input ref={ref} className={cn('bl-input',className)} {...props}/> )
Input.displayName='Input'
export function Badge({className,...props}:React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn('bl-badge',className)} {...props}/> }
export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>>(({className,...props},ref)=><SwitchPrimitive.Root ref={ref} className={cn('bl-switch',className)} {...props}><SwitchPrimitive.Thumb className="bl-switch-thumb"/></SwitchPrimitive.Root>)
Switch.displayName='Switch'
export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
export function DialogContent({children,...props}:React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="bl-dialog-overlay"/><DialogPrimitive.Content className="bl-dialog" {...props}>{children}<DialogPrimitive.Close className="icon-button dialog-x" aria-label="Close dialog"><X size={20}/></DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal>}
export const Tabs = TabsPrimitive.Root
export function TabsList(props:React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>){return <TabsPrimitive.List className="bl-tabs-list" {...props}/>}
export function TabsTrigger(props:React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>){return <TabsPrimitive.Trigger className="bl-tab" {...props}/>}
export function TabsContent(props:React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>){return <TabsPrimitive.Content className="bl-tab-content" {...props}/>}
