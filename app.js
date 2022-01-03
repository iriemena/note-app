const addNew = document.querySelector(".add-note");
const search = document.querySelector("input");

const getItem = JSON.parse(localStorage.getItem("note"));
if (getItem) {
  getItem.forEach((text) => {
    addNote(text);
  });
}

addNew.addEventListener("click", () => {
  addNote();
});

function addNote(text = "") {
  const notes = document.createElement("div");
  notes.classList = "notes";

  notes.innerHTML = `
      <div class="note-header">
        <button class="save"><i class="fas fa-check"></i></button>
        <button class="edit hidden"><i class="fas fa-edit"></i></button>
        <button id="close"><i class="fa fa-times" aria-hidden="true"></i></button>
      </div>
      <div class="note-body">
        <textarea placeholder="Note something down...">${text}</textarea>
        <div class="main-text hidden">${text}</div> 
      </div>
  `;

  console.log(notes.children[0].children[1]);
  const save = notes.querySelector(".save");
  const edit = notes.querySelector(".edit");
  const mainText = notes.querySelector(".main-text");
  const textArea = notes.querySelector("textarea");
  const close = notes.querySelector("#close");

  save.addEventListener("click", () => {
    mainText.classList.toggle("hidden");
    textArea.classList.toggle("hidden");

    edit.classList.remove("hidden");
    save.classList.add("hidden");
    addLocal();
  });

  edit.addEventListener("click", () => {
    mainText.classList.toggle("hidden");
    textArea.classList.toggle("hidden");

    save.classList.remove("hidden");
    edit.classList.add("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    mainText.innerHTML = marked.parse(value);
  });

  close.addEventListener("click", () => {
    notes.remove();
    addLocal();
  });

  // local storage
  const addLocal = () => {
    const noteText = document.querySelectorAll("textarea");

    const noteValue = [];
    noteText.forEach((text) => {
      noteValue.push(text.value);
    });

    localStorage.setItem("note", JSON.stringify(noteValue));
  };

  document.body.appendChild(notes);
}

// Search
search.addEventListener("keyup", (e) => {
  const value = e.target.value.trim().toLowerCase();
  const noteValue = document.querySelectorAll(".notes");

  noteValue.forEach((note) => {
    if (note.children[1].children[1].textContent.indexOf(value) != -1) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
