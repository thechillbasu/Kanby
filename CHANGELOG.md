# Changelog

All notable changes to the Kanban Sticky Notes project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## For New Users

**Current Version:** 2.0.0

If you're new to this project, version 2.0.0 includes everything you need:
- Complete Kanban board with drag-and-drop
- Priority-based task sorting
- Real-time timer tracking for in-progress tasks
- Comprehensive date and time information
- Dark mode support
- Mobile-friendly responsive design

Simply open `index.html` in your browser to get started. No installation or setup required.

---

## [2.0.0] - 2025-12-01

**Major Release: Enhanced Task Management**

This release introduces comprehensive task tracking capabilities, making it easier to manage priorities, track time spent on tasks, and maintain detailed records of your workflow.

### Added

**Priority Management**
- Automatic task sorting by priority level (HIGH, MEDIUM, LOW) within each column
- Color-coded priority badges with distinct visual styling for quick identification
- Tasks now automatically organize with high-priority items at the top

**Time Tracking**
- Real-time timer for tasks in the "In Progress" column
- Timer displays in digital format (HH:MM:SS) and updates every second
- Automatic timer start when moving tasks to "In Progress"
- Automatic timer stop when moving tasks to "Done"
- Completion summary showing total time spent (e.g., "2 hours 15 minutes 30 seconds")

**Enhanced Date & Time Information**
- Full timestamp display including day of week (e.g., "Monday, December 1, 2025 at 2:30 PM")
- Creation date shown for tasks in "To Do" column
- Completion date shown for tasks in "Done" column
- Clear indication of when tasks were added and completed

**Technical Additions**
- New timer management module (`js/timer.js`) for reliable time tracking
- Project configuration file (`package.json`) for better project management
- Comprehensive changelog documentation for version tracking

### Changed
- Note layout redesigned to prevent priority badge overlap with content
- Timestamp formatting enhanced to include full day and date information
- CSS styling improved for better visual hierarchy and readability
- Timer displays now use monospace font for improved legibility
- Priority badges feature distinct colors and borders for each level
- Note element structure reorganized for optimized rendering

### Fixed
- Priority badge positioning to eliminate content overlap
- Timer format consistency across all displays (HH:MM:SS)
- Dark mode styling for priority badges and timestamp elements

### Technical Details

**New Files:**
- `js/timer.js` - Timer management system and formatting utilities
- `package.json` - Project metadata and configuration
- `CHANGELOG.md` - Version history and release notes

**Modified Files:**
- `js/main.js` - Priority sorting logic, timer integration, enhanced rendering
- `js/dragDrop.js` - Event dispatching for component re-renders
- `style.css` - Styling for priority badges, timers, and timestamps
- `index.html` - Updated DOM structure

## [1.0.0] - Initial Release

**Foundation Release: Core Kanban Functionality**

The initial version provides a fully functional Kanban board with essential task management features and a clean, intuitive interface.

### Core Features

**Board & Task Management**
- Three-column Kanban board layout (To Do, In Progress, Done)
- Drag-and-drop functionality to move tasks between columns
- Create new tasks with a simple form
- Edit existing tasks by clicking on them
- Delete tasks with a single click
- Priority level assignment (High, Medium, Low) with flag icons

**User Experience**
- Sticky note aesthetic design for a familiar, tactile feel
- Column-specific color coding (yellow for To Do, blue for In Progress, green for Done)
- Dark mode support with easy theme toggle
- Responsive design that works on mobile phones, tablets, and desktop computers
- Empty state message when no tasks exist
- Smooth animations and visual feedback

**Data & Storage**
- Automatic saving to browser's local storage
- Tasks persist between browser sessions
- Storage availability detection
- Warning message if browser doesn't support local storage

**Task Information**
- Creation timestamp for each task
- Visual priority indicators
- Task text with word wrapping for longer descriptions

### Technical Implementation
- Built with vanilla JavaScript (no frameworks required)
- ES6 modules for clean code organization
- Event delegation for optimal performance
- CSS custom properties for easy theming
- localStorage API for client-side data persistence
- No build process or compilation needed

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage support
