import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Card, Badge } from './index'

const meta = {
  title: 'Components/Card', component: Card,
  args: { className: 'story-surface', style: { maxWidth: 420 }, children: <><h3>A solid foundation.</h3><p className="story-caption">A surface for related content, with a subtle border and level-one elevation.</p></> },
  parameters: { docs: { description: { component: 'A flexible surface container. Compose native headings, text, and actions inside. Card itself is a div; actions belong in semantic buttons or links.' } } },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithActions: Story = {
  args: { children: <><Badge>Workspace</Badge><h3 style={{ marginTop: 16 }}>Room for your next idea.</h3><p className="story-caption">Start with a clear canvas and make something your own.</p><div className="story-row"><Button>Create project</Button><Button variant="ghost">Learn more</Button></div></> },
}
export const AsArticle: Story = {
  render: () => <article aria-labelledby="card-heading"><Card className="story-surface" style={{ maxWidth: 420 }}><h3 id="card-heading">Design notes</h3><p className="story-caption">A semantic article can wrap a card without changing its presentation.</p></Card></article>,
}
