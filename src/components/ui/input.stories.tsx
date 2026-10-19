import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Input } from './index'
import { useId } from 'react'

function InputField({ label = 'Project name', error, ...args }: React.ComponentProps<typeof Input> & { label?: string; error?: string }) {
  const id = useId()
  return <div className="story-field"><label htmlFor={id} className="field-label">{label}</label><Input {...args} id={id} aria-describedby={error ? `${id}-error` : undefined} />{error && <p id={`${id}-error`} style={{ color: 'var(--destructive)', fontSize: 12, marginTop: 8 }}>{error}</p>}</div>
}

const meta = {
  title: 'Components/Input', component: Input,
  args: { placeholder: 'Your next big idea', onChange: fn() },
  render: args => <InputField {...args} />,
  parameters: { docs: { description: { component: 'A native input with a classic Material underline. Always associate a visible label with the input. Use aria-invalid and aria-describedby for validation messages.' } } },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { defaultValue: 'My next project' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Unavailable project' } }
export const ReadOnly: Story = { args: { readOnly: true, value: 'Brickline design system' } }
export const Password: Story = { args: { type: 'password', defaultValue: 'example-password' }, render: args => <InputField {...args} label="Project password" /> }
export const WithError: Story = {
  args: { 'aria-invalid': true, defaultValue: '', style: { borderColor: 'var(--destructive)' } },
  render: args => <InputField {...args} error="Enter a project name." />,
}
export const Typing: Story = {
  play: async ({ canvasElement, args }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Project name' })
    await userEvent.type(input, 'Brickline')
    await expect(input).toHaveValue('Brickline')
    await expect(args.onChange).toHaveBeenCalled()
  },
}
