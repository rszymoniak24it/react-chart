# React Chart Analytics Panel

## Overview

This project is a React-based analytics dashboard for product data, featuring interactive charts, filtering, sorting, and pagination. It uses modern React (with hooks and Context API), TypeScript, Chart.js, and SCSS modules for styling.

---

## 1. Cloning and Running the Project

```bash
git clone https://github.com/your-username/react-chart.git
cd react-chart
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 2. Architecture Overview

```
src/
  App.tsx                # Main application component
  components/            # Reusable UI components
    Pagination.tsx
    ProductFilter.tsx
    ProductTable.tsx
    ProductTableSearch.tsx
    ProductTableTable.tsx
    SalesChart.tsx
    Sidebar.tsx
  context/               # React context and providers
    ProductContext.tsx
    ProductProvider.tsx
  services/              # API calls and data fetching
    api.ts
  styles/                # SCSS modules for styling
    App.module.scss
    main.scss
    ProductFilter.module.scss
    ProductTable.module.scss
    SalesChart.module.scss
    Sidebar.module.scss
  tests/                 # Unit and integration tests
  types/                 # TypeScript type definitions
    Product.ts
  utils/                 # Utility functions
    filters.ts
```

## Architecture Description

- **Component-Based UI:**  
  All UI elements are built as reusable React components in [`src/components/`](src/components/).  
  - [`ProductTable`](src/components/ProductTable.tsx): Displays products with sorting, searching, and pagination.
  - [`ProductTableSearch`](src/components/ProductTableSearch.tsx): Search bar and update button for filtering products and updating the chart.
  - [`ProductTableTable`](src/components/ProductTableTable.tsx): Renders the product table with sorting.
  - [`ProductFilter`](src/components/ProductFilter.tsx): Allows filtering products by price range.
  - [`SalesChart`](src/components/SalesChart.tsx): Visualizes stock levels and averages using Chart.js.
  - [`Sidebar`](src/components/Sidebar.tsx): Responsive sidebar for navigation and filters.
  - [`Pagination`](src/components/Pagination.tsx): Handles page navigation for product lists.

- **State Management:**  
  Global state is managed using React Context in [`src/context/`](src/context/).  
  - [`ProductProvider`](src/context/ProductProvider.tsx): Fetches product data, manages loading/error states, and provides filtering/searching logic.
  - [`ProductContext`](src/context/ProductContext.tsx): Defines the context and custom hook for accessing product state.

- **Data Fetching:**  
  API calls are abstracted in [`src/services/api.ts`](src/services/api.ts), using Axios to fetch product data from an external endpoint.

- **Styling:**  
  SCSS modules in [`src/styles/`](src/styles/) provide modular and maintainable styles, scoped to each component.

- **Type Safety:**  
  All data models are defined in [`src/types/`](src/types/), e.g., [`Product.ts`](src/types/Product.ts), ensuring type safety throughout the app.

- **Utilities:**  
  Common logic for filtering, searching, and sorting products is implemented in [`src/utils/filters.ts`](src/utils/filters.ts).

- **Testing:**  
  Tests are organized in [`src/tests/`](src/tests/), using Jest and React Testing Library for unit and integration tests.


## 3. Technology Choices

- **React**: Chosen for its component-based architecture, strong ecosystem, and excellent support for state management and hooks.
- **TypeScript**: Ensures type safety and better developer experience.
- **Chart.js + react-chartjs-2**: Powerful, flexible charting library with React bindings.
- **SCSS Modules**: Scoped, maintainable styling.
- **Jest & React Testing Library**: Industry-standard tools for unit and integration testing.
- **Vite**: Fast, modern build tool for React projects.

These technologies provide a robust, scalable, and maintainable foundation for building interactive dashboards.

---

## 4. Test Scripts and Commands

- **Run tests:**
  ```bash
  npm run test
  ```
- **Run development server:**
  ```bash
  npm run dev
  ```
- **Build for production:**
  ```bash
  npm run build
  ```

---

## License

MIT