'use strict'



function renderMeme() {
    var { url } = getImg()
    renderImg(url)
}

function renderCanvas() {
    var elEditor = document.querySelector('.editor')
    var strHtml = `<canvas class="my-canvas" width=500 height=500 onclick="" style="border: 1px solid black"></canvas> 
    <div class="desgin-tools flex column space-between">
    <div> <input type="text" placeholder="enter your text here" oninput="onSetLineTxt(this.value)" class="txt-input"/></div>
    <div> <button onclick="onDeletLine()">🗑</button>
    <button onclick="onAddLine()">➕</button>
    <button onclick=onSwitchLine()>🡩🡫</button>
    </div>
   <div>
    <input class="color-input" type="color" onchange="onSetColor(this.value)">
    <button class="increase" onclick="onIncreaseFont()">A+</button>
    <button class="decrease" onclick="onDecreaseFont()">A-</button>
    <button onclick="onMoveTxtLeft()">left</button>
    <button onclick="onMoveTxtMiddle()">middle</button>
    <button onclick="onMoveTxtRight()">right</button>
    <select> 
    <option value="ariel">Ariel</option>
    <option value="ariel">Ariel</option>
    <option value="ariel">Ariel</option>
    </select>
    </div>
    <div class="emojis"></div>
    <div class="share">
    <button>Share</button>
    <button>Download</button>
    </div>`
    elEditor.innerHTML = strHtml
    var canvas = document.querySelector('.my-canvas')
    onSetCanvas(canvas)
    var ctx = canvas.getContext('2d')
    onSetCtx(ctx)
}


function onChangeInput() {
    const elInput = document.querySelector('.txt-input')
    elInput.value = getCurrTxt()
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

function onSetColor(value) {
    setColor(value)
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