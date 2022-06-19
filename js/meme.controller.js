'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStartPos

function renderMeme() {
    var { url } = getImg()
    renderImg(url)

}

function renderCanvas() {
    var elEditor = document.querySelector('.editor')
    var strHtml = `<canvas class="my-canvas" width=500 height=500 onclick="" style="border: 1px solid black"></canvas> 
    <div class="desgin-tools flex column space-around">
    <div> <input type="text" placeholder="Enter your text here" oninput="onSetLineTxt(this.value)" class="txt-input"/></div>
    <div class="line-div flex align-center justify-center" > 
    <button class="line-btn line-up" onclick="onLineUp()">🡡</button>
    <button class="line-btn line-down" onclick="onLineDown()">🡣</button>
    <button class="line-btn switch-line" onclick="onSwitchLine()">⮁</button>
    <button class="line-btn add-line" onclick="onAddLine()"><i class="fa-solid fa-plus"></i></button>
    <button class="line-btn delete-line" onclick="onDeletLine()"><i class="fa-solid fa-trash-can"></i></button>
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
    <button class="share" onclick="onUploadImg()">Share</button>
     <button class="download"><a href="#"  onclick="onDownloadCanvas(this)" download="file-name">Download</a>
    </div>`
    elEditor.innerHTML = strHtml
    const canvas = document.querySelector('.my-canvas')
    onSetCanvas(canvas)
    const ctx = canvas.getContext('2d')
    onSetCtx(ctx)
    addListeners()
}

function onUploadImg() {
    uploadImg()
}

function onChangeInput() {
    const elInput = document.querySelector('.txt-input')
    elInput.value = getCurrTxt()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onLineUp() {
    lineUp()
    renderMeme()
}
function onLineDown() {
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

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
        if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
         pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    var canvas = getCanvas()
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    var canvas = getCanvas()
    canvas.addEventListener('touchmove', onMove)
    canvas.addEventListener('touchstart', onDown)
    canvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    var clickedLineIdx = isLineClicked(pos)
    if (clickedLineIdx === undefined) return
    setLineByClick(clickedLineIdx)
    renderMeme()
    onChangeInput()
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    
}

function onMove(ev) {
    const currLine = getCurrLine()
    if (currLine.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        renderMeme()
    }
}
function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

