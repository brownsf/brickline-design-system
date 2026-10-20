import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from './index'

const meta = {
  title: 'Components/Alert', component: Alert,
  args: { variant: 'info' },
  render: args => <Alert {...args}><AlertTitle>Project update</AlertTitle><AlertDescription>Your team can review the latest changes.</AlertDescription></Alert>,
  parameters: { docs: { description: { component: 'Inline feedback with informational, success, warning, and error variants. Error alerts announce urgently; other variants use a polite status. Override role for static content that should not announce. Use the Theme toolbar to preview dark mode.' } } },
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>
export const Info: Story = {}
export const Success: Story = { args: { variant: 'success' }, render: args => <Alert {...args}><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your project is up to date.</AlertDescription></Alert> }
export const Warning: Story = { args: { variant: 'warning' }, render: args => <Alert {...args}><AlertTitle>Storage almost full</AlertTitle><AlertDescription>Free up space before uploading more files.</AlertDescription></Alert> }
export const Error: Story = { args: { variant: 'error' }, render: args => <Alert {...args}><AlertTitle>Unable to save</AlertTitle><AlertDescription>Check your connection and try again.</AlertDescription></Alert> }
export const TitleOnly: Story = { render: args => <Alert {...args}><AlertTitle>You are viewing a preview.</AlertTitle></Alert> }
