import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './index'

const meta = {
  title: 'Components/Badge', component: Badge, args: { children: 'In progress' },
  parameters: { docs: { description: { component: 'Compact text labels for status or metadata. Choose a descriptive label so meaning is not conveyed through color alone. Status colors are applied using className.' } } },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Ready: Story = { args: { className: 'badge-green', children: 'Ready to build' } }
export const Draft: Story = { args: { className: 'badge-navy', children: 'Draft' } }
export const AllStatuses: Story = { render: () => <div className="story-row"><Badge>In progress</Badge><Badge className="badge-green">Ready to build</Badge><Badge className="badge-navy">Draft</Badge></div> }
