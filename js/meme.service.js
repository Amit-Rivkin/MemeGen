'use strict'

var gCanvas
var gCtx


var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['aba', 'cat'] },
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
            font: ' Impact',
            align: 'left',
            color: 'white',
            stroke: 'black',
            x: 20,
            y: 40,
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

function drawRectOnCurrLine() {
    var currLineX = gMeme.lines[gMeme.selectedLineIdx].x
    var currLineY = gMeme.lines[gMeme.selectedLineIdx].y
    var currLineMeusre = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
    drawRect(currLineX - 5, currLineY - 35, currLineMeusre.width + 10, 40)
}

// function setTxtDrag(isDrag) {
//     gMeme.lines.isDrag = isDrag
// }

// function getgMemeLine() {
//     return gMeme.lines
// }

// function moveTxt(dx, dy) {
//     gMeme.lines[gMeme.selectedLineIdx].x += dx
//     gMeme.lines[gMeme.selectedLineIdx].y += dy
// }

// function isTxtClicked(clickedPos) {
//     const currX = gMeme.lines[gMeme.selectedLineIdx].x
//     const currY = gMeme.lines[gMeme.selectedLineIdx].y
//     // Calc the distance between two dots
//     const distance = Math.sqrt((currX - clickedPos.x) ** 2 + (currY - clickedPos.y) ** 2)
//     //If its smaller then the radius of the circle we are inside
//     return distance <= getgMemeLine().size
// }

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
    if (gMeme.lines[gMeme.selectedLineIdx].y < gMeme.lines[gMeme.selectedLineIdx].size) return
    gMeme.lines[gMeme.selectedLineIdx].y -= 5
    console.log(gMeme.lines[gMeme.selectedLineIdx].y);
}
function lineDown() {
    if (gMeme.lines[gMeme.selectedLineIdx].y > gCanvas.height - 10) return
    gMeme.lines[gMeme.selectedLineIdx].y += 5
    console.log(gMeme.lines[gMeme.selectedLineIdx].y);
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
    drawRectOnCurrLine()
}

function setColorStroke(value) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].stroke = value
}

function changefont(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}

function setColorTxt(value) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].color = value

}

function moveTxtMiddle() {
    if (!gMeme.lines.length) return
    var txtWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
    var middle = gCanvas.width / 2 - txtWidth.width / 2
    gMeme.lines[gMeme.selectedLineIdx].x = middle
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function moveTxtLeft() {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].x = 10
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function moveTxtRight() {
    if (!gMeme.lines.length) return
    var txtWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
    var right = gCanvas.width - 10 - txtWidth.width
    gMeme.lines[gMeme.selectedLineIdx].x = right
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
    console.log(imgSrc);
    var img = gImgs.find(img => imgSrc === img.url)
    gMeme.selectedImgId = img.id
    console.log(img.id);
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
    gMeme.lines.forEach(line => {
        drawText(line)
    })
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
    // gCtx.textAlign = line.align
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