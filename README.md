# React Movie and Person Search Application

This is a React application that provides users with the ability to search for movies and persons, view details, and manage user authentication. The application integrates with a Django REST API for backend functionality.

## Features

- User registration, login, and logout functionality.
- Search for movies and persons with various filters.
- Bootstrap-styled user interface for better user experience.
- JWT authentication for secure API access.

## Technology Stack

- **Frontend**: React, React Router, Axios
- **Styling**: Bootstrap
- **State Management**: React Hooks (useState, useEffect)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node package manager)

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the API URL:
    ```plaintext
    REACT_APP_API_URL=<your-django-api-url>
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

```plaintext
/src
|-- /components
|   |-- Login.js         # Login component
|   |-- Register.js      # Registration component
|   |-- MovieSearch.js   # Movie search component
|   |-- PersonSearch.js   # Person search component
|-- /services
|   |-- api.js           # API calls are managed here
|-- /App.js              # Main application component
|-- /index.js            # Entry point of the application
