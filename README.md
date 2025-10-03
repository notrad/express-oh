# Express-oh

A robust Express.js application built with TypeScript, featuring comprehensive API documentation and security features.

## Features

- 🚀 Express.js with TypeScript
- 📚 Swagger API documentation
- 🔒 Authentication with JWT
- 🛡️ Rate limiting
- 🗜️ Response compression
- 🔍 Input validation with Joi
- 📝 Logging with Morgan
- 🎨 Template engine with Pug
- ✨ Code formatting with Prettier
- 🔍 Linting with ESLint
- 🐶 Git hooks with Husky

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1
```

## Scripts

```bash
# Development with hot-reload
npm run dev

# Build the project
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## API Documentation

Once the server is running, you can access:

- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/openai.json`

## Project Structure

```
src/
├── config/         # Configuration files
├── middlewares/    # Express middlewares
├── routes/         # API routes
├── swagger/        # Swagger documentation
├── common/         # Shared utilities
├── app.ts         # Express app setup
└── server.ts      # Server entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.