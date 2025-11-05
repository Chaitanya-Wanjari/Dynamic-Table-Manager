# Dynamic Data Table Manager  
A fully interactive and customizable data table built with **Next.js, Redux Toolkit, and Material UI**, featuring dynamic columns, CSV import/export, inline editing, theme toggling, and more.  
This project demonstrates real-world frontend skills in state management, dynamic UI rendering, and data interaction.

## Features

### **Core Functionality**
| Feature | Description |
|--------|-------------|
| **Data Table View** | Displays user data (Name, Email, Age, Role) in a clean and responsive UI |
| **Sorting** | Click any column header to toggle ascending/descending sorting |
| **Global Search** | Search across all fields in real-time |
| **Pagination** | Client-side pagination (10 rows per page) with smooth navigation |

### **Dynamic Columns**
- Add new custom fields (e.g., _Department, Location_)
- Show/Hide any existing column using a **Manage Columns** panel
- Changes persist using **Redux Persist / LocalStorage**

### **CSV Import & Export**
| Action | Behavior |
|-------|----------|
| **Import** | Upload `.csv` → parsed using PapaParse with validation |
| **Export** | Export current table view to CSV (only visible columns included) |

### **Bonus Enhancements**
1) Inline row editing (double click → edit → Save/Cancel)  
2) Row actions: Edit & Delete with confirmation dialog  
3) Dark/Light Mode Theme Switcher (MUI Theme Provider)  
4) Column reorder via drag-and-drop  
5) Fully responsive (Mobile, Tablet, Desktop)  
6) Smooth UI animations using **Framer Motion**  
7) Modern professional UI styling  


##  Tech Stack

| Category | Tools Used |
|---------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI Library | Material UI (MUI v5) |
| State Management | Redux Toolkit + Redux Persist |
| CSV Handling | PapaParse, FileSaver.js |
| Animations | Framer Motion |
| Forms | React Hook Form |


## 📂 Project Structure

src/
├── app/
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── DataTable.tsx
│ ├── ManageColumnsModal.tsx
│ ├── ImportExportButtons.tsx
│ └── ThemeToggle.tsx
├── store/
│ ├── index.ts
│ └── tableSlice.ts
└── utils/
└── utils.ts


## Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

cd dynamic-table-manager

# Install dependencies
npm install

# Disable Turbopack (recommended for stability)
echo "module.exports = { experimental: { turbo: false } }" > next.config.js

# Start development server
npm run dev

Open in browser →
http://localhost:3000

CSV Format

Required headers: name,email,age,role

Example Upload File:
John Doe,john@example.com,29,Developer
Sarah Lee,sarah.lee@example.com,31,Analyst

UI Highlights

1) Clean dashboard-style layout

2) Sticky animated AppBar that shrinks on scroll

3) Smooth fade/slide transitions across components

4) Accessible and keyboard-friendly table navigation

## 🌐 Live Demo
https://dynamic-table-manager-4fizsqmey.vercel.app

