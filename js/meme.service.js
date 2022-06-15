'use strict'

var gCanvas
var gCtx

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
{ id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
{ id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
{ id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
{ id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
{ id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
{ id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
{ id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
{ id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
{ id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [

        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            align: 'left',
            color: 'yellow',
            x: 20,
            y: 40
        },

        // {
        //     txt: 'i love coding',
        //     size: 40,
        //     align: 'left',
        //     color: 'yellow',
        //     x: 140,
        //     y: 140
        // },
        // {
        //     txt: 'i love playing',
        //     size: 40,
        //     align: 'left',
        //     color: 'yellow',
        //     x: 240,
        //     y: 240
        // }
    ]
}

function getCurrTxt() {
    if (!gMeme.lines.length) return ''
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function deletLine() {
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function getImges() {
    return gImgs
}

function switchLine() {
    if (!gMeme.lines.length) return
    (gMeme.selectedLineIdx + 2 > gMeme.lines.length) ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx += 1
}

function setColor(value) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].color = value

}

function moveTxtMiddle() {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function moveTxtLeft(line) {
    if (!gMeme.lines.length) return
    gCtx.textAlign = 'left';
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}
function moveTxtRight() {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function increaseFont() {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].size += 1
}
function decreaseFont() {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 1
}

function setLine(line) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].txt = line
}

function setImg(imgSrc) {
    var img = gImgs.find(img => imgSrc === img.url)
    gMeme.selectedImgId = img.id
}


function getImg() {
    return gImgs.find((img) => gMeme.selectedImgId === img.id)
}

function getgMeme() {
    return gMeme
}

function setCanvas(canvas) {
    gCanvas = canvas

}

function setCtx(ctx) {
    gCtx = ctx
}

function renderImg(image) {
    var img = new Image()
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderTxt()
    }
    img.src = image
}

function renderTxt() {
    gMeme.lines.forEach(line => {
        drawText(line)
    })
}


function drawText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.textAlign = line.align
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px' + ' Ariel'
    gCtx.fillText(line.txt, gCanvas.width/2, gCanvas.width/2)
    gCtx.strokeText(line.txt, gCanvas.width/2, gCanvas.width/2)
}