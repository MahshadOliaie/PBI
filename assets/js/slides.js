

let currentData = JSON.parse(localStorage.getItem("currentFile")) || {}


function renderSlides() {
    const { folderName, slidesNumber } = currentData

    let itemImages = []
    for (let i = 1; i <= slidesNumber; i++) {
        itemImages.push(`/assets/images/${folderName}/Slide${i}.JPG`)
    }

    let template = itemImages.map(image => {
        return `<div class="swiper-slide">
           <img src="${image}" />
          </div>`
    }).join("")


    document.querySelector(".swiper-wrapper").innerHTML = template
    document.querySelector(".picker").innerHTML = template

}

renderSlides()