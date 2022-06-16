'use strict'

function init() {
    renderGallery()
}

function renderGallery() {
    var elGallery = document.querySelector('.image-gallery')
    var imges = getImges()
    var strHtml = ''
    for (var i = 0; i < imges.length; i++) {
        var img = imges[i]
        strHtml += `<div class="meme-img"> <img src="${img.url}" class="img-gallery" onclick="onImgSelect(this.src)"></div>`
    }
    // `<img src="../img/1.jpg" onclick="onImgSelect(this.src)"><img src="../img/2.jpg" onclick= "onImgSelect(this.src)"> `
    elGallery.innerHTML = strHtml
}

function onImgSelect(imgSrc) {
    var subSrc = imgSrc.match('(img(.*)+(.jpg)$)')[0]
    setImg(subSrc)
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    renderCanvas()
    setgCanvasButtomY()
    renderMeme()
}

// function onSetFilterByTxt(filterByTxt) {
//     setFilterByTxt(filterByTxt)
//     renderGallery()
// }

