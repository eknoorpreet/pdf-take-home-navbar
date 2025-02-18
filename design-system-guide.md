# 1. Documentation & Implementation Guide

## Usage Guidelines

### When to Use

The `Navbar` component is a responsive navigation bar designed for web applications. It supports:

- Branding with a `brandName`

- Dynamic navigation links (`navLinks` array)

- Light and dark themes

- Currently active link

- Mobile-friendly behavior (toggleable menu)

- Keyboard navigation

- Accessibility support

- Brand logo only, brand name only, or a combination of both brand logo and brand name

- Brand logo placement on either side of the brand name

### How to Use

Sample usage:

```jsx
const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'User', path: '/user', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

<Navbar
  brandName='PDF Solutions'
  navLinks={navLinks}
  theme={theme}
  setTheme={setTheme}
/>;
```

## Props & State Variations:

### Props

| Prop Name          | Type       | Default Value                                                              | Description                                                                           |
| ------------------ | ---------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `brandName`        | `string`   | `'PBS'`                                                                    | The name of the brand displayed in the navbar.                                        |
| `navLinks`         | `array`    | `[]`                                                                       | An array of navigation links, each containing `name`, `path`, and an optional `icon`. |
| `theme`            | `string`   | `undefined`                                                                | The current theme (`'light'` or `'dark'`).                                            |
| `setTheme`         | `function` | `undefined`                                                                | Function to toggle the theme.                                                         |
| `mobileBreakpoint` | `number`   | `768`                                                                      | The screen width (in pixels) at which the navbar switches to mobile mode.             |
| `themeConfig`      | `object`   | Custom theme object                                                        | An object defining color configurations for light and dark themes.                    |
| `logo`             | `object`   | `null`                                                                     | Logo object containing `src`, `alt`, and `placement`.                                 |
| `onNavItemClick`   | `function` | A callback function that gets triggered when a navigation item is clicked. | `undefined`                                                                           |

### State

| State Variable | Type      | Default Value | Description                                                     |
| -------------- | --------- | ------------- | --------------------------------------------------------------- |
| `isMenuOpen`   | `boolean` | `false`       | Controls whether the mobile menu is open.                       |
| `isHydrated`   | `boolean` | `false`       | Ensures the component is hydrated before updating `isMenuOpen`. |

### Derived Variables

| Variable Name | Type      | Description                                                   |
| ------------- | --------- | ------------------------------------------------------------- |
| `isMobile`    | `boolean` | Determines if the viewport width is below `mobileBreakpoint`. |

## Accessibility Considerations:

- Escape key closes the menu (`useKeyPress`)

  - This `useKeyPress` hook can work for any specific key press (not just `Escape` key), ensuring reusability.

- Clicking outside the menu closes it (`useClickOutside`)

- `Tab` navigation through interactive elements

- ARIA Attributes:

  `aria-expanded`, `aria-hidden`, and `aria-label` are used for toggling and screen reader support

- Focus Management:

  Uses a `focusColor` variable to enhance visibility

## Scalability Considerations:

### Customization

- You can add text-only, icon-only, or a mix of text and icon links.
- You can add text-only, logo-only, or a mix of text and logo as the brand name.
- You can place the logo to either side of the brand name.
- Easily extendable with new props for colors.
- Supports external styling via CSS modules.
- You can add a custom click handler for the links.

### Future Enhancements

- Adding animations for smoother transitions
- More color schemes
- Handling large menus efficiently with virtualization (discussed below)

# 2. Scalability & Maintainability

## Thought Process for Designing a Scalable Component

I focus on scalability, usability, and accessibility to ensure it scales across different applications.

The following are the considerations:

- Customization: Props like `brandName`, `navLinks`, `logo` and theme-related colors allow developers to adapt it without modifying internal logic. Furthermore, `onNavItemClick` prop allows developers to pass in custom functions to the component.
- Responsiveness: Using `mobileBreakpoint` ensures appropriate behavior across different screen sizes.
- Accessibility: Features like keyboard navigation (`Escape` key handling), focus indicators, and ARIA attributes ensure usability for all users.
- State Management: The `isMenuOpen` state provides a clear separation of concerns, making mobile menu handling predictable.

## Managing Long-term Maintenance

- Versioning & Backward Compatibility:
  - Adopt strict [semver](https://semver.org/) principles (e.g., v1.0.0 → v1.1.0 for minor updates) and provide deprecation warnings before removing features
  - Clear communication of breaking changes
  - Maintain detailed changelog documentation
  - Provide migration guides for significant updates
- Documentation & Usage Guidelines: Maintain an up-to-date guide on how to integrate (and extend) the component.
- Theming Consistency: Standardize theme variables so future updates don’t break existing styles.

## Challenges in Integrating into a Large-scale Design System

- Scalability Conflicts: What if an application requires a `SearchBar` component inside the navbar? Or a `UserProfile` component? The current implementation will need to be extended to support that.
- State & Context Sharing: If used in a large-scale application, integrating it with global state management might require some more abstraction.
- Performance Optimization: As more features (e.g., animations, mega menus) are added, we need to ensure the component remains lightweight and utilizes minimum re-renders.

# 3. Optimizing performance in a data-heavy application (Bonus)

## Minimize Re-renders

- Use `React.memo()` to prevent unnecessary re-renders of individual menu items.
- Use `useCallback()` for functions that don’t need to be re-created on every render.
- Use `useMemo()` to cache computed values (e.g., filtered or sorted menu items).

## List virtualization

If the menu contains thousands of items, rendering that many DOM nodes would cost lots of memory and slow down the browser.

The solution is **List virtualization**.

_"List virtualization, or "windowing", is the concept of only rendering what is visible to the user. The number of elements that are rendered at first is a very small subset of the entire list and the "window" of visible content moves when the user continues to scroll. This improves both the rendering and scrolling performance of the list."_

Source: https://web.dev/articles/virtualize-long-lists-react-window

The basic idea of DOM virtualization is to:

1. Render only the elements that are within the visible portion of the page.
2. Render additional elements as the user scrolls or interacts with the content.
3. Recycle DOM elements to minimize memory and performance overhead.

For instance, Facebook replaces the contents of off-screen feed posts with empty `<div>`s, add dynamically calculated inline styles (e.g. `style="height: 300px"`) to set the height of the posts so as to preserve the scroll position and add the `hidden` attribute to them.

This will improve rendering performance in terms of:

- **Browser painting:** Fewer DOM nodes to render and fewer layout computations to be made.

- **Virtual DOM reconciliation (React-specific):** Since the post is now a simpler empty version, it's easier for React (the UI library that Facebook is using to render the feed) to diff the virtual DOM vs the real DOM to determine what DOM updates have to be made.

This can be achieved using via `react-window` (https://github.com/bvaughn/react-window) or `react-virtualized` (https://github.com/bvaughn/react-virtualized)

Source: [Facebook's Engineering Blog](https://engineering.fb.com/2020/05/08/web/facebook-redesign/)

## Rendering

- Use UI Skeletons
- Batched DOM updates (Using DOM fragment)
- Efficient CSS classnames (BEM)
  - Predictable and Semantic Class Names
  - Flat selectors are faster while deep nesting affects performance
  - Reusable Utility Classes

## Code Splitting

As an application grows, the number of pages and features increase which will result in more JavaScript and CSS code needed to run the application.

Solution: **Code Splitting**

Generally, code splitting can be done on two levels:

- **Split on the page level:** Each page will only load the JavaScript and CSS needed on that page.

- **Lazy loading resources within a page:** Load non-critical resources only when needed or after the initial render, such as code that's only needed lower down on the page, or code that's used only when interacted with (e.g. modals, dialogs).

For a navbar component, there's only a single page, so page-level code splitting is not too relevant, however lazy loading can still be super useful for other purposes.

We will divide the JavaScript loading into 3 tiers:

- **Tier 1:** Basic layout needed to display the first paint for the above-the-fold content, including UI skeletons for initial loading states.

- **Tier 2:** JavaScript needed to fully render all above-the-fold content. After Tier 2, nothing on the screen should still be visually changing as a result of code loading.

- **Tier 3:** Resources that are only needed after display that doesn't affect the current pixels on the screen, including logging code and subscriptions for live-updating data.

## Compression

Gzip and Brotli are compression algorithms used to reduce the size of data transferred between servers and clients over the network, which improves network performance by decreasing load times and bandwidth usage.

### Gzip

- Gzip is a widely-used compression algorithm based on the DEFLATE algorithm.
- It is supported by virtually all modern browsers and servers.

### Brotli

- Brotli is a newer compression algorithm developed by Google.
- It offers better compression ratios than Gzip, especially for text-heavy resources.

We will use brotli for better compression and gzip in browsers where brotli is not supported.

## Infinite scrolling

If there are thousands of menu items, we should implement infinite scrolling.

One way to reduce (or completely eliminate) the waiting time (for infinite scrolling) is to load the next set of menu items before the user hits the bottom of the page (no need for loading indicators).

There are two popular ways to implement infinite scroll:

1. **Listen for the `scroll` event:** (Add a `scroll` event listener) to the page or a timer (via `setInterval`)

2. **Intersection Observer API:** To monitor when the "marker" element is entering or exiting another element or intersecting by a specified amount.

The Intersection Observer API is a browser native API and is preferred over `Element.getBoundingClientRect()`. Also, it doesn't run on the main thread (since it's a browser API)

## General performance tips

- Optimize images with lazy loading and adaptive loading.
- Minify CSS/JS
  - Minimize heavy external dependencies
  - Minimize CSS blueprint (don't include the entire Bootstrap file)
- Serve assets via CDN
- Use server to do expensive computations
- Avoid sync jobs
- Tree shaking (remove dead code)
- Profiling components/interactions
- Slowest requests to the server can be prioritized for improvement (by examining latency data for each API call) (Source: [Lyft's Engineering Blog](https://eng.lyft.com/building-accessible-web-experiences-at-lyft-185ad9328c6f))
