const addNew = document.querySelector(".add-note");
const search = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");

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
        <div class="main-text hidden"></div> 
      </div>
  `;

  const save = notes.querySelector(".save");
  const edit = notes.querySelector(".edit");
  const mainText = notes.querySelector(".main-text");
  const textArea = notes.querySelector("textarea");
  const close = notes.querySelector("#close");

  searchBtn.addEventListener("click", () => {
    const getItem = JSON.parse(localStorage.getItem("note"));
    const value = search.value;

    // getItem.forEach((item) => {
    //   console.log(item.indexOf);
    // });
    const noteValue = document.querySelector(".notes");
    console.log(Array.from(noteValue));
    console.log(getItem.indexOf(value));
    if (getItem.indexOf(value) != -1) {
      noteValue.style.display = "block";
    } else {
      noteValue.style.display = "none";
    }
  });

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
    removeNote(text);
  });

  const addLocal = () => {
    const noteText = document.querySelectorAll("textarea");

    const noteValue = [];
    noteText.forEach((text) => {
      mainText.innerHTML = text.value;
      noteValue.push(text.value);
    });

    localStorage.setItem("note", JSON.stringify(noteValue));
  };

  document.body.appendChild(notes);
}

function removeNote(text) {
  const note = JSON.parse(localStorage.getItem("note"));

  localStorage.setItem(
    "note",
    JSON.stringify(note.filter((item) => item != text))
  );
}
