document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        showHide(id)
    }
    if (event.target.dataset.type === 'save') {
        const id = event.target.dataset.id
        edit(id).then(() => {
            const element = document.getElementById(`title-${id}`)
            let obj = document.getElementById(`input-${id}`)
            const title = obj.value
            showHide(id)
            element.innerText = title
        })
    }
    if (event.target.dataset.type === 'cancel') {
        const id = event.target.dataset.id
        showHide(id)
    }
})

function showHide(id) {
    let obj = document.getElementById(`li-${id}`)
    let objEdit = document.getElementById(`li-edit-${id}`)
    if (obj.classList[1] === 'd-flex') {
        obj.classList.replace('d-flex', 'd-none')
        objEdit.classList.replace('d-none', 'd-flex')
    } else {
        obj.classList.replace('d-none', 'd-flex')
        objEdit.classList.replace('d-flex', 'd-none')
    }
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function edit(id) {
    let obj = document.getElementById(`input-${id}`)
    const title = obj.value
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