import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import { Checkbox, Field, Input, Label, RadioGroup, RadioGroupItem, Select, Textarea } from './index'

const meta = {
  title: 'Components/Forms',
  parameters: { docs: { description: { component: 'Native form controls styled with Brickline tokens. Use Field to connect a visible label, description, and validation message to a control. Checkbox and radio inputs retain native keyboard, form submission, and validation behavior. Use the Theme toolbar to inspect either theme.' } } },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const FieldAndLabel: Story = {
  render: () => <div className="story-stack">
    <Field label="Project name" description="Choose a name your team will recognize.">
      {props => <Input {...props} placeholder="Brickline" required />}
    </Field>
    <Field label="Workspace" error="Enter a workspace name.">
      {props => <Input {...props} required />}
    </Field>
    <div><Label htmlFor="standalone-label">Standalone label</Label><Input id="standalone-label" /></div>
  </div>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('textbox', { name: 'Project name' })).toHaveAccessibleDescription('Choose a name your team will recognize.')
    await expect(canvas.getByRole('textbox', { name: 'Workspace' })).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByRole('textbox', { name: 'Workspace' })).toHaveAccessibleDescription('Enter a workspace name.')
  },
}

export const Textareas: Story = {
  render: () => <div className="story-stack">
    <Field label="Project description" description="Describe what you want to build.">{props => <Textarea {...props} placeholder="A design system for…" />}</Field>
    <Field label="Read-only notes">{props => <Textarea {...props} readOnly defaultValue="Approved for release." />}</Field>
    <Field label="Disabled notes">{props => <Textarea {...props} disabled defaultValue="Notes are unavailable." />}</Field>
    <Field label="Required notes" error="Add a description.">{props => <Textarea {...props} required />}</Field>
  </div>,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Project description' })
    await userEvent.type(input, 'Build accessible interfaces.')
    await expect(input).toHaveValue('Build accessible interfaces.')
  },
}

export const Checkboxes: Story = {
  render: function CheckboxExamples() {
    const [checked, setChecked] = useState(false)
    return <div className="story-stack">
      <label className="bl-choice-label"><Checkbox checked={checked} onChange={event => setChecked(event.target.checked)} name="notifications" /> Email notifications</label>
      <label className="bl-choice-label"><Checkbox defaultChecked /> Selected by default</label>
      <label className="bl-choice-label"><Checkbox disabled /> Disabled</label>
      <label className="bl-choice-label"><Checkbox disabled defaultChecked /> Disabled selected</label>
      <Field label="Accept terms" error="You must accept the terms.">{props => <Checkbox {...props} required name="terms" />}</Field>
    </div>
  },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: 'Email notifications' })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.keyboard(' ')
    await expect(checkbox).not.toBeChecked()
  },
}

export const RadioGroups: Story = {
  render: () => <div className="story-stack">
    <RadioGroup legend="Visibility" name="visibility">
      <label className="bl-choice-label"><RadioGroupItem value="private" defaultChecked /> Private</label>
      <label className="bl-choice-label"><RadioGroupItem value="public" /> Public</label>
      <label className="bl-choice-label"><RadioGroupItem value="enterprise" disabled /> Enterprise (unavailable)</label>
    </RadioGroup>
    <RadioGroup legend="Disabled group" disabled>
      <label className="bl-choice-label"><RadioGroupItem value="one" defaultChecked /> First option</label>
      <label className="bl-choice-label"><RadioGroupItem value="two" /> Second option</label>
    </RadioGroup>
    <RadioGroup legend="Required billing period" aria-describedby="billing-error" aria-invalid="true">
      <label className="bl-choice-label"><RadioGroupItem value="monthly" required /> Monthly</label>
      <label className="bl-choice-label"><RadioGroupItem value="yearly" required /> Yearly</label>
      <p id="billing-error" className="bl-field-error">Choose a billing period.</p>
    </RadioGroup>
  </div>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const privateOption = canvas.getByRole('radio', { name: 'Private' })
    const publicOption = canvas.getByRole('radio', { name: 'Public' })
    await userEvent.click(publicOption)
    await expect(publicOption).toBeChecked()
    await expect(privateOption).not.toBeChecked()
    await userEvent.keyboard('{ArrowLeft}')
    await expect(privateOption).toBeChecked()
    await expect(publicOption).not.toBeChecked()
  },
}

export const Selects: Story = {
  render: () => <div className="story-stack">
    <Field label="Project type" description="Choose the closest match.">{props => <Select {...props} defaultValue="" name="projectType" required>
      <option value="" disabled>Select a project type</option>
      <optgroup label="Applications"><option value="web">Web application</option><option value="mobile">Mobile application</option></optgroup>
      <option value="library">Component library</option>
      <option value="enterprise" disabled>Enterprise (unavailable)</option>
    </Select>}</Field>
    <Field label="Disabled select">{props => <Select {...props} disabled defaultValue="web"><option value="web">Web application</option></Select>}</Field>
    <Field label="Required selection" error="Choose an option.">{props => <Select {...props} required defaultValue=""><option value="" disabled>Select an option</option><option value="one">Option one</option></Select>}</Field>
  </div>,
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole('combobox', { name: 'Project type' })
    await userEvent.selectOptions(select, 'library')
    await expect(select).toHaveValue('library')
  },
}
