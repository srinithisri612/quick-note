const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");


// Get and display all notes
async function loadNotes() {

    const response = await fetch("/notes");

    const notes = await response.json();

    notesContainer.innerHTML = "";

    notes.forEach(note => {

        const noteElement = document.createElement("div");

        noteElement.classList.add("note");

        noteElement.innerHTML = `
            <p>${note.text}</p>

            <button
                class="delete-btn"
                onclick="deleteNote(${note.id})"
            >
                Delete
            </button>
        `;

        notesContainer.appendChild(noteElement);
    });
}


// Add a new note
async function addNote() {

    const text = noteInput.value.trim();

    if (text === "") {
        alert("Please enter a note.");
        return;
    }

    await fetch("/notes", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text
        })

    });

    noteInput.value = "";

    loadNotes();
}


// Delete a note
async function deleteNote(id) {

    await fetch(`/notes/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}


// Button click
addNoteBtn.addEventListener("click", addNote);


// Load notes when page opens
loadNotes();