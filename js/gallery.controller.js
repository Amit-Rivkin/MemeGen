'use strict'

function init() {
    renderGallery()
    
}

function renderGallery() {

    var elGallery = document.querySelector('.meme-area')
    var imges = getImges()
    var strHtml =''
    for (var i = 0; i < imges.length; i++) {
        var img = imges[i]
        strHtml += ` <img src="${img.url}" class="img-gallery" onclick="onImgSelect(this.src)"></div>`
    }
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

function onSetFilterByTxt(txt) {
    setFilterByTxt(txt)
    renderGallery()
}

function toggleHamburger() {
    document.body.classList.toggle('menu-open')
    const elBtn = document.querySelector('.hamburger-btn')
    elBtn.innerText = elBtn.innerText === '☰' ? '✖' : '☰'
  }

