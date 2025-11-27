const STORAGE_KEY = 'kanbanNotes';

function isStorageAvailable() {
  // check if localStorage works (fails in private mode)
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

function loadNotes() {
  if (!isStorageAvailable()) {
    return [];
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      return [];
    }
    
    const notes = JSON.parse(data);
    return Array.isArray(notes) ? notes : [];
  } catch (e) {
    return [];
  }
}

function saveNotes(notes) {
  if (!isStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (e) {
    alert('Could not save notes. Storage might be full.');
    return false;
  }
}
