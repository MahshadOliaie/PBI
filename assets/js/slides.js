

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


    let aboutTemplate = `<div>
            <h1 class="slide__about__title">${currentData.title}</h1>
            <p class="slide__about__desc">${currentData.desc}</p>
        </div>
        <a href="${currentData.downloadLink}" style="${(currentData.downloadLink) ? `` : `pointer-events: none; opacity: 0.5;`}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12.0003 16C11.8687 16.0008 11.7382 15.9756 11.6164 15.9258C11.4945 15.876 11.3837 15.8027 11.2903 15.71L7.29026 11.71C7.12644 11.5187 7.04083 11.2727 7.05055 11.021C7.06027 10.7693 7.1646 10.5306 7.3427 10.3525C7.52079 10.1744 7.75953 10.07 8.01121 10.0603C8.26288 10.0506 8.50896 10.1362 8.70026 10.3L12.0003 13.59L15.2903 10.3C15.4816 10.1362 15.7276 10.0506 15.9793 10.0603C16.231 10.07 16.4697 10.1744 16.6478 10.3525C16.8259 10.5306 16.9303 10.7693 16.94 11.021C16.9497 11.2727 16.8641 11.5187 16.7003 11.71L12.7003 15.71C12.514 15.8948 12.2626 15.9989 12.0003 16Z"
                    fill="#434343" />
                <path
                    d="M12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V5C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16ZM19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19C4 18.7348 4.10536 18.4804 4.29289 18.2929C4.48043 18.1054 4.73478 18 5 18H19C19.2652 18 19.5196 18.1054 19.7071 18.2929C19.8946 18.4804 20 18.7348 20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20Z"
                    fill="#434343" />
            </svg> Download</a>`

            document.querySelector(".slide__about").innerHTML = aboutTemplate

}

renderSlides()