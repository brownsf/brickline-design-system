import { useId, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Button, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, Input } from './index'

function Confirmation() {
  return <><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogTitle>A little room to focus.</DialogTitle><DialogDescription>Review your changes before continuing. Escape, Cancel, and the close icon dismiss this dialog.</DialogDescription><div className="dialog-actions"><DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose><DialogClose asChild><Button>Confirm</Button></DialogClose></div></DialogContent></>
}

function ProjectDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [saved, setSaved] = useState('')
  const fieldId = useId()
  return <div className="story-stack"><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button>Create project</Button></DialogTrigger><DialogContent><DialogTitle>Start something good.</DialogTitle><DialogDescription>Choose a name for your project. This example saves only in memory.</DialogDescription><form onSubmit={event => { event.preventDefault(); setSaved(name.trim()); setOpen(false) }}><label htmlFor={fieldId} className="field-label">Project name</label><Input id={fieldId} required value={name} onChange={event => setName(event.target.value)} /><div className="dialog-actions"><DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose><Button type="submit" disabled={!name.trim()}>Save project</Button></div></form></DialogContent></Dialog>{saved && <p role="status">Created: {saved}</p>}</div>
}

const meta = {
  title: 'Components/Dialog', component: Dialog,
  subcomponents: { DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose },
  render: args => <Dialog {...args}><Confirmation /></Dialog>,
  parameters: { docs: { description: { component: 'A composed modal with a portaled overlay. Always include DialogTitle and DialogDescription. DialogTrigger and DialogClose accept asChild to retain Brickline button styling. Radix manages modal focus, Escape dismissal, and returning focus to the trigger.' } } },
} satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OpenOnLoad: Story = { args: { defaultOpen: true }, tags: ['!autodocs'] }
export const OpenAndDismiss: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Content is portaled outside the story canvas.
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Open dialog' })
    await userEvent.click(trigger)
    await expect(await page.findByRole('dialog')).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
    await userEvent.click(trigger)
    const dialog = await page.findByRole('dialog')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
  },
}
export const WithForm: Story = {
  render: () => <ProjectDialog />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Create project' }))
    const dialog = within(await page.findByRole('dialog'))
    await userEvent.type(dialog.getByRole('textbox', { name: 'Project name' }), 'Brickline')
    await userEvent.click(dialog.getByRole('button', { name: 'Save project' }))
    await expect(await canvas.findByRole('status')).toHaveTextContent('Created: Brickline')
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
  },
}
