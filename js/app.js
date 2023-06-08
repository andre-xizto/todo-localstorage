import myFunctions from "./functions.js";

const btn = document.querySelector("button");
const input = document.querySelector("#inp");
const closeBnt = document.querySelector('.modal-content span');
const modal = document.querySelector('.modal');
const editBtn = document.querySelector('.modal-content button');
const activeModal = document.querySelector('.modal-active');
const inputEdit = document.querySelector('.modal-content input');
const errorText = 'Insira um valor válido';

window.addEventListener('load', () => {
    myFunctions.renderList();
    btn.classList.add('disable');
});

btn.addEventListener('click', () => {

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    if(!input.value.trim()) return
    if (tarefas.includes(input.value.trim()) === false) {

        const tarefa = input.value.trim();
        myFunctions.handleAddRenderItem(tarefa);
        btn.classList.add('disable');
        input.value = '';
        input.focus();

    } else {
        console.error(errorText);
    }
})

input.addEventListener('input', () => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    !input.value.trim() ? btn.classList.add('disable') : (tarefas.includes(input.value.trim()) ? btn.classList.add('disable') : btn.classList.remove('disable'));
});

inputEdit.addEventListener('input', () => {
    !inputEdit.value.trim() ? editBtn.classList.add('disable') : editBtn.classList.remove('disable');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal('modal-active');
})

editBtn.addEventListener('click', () => {
    if(!inputEdit.value.trim()) return

    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    const index = activeModal.dataset.index
    const tarefasWithoutMe = [...tarefas];
    tarefasWithoutMe.splice(index, 1);
    if (tarefasWithoutMe.includes(inputEdit.value.trim()) === false) {
        tarefas[index] = inputEdit.value.trim();
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        myFunctions.renderList();
        modal.classList.toggle('modal-active');
} else {
    alert(errorText);
    console.error(errorText)
}
});

closeBnt.addEventListener('click', () => {
    closeModal('modal-active');
});

const closeModal = e => {
    modal.classList.remove(e);
}