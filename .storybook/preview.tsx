import { useEffect } from 'react'
import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/styles.css'
import './preview.css'

const withTheme: Decorator = function ThemeDecorator(Story, context) {
  const dark = context.globals.theme === 'dark'
  // Apply to the iframe root so Radix portals inherit the selected theme too.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    return () => document.documentElement.classList.remove('dark')
  }, [dark])
  return <div className="brickline-story"><Story /></div>
}

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Brickline color theme',
      toolbar: {
        title: 'Theme', icon: 'circlehollow', dynamicTitle: true,
        items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }],
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'padded',
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/ } },
    options: { storySort: { order: ['Foundations', 'Components'] } },
    a11y: { test: 'todo' },
  },
}

export default preview
