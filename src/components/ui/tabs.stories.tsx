import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Tabs, TabsList, TabsTrigger, TabsContent, Card } from './index'

function Panels({ disabled = false }: { disabled?: boolean }) {
  return <><TabsList aria-label="Project sections"><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="details">Details</TabsTrigger><TabsTrigger value="settings" disabled={disabled}>Settings</TabsTrigger></TabsList><TabsContent value="activity"><p className="story-caption">Your workspace is ready for the next step.</p></TabsContent><TabsContent value="details"><p className="story-caption">Brickline v0.1 — React, Tailwind, and Radix.</p></TabsContent><TabsContent value="settings"><p className="story-caption">Manage your workspace preferences.</p></TabsContent></>
}

const meta = {
  title: 'Components/Tabs', component: Tabs,
  subcomponents: { TabsList, TabsTrigger, TabsContent },
  args: { defaultValue: 'activity' },
  render: args => <div style={{ maxWidth: 480 }}><Tabs {...args}><Panels /></Tabs></div>,
  parameters: { docs: { description: { component: 'Compose Tabs with TabsList, TabsTrigger, and TabsContent. Matching values connect each trigger with its panel. Radix handles arrow keys, active-state semantics, and focus. The default horizontal orientation is styled by Brickline.' } } },
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const DetailsSelected: Story = { args: { defaultValue: 'details' } }
export const DisabledTab: Story = { render: args => <Tabs {...args}><Panels disabled /></Tabs> }
export const InCard: Story = { render: args => <Card className="story-surface" style={{ maxWidth: 480 }}><Tabs {...args}><Panels /></Tabs></Card> }
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const activity = canvas.getByRole('tab', { name: 'Activity' })
    const details = canvas.getByRole('tab', { name: 'Details' })
    await userEvent.click(activity)
    await userEvent.keyboard('{ArrowRight}')
    await expect(details).toHaveFocus()
    await expect(details).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Brickline v0.1')
  },
}
