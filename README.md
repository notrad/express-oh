# Express-oh

A robust Express.js application built with TypeScript, featuring comprehensive API documentation, authentication, and modern security best practices.

## Features

- 🚀 **Express.js** with TypeScript
- 📚 **Swagger** API documentation (`/api-docs`)
- 🔒 **JWT Authentication**
- 🛡️ **Rate Limiting**
- 🗜️ **Response Compression**
- 🔍 **Input Validation** with Joi
- 📝 **Logging** with Morgan
- 🎨 **Template Engine** with Pug
- ✨ **Code Formatting** with Prettier
- 🔍 **Linting** with ESLint
- 🐶 **Git Hooks** with Husky

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd express-oh

# Install dependencies
npm install
# or
yarn install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
```

## Usage

### Development

```bash
npm run build
npm start
```

### Linting & Formatting

```bash
npm run lint        # Lint code
npm run lint:fix    # Lint and fix issues
```

### Testing

_Coming soon!_

## API Documentation

Swagger UI is available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Project Structure

```
src/
  controllers/    # Route controllers
  middlewares/    # Express middlewares (auth, error handling, etc.)
  repositories/   # Data access layer
  routes/         # Express route definitions
  services/       # Business logic
  types/          # TypeScript types/interfaces
  config/         # Configuration files
  common/         # Utilities and helpers
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](LICENSE)