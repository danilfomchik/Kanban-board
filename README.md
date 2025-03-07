# Kanban Board

A simple and intuitive **Kanban Board** application built with modern web technologies to help manage tasks efficiently.

## 🚀 Features

✔️ **Drag & Drop Support** – Easily move tasks between columns.  
✔️ **Column Management** – Add, edit, and delete task columns.  
✔️ **Task Management** – Create, update, and delete tasks.  
✔️ **Persistent State** – Saves tasks and board state.  
✔️ **Responsive Design** – Works on all screen sizes.  
✔️ **Modern UI** – Clean and user-friendly interface.

## 🛠️ Tech Stack

🔹 **Front-End:** React, TypeScript  
🔹 **Styling:** Tailwind CSS  
🔹 **State Management:** Redux Toolkit  
🔹 **Drag & Drop:** dnd kit  
🔹 **Persistence:** LocalStorage (or API if integrated)

## 📂 Project Structure

```bash
📦 kanban-board
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 components
 ┃ ┣ 📂 icons
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 redux
 ┃ ┣ 📂 services
 ┃ ┣ 📜 App.tsx
 ┃ ┣ 📜 index.css
 ┃ ┗ 📜 main.tsx
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┗ 📜 README.md
```

## 📦 Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/danilfomchik/Kanban-board.git
    ```

2. Navigate to the project directory:

    ```sh
    cd Kanban-board
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## 📖 Usage Guide

1. Add a Task

- Click on the **"Add Task"** button in any column.
- Enter the task details and save.

2. Move Tasks

- Drag a task and drop it into another column.

3. Edit or Delete Tasks

- Click on a task to **edit** or **delete** it.

4. Manage Columns

- Add or remove columns based on your workflow.

5. Reorder Columns

- Using drag and drop reorder columns.

## 📜 License

This project is licensed under the **MIT License**.

Feel free to contribute or open issues if you find any bugs! 🚀
