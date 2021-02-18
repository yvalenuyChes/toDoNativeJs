const inputElement = document.getElementById('input')

const ulElement = document.getElementById('list')

let todoList = []






inputElement.addEventListener('keydown', event => {
	if ((event.key === 'Enter') && (inputElement.value)) {
		todoList.unshift({
			content: inputElement.value,
			done: false,
			selected: false


		})
		inputElement.value = ''

		updateView()
	}

})


function updateView() {
	ulElement.innerHTML = ''
	/*for (const todoItem of todoList)*/
	for (let index = 0; index < todoList.length; index++) {
		const todoItem = todoList[index]
		const liElement = document.createElement('li')
		liElement.className = 'list-group-item'
		ulElement.append(liElement)


		const divElement = document.createElement('div')
		divElement.className = 'form-group form-check'
		liElement.append(divElement)


		const checkboxElement = document.createElement('input')
		divElement.append(checkboxElement)
		checkboxElement.type = 'checkbox'
		checkboxElement.className = 'form-check-input'
		checkboxElement.id = 'todoItem' + index
		checkboxElement.checked = todoItem.selected
		/*checkboxElement.style.display = 'none'*/


		const labelElement = document.createElement('label')
		divElement.append(labelElement)
		labelElement.className = 'form-check-label'
		if (todoItem.done) {
			labelElement.className += ' todoDone'
		}
		labelElement.setAttribute('for', 'todoItem' + index)
		labelElement.innerText = todoItem.content

		if (!todoItem.done) {
			const buttonDoneElement = document.createElement('button')
			divElement.append(buttonDoneElement)
			buttonDoneElement.type = 'button'
			buttonDoneElement.className = 'btn   btn-success'
			buttonDoneElement.innerText = 'Выполнено'
			buttonDoneElement.style = 'float : right'
			buttonDoneElement.addEventListener('click', () => {
				todoItem.done = !todoItem.done
				updateView()
			})
		}

		else {
			const buttonRemoveElement = document.createElement('button')
			divElement.append(buttonRemoveElement)
			buttonRemoveElement.type = 'button'
			buttonRemoveElement.className = 'btn btn-danger'
			buttonRemoveElement.innerText = 'Убрать'
			buttonRemoveElement.style = 'float : right'
			buttonRemoveElement.addEventListener('click', () => {
				todoList = todoList.filter(
					currendTodoItem => currendTodoItem !== todoItem
				)
				updateView()
			})

		}
		checkboxElement.addEventListener('change', () => {
			todoItem.selected = checkboxElement.checked
		})
	}
}

document.getElementById('doneAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			todoItem.done = true
			todoItem.selected = false
		}
	}

	updateView()
})

document.getElementById('restoreAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			todoItem.done = false
			todoItem.selected = false
		}
	}
	updateView()
})

document.getElementById('removeAction').addEventListener('click', () => {
	todoList = todoList.filter(todoItem => !todoItem.selected)
	for (const todoItem of todoList) {
		// if (todoItem.selected) {
		// 	todoItem.done = false
		// 	todoItem.selected = false
		// }
	}
	updateView()
})

document.getElementById('test').addEventListener('click', () => {
	for (const todoItem of todoList) {

		todoItem.selected = true

	}
	updateView()
})