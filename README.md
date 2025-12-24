# Student Catalog SPA

A single-page application built with React JS and Bootstrap that displays a catalog of students with detail pages for each student.

## Features

- **Catalog View**: Displays students in a responsive Bootstrap grid layout
- **Pagination**: Shows first 10 students initially, with "See More" button to load additional students
- **Student Cards**: Each card displays student image, name, group, year, and GPA
- **Detail View**: Click on any student card to view detailed information
- **Navigation**: Easy navigation between list and detail views

## Tech Stack

- React JS (functional components + hooks)
- React Router DOM for navigation
- Bootstrap 5 (via CDN) for styling
- Create React App

## Project Structure

```
src/
├── data/
│   └── students.js          # Student data array
├── components/
│   ├── StudentList.jsx      # Catalog/list view component
│   ├── StudentCard.jsx      # Individual student card component
│   └── StudentDetail.jsx    # Student detail page component
├── App.jsx                  # Main application component with routing
├── App.css                  # App-specific styles
├── index.js                 # Application entry point
└── index.css                # Global styles
```

## Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Implementation Details

### Pagination ("See More") Implementation

The pagination feature is implemented in the `StudentList` component using React's `useState` hook:

- **Initial State**: The component maintains a `displayCount` state initialized to 10
- **Display Logic**: Only the first `displayCount` students from the array are displayed using `students.slice(0, displayCount)`
- **See More Button**: 
  - The button appears when `displayCount < students.length` (there are more students to show)
  - When clicked, it increments `displayCount` by 10 (STUDENTS_PER_PAGE constant)
  - After showing 20 students (second batch), the button automatically disappears since all students are displayed
- **No External Libraries**: Uses pure React state management, no pagination libraries required

### Navigation to Detail Page Implementation

Navigation is implemented using `react-router-dom`:

- **Routing Setup**: The `App.jsx` component uses `BrowserRouter` to set up routing
- **Routes**:
  - `/` - Shows the StudentList component (catalog view)
  - `/students/:id` - Shows the StudentDetail component for a specific student
- **Navigation from Cards**: 
  - Each `StudentCard` uses the `useNavigate` hook from react-router-dom
  - When a card is clicked, it calls `navigate(\`/students/${student.id}\`)` to navigate to the detail page
- **Back Navigation**: 
  - The `StudentDetail` component includes a "Back to List" button
  - Uses `navigate('/')` to return to the catalog view
- **URL-based Navigation**: The detail page URL includes the student ID, making it shareable and bookmarkable

## Student Data Structure

Each student object contains:
- `id`: Unique identifier
- `image`: URL to student's image
- `fullName`: Student's full name
- `group`: Student's group (e.g., "CS-101")
- `year`: Year of study
- `gpa`: Grade Point Average

## Bootstrap Classes Used

- **Layout**: `container`, `row`, `col-md-6`, `col-lg-4`, `col-md-8`
- **Cards**: `card`, `card-body`, `card-title`, `card-text`, `card-img-top`
- **Buttons**: `btn`, `btn-primary`, `btn-secondary`, `btn-lg`
- **Spacing**: `mt-3`, `mt-4`, `mb-3`, `mb-4`
- **Images**: `img-fluid`, `rounded`
- **Responsive**: Bootstrap's responsive grid system ensures cards adapt to different screen sizes

## Deployment

To build for production:
```bash
npm run build
```

The `build` folder contains the optimized production build ready for deployment to platforms like Vercel, Netlify, or any static hosting service.

