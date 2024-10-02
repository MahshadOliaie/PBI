

const certificateContainer = document.querySelector(".certificatePage__container")


function getCertificates() {
    fetch("/assets/data/certificates.json")
        .then(res => res.json())
        .then(data => renderCertificates(data))
}

function renderCertificates(data) {
    let template = data.map(item => {
        return ` <div class="certificatePage__card">
            <div class="certificatePage__card__image">
                <img src="./assets/images/resume/certificates/${item.fileName}" alt="certificate">
            </div>
            <div class="certificatePage__card__title"><h2>${item.title}</h2></div>
        </div>`
    }).join("")

    certificateContainer.innerHTML = template
}

getCertificates()