# 📝 Task Manager (To-Do List) App

This is a simple, responsive web application that allows users to manage their daily tasks. It provides core functionalities like adding, viewing, editing, marking as complete, and deleting tasks, with all data persistently stored via a backend API.

---

## ✨ Features

* **Add New Tasks**: Quickly add new tasks to your list.
* **View All Tasks**: See all your pending and completed tasks.
* **Edit Tasks**: Modify the text of existing tasks.
* **Toggle Completion Status**: Mark tasks as complete or incomplete.
* **Delete Tasks**: Remove tasks from your list.
* **Responsive Design**: Optimized for various screen sizes (mobile, tablet, desktop).
* **Real-time Updates**: Reflects changes in the UI instantly after API operations.
* **Task Statistics**: Displays total, completed, and pending tasks counts.

---

## 🛠️ Technologies Used

### Frontend
* **React**: A JavaScript library for building user interfaces.
* **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
* **`react-icons`**: For various visual icons (e.g., checkmark, edit, trash).
* **`axios`**: A promise-based HTTP client for making API requests.

### Backend (Assumed)
* This frontend expects a RESTful API backend that handles CRUD operations for `/api/todos`. While the backend code isn't provided here, it would typically be built with technologies like Node.js (Express), Python (Django/Flask), Ruby on Rails, etc., and connect to a database like MongoDB, PostgreSQL, or MySQL.

---

## 🚀 Setup and Installation

To get this project running locally, you'll need Node.js and npm (or yarn) installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-folder>
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Backend Setup:**
    * **Crucially**, this frontend requires a compatible backend API running at `/api/todos`. You will need to set up and run the corresponding backend service separately.
    * Ensure your backend provides the following endpoints:
        * `GET /api/todos`: To fetch all tasks.
        * `POST /api/todos`: To create a new task.
        * `PATCH /api/todos/:id`: To update an existing task (e.g., text or completion status).
        * `DELETE /api/todos/:id`: To delete a task.
4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be accessible in your browser, usually at `http://localhost:3000`.

---

## 💡 Usage

* **Add a Task**: Type your task into the input field and click "Add Task" or press Enter.
* **Mark as Complete/Incomplete**: Click the circular checkbox next to a task.
* **Edit a Task**: Click the pencil icon (<MdModeEditOutline />) next to a task, modify the text in the input field, and click "Save" or "Cancel".
* **Delete a Task**: Click the trash can icon (<FaTrash />) next to a task.

---

## 🔗 API Endpoints (Frontend Expectation)

The frontend interacts with the following RESTful API endpoints:

* `GET /api/todos`: Retrieves an array of all todo objects.
    * Expected response format: `[{ _id: "string", text: "string", completed: boolean }, ...]`
* `POST /api/todos`: Creates a new todo.
    * Request body: `{ text: "string" }`
    * Expected response: The newly created todo object (including `_id`).
* `PATCH /api/todos/:id`: Updates an existing todo by its ID.
    * Request body: `{ text: "string", completed: boolean }` (can be partial)
    * Expected response: The updated todo object.
* `DELETE /api/todos/:id`: Deletes a todo by its ID.
    * Expected response: Typically a success status (e.g., 204 No Content or a confirmation message).

---

## 👋 Contributing

Contributions are welcome! If you find a bug or want to suggest an improvement, please open an issue or submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
