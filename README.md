# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Kanban Task Board

A professional Trello-style Kanban Task Management Board built with **React.js** and **Vite**.

## Features

- 3 Column Layout — To Do, In Progress, Done
- Add, Delete and Move Tasks between columns
- Inline Task Editing by clicking on any task
- Priority System (High, Medium, Low) with color coded borders and icons
- Drag and Drop cards between columns using dnd-kit
- Global Search Filter to find tasks in real time
- Dark Mode and Light Mode toggle
- State Persistence using localStorage
- Fully Responsive on Mobile, Tablet and Desktop
- Column hover effects for better UX
- Task count badge on each column

---

## Tech Stack

- React.js
- Vite
- dnd-kit (Drag and Drop)
- Lucide React (Professional Icons)
- localStorage (State Persistence)
- CSS (Responsive Design)

---

## Packages Installed

| Package | Purpose |
|---|---|
| `vite` | Build tool and dev server |
| `react` | UI library |
| `lucide-react` | Professional icon library |
| `@dnd-kit/core` | Drag and drop core library |
| `@dnd-kit/sortable` | Drag and drop sortable utilities |
| `@dnd-kit/utilities` | Drag and drop helper utilities |

---

## Coding Conventions

### camelCase Naming
Throughout this project, **camelCase** was strictly followed for all variable names, function names and state variables as per JavaScript and React best practices. Examples:

- `addTask`, `deleteTask`, `moveTask`, `editTask`
- `inputText`, `searchQuery`, `darkMode`, `activeTask`
- `handleDragStart`, `handleDragEnd`
- `priorityBorder`, `priorityIcon`

---

## Development Approach

### CMD Over Terminal
This entire project was developed and managed using **Windows Command Prompt (CMD)** instead of an integrated terminal. All major operations were performed through CMD including:

- Running the development server with `npm run dev`
- Installing packages with `npm install`
- Checking localhost status regularly at `http://localhost:5173`
- Creating project files and folders using `mkdir` and `echo`
- Managing Git operations — init, add, commit, push
- Installing GitHub CLI using `winget`
- Authenticating GitHub through `gh auth login`
- Creating the GitHub repository through `gh repo create`

### Regularly Checking Localhost
During development, CMD was used to constantly monitor the status of the local dev server. After every change, the browser at `http://localhost:5173` was checked to verify the output before moving to the next step.

---

## Errors Faced and How They Were Resolved

### 1. Duplicate Import Errors
This was the most frequently encountered error throughout the project. It occurred multiple times across different files.

**Error message:**
```
PARSE_ERROR: Identifier 'X' has already been declared
```

**Cause:**
Every time a new icon or hook was added, a new import line was written instead of adding to the existing import line. This caused the same identifier to be declared twice.

**Files affected:**
- `TaskCard.jsx` — duplicate lucide-react imports (`Trash2`, `ArrowLeft`, `ArrowRight`, `Flame`, `AlertTriangle`, `ArrowDown`)
- `Board.jsx` — duplicate lucide-react imports (`ClipboardList`, `Loader`, `CheckCircle`, `Plus`, `RotateCcw`, `Search`)

**Fix applied:**
Both duplicate import lines were deleted and replaced with a single combined import line.

**Lesson learned:**
Always use `Ctrl + F` to search for existing imports before adding new ones. Never write two import lines from the same package in one file.

---

### 2. Drag and Drop Not Working (Phase 3)
This was the most challenging bug faced during the entire project.

**Problem:**
Even after installing `@dnd-kit/core` and adding `useDraggable` to `TaskCard.jsx`, the drag and drop was completely non-functional. Cards would not move at all.

**Root causes identified:**
- `TaskCard` component was not imported in `Board.jsx` — the `DragOverlay` was trying to render it but failing silently
- The `...style` spread from `CSS.Translate.toString(transform)` was missing from the card div — without this the card had no idea where to move during drag
- `cursor: 'Grab'` was written with a capital G which is invalid in React inline styles — it must be lowercase `'grab'`
- A non-existent icon `Grab` was imported from `lucide-react` causing a silent error

**Fix applied:**
- Added `import TaskCard from './TaskCard'` at the top of `Board.jsx`
- Added `...style` spread into the main card div style object
- Fixed cursor value to lowercase `'grab'`
- Removed `Grab` from lucide-react imports

**Lesson learned:**
When drag and drop does not work, always check that the draggable component is properly imported wherever `DragOverlay` is used. Also always verify that transform styles are properly spread into the element style.

---

### 3. Remote Origin Already Exists Error
**Error message:**
```
error: remote origin already exists
```

**Fix applied:**
```cmd
git remote remove origin
git remote add origin https://github.com/sakshirawat1611/kanban-board.git
git push -u origin main
```

---

### 4. GitHub Repository Not Found Error
**Error message:**
```
remote: Repository not found
fatal: repository not found
```

**Cause:** The GitHub repository had not been created before running `git push`.

**Fix applied:** Used GitHub CLI to create the repository directly from CMD:
```cmd
gh repo create kanban-board --public --source=. --remote=origin --push
```
### 5. camelCase Naming Confusion

During the early stages of development, I faced confusion with camelCase naming conventions in React. Function names and variable names were occasionally written incorrectly — for example writing Addtask instead of addTask, Deletetask instead of deleteTask and DarkMode instead of darkMode. Since JavaScript is case sensitive, these mistakes caused silent bugs where functions were not being recognized. Over time, strictly following camelCase across all variables, functions and state names became a habit.


---

## Project Structure

```
kanban-board/
├── public/
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js v18 or higher

### Installation

```cmd
git clone https://github.com/sakshirawat1611/kanban-board.git
cd kanban-board
npm install
npm run dev
```

Open browser and go to:
```
http://localhost:5173
```

---

## Git and Deployment

- All Git operations were performed through **Windows CMD**
- GitHub CLI (`gh`) was installed using `winget install GitHub.cli`
- Repository was created and pushed entirely through CMD without using the GitHub website
- Deployed on **Vercel** with automatic redeployment on every GitHub push

---

## Author

**Sakshi Rawat**
GitHub: [sakshirawat1611](https://github.com/sakshirawat1611)
