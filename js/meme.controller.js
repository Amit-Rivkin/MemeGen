'use strict'

// const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderMeme() {
    var { url } = getImg()
    renderImg(url)
    // addListeners()
}

function renderCanvas() {
    var elEditor = document.querySelector('.editor')
    var strHtml = `<canvas class="my-canvas" width=500 height=500 onclick="" style="border: 1px solid black"></canvas> 
    <div class="desgin-tools flex column space-around">
    <div> <input type="text" placeholder="enter your text here" oninput="onSetLineTxt(this.value)" class="txt-input"/></div>
    <div class="line-div flex align-center justify-center" > 
    <button class="line-up" onclick="onLineUp()">🡡</button>
    <button class="line-down" onclick="onLineDown()">🡣</button>
    <button class="switch-line" onclick="onSwitchLine()">⮁</button>
    <button class="add-line" onclick="onAddLine()"><i class="fa-solid fa-plus"></i></button>
    <button class="delete-line" onclick="onDeletLine()"><i class="fa-solid fa-trash-can"></i></button>
    </div>
   <div class="txt-div">
   <button class="increase" onclick="onIncreaseFont()">A+</button>
   <button class="decrease" onclick="onDecreaseFont()">A-</button>
   <button class="align-left" onclick="onMoveTxtLeft()"><i class="fa-solid fa-align-left"></i></button>
   <button class="align-middle" onclick="onMoveTxtMiddle()"><i class="fa-solid fa-align-center"></i></button>
   <button class=align-right onclick="onMoveTxtRight()"><i class="fa-solid fa-align-right"></i></button>
   <select class="select-font" onchange="onChangeFont(this.value)"> 
   <option value=" Impact">Impact</option>
   <option value=" Ariel">Ariel</option>
   <option value=" Georgia">Georgia</option>
   </select>
   <div class="stroke-color-container">
   <button class="stroke-color-btn">S</button>
   <input class="color-stroke" type="color" onchange="onSetColorStroke(this.value)">
   </div>
   <div class="txt-color-container">
   <button class="txt-color-btn"><i class="fa-solid fa-palette"></i></button>
   <input onchange="onSetColorTxt(this.value)" class="set-color" type="color">
   </div>
   </div>
    <div class="emojis"></div>
    <div class="media-div flex space-between">
    <button class="share" onclick="uploadImg()">Share</button>
     <button class="download"><a href="#"  onclick="onDownloadCanvas(this)" download="file-name">Download</a>
    </div>`
    elEditor.innerHTML = strHtml
    const canvas = document.querySelector('.my-canvas')
    onSetCanvas(canvas)
    const ctx = canvas.getContext('2d')
    onSetCtx(ctx)
}


// function homePage(){
//     const elGallery = document.querySelector('.gallery')
//     elGallery.style.display = 'block'
//     const elEditor = document.querySelector('.editor')
//     elEditor.style.display = 'none'
// }

function onChangeInput() {
    const elInput = document.querySelector('.txt-input')
    elInput.value = getCurrTxt()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onLineUp(){
    lineUp()
    renderMeme()
}
function onLineDown(){
    lineDown()
    renderMeme()
}

function onSetCanvas(canvas) {
    setCanvas(canvas)
}

function onSetCtx(ctx) {
    setCtx(ctx)
}

function onSetLineTxt(line) {
    setLine(line)
    renderMeme()
}

function onChangeFont(value) {
    changefont(value)
    renderMeme()
}

function onSetColorTxt(value) {
    setColorTxt(value)
    renderMeme()
}

function onSetColorStroke(value) {
    setColorStroke(value)
    renderMeme()
}

function onMoveTxtMiddle() {
    moveTxtMiddle()
    renderMeme()
}

function onMoveTxtLeft() {
    moveTxtLeft()
    renderMeme()
}

function onMoveTxtRight() {
    moveTxtRight()
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}
function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    onChangeInput()
}

function onDeletLine() {
    deletLine()
    renderMeme()
    onChangeInput()
}

function onDownloadCanvas(elLink) {
    downloadCanvas(elLink)
}

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     //Listen for resize ev 
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderCanvas()
//     })
// }

// function addMouseListeners() {
//     gCanvas.addEventListener('mousemove', onMove)
//     gCanvas.addEventListener('mousedown', onDown)
//     gCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gCanvas.addEventListener('touchmove', onMove)
//     gCanvas.addEventListener('touchstart', onDown)
//     gCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     //Get the ev pos from mouse or touch
//     const pos = getEvPos(ev)
//     if (!isTxtClicked(pos)) return
//     setTxtDrag(true)
//     //Save the pos we start from 
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'

// }

// function onMove(ev) {
//     const circle = getgMemeLine();
//     if (circle.isDrag) {
//         const pos = getEvPos(ev)
//         //Calc the delta , the diff we moved
//         const dx = pos.x - gStartPos.x
//         const dy = pos.y - gStartPos.y
//         moveTxt(dx, dy)
//         //Save the last pos , we remember where we`ve been and move accordingly
//         gStartPos = pos
//         //The canvas is render again after every move
//         renderCanvas()
//     }
// }

// function onUp() {
//     setTxtDrag(false)
//     document.body.style.cursor = 'grab'
// }

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }

// function getEvPos(ev) {

//     //Gets the offset pos , the default pos
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     // Check if its a touch ev
//     if (gTouchEvs.includes(ev.type)) {
//         //soo we will not trigger the mouse ev
//         ev.preventDefault()
//         //Gets the first touch point
//         ev = ev.changedTouches[0]
//         //Calc the right pos according to the touch screen
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }