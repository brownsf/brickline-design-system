import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Switch } from './index'
import { useId } from 'react'

const meta = {
  title: 'Components/Switch', component: Switch,
  args: { checked: false, disabled: false, onCheckedChange: fn() },
  render: function ControlledSwitch(args) {
    const [, updateArgs] = useArgs()
    const id = useId()
    return <label className="switch-label" htmlFor={id}><Switch {...args} id={id} onCheckedChange={checked => { args.onCheckedChange?.(checked); updateArgs({ checked }) }} /> Notifications</label>
  },
  parameters: { docs: { description: { component: 'A labeled Radix switch. Checked state is controlled with checked / onCheckedChange; defaultChecked supports uncontrolled usage. These stories keep the Controls panel synchronized with interactions.' } } },
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}
export const On: Story = { args: { checked: true } }
export const DisabledOff: Story = { args: { disabled: true } }
export const DisabledOn: Story = { args: { disabled: true, checked: true } }
export const Toggle: Story = {
  play: async ({ canvasElement, args }) => {
    const control = within(canvasElement).getByRole('switch', { name: 'Notifications' })
    await expect(control).not.toBeChecked()
    await userEvent.click(control)
    await expect(control).toBeChecked()
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
    await userEvent.keyboard(' ')
    await expect(control).not.toBeChecked()
  },
}
