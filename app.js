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
        <i class="fa fa-plus" aria-hidden="true" id="add"></i>
        <i class="fa fa-times" aria-hidden="true" id="close"></i>
      </div>
      <div class="note-body">
        <button class="save"><i class="fas fa-check"></i></button>
        <button class="edit hidden"><i class="fas fa-edit"></i></button>
        <textarea>${text}</textarea>
        <div class="main-text hidden">${text}</div> 
      </div>
  `;

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

  // Search
  search.addEventListener("keyup", (e) => {
    const value = e.target.value.trim();
    const noteValue = document.querySelectorAll(".notes");

    noteValue.forEach((note) => {
      const item = note.children[1].children[2].textContent;
      console.log(item);
      if (note.children[1].children[2].textContent.indexOf(value) != -1) {
        note.style.display = "block";
      } else {
        note.style.display = "none";
      }
      // addLocal();
    });
  });

  document.body.appendChild(notes);
}
