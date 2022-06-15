'use strict'



function renderMeme() {
    var { url } = getImg()
    renderImg(url)
}

function renderCanvas() {
    var elEditor = document.querySelector('.editor')
    var strHtml = `<canvas class="my-canvas" width=500 height=500 onclick="" style="border: 1px solid black"></canvas>
    <input type="text" placeholder="enter your text here" oninput="onSetLineTxt(this.value)"/>
    <input class="color-input" type="color" onchange="onSetColor(this.value)">
    <button class="increase" onclick="onIncreaseFont(this.value)">+</button>
    <button class="decrease" onclick="onDecreaseFont(this.value)">-</button>
    <button onclick=onSwitchLine()>+-</button>`
    elEditor.innerHTML = strHtml
    var canvas = document.querySelector('.my-canvas')
    onSetCanvas(canvas)
    var ctx = canvas.getContext('2d')
    onSetCtx(ctx)
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

function onIncreaseFont(value){
    increaseFont(value)
    renderMeme()
}
function onDecreaseFont(value){
    decreaseFont(value)
    renderMeme()
}

function onSwitchLine(){
    switchLine()
    renderMeme()
}