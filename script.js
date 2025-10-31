//deklarasi
document.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.getElementById("addBtn");
  let todoName = document.getElementById("todoName");
  let todoDesc = document.getElementById("todoDesc");
  let todoList = document.getElementById("todoList");
  let searchInput = document.getElementById("search");

  //penyimpanan
  let STORAGE_KEY = "saved_todo";
  let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)||`[]`);

  // render semua todo
  function renderAll() {
    todoList.innerHTML = "";

    todos.forEach((todo) => { //loop tiap tugas 
      let li = document.createElement("li");
      li.className =
        "group border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600 placeholder-gray-400 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm flex justify-between items-start transition transform hover:-translate-y-1 hover:shadow-lg duration-200";

      li.innerHTML = `
        <div class="text-container ${todo.done ? 'line-through opacity-50' : ''}">
          <h3 class="font-semibold text-gray-800">${todo.name}</h3>
          <p class="text-sm text-gray-600">${todo.desc || ""}</p>
        </div>
        <div class="flex gap-2">

          <button class="done-btn ${todo.done
            ? 'bg-yellow-500 hover:bg-yellow-600' 
            : 'bg-green-500 hover:bg-green-600'} 
            text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
            <b>${todo.done ? 'Uncheck' : 'Check'}</b>
          </button>

          <button class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"><b>Delete</b></button>
        </div>
      `;

      // tombol hapus
      li.querySelector(".delete-btn").addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== todo.id);
        saveAndRender();
      });

      // tombol selesai
      li.querySelector(".done-btn").addEventListener("click", () => {
        todo.done=!todo.done; //simpan status
        saveAndRender();
      });

      if (todo.done){
        li.classList.add(`opacity-50`)
      }

      // animasi muncul
      li.style.opacity = 0;
      todoList.appendChild(li);
      setTimeout(() => (li.style.opacity = 1), 5);
    });
  }

  // simpan dan render
  function saveAndRender() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    renderAll();
    applySearchFilter();
  }

  // tambah todo
  addBtn.addEventListener("click", () => {
    let name = todoName.value.trim();
    let desc = todoDesc.value.trim();

    if (!name) return alert("Nama tugas tidak boleh kosong!");

    let newTodo = { id: Date.now().toString(), name, desc, done:false };
    todos.unshift(newTodo);
    saveAndRender();

    todoName.value = "";
    todoDesc.value = "";
    todoName.focus();
  });

  // pencarian
  function applySearchFilter() {
    let q = search.value.toLowerCase();
    let items = todoList.querySelectorAll("li");
    items.forEach((li) => {
      let title = li.querySelector("h3").textContent.toLowerCase();
      li.style.display = title.includes(q) ? "" : "none";
    });
  }

  search.addEventListener("input", applySearchFilter);

  renderAll();
});
