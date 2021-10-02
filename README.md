# Back-End
Node.js back-end with clean architecture.

## Project Structure 

```
src
│   app.ts                # Application entry point
└───core
|   └───config            # Environment variables and configurations
|   └───exception         # Error and exception classes
|   └───loaders           # Application startup files
|   └───middlewares       # Custom Express middlewares
|   └───types             # Type declaration files (d.ts) for Typescript
|   └───utils             # Utility classes and functions
└───features
    └───*
        └───controllers   # Route definitions and controllers
        └───entities      # TypeORM entities
        └───services      # Business logic
```

## Getting Started

### Step 1: Set up the development environment

You need to set up your development environment before you can do anything.

Install [Node.js and npm](https://nodejs.org/en/download/)

### Step 2: Install the dependencies

- Install all dependencies with `npm install`

### Step 3: Run in dev mode

- Run `npm run start:dev` 
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Step 4: Build the project and run it

- Run `npm build` to generate all JavaScript files from the TypeScript sources. The builded app located in `dist`.
