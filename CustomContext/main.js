const root = document.querySelector('.root')
const menu = document.querySelector('.context-menu')
const hiddenMenu = document.querySelector('.hidden-menu')
const css = document.documentElement.style
let clicked = false

function onRightClick(e) {
    e.preventDefault()

    if(clicked) {
        onOtherClick()

        return
    }
        

    clicked = true
    css.setProperty('--x-coord', `${e.offsetX}px`)
    css.setProperty('--y-coord', `${e.offsetY}px`)
    hiddenMenu.classList.add('shown')
}

function onOtherClick() {
    clicked = false
    hiddenMenu.classList.remove('shown')
}

function buttonClickHandler() {
    console.log(event.target.innerText)
}

menu.addEventListener('contextmenu', onRightClick)
root.addEventListener('click', onOtherClick)