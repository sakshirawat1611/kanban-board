# Prompts.md — Development Journal & AI Assistance Log

This file documents the prompts used, the learning journey, challenges faced,
and the resources that helped during the development of this Kanban Task Board project.

---

## How I Used AI Assistance

I approached this project differently from just copy-pasting code.
Instead of asking the AI to write everything for me, I asked it to act as a
**strict mentor** — guiding me step by step, explaining concepts, telling me
what to do and where to do it, and making me understand the reasoning behind
every decision.

My key rule throughout this project:
> "Do not give me the full code. Tell me what to do, where to add it, and why."

---

## Mentorship Approach

### Prompt 1 — Setting the Tone
> "I want you to be my mentor and guide me throughout the project.
> Suggest me some YouTube links in the middle to understand each and every concept.
> Do not just give me code — tell me what to do step by step."

This set the foundation. Instead of receiving a dump of code,
I received a structured roadmap with Day 1 through Day 6 planning,
concept explanations, and guided instructions.

---

### Prompt 2 — YouTube Resources Request
> "Tell me YouTube links for each concept so I can understand before coding."

I specifically asked for YouTube resources for:
- Vite + React Setup
- useState Hook
- Props and Components
- useEffect Hook
- localStorage in React
- Drag and Drop with dnd-kit

The AI suggested channels like Web Dev Simplified, Codevolution,
The Net Ninja, Traversy Media and Fireship.

However several links were unavailable or outdated.
I then took the AI mentor's advice and referred to the
**official React documentation at react.dev** which proved
more reliable than any YouTube video.

---

### Prompt 3 — Key Concepts Request
> "Before we write any code, explain the key concepts I need to understand."

The AI explained the following core concepts before any coding began:

**Component Architecture**
Understanding that a React app is made of reusable building blocks.
Each piece of UI is a component. I learned that Board contains Columns
and Columns contain TaskCards — a clear parent-child relationship.

**useState Hook**
The most important concept of this project.
useState is like a whiteboard — when you update it, React automatically
updates the UI. I spent considerable time understanding this because
my initial instinct was to use document.getElementById like vanilla JS.
The mentor repeatedly reminded me:
> "We no longer manipulate the DOM directly. You update the State, the DOM reacts."

**Prop Drilling**
This concept took me the longest to understand.
Functions like deleteTask, moveTask and editTask are defined in Board.jsx
but needed inside TaskCard.jsx. They had to travel through Column.jsx
in the middle — this is prop drilling and it was genuinely confusing at first.

I spent multiple sessions just understanding why a function defined
in one file needs to be passed as a prop through another file
just to reach the final destination component.

**useEffect Hook**
Used for localStorage persistence.
Understanding the dependency array `[tasks]` and why the lazy initializer
`useState(() => {})` is used instead of `useState(value)` took time.

**Array Methods for State**
The three patterns I had to master:
- Adding: spread operator `[...tasks, newTask]`
- Deleting: `.filter()`
- Updating: `.map()`

---

## Additional Learning Resources

### Code With Harry — YouTube Channel
I regularly referred to **Code With Harry** on YouTube throughout this project.
His Hindi explanations of React concepts made things significantly clearer
especially when English documentation felt too technical.

Key videos I watched:
- React JS Tutorial series
- JavaScript array methods explained in Hindi
- Understanding props and state in React

### My Brother — Daily 1 Hour React Sessions
One of the biggest supports in this project was my brother who taught me
React on a daily basis for 1 hour every day.

Topics he covered with me personally:
- How React renders components
- Why we use useState instead of regular variables
- The concept of one-way data flow in React
- How to read and understand error messages in the browser
- The difference between props and state
- Why functions need to be passed down as props

His daily sessions gave me the foundation needed to understand
what the AI mentor was asking me to implement.

---

## Development Process — CMD Usage

Throughout this project I used **Windows Command Prompt (CMD)**
for all development tasks instead of VS Code's integrated terminal.

### CMD Commands Used Regularly:

**Project Setup:**
```cmd
npm create vite@latest kanban-board -- --template react
cd Desktop\kanban-board
npm install
npm run dev
```

**Checking Localhost Status:**
After every single change I checked `http://localhost:5173` in the browser
and monitored CMD for any errors or warnings printed by Vite.

**Package Installation:**
```cmd
npm install lucide-react
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

**Creating Files and Folders:**
```cmd
mkdir src\components
echo. > src\components\Board.jsx
echo. > src\components\Column.jsx
echo. > src\components\TaskCard.jsx
```

**GitHub CLI Installation:**
```cmd
winget install GitHub.cli
gh auth login
gh repo create kanban-board --public --source=. --remote=origin --push
```

**Git Operations:**
```cmd
git init
git add .
git commit -m "feat: kanban board complete"
git branch -M main
git remote add origin https://github.com/sakshirawat1611/kanban-board.git
git push -u origin main
```

---

## Challenges and Problems Faced

### Challenge 1 — Import Errors (Most Frequent Problem)

This was the error I faced the most throughout the entire project.

**Error:**
```
PARSE_ERROR: Identifier 'X' has already been declared
```

**What happened:**
Every time I needed to add a new icon or hook, I wrote a brand new import line
instead of adding to the existing one. This caused the same variable to be
declared twice which React cannot handle.

**Files where this happened:**
- `TaskCard.jsx` — happened twice with lucide-react icons
- `Board.jsx` — happened with both lucide-react and react imports

**Time spent:** This error alone cost me significant time across multiple sessions.

**Fix:**
Delete all duplicate import lines and combine into one single import line.

**Golden rule I learned:**
> Always press Ctrl + F and search for the package name before adding a new import.
> If it already exists — add to that line. Never create a second import line
> from the same package.

---

### Challenge 2 — Prop Drilling Confusion

Understanding props took me considerable time and was genuinely difficult.

**What confused me:**
Why does a function defined in Board.jsx need to pass through Column.jsx
just to reach TaskCard.jsx? Why can't TaskCard.jsx just use it directly?

**How I understood it:**
My brother explained it with a real life analogy — it is like passing
a message through a chain of people. The manager gives instructions to
the team lead who passes them to the employee.
The employee cannot directly call the manager without going through the chain.

**Time spent:** Multiple daily sessions with my brother were dedicated
to just understanding this one concept.

---

### Challenge 3 — Drag and Drop (Phase 3) — Biggest Bug

This was the most frustrating and time consuming problem of the entire project.

**Problem:**
Cards would not drag at all even after installing dnd-kit and
writing all the required code.

**Multiple root causes found:**

1. `TaskCard` was not imported in `Board.jsx`
   The DragOverlay needed it but was failing silently without any clear error.

2. `...style` spread was missing from the card div
   Without this the transform values from dnd-kit had nowhere to go
   so the card stayed frozen in place during drag.

3. `cursor: 'Grab'` had a capital G
   React inline styles are case sensitive. It must be lowercase `'grab'`.

4. Non-existent icon `Grab` was imported from lucide-react
   This icon does not exist in the library and caused a silent failure.

**Time spent:** This phase took multiple troubleshooting sessions to resolve.

**How it was fixed:**
Went through every single file systematically — imports, function definitions,
component props, and div attributes — until all four issues were identified and fixed.

**Lesson learned:**
When drag and drop does not work, check in this order:
1. Is the component imported where DragOverlay renders it?
2. Is `...style` spread into the draggable element?
3. Are `{...attributes}` and `{...listeners}` on the draggable div?
4. Is `ref={setNodeRef}` on both draggable and droppable elements?

---

### Challenge 4 — Git Remote Errors

**Errors faced:**
```
error: remote origin already exists
remote: Repository not found
```

**Cause:**
Tried to push before creating the GitHub repository.
Also ran git remote add twice which caused the duplicate remote error.

**Fix:**
```cmd
git remote remove origin
git remote add origin https://github.com/sakshirawat1611/kanban-board.git
git push -u origin main
```

---

### Challenge 5 — Vite Command Typo

**Error:**
```
npm error 404 Not Found - create-vit@latest not found
```

**Cause:** Typed `vit` instead of `vite` in the command.

**Fix:** Re-ran the correct command:
```cmd
npm create vite@latest kanban-board -- --template react
```

---
"I faced confusion with camelCase naming conventions throughout the project — writing Addtask instead of addTask and DarkMode instead of darkMode — and when I raised this with my AI mentor, the response was straightforward: camelCase is not optional in JavaScript, you simply have to get used to it and make it a habit."
## Prompts That Guided Key Decisions

> "I want professional icons not emojis — from now on do not use emoji icons"

This led to integrating Lucide React with professional icons like
Flame, AlertTriangle, ArrowDown, ClipboardList, Loader and CheckCircle.

> "I want dark mode and light mode along with reset button
> and I want my navbar with #03044a colour"

This shaped the entire visual identity of the app including
the sticky dark navy navbar, smooth transitions and column colour theming.

> "I want to remove dark mode and light mode text inside the button
> and make the website responsive"

This led to icon-only toggle buttons with tooltip titles
and a full CSS responsive system using media queries for
768px tablet and 480px mobile breakpoints.

> "I want the column to hover while touching or cursor pointing"

This added the `translateY(-4px)` lift effect with box-shadow
on column hover for a polished professional feel.

> "Tell me exactly where to add this code — not the whole file"

From a certain point in the project I specifically asked the mentor
to stop rewriting entire files and instead tell me exactly which line
to find and what to add or change. This forced me to read and understand
my own code rather than just replacing it.

---

## Key Concepts Mastered Through This Project

| Concept | Where Used |
|---|---|
| Component Architecture | Board, Column, TaskCard separation |
| useState | Tasks, input, priority, search, darkMode, activeTask |
| Prop Drilling | deleteTask, moveTask, editTask passed through Column to TaskCard |
| useEffect | localStorage sync on every task change |
| Array Methods | filter for delete and search, map for move and edit, spread for add |
| Conditional Rendering | isEditing toggle, column arrow buttons, empty state |
| CSS Media Queries | Responsive layout for mobile and tablet |
| dnd-kit | Drag and drop between columns |
| localStorage | State persistence across hard refreshes |
| camelCase Convention | All variables and functions throughout the project |

---

## Tools and Environment

- **Editor:** Visual Studio Code
- **Runtime:** Node.js v24.16.0
- **Package Manager:** npm
- **Command Line:** Windows Command Prompt (CMD)
- **Version Control:** Git + GitHub CLI
- **Deployment:** Vercel
- **Browser Testing:** Google Chrome at localhost:5173

---

## Author

**Sakshi Rawat**
GitHub: [sakshirawat1611](https://github.com/sakshirawat1611)
