# React + TypeScript + Vite + Redux Toolkit Project

This project is a setup that builds upon the minimal React, TypeScript, and Vite template by integrating Redux Toolkit for state management. It includes features for searching and displaying GitHub user repositories, demonstrating how to use React with Redux in TypeScript. The project showcases dynamic search functionality that interacts with GitHub's API to fetch and display user repositories and implements infinite scrolling for an enhanced user experience.

## Features

- **React with TypeScript**: Leverages React alongside TypeScript for component building, state, and props management with type safety.
- **Vite for Development**: Uses Vite for a fast development server and efficient bundling.
- **Redux Toolkit for State Management**: Employs Redux Toolkit for managing application state, including asynchronous thunks for API calls.
- **Dynamic User Repository Search**: Features a user repository search functionality, showcasing asynchronous actions and Redux state management.
- **Infinite Scrolling**: Implements dynamic loading of more repositories as the user scrolls, improving the UX.

## Plugins and Tools

This project uses two official Vite plugins for React development:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utilizes Babel for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses SWC for Fast Refresh.

## Getting Started

Follow these steps to set up and run the project:

1. **Clone the Repository**

```bash
git clone git@github.com:AKhalil609/GitSearch.git
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start the Development Server**

```bash
npm run dev
```

Open http://localhost:5173 in your browser to see the application.

4. **Build for Production**

```bash
npm run build
```

## Project Structure Overview

```
└── 📁src
    └── 📁api
        └── githubApi.ts
    └── 📁app
        └── hooks.ts
        └── store.ts
    └── App.tsx
    └── 📁assets
    └── 📁components
        └── 📁RepositoriesList
            └── index.tsx
            └── styles.ts
        └── 📁SearchInput
            └── index.tsx
            └── styles.ts
        └── 📁UserCard
            └── index.tsx
            └── styles.ts
    └── 📁features
        └── 📁repositories
            └── initialState.ts
            └── repositoriesSlice.ts
            └── selectors.ts
            └── thunks.ts
        └── types.ts
        └── 📁userSearch
            └── initialState.ts
            └── selectors.ts
            └── thunks.ts
            └── userSearchSlice.ts
    └── index.scss
    └── main.tsx
    └── 📁pages
        └── SearchPage.tsx
        └── styles.ts
```
