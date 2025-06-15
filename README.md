# Health Suggestions App

## Project Overview

The Health Suggestions App is a modern web application designed to provide personalized health and wellness recommendations based on a user's age and selected health goals. Built with Next.js, React, and TypeScript, this application offers a clean, responsive user interface with authentication features and the ability to export recommendations as PDF documents.

## Features

- **User Authentication**: Simple login system with demo account option
- **Personalized Health Suggestions**: Get tailored recommendations based on:
  - Age
  - Health goals (weight loss, muscle gain, overall wellness, etc.)
- **Responsive Design**: Fully responsive UI that works across desktop and mobile devices
- **PDF Export**: Save and share your personalized health suggestions
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS and Pangea UI

## Technologies Used

- **Frontend Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Programming Language**: TypeScript 5
- **Styling**: CSS
- **PDF Generation**: jsPDF
- **Authentication**: Custom authentication system
- **State Management**: React Hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/health-suggestions-app.git
   cd health-suggestions-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs the linter to check for code quality issues

## Usage

### Authentication

When you first open the application, you'll be presented with two options:
- **Quick Demo**: Access the app with a demo user account
- **Login**: Sign in with your credentials (Note: In the current version, this is a mock authentication system)

### Getting Health Suggestions

1. After logging in, you'll see a form asking for your age and health goal
2. Enter your age (between 1-150)
3. Select your primary health goal from the dropdown
4. Click "Get Suggestions"
5. View your personalized health recommendations
6. Optionally, click "Export as PDF" to save your suggestions

### Logging Out

To log out, simply click the "Logout" button in the top-right corner of the header.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This app was created as an assessment project
- Health suggestions are for demonstration purposes only and should not replace professional medical advice

