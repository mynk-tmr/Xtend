The agent should follow these advice while building frontend

- Avoid following Mantine layout components

Layout
AppShell
AspectRatio
Center
Container
Flex
Grid
Group
SimpleGrid
Space
Stack
Text

- Use Tailwind for layout, try to use Mantine for non-layout.

- For tanstack query, use the HydrateBoundary + prefetchquery pattern where possible