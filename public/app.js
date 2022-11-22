document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        let title = prompt('Введите новое название')?.trim()
        if (!title) {
            return
        }
        edit(id, title).then(() => {
            const element = document.getElementById(`title-${id}`)
            element.innerText = title
        })
    }
})


async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}