# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

To run thr project initially
1. clone this repository
2. Type npm install
3. Type npm install json-server
4. Naviate to public folder
5. Type npx json-server --watch SearchCache.json -p 5000
6. Come back to root of the folder
7. Type npm run dev

To run this project:

1. Go to Root of project
2. type npm run dev (for development environment)

To access network data source

1. Go to Root of the project
2. Go to public folder
3. Type npx json-server --watch SearchCache.json -p 5000