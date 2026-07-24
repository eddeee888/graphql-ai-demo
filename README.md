# GraphQL AI Demo

This is a demo to showcase GraphQL's practical application as a Data/Service Graph

## 📦 Project Overview

- **3 Applications**
  - `shop` - React e-commerce application with product listings, detail views and cart
  - `experience-graph` - GraphQL server for user experience
  - `internal-graph` - GraphQL server to expose data/service logic

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/eddeee888/graphql-ai-demo
cd graphql-ai-demo

# Install dependencies
pnpm i

# Serve the React shop application (this will simultaneously serve the Graphs)
pnpm nx dev shop

# ...or you can serve the Graphs separately
pnpm nx serve experience-graph
pnpm nx serve internal-graph

# Build all projects
pnpm nx run-many -t build

# Lint all projects
pnpm nx run-many -t lint

# Visualize the project graph
pnpm nx graph
```

## 👀 How it works

- After starting the server, go to the products page to start exploring `http://localhost:4200/products`
- Some features require dummy authentication. Add this to your localStorage to log in as user-1: `x-user-id: user-1`
