let currentOnHover
let currentDragged

function drop(event) {
    document.querySelectorAll('.container ul').forEach(container => container.classList.remove('drop'))
    const data = document.querySelector(`[data-id="${event.dataTransfer.getData('text/plain')}"]`)
    const container = event.currentTarget.childNodes[3]

    for( let index = 0; index < container.childNodes.length; index++ ) {
        const item = container.childNodes[index]
        const nextItem = index < container.childNodes.length - 1 ? container.childNodes[index + 1]: null

        if(!item.offsetHeight) continue

        const heightOfMid = item.offsetHeight + item.offsetTop

        if( currentDragged <= heightOfMid ) {
            container.insertBefore(data, item)

            return
        }

        if( nextItem && currentDragged >= heightOfMid && currentDragged <= nextItem.offsetHeight ) {
            container.insertAfter(data, item)

            return
        }
    }

    container.appendChild(data)
}

function allowDrop(event) {
    currentDragged = event.clientY
    event.preventDefault()
}

function dragStart(event) {
    event.currentTarget.classList.add('dragging')
}

function dragEnd(event) {
    event.currentTarget.classList.remove('dragging');
}

function dragEnter(event) {
    event.currentTarget.classList.add('drop');
}

function dragLeave(event) {
    event.currentTarget.classList.remove('drop');
}

function drag(event) {
    event.dataTransfer.setData('text/html', event.currentTarget.outerHTML)
    event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id)
}

function cardEnter(event) {
    currentOnHover = event.currentTarget
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)

    card.addEventListener('dragenter', cardEnter)
    
})

document.querySelectorAll('.container ul').forEach(container => {
    container.addEventListener('dragenter', dragEnter)
    container.addEventListener('dragleave', dragLeave)
})

document.addEventListener('dragover', allowDrop)