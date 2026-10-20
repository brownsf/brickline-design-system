import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button, Toast, ToastViewport } from './index'

function ToastExample({ variant = 'success' }: { variant?: 'info' | 'success' | 'warning' | 'error' }) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  return <><Button ref={trigger} onClick={() => setOpen(true)}>Show notification</Button>
    <ToastViewport><Toast open={open} onOpenChange={next => { setOpen(next); if (!next) trigger.current?.focus() }} variant={variant} title={variant === 'error' ? 'Unable to save' : 'Project update'} description={variant === 'error' ? 'Check your connection and try again.' : 'Your changes have been saved.'} /></ToastViewport>
  </>
}
const meta = {
  title: 'Components/Toast', component: ToastExample,
  parameters: { docs: { description: { component: 'Controlled notifications positioned by ToastViewport. Keep Toast mounted before opening for live announcements. Notifications persist until dismissed and never take focus automatically. After dismissal, restore focus to an appropriate control if the dismiss button had focus. No timer or external dependency is required.' } } },
  render: () => <ToastExample />,
} satisfies Meta<typeof ToastExample>
export default meta
type Story = StoryObj<typeof meta>
export const Success: Story = {}
export const Info: Story = { render: () => <ToastExample variant="info" /> }
export const Warning: Story = { render: () => <ToastExample variant="warning" /> }
export const Error: Story = { render: () => <ToastExample variant="error" /> }
export const OpenAndDismiss: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Show notification' })
    await userEvent.click(trigger)
    await expect(canvas.getByRole('status')).toHaveTextContent('Your changes have been saved.')
    await expect(trigger).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Dismiss notification' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.queryByRole('button', { name: 'Dismiss notification' })).not.toBeInTheDocument()
    await expect(trigger).toHaveFocus()
    await userEvent.click(trigger)
    await expect(canvas.getByRole('button', { name: 'Dismiss notification' })).toBeInTheDocument()
  },
}
