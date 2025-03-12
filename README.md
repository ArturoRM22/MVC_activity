# MVC Pattern Implementation

This project demonstrates the implementation of the Model-View-Controller (MVC) architectural pattern. MVC is a design pattern that separates an application into three main logical components:

## Project Structure

### Model

- Located in the `models` directory
- Represents the data and business logic
- Handles data manipulation and validation
- Independent of the user interface
- Contains classes like `Task` that define data structures

### View

- Located in the `views` directory
- Responsible for rendering the user interface
- Displays data to the user
- Sends user actions to the Controller
- Implemented as HTML templates with dynamic content

### Controller

- Located in the `controllers` directory
- Acts as an intermediary between Model and View
- Handles user input
- Updates the Model and View accordingly
- Contains the application logic

## How it Works

1. The user interacts with the View (UI)
2. The Controller receives the user input
3. The Controller processes the request and updates the Model if necessary
4. The Model updates its data and state
5. The Controller receives the updated data from the Model
6. The Controller updates the View with the new data
7. The View displays the updated information to the user

## Benefits of MVC

- **Separation of Concerns**: Each component has a specific responsibility
- **Maintainability**: Easy to modify individual components without affecting others
- **Reusability**: Components can be reused in different parts of the application
- **Testability**: Components can be tested independently
