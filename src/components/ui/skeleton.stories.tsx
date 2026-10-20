import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton, Card } from './index'

const meta = {
  title: 'Components/Skeleton', component: Skeleton,
  parameters: { docs: { description: { component: 'Decorative loading placeholders hidden from assistive technology. Set aria-busy and an accessible label on the containing region. Match placeholder shapes to the expected content; pulsing stops for reduced motion.' } } },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Text: Story = { render: () => <div className="story-stack" role="region" aria-label="Loading description" aria-busy="true"><Skeleton /><Skeleton style={{ width: '85%' }} /><Skeleton style={{ width: '60%' }} /></div> }
export const ProjectCard: Story = { render: () => <Card role="region" aria-label="Loading project" aria-busy="true" style={{ padding: 24, maxWidth: 380 }}><Skeleton style={{ height: 140, marginBottom: 24 }} /><Skeleton style={{ height: 24, width: '65%', marginBottom: 16 }} /><Skeleton style={{ marginBottom: 8 }} /><Skeleton style={{ width: '80%' }} /></Card> }
