const addItem = tarefa => {
    const list = JSON.parse(localStorage.getItem("tarefas"));
    list.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(list));
}

const removeItem = index => {
    const list = JSON.parse(localStorage.getItem("tarefas"));
    const item = list[index];
    const confirmResponse = confirm(`Deseja remover "${item}" da lista de tarefas?`);
    if (confirmResponse) {
        list.splice(index, 1);
        localStorage.setItem("tarefas", JSON.stringify(list));
    }
}

const handleRemoveRenderItem = index => {
    removeItem(index);
    renderList();
}

const handleAddRenderItem = tarefa => {
    addItem(tarefa);
    renderList();
}

const renderList = () => {

    const ulElement = document.querySelector("ul");
    ulElement.innerHTML = '';
    const list = JSON.parse(localStorage.getItem("tarefas"));

    list.forEach((element, index) => {

        const liElement = document.createElement("li");
        const pElement = document.createElement("p");
        const textTarefa = document.createTextNode(element);
        const aElement = document.createElement("a");
        const deleteText = document.createTextNode('Excluir');

        ulElement.appendChild(liElement);
        liElement.appendChild(pElement);
        liElement.appendChild(aElement);
        pElement.appendChild(textTarefa);
        aElement.appendChild(deleteText);

        aElement.setAttribute('href', '#');
        aElement.addEventListener('click', handleRemoveRenderItem.bind(null,index));
        pElement.addEventListener('click', () => {
            document.querySelector('.modal').classList.toggle('modal-active');
            document.querySelector('.modal-active').setAttribute('data-index', index);
            document.querySelector('.modal input').value = element;
        })

    });
}

const myFunctions = {
    handleAddRenderItem,
    renderList
}

export default myFunctions;