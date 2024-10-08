
let cardsData = []
function getData() {
    fetch('/assets/data/data.json')
        .then(res => res.json())
        .then(data => cardsData = data)
}

function getCategories() {
    fetch("/assets/data/categories.json")
        .then(res => res.json())
        .then(data => { listCategories(data); renderSections(data) })
}



function activeNav(id) {
    document.querySelector(".activeNav")?.classList.remove("activeNav")
    event.target.classList.add("activeNav")
    document.querySelector('.mobileNav').classList.toggle("close")
    document.querySelector('.mobileNav').classList.toggle("open")
    document.getElementById(id).scrollIntoView();
}

function listCategories(data) {
    let template = data.map((item, index) => {
        if (index == 0) {
            return `<a onclick="activeNav('${item.id}')" class="activeNav" id="a${item.id}">${item.title}</a>`
        }
        else
            return `<a onclick="activeNav('${item.id}')" id="a${item.id}">${item.title}</a>`

    }).join("")

    if (window.innerWidth > 600)
        document.querySelector('.navbar').innerHTML = template
    else
        document.querySelector('.mobileNav__menu').innerHTML = template
}



async function requests() {
    getData()
    await getCategories()
}


requests()


function mobileNavbarHandler() {
    document.querySelector(".mobileNav").classList.toggle("close")
    document.querySelector(".mobileNav").classList.toggle("open")
}




window.addEventListener("load", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})



document.getElementById("openSvg").addEventListener("click", mobileNavbarHandler)


function sLeft(id) {
    if (window.innerWidth < 1024) {
        document.querySelector(`#${id} .cardsSection__cards`).scrollLeft -= 330
    }
    else
        document.querySelector(`#${id} .cardsSection__cards`).scrollLeft -= 390

}

function sRight(id) {
    const div = document.querySelector(`#${id} .cardsSection__cards`)

    if (window.innerWidth < 1024) {
        div.scrollLeft += 330
    }
    else
        div.scrollLeft += 390

    // if (div.scrollLeft + div.clientWidth >= div.scrollWidth) {
    //     document.querySelector(`#${id} .arrows__next`).classList.add("disabled")
    // }


}



function renderSections(data) {
    let template = data.map(item => {
        let filteredData = cardsData.filter(card => card.categoryId === item.id)
        return `<section class="cardsSection" id="${item.id}">
        <h2 class="cardsSection__title">${item.title}</h2>
        <div class="cardsSection__cards">
        ${filteredData.map(item => {
            let itemImages = []
            for (let i = 1; i <= item.slidesNumber; i++) {
                itemImages.push(`/assets/images/${item.folderName}/Slide${i}.JPG`)
            }
            return ` <div class="cardsSection__cards__card">
                <div class="cardsSection__cards__card__image">
                    <img src="${itemImages[0]}" alt="">
                </div>
                <div class="card-text">
                <div class="cardsSection__cards__card__about">
                    <h3 class="cardsSection__cards__card__about__title">${item.title}</h3>
                    <p class="cardsSection__cards__card__about__desc">${item.desc.slice(0, 140)}${(item.desc) ? `...<span class="shadow"></span>` : ``}</p>
                </div>
                <div class="cardsSection__cards__card__more" onclick="showData(${item.id})">
                    <div class="cardsSection__cards__card__more__svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M1 1L5 5L1 9" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <p class="cardsSection__cards__card__more__text">Learn more</p>
                </div>
                </div>
            </div>`
        }).join("")}
        </div>
          <div class="arrows">
                <div class="arrows__prev" onclick="sLeft('${item.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="21" viewBox="0 0 10 21" width="10">
                        <path d="m9 20-7.45757-8.8559c-.31345-.3722-.31345-.916 0-1.28824l7.45757-8.85586"
                            stroke="#0067b8" stroke-linecap="round" stroke-width="2" />
                    </svg>
                </div>

                <div class="arrows__next" onclick="sRight('${item.id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="21" viewBox="0 0 10 21" width="10">
                        <path d="m1 1 7.45757 8.85586c.31345.37224.31345.91604 0 1.28824l-7.45757 8.8559"
                            stroke="#0067b8" stroke-linecap="round" stroke-width="2" />
                    </svg>
                </div>
            </div>
    </section>`
    }).join("")


    document.querySelector(".sectionsContainer").innerHTML = template
    observer()


}


function observer() {
    const sections = document.querySelectorAll(".cardsSection")

    // Create an IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The element is in view
                document.querySelector(".activeNav")?.classList.remove("activeNav")
                document.getElementById(`a${entry.target.id}`).classList.add("activeNav")
                document.querySelector('.mobileNav__mainBox__title').textContent = document.getElementById(`a${entry.target.id}`).textContent
            }
        });
    }, {
        threshold: 0.9 // Trigger when 50% of the element is visible
    });


    sections.forEach(section => {
        observer.observe(section);
    });

}


async function showData(id) {
    let data = cardsData.find(item => item.id === id)
    console.log(data)
    localStorage.clear()
    localStorage.setItem("currentFile", JSON.stringify(data))

    await window.location.assign("/slides.html")
}