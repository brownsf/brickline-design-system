import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Create project', onClick: fn(), disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['default', 'sm', 'icon'] },
    asChild: { control: false },
  },
  parameters: { docs: { description: { component: 'Raised, outlined, and flat actions. Use asChild to apply button styling to a link while keeping native link semantics. buttonVariants is the exported CVA utility behind the variant and size controls.' } } },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Create project' }))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Outlined: Story = { args: { variant: 'outline' } }
export const Text: Story = { args: { variant: 'ghost' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete project' } }
export const Small: Story = { args: { size: 'sm' } }
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button')).toBeDisabled()
  },
}
export const WithIcon: Story = { args: { children: <>Continue <ArrowRight size={16} /></> } }
export const IconOnly: Story = { args: { size: 'icon', 'aria-label': 'Add project', children: <Plus size={20} /> } }
export const FloatingAction: Story = { args: { size: 'icon', className: 'fab', 'aria-label': 'Add project', children: <Plus size={22} /> } }
export const AsLink: Story = {
  args: { asChild: true, children: <a href="https://ui.shadcn.com/docs" target="_blank" rel="noreferrer">Read documentation <ArrowRight size={16} /></a> },
}
export const AllVariants: Story = {
  render: () => <div className="story-row">{(['default', 'secondary', 'outline', 'ghost', 'destructive'] as const).map(variant => <Button key={variant} variant={variant}>{variant}</Button>)}</div>,
}
