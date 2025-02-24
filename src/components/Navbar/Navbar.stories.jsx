import { BrowserRouter } from 'react-router-dom';
import { Home, Settings, User } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import { ThemeContextProvider } from '../../context/ThemeContext'; // Added ThemeContextProvider

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    padding: 0,
    docs: {
      description: {
        component:
          'A responsive navigation bar component with theme switching capabilities and mobile support.',
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    brandName: {
      control: 'text',
      description: 'The brand/logo text displayed on the left side',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Current theme of the navbar',
    },
    navLinks: {
      control: 'object',
      description:
        'Array of navigation items with name, path, and optional icon',
    },
    mobileBreakpoint: {
      control: 'number',
      description: 'Breakpoint in pixels for mobile menu transition',
    },
    activeColor: {
      control: 'color',
      description: 'Color for active navigation items',
    },
    textColorLight: {
      control: 'color',
      description: 'Text color in light theme',
    },
    textColorDark: {
      control: 'color',
      description: 'Text color in dark theme',
    },
    bgColorLight: {
      control: 'color',
      description: 'Background color in light theme',
    },
    bgColorDark: {
      control: 'color',
      description: 'Background color in dark theme',
    },
    focusColor: {
      control: 'color',
      description: 'Color of focus outline for accessibility',
    },
  },
};

// Default navigation links with icons
const defaultNavLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'User', path: '/user', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

// Template for all stories
const Template = (args) => {
  return (
    <ThemeContextProvider>
      <div
        style={{
          height: '200vh',
          width: '100vw',
          overflowX: 'hidden',
        }}
      >
        <Navbar {...args} />
      </div>
    </ThemeContextProvider>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  brandName: 'PDF Solutions',
  theme: 'light',
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  mobileBreakpoint: 768,
  activeColor: '#38bdf8',
  textColorLight: '#000000',
  textColorDark: '#ffffff',
  bgColorLight: '#ffffff',
  bgColorDark: '#000000',
  focusColor: '#4d90fe',
};

// Dark theme story
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Default.args,
  theme: 'dark',
};

// No navigation links
export const NoLinks = Template.bind({});
NoLinks.args = {
  ...Default.args,
  navLinks: [],
  brandName: 'PBS',
};

// Icons only navigation
export const IconOnlyNavigation = Template.bind({});
IconOnlyNavigation.args = {
  ...Default.args,
  navLinks: [
    { path: '/', icon: Home },
    { path: '/profile', icon: User },
    { path: '/settings', icon: Settings },
  ],
};

// Long navigation
export const TextAndIconNavigation = Template.bind({});
TextAndIconNavigation.args = {
  ...Default.args,
  navLinks: defaultNavLinks,
};

export const LogoLeft = Template.bind({});
LogoLeft.args = {
  brandName: 'PBS',
  logo: {
    src: '/logo.png',
    alt: 'Company Logo',
    placement: 'left',
    height: 32,
  },
};

// Logo on right side
export const LogoRight = Template.bind({});
LogoRight.args = {
  brandName: 'PBS',
  logo: {
    src: '/logo.png',
    alt: 'Company Logo',
    placement: 'right',
    height: 32,
  },
};

// Text only (no logo)
export const TextOnly = Template.bind({});
TextOnly.args = {
  brandName: 'PBS',
  logo: null,
};

// With custom click handlers
export const WithClickHandlers = Template.bind({});
WithClickHandlers.args = {
  brandName: 'PBS',
  logo: {
    src: '/logo.png',
    alt: 'Company Logo',
    placement: 'left',
    height: 32,
  },
  navLinks: [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      onClick: () => alert('Home clicked!'),
    },
    {
      name: 'User',
      path: '/user',
      icon: User,
      onClick: () => alert('User clicked!'),
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      onClick: () => alert('Settings clicked!'),
    },
  ],
  onNavItemClick: () => alert('Custom onClick function ran! '),
};
