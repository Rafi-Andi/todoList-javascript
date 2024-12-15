document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });
});

function membuatId(){
    return +new Date()
}

function membuatObjek(id, judul, tanggal, selesai){
    return{
        id,
        judul,
        tanggal,
        selesai,
    }
}

const todos = [];

const RENDER_EVENT = 'render-todo';

function addTodo(){
    const judul = document.getElementById("judul").value;
    const tanggal = document.getElementById("tanggal").value;

    const buatId = membuatId()
    const todoObjek = membuatObjek(buatId, judul, tanggal, false);
    todos.push(todoObjek)

    document.dispatchEvent(new Event(RENDER_EVENT))
}

document.addEventListener(RENDER_EVENT, function(){
    const tugasBelumSelesai = document.getElementById('todos')
    tugasBelumSelesai.innerHTML = ''

    for (const todoItem of todos){
        const todoElement = membuatTodo(todoItem);

        tugasBelumSelesai.appendChild(todoElement)
    }

})

function membuatTodo(todoObjek){
    const judul = document.createElement('h2')
    judul.innerText = todoObjek.judul;
    judul.classList.add('font-semibold', 'text-xl')

    const tanggal = document.createElement('p')
    tanggal.innerText = todoObjek.tanggal;
    tanggal.classList.add()


    const kontainerTeks = document.createElement('div');
    kontainerTeks.append(judul, tanggal);

    const tombolSelesai = document.createElement('button');
    const fotoSelesai = document.createElement('img');
    fotoSelesai.src = './assets/check-circle.svg';
    fotoSelesai.alt = 'tombol selesai'
    tombolSelesai.append(fotoSelesai);

    if (todoObjek.selesai) {
        judul.classList.add('line-through', 'text-gray-600');
        tanggal.classList.add('line-through', 'text-gray-600');
    }

    tombolSelesai.addEventListener('click', function(){
        todoObjek.selesai = !todoObjek.selesai; 
        judul.classList.toggle('line-through');
        judul.classList.toggle('text-gray-600');

        tanggal.classList.toggle('line-through');
        tanggal.classList.toggle('text-gray-600');
    })

    const kontainerKiri = document.createElement('div');
    kontainerKiri.classList.add('flex', 'items-center', 'gap-4');
    kontainerKiri.append(tombolSelesai, kontainerTeks);


    const tombolHapus = document.createElement('button');
    const fotoHapus = document.createElement('img');
    fotoHapus.src = './assets/trash-2.svg'
    fotoHapus.alt = 'tombol hapus'
    tombolHapus.append(fotoHapus)
    tombolHapus.addEventListener('click', function(){
        hapusTodo(todoObjek.id);
    })
    const kontainer = document.createElement('div');
    kontainer.classList.add('bg-gray-900', 'mx-5', 'rounded-full', 'px-6', 'py-2', 'flex', 'items-center', 'justify-between', 'my-4')

    kontainer.append(kontainerKiri, tombolHapus);

    return kontainer;
}

function hapusTodo(todoId){
    const todoTarget = todoFindIndex(todoId)

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1)

    document.dispatchEvent(new Event(RENDER_EVENT))
}

function todoFindIndex(todoId){
    for (const index in todos){
        if(todos[index].id === todoId){
            return index;
        }
    }

    return -1;
}