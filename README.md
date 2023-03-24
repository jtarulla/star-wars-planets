# Star Wars Planets 🌎

This application is built with React, TypeScript, Vite, and Material-UI. It allows users to browse through the Star Wars planets, edit their properties, add new planets, and delete planets.

## Features

- Browse Star Wars planets using the [SWAPI](https://swapi.dev/) (Star Wars API)
- Pagination for easy navigation
- Add new planets (performed in localStorage)
- Edit existing planets (performed in localStorage)
- Delete planets (performed in localStorage)
- Responsive design using Material-UI

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jtarulla/star-wars-planets.git
cd star-wars-planets
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The development server should start on http://localhost:3000

### Running Tests

**To run unit tests**:

```bash
npm run test:unit
```

**To run unit tests in watch mode**:

```bash
npm run test:unit-watch
```

## Running with Docker

This project can be run inside a Docker container for a consistent development environment. Follow the steps below to build and run the project using Docker:

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/) on your machine.
- Install [Docker Compose](https://docs.docker.com/compose/install/) on your machine.

### Build and run the Docker container

1. Open a terminal in the project's root directory.
2. Build and run the Docker container with the following command:

```bash
docker-compose up --build
```

The application should now be accessible at http://localhost:3000.

### Live-reloading

The Docker container is configured to enable live-reloading in development mode. When you make changes to the project files, Vite will automatically reload the app inside the Docker container.

### Stopping the Docker container

You can run the following command in another terminal in the project's root directory:

```docker-compose down```