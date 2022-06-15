'use strict'

function init() {
    // renderCanvas()
    // renderMeme()
    renderGallery()
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery')
    var imges = getImges()
    var strHtml = ''
    for (var i = 1; i < imges.length; i++) {
        var img = imges[i]
        console.log(img);
        strHtml += ` <img src="../${img.url}" class="img-gallery" onclick="onImgSelect(this.src)">`
    }
    // `<img src="../img/1.jpg" onclick="onImgSelect(this.src)"><img src="../img/2.jpg" onclick= "onImgSelect(this.src)"> `
    elGallery.innerHTML = strHtml
}

function onImgSelect(imgSrc) {
    var subSrc = imgSrc.substring(22)
    setImg(subSrc)
    var elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    renderCanvas()
    renderMeme()
}