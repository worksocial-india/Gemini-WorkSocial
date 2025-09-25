# Gemini-WorkSocial AI Coding Agent Instructions

This document provides guidance for AI coding agents working on the Gemini-WorkSocial codebase.

## 1. Project Overview & Architecture

This is a single-page application (SPA) built with **React** and **Vite**. The primary goal of the application is to provide financial tools and information.

- **Framework**: React with Vite for a fast development experience.
- **Routing**: `react-router-dom` is used for all client-side routing. The main routes are defined in `src/App.jsx`.
- **Styling**: **Tailwind CSS** is used for styling. Utility classes are preferred over custom CSS. Custom styles are in `src/App.css` and `src/index.css`.
- **Component Structure**:
    - Page-level components are located directly in the `src/` directory (e.g., `src/Home.jsx`, `src/About.jsx`).
    - Specialized components, like the financial calculators, are organized into subdirectories (e.g., `src/calculators/EmiCalculator.jsx`).
    - The main application layout is in `src/App.jsx`, which includes a persistent `Header` and the main content area.

## 2. Developer Workflow

The main scripts for development are defined in `package.json`:

- **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR). This is the primary command you should use for development.
- **`npm run build`**: Creates a production-ready build of the application.
- **`npm run lint`**: Runs ESLint to check for code quality and style issues.
- **`npm run preview`**: Serves the production build locally for testing.

## 3. Code Conventions & Patterns

- **Components**: All components are functional components using hooks. They are written in JSX (`.jsx` files).
- **Routing**: When adding a new page, you need to:
    1. Create the component file in `src/`.
    2. Add a new `<Route>` in `src/App.jsx`.
    3. Add a link to the new page in `src/Header.jsx`.
- **Styling**: Use Tailwind CSS utility classes for styling. Avoid writing custom CSS unless absolutely necessary.
- **State Management**: For simple component state, use `useState`. For more complex state, consider using `useReducer` or a context. There is no global state management library like Redux in this project.
- **Dependencies**:
    - `chart.js` is used for data visualization (e.g., in the dashboard or calculators).
    - `framer-motion` is used for animations and transitions.
    - `lucide-react` is used for icons.

## 4. Key Files

- `src/App.jsx`: The main application component, contains the routing logic.
- `src/Header.jsx`: The main navigation header for the application.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `vite.config.js`: Configuration for the Vite build tool.
- `package.json`: Lists all project dependencies and scripts.
