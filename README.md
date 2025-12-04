# Kanban Sticky Notes Board

A modern, feature-rich task management application built with vanilla HTML, CSS, and JavaScript. Organize and track your tasks across three columns using an intuitive drag-and-drop interface with automatic browser storage. The application features a sleek dark/light theme with cyberpunk aesthetics, real-time clock display, Google Calendar integration, and comprehensive time tracking.

**Current Version:** 3.0.0

**Live Demo:** [https://thechillbasu.github.io/Kanban-Sticky-Notes/](https://thechillbasu.github.io/Kanban-Sticky-Notes/)

## Features

### Task Management
- Drag-and-drop task organization across To Do, In Progress, and Done columns
- Priority levels (High, Medium, Low) with visual color-coded badges
- Task descriptions with rich text support
- Due dates with color-coded urgency indicators (overdue, urgent, upcoming)
- Automatic sorting by priority within each column

### Time Tracking
- Automatic timer for tasks moved to In Progress column
- Real-time elapsed time display for active tasks
- Total time spent tracking across multiple sessions
- Completion time display for finished tasks

### User Interface
- Modern dark/light theme toggle with cyberpunk neon aesthetics
- Live clock capsule displaying current time and date
- Responsive design optimized for desktop, tablet, and mobile devices
- Smooth animations and visual feedback for all interactions
- Custom styled scrollbars with color-coded accents
- Enhanced modal dialogs with improved scrolling behavior
- Empty state messages and helpful UI hints

### Google Calendar Integration
- View public holiday calendar in an embedded iframe
- Connect your Google Calendar account via OAuth 2.0 for personal events
- View upcoming calendar events in a side panel
- Read-only access to your primary calendar
- Event details including title, date, time, and location
- Improved iframe styling with glowing borders and hover effects
- Better visibility for event items in both dark and light modes

### Data Persistence
- Automatic localStorage persistence for all tasks
- Data migration support for backward compatibility
- Storage availability detection with user warnings

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local development server)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd KanbanStickyNotes-SimpleCopy
```

2. Open the application in your browser:

Option 1: Direct file access
- Open `index.html` directly in your browser

Option 2: Local server (recommended)
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser

### Production Deployment

The application is deployed on GitHub Pages and accessible at:
[https://thechillbasu.github.io/Kanban-Sticky-Notes/](https://thechillbasu.github.io/Kanban-Sticky-Notes/)

## Project Structure

```
KanbanStickyNotes-SimpleCopy/
├── index.html                     # Main HTML entry point
├── src/
│   ├── css/                       # Modular CSS files
│   │   ├── variables.css          # Design tokens and CSS variables
│   │   ├── base.css               # Base styles and global layout
│   │   ├── headerBase.css         # Header container and components
│   │   ├── headerCalendar.css     # Google Calendar integration styles
│   │   ├── headerThemes.css       # Light mode theme overrides
│   │   ├── headerResponsive.css   # Responsive media queries
│   │   ├── form.css               # Task creation form styles
│   │   ├── board.css              # Kanban board layout with custom scrollbars
│   │   ├── cards.css              # Task card styles and interactions
│   │   ├── priority.css           # Priority badge styles
│   │   ├── modalBase.css          # Base modal styles with custom scrollbars
│   │   ├── detailsViewerModal.css # Task details viewer modal
│   │   ├── detailsEditorModal.css # Task editor modal
│   │   └── utilities.css          # Utility classes and helpers
│   └── js/                        # JavaScript modules
│       ├── main.js                # Application orchestration
│       ├── notes.js               # Notes state and CRUD operations
│       ├── rendering.js           # DOM rendering and element creation
│       ├── modals.js              # Modal dialogs management
│       ├── formatters.js          # Date and time formatting utilities
│       ├── storage.js             # localStorage management
│       ├── dragDrop.js            # Drag and drop functionality
│       ├── timer.js               # Time tracking system
│       ├── theme.js               # Theme switching
│       ├── headerWidgets.js       # Live clock widget
│       └── googleCalendar.js      # Google Calendar OAuth integration
├── package.json
├── CHANGELOG.md
├── LICENSE
└── README.md
```

## How to Use

### Creating Tasks
1. Enter task text in the input field at the top
2. Select a priority level (High, Medium, or Low)
3. Choose the initial column (To Do, In Progress, or Done)
4. Click "Add Note" to open the task editor modal
5. Add optional description and due date
6. Click "Add Task" to create the task

### Managing Tasks
- **Move Tasks**: Click and drag any task card between columns
- **Edit Task**: Click the edit icon (pencil) on any task card
- **View Details**: Click anywhere on a task card to view full details
- **Delete Task**: Click the delete icon (trash) on any task card

### Time Tracking
- Tasks automatically start tracking time when moved to In Progress
- The timer displays elapsed time in real-time (HH:MM:SS format)
- Time accumulates across multiple sessions
- Completed tasks show total time spent in a human-readable format

### Google Calendar
1. Click "Connect Google" button in the header
2. Authorize the application to access your calendar
3. Click "My Calendar" to view upcoming events
4. Events are displayed with title, date, time, and location

### Theme Switching
- Click the theme toggle button in the header to switch between dark and light modes
- Your preference is automatically saved and persists across sessions

## Technical Details

### Architecture
The application follows a modular architecture with clear separation of concerns:
- **State Management**: Centralized notes state in `notes.js`
- **Rendering**: DOM manipulation isolated in `rendering.js`
- **Modals**: Dialog management in `modals.js`
- **Formatting**: Date/time utilities in `formatters.js`
- **Orchestration**: Main application logic in `main.js`

### Browser Compatibility
Works in all modern browsers that support:
- HTML5 Drag and Drop API
- ES6 Modules
- localStorage API
- CSS Grid and Flexbox
- CSS Custom Properties (CSS Variables)

### Storage
All task data is stored locally in the browser's localStorage. No data is sent to external servers except when using Google Calendar integration (which requires explicit user authorization).

## Development

### Running Tests
```bash
npm test
```

### Code Style
- JavaScript: camelCase for variables and functions, PascalCase for classes
- CSS: kebab-case for class names, camelCase for CSS variables
- Comments: Simple single-line or multi-line block comments
- Consistent 2-space indentation throughout

## License

This project is open source and available for educational use. See the LICENSE file for details.

## Contributing

Contributions are welcome. Please ensure your code follows the existing style guidelines and includes appropriate comments.
