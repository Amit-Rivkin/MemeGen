'use strict'

var gCanvas
var gCtx

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['aba', 'minister'] },
{ id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog'] },
{ id: 3, url: 'img/3.jpg', keywords: ['funny', 'baby'] },
{ id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
{ id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
{ id: 6, url: 'img/6.jpg', keywords: ['funny', 'actor'] },
{ id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'actor'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny', 'minister'] },
{ id: 11, url: 'img/11.jpg', keywords: ['funny', 'sport'] },
{ id: 12, url: 'img/12.jpg', keywords: ['funny', 'actor'] },
{ id: 13, url: 'img/13.jpg', keywords: ['funny', 'actor'] },
{ id: 14, url: 'img/14.jpg', keywords: ['funny', 'actor'] },
{ id: 15, url: 'img/15.jpg', keywords: ['funny', 'actor'] },
{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'actor'] },
{ id: 17, url: 'img/17.jpg', keywords: ['funny', 'minister'] },
{ id: 18, url: 'img/18.jpg', keywords: ['funny', 'toy'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [

        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            font: ' Impact',
            align: 'left',
            color: 'white',
            stroke: 'black',
            x: 20,
            y: 60,
            isDrag: false
        },

        {
            txt: 'Add your text here',
            size: 40,
            font: ' Impact',
            align: 'left',
            color: 'white',
            stroke: 'black',
            x: 20,
            y: 0,
            isDrag: false
        }

    ]
}

function getCanvas(){
    return gCanvas
}

function isLineClicked(clickedPos) {
    var currLineIdx
    gMeme.lines.forEach((line, clickedLine) => {
        var currTxtwidth = gCtx.measureText(line.txt).width
        if (clickedPos.x >= line.x && clickedPos.x <= currTxtwidth + line.x && clickedPos.y <= line.y && clickedPos.y >= line.y - line.size) {
            currLineIdx = clickedLine
        }
    })
    return currLineIdx
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineByClick(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setLineDrag(isDrag) {
    const currLine = getCurrLine()
    currLine.isDrag = isDrag
}

function moveLine(dx, dy) {
    const currLine = getCurrLine()
    currLine.x += dx
    currLine.y += dy
}

function drawRectOnCurrLine() {
    const currLine = getCurrLine()
    var currLineMeusre = gCtx.measureText(currLine.txt)
    drawRect(currLine.x - 5, currLine.y - currLine.size, currLineMeusre.width + 10, currLine.size + 10)
}



function _setMemeProprty(key, value) {
    const currLine = getCurrLine()
    currLine[key] = value
}

function getCurrTxt() {
    if (!gMeme.lines.length) return ''
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function addLine() {
    var middleY = gCanvas.height / 2


    const line = {
        txt: 'Add Your Txt Here',
        size: 40,
        font: ' Impact',
        align: 'left',
        color: 'white',
        stroke: 'black',
        x: 20,
        y: middleY,
        isDrag: false
    }

    gMeme.lines.push(line)
}

function lineUp() {
    const currLine = getCurrLine()
    if (currLine.y < currLine.size) return
    currLine.y -= 5
}
function lineDown() {
    const currLine = getCurrLine()
    if (currLine.y > gCanvas.height - 10) return
    currLine.y += 5
}

function deletLine() {
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function getImges() {
    return gImgs.filter(img => {
        return img.keywords.find(txt => {
            if (txt.includes(getFilterByTxt())) {
                return true
            }
        })
        {
        }
    })
}
function switchLine() {
    if (!gMeme.lines.length) return
    (gMeme.selectedLineIdx + 2 > gMeme.lines.length) ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx += 1
    drawRectOnCurrLine()
}

function setColorStroke(value) {
    if (!gMeme.lines.length) return
    _setMemeProprty('stroke', value)
}

function changefont(value) {
    if (!gMeme.lines.length) return
    _setMemeProprty('font', value)
}

function setColorTxt(value) {
    if (!gMeme.lines.length) return
    _setMemeProprty('color', value)

}

function moveTxtMiddle() {
    const currLine = getCurrLine()
    if (!gMeme.lines.length) return
    var txtWidth = gCtx.measureText(currLine.txt)
    var middle = gCanvas.width / 2 - txtWidth.width / 2
    currLine.x = middle
    currLine.align = 'center'
}

function moveTxtLeft() {
    const currLine = getCurrLine()
    if (!gMeme.lines.length) return
    currLine.x = 10
    currLine.align = 'left'
}

function moveTxtRight() {
    const currLine = getCurrLine()
    if (!gMeme.lines.length) return
    var txtWidth = gCtx.measureText(currLine.txt)
    var right = gCanvas.width - 10 - txtWidth.width
    currLine.x = right
    currLine.align = 'right'
}

function increaseFont() {
    const currLine = getCurrLine()
    if(currLine.size >= 50) return
    if (!gMeme.lines.length) return
    currLine.size += 1
}
function decreaseFont() {
    const currLine = getCurrLine()
    if(currLine.size <= 25) return
    if (!gMeme.lines.length) return
    currLine.size -= 1
}

function setLine(line) {
    if (!gMeme.lines.length) return
    _setMemeProprty('txt', line)

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
        drawRectOnCurrLine()
    }
    img.src = image
}

function renderTxt() {
    if (!gMeme.lines.length) return
    gMeme.lines.forEach((line, idx) => {
        if(idx !== gMeme.selectedLineIdx)
        drawText(line)
    })
    drawText(getCurrLine())
}


function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height)
    gCtx.strokeStyle = 'gray'
    gCtx.stroke()
}

function drawText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.stroke
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px' + line.font
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);

            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    console.log('data', data)
    elLink.href = data
    elLink.download = 'My Meme'
}

function setgCanvasButtomY() {
    gMeme.lines[1].y = gCanvas.height - 10
}
