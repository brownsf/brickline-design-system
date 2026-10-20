import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner, Button } from './index'

const meta = {
  title: 'Components/Spinner', component: Spinner,
  args: { label: 'Loading projects', size: 'md' },
  parameters: { docs: { description: { component: 'An indeterminate loading indicator with an accessible status label. Inherits the surrounding text color. Motion stops when reduced motion is requested. Pair with aria-busy on the region being updated.' } } },
} satisfies Meta<typeof Spinner>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Sizes: Story = { render: () => <div className="story-row"><Spinner size="sm" label="Loading small preview" /><Spinner label="Loading preview" /><Spinner size="lg" label="Loading full preview" /></div> }
export const LoadingButton: Story = { render: () => <Button disabled aria-busy="true"><Spinner size="sm" label="Saving project" /> Saving…</Button> }
