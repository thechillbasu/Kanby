import { loadNotes, saveNotes, isStorageAvailable } from './storage.js';
import { initDragAndDrop } from './dragDrop.js';
import { TimerManager, formatElapsedTime, formatCompletedTime } from './timer.js';

let notes = [];
let timerManager = new TimerManager();

export function init() {
  notes = loadNotes();
  renderNotes(notes);
  updateEmptyState();
  
  // Initialize timers for notes in progress
  initializeTimers();
  
  // Start the timer update loop
  timerManager.startUpdateLoop(updateTimerDisplays);
  
  if (!isStorageAvailable()) {
    showStorageWarning();
  }
  
  document.getElementById('addNoteForm').addEventListener('submit', handleFormSubmit);
  // event delegation for delete and edit buttons
  document.querySelector('.board').addEventListener('click', handleButtonClick);
  
  // Listen for notes updates from drag and drop
  window.addEventListener('notesUpdated', () => {
    notes = loadNotes();
    renderNotes(notes);
    initializeTimers();
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const noteInput = document.getElementById('noteText');
  const prioritySelect = document.getElementById('prioritySelect');
  const columnSelect = document.getElementById('columnSelect');

  const text = noteInput.value.trim();
  const priority = prioritySelect.value;
  const column = columnSelect.value;

  if (text.length === 0) {
    noteInput.classList.add('invalidInput');
    setTimeout(() => noteInput.classList.remove('invalidInput'), 500);
    return;
  }
  
  // Open modal to add description for new task
  openTaskModal(null, text, column, priority);
  noteInput.value = '';
  prioritySelect.value = 'medium';
}

export function addNote(text, column, priority = 'medium', description = '') {
  const newNote = {
    id: Date.now(),               // unique id
    text: text,
    description: description,
    column: column,
    priority: priority,
    createdAt: Date.now(),
    lastEditedAt: null,
    startedAt: null,
    completedAt: null,
    timeSpent: 0
  };

  notes.push(newNote);
  saveNotes(notes);
  renderNotes(notes);
  updateEmptyState();
}

function handleButtonClick(event) {
  // Handle delete button
  const deleteBtn = event.target.closest('.deleteBtn');
  if (deleteBtn) {
    const noteElement = deleteBtn.closest('.stickyNote');
    const noteId = parseInt(noteElement.getAttribute('data-note-id'));
    deleteNote(noteId);
    return;
  }
  
  // Handle edit button
  const editBtn = event.target.closest('.editBtn');
  if (editBtn) {
    const noteElement = editBtn.closest('.stickyNote');
    const noteId = parseInt(noteElement.getAttribute('data-note-id'));
    const note = notes.find(n => n.id === noteId);
    if (note) {
      openTaskModal(note);
    }
    return;
  }
}

export function deleteNote(noteId) {
  // Stop timer if running
  timerManager.stopTimer(noteId);
  
  notes = notes.filter(note => note.id !== noteId);
  saveNotes(notes);
  renderNotes(notes);
  updateEmptyState();
}

function openTaskModal(note = null, taskText = '', taskColumn = 'todo', taskPriority = 'medium') {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'taskModal';
  modal.innerHTML = `
    <div class="modalContent">
      <div class="modalHeader">
        <h2>${note ? 'Edit Task' : 'Add Task Details'}</h2>
        <button class="modalClose">&times;</button>
      </div>
      <div class="modalBody">
        <div class="formGroup">
          <label for="modalTaskName">Task Name *</label>
          <input type="text" id="modalTaskName" value="${note ? note.text : taskText}" required>
        </div>
        <div class="formGroup">
          <label for="modalTaskDescription">Description</label>
          <textarea id="modalTaskDescription" rows="4" placeholder="Add task description...">${note ? (note.description || '') : ''}</textarea>
        </div>
        <div class="formGroup">
          <label for="modalTaskPriority">Priority</label>
          <select id="modalTaskPriority">
            <option value="high" ${(note ? note.priority : taskPriority) === 'high' ? 'selected' : ''}>High</option>
            <option value="medium" ${(note ? note.priority : taskPriority) === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="low" ${(note ? note.priority : taskPriority) === 'low' ? 'selected' : ''}>Low</option>
          </select>
        </div>
        ${note && note.lastEditedAt ? `
          <div class="lastEdited">
            Last edited: ${formatTimestamp(note.lastEditedAt)}
          </div>
        ` : ''}
      </div>
      <div class="modalFooter">
        <button class="btnCancel">Cancel</button>
        <button class="btnSave">${note ? 'Save Changes' : 'Add Task'}</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Focus on task name input
  const taskNameInput = modal.querySelector('#modalTaskName');
  taskNameInput.focus();
  taskNameInput.select();
  
  // Event listeners
  const closeBtn = modal.querySelector('.modalClose');
  const cancelBtn = modal.querySelector('.btnCancel');
  const saveBtn = modal.querySelector('.btnSave');
  
  const closeModal = () => {
    modal.remove();
  };
  
  const saveTask = () => {
    const newText = taskNameInput.value.trim();
    const newDescription = modal.querySelector('#modalTaskDescription').value.trim();
    const newPriority = modal.querySelector('#modalTaskPriority').value;
    
    if (newText.length === 0) {
      taskNameInput.classList.add('invalidInput');
      setTimeout(() => taskNameInput.classList.remove('invalidInput'), 500);
      return;
    }
    
    if (note) {
      // Update existing note
      note.text = newText;
      note.description = newDescription;
      note.priority = newPriority;
      note.lastEditedAt = Date.now();
      saveNotes(notes);
      renderNotes(notes);
    } else {
      // Create new note
      addNote(newText, taskColumn, newPriority, newDescription);
    }
    
    closeModal();
  };
  
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', saveTask);
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function escapeHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  });
  
  // Save on Enter in task name field
  taskNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTask();
    }
  });
}

export function createNoteElement(note) {
  const noteDiv = document.createElement('div');
  noteDiv.className = `stickyNote column-${note.column}`;
  noteDiv.setAttribute('data-note-id', note.id);
  
  // Add priority badge (absolute positioned at top-left)
  if (note.priority) {
    const priorityBadge = createPriorityBadge(note.priority);
    noteDiv.appendChild(priorityBadge);
  }
  
  // Add edit button (absolute positioned at top-right, before delete)
  const editBtn = document.createElement('button');
  editBtn.className = 'editBtn';
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.title = 'Edit task';
  noteDiv.appendChild(editBtn);
  
  // Add delete button (absolute positioned at top-right)
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.title = 'Delete task';
  noteDiv.appendChild(deleteBtn);
  
  // Add main text
  const textP = document.createElement('p');
  textP.className = 'noteText';
  textP.textContent = note.text;
  
  // Add description indicator if description exists
  if (note.description && note.description.trim().length > 0) {
    const descIndicator = document.createElement('span');
    descIndicator.className = 'descriptionIndicator';
    descIndicator.innerHTML = '<i class="fas fa-align-left"></i>';
    descIndicator.title = 'Has description';
    textP.appendChild(descIndicator);
  }
  
  noteDiv.appendChild(textP);
  
  // Add timestamp display for To Do column
  if (note.column === 'todo' && note.createdAt) {
    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'noteTimestamp';
    timestampDiv.textContent = formatTimestamp(note.createdAt);
    noteDiv.appendChild(timestampDiv);
  }
  
  // Add timer display for In Progress column
  if (note.column === 'inprogress' && note.startedAt) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timerDisplay';
    // Calculate elapsed time from startedAt timestamp
    const elapsedTime = Date.now() - note.startedAt;
    timerDiv.textContent = `⏱ ${formatElapsedTime(elapsedTime)}`;
    noteDiv.appendChild(timerDiv);
  }
  
  // Add time display for Done column
  if (note.column === 'done') {
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'completedTimeDisplay';
    timeDisplay.textContent = `Completed in ${formatCompletedTime(note.timeSpent)}`;
    noteDiv.appendChild(timeDisplay);
    
    // Add completion date
    if (note.completedAt) {
      const completedDateDiv = document.createElement('div');
      completedDateDiv.className = 'completedDate';
      completedDateDiv.textContent = `on ${formatTimestamp(note.completedAt)}`;
      noteDiv.appendChild(completedDateDiv);
    }
  }
  
  return noteDiv;
}

export function createPriorityBadge(priority) {
  const badge = document.createElement('span');
  badge.className = `priorityBadge priority-${priority}`;
  badge.setAttribute('data-priority', priority);
  
  // Display text label based on priority
  const labels = {
    high: 'HIGH',
    medium: 'MED',
    low: 'LOW'
  };
  
  badge.textContent = labels[priority] || 'MED';
  
  return badge;
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  
  // Format: Monday, Dec 1, 2025 at 2:30 PM
  const dayOfWeek = date.toLocaleDateString('en-US', { 
    weekday: 'long'
  });
  
  const dateStr = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  return `${dayOfWeek}, ${dateStr} at ${timeStr}`;
}

export function renderNotes(notesToRender) {
  const todoContainer = document.querySelector('#todo .notesContainer');
  const inprogressContainer = document.querySelector('#inprogress .notesContainer');
  const doneContainer = document.querySelector('#done .notesContainer');

  // clear existing
  todoContainer.innerHTML = '';
  inprogressContainer.innerHTML = '';
  doneContainer.innerHTML = '';
  
  // Sort notes by priority (high > medium > low)
  const sortedNotes = sortNotesByPriority(notesToRender);
  
  sortedNotes.forEach(note => {
    const noteElement = createNoteElement(note);

    if (note.column === 'todo') {
      todoContainer.appendChild(noteElement);
    } else if (note.column === 'inprogress') {
      inprogressContainer.appendChild(noteElement);
    } else if (note.column === 'done') {
      doneContainer.appendChild(noteElement);
    }
  });

  initDragAndDrop(); // re-enable drag/drop after DOM updated
}

function sortNotesByPriority(notesToSort) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  
  return [...notesToSort].sort((a, b) => {
    const priorityA = priorityOrder[a.priority] || 2;
    const priorityB = priorityOrder[b.priority] || 2;
    return priorityA - priorityB;
  });
}

export function updateEmptyState() {
  const emptyState = document.getElementById('emptyState');
  if (notes.length > 0) {
    emptyState.style.display = 'none';
  } else {
    emptyState.style.display = 'block';
  }
}

function showStorageWarning() {
  const warning = document.createElement('div');
  warning.className = 'storageWarning';
  warning.innerHTML =
    '<p><i class="fas fa-exclamation-triangle"></i> Warning: Your notes will not be saved.</p>';

  const container = document.querySelector('.container');
  container.insertBefore(warning, container.firstChild);
}

export function getNotes() {
  return notes;
}

export function setNotes(newNotes) {
  notes = newNotes;
}

/**
 * Initialize timers for all notes currently in progress
 */
function initializeTimers() {
  notes.forEach(note => {
    if (note.column === 'inprogress' && note.startedAt) {
      timerManager.startTimer(note.id, note.startedAt);
    }
  });
}

/**
 * Update all timer displays for notes in progress
 */
function updateTimerDisplays() {
  const activeTimerIds = timerManager.getActiveTimerIds();
  
  activeTimerIds.forEach(noteId => {
    const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
    if (noteElement) {
      const timerDisplay = noteElement.querySelector('.timerDisplay');
      if (timerDisplay) {
        const elapsedTime = timerManager.getElapsedTime(noteId);
        timerDisplay.textContent = `⏱ ${formatElapsedTime(elapsedTime)}`;
      }
    }
  });
}

export function getTimerManager() {
  return timerManager;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
}
