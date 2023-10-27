const addPinModal = document.querySelector(".addPinModal");
const uploadImg = document.querySelector("#uploadImg");
const pinTitleInput = document.querySelector("#pinTitle");
const pinDescriptionInput = document.querySelector("#pinDescription");
const pinDestinationInput = document.querySelector("#pinDestination");
const pinSizeInput = document.querySelector("#pinSize");
const modalPinImageContainer = document.querySelector(".addPinModal .pinImage");
const modalPin = document.querySelector(".addPinModal .modalsPin");
const uploadImgLabel = document.querySelector("#uploadImgLabel");

document.querySelector(".addPin").addEventListener("click", showAddPinModal);

addPinModal.addEventListener("click", (event) => {
    if (event.target === addPinModal) {
        resetModal();
    }
});

let pinImageBlob = null;

uploadImg.addEventListener("change", handleImageUpload);

document.querySelector(".savePin").addEventListener("click", savePin);

function showAddPinModal() {
    addPinModal.style.opacity = 1;
    addPinModal.style.pointerEvents = "all";
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && /image\/*/.test(file.type)) {
        const reader = new FileReader();

        reader.onload = function () {
            displayImageInModal(reader.result);
        };

        reader.readAsDataURL(file);
    }

    uploadImg.value = "";
}

function displayImageInModal(imageSrc) {
    const newImage = new Image();
    newImage.src = imageSrc;
    pinImageBlob = imageSrc;

    newImage.onload = () => {
        modalPinImageContainer.appendChild(newImage);
        uploadImgLabel.style.display = "none";
        adjustImageSize(newImage);
        modalPin.style.display = "block";
        modalPin.style.opacity = 1;
    };
}

function adjustImageSize(imageElement) {
    imageElement.classList.add("pinMaxWidth");
    const imageRect = imageElement.getBoundingClientRect();
    const parentRect = imageElement.parentElement.getBoundingClientRect();

    if (imageRect.width < parentRect.width || imageRect.height < parentRect.height) {
        imageElement.classList.remove("pinMaxWidth");
        imageElement.classList.add("pinMaxHeight");
    }
}

function savePin() {
    const pinData = {
        author: "Jack",
        board: "default",
        title: pinTitleInput.value,
        description: pinDescriptionInput.value,
        destination: pinDestinationInput.value,
        imgBlob: pinImageBlob,
        pinSize: pinSizeInput.value,
    };

    createPin(pinData);
    resetModal();
}

function createPin(pinDetails) {
    const newPin = document.createElement("DIV");
    const newImage = new Image();

    newImage.src = pinDetails.imgBlob;
    newImage.onload = () => {
        newPin.classList.add("card");
        newImage.classList.add("pinMaxWidth");
        newPin.innerHTML = `
            <div class="pinTitle">${pinDetails.title}</div>
            <div class="pinModal">
                <div class="modalHead">
                    <div class="saveCard">Save</div>
                </div>
                <div class="modalFoot">
                    <div class="destination">
                        <div class="pinMockIconContainer">
                            <img src="./images/upper-right-arrow.png" alt="destination" class="pinMockIcon">
                        </div>
                        <span>${pinDetails.destination}</span>
                    </div>
                    <div class="pinMockIconContainer">
                        <img src="./images/send.png" alt="send" class="pinMockIcon">
                    </div>
                    <div class="pinMockIconContainer">
                        <img src="./images/ellipse.png" alt="edit" class="pinMockIcon">
                    </div>
                </div>
                <div class="pinImage"></div>
        `;

        document.querySelector(".pinContainer").appendChild(newPin);
        newPin.querySelector(".pinImage").appendChild(newImage);

        adjustImageSize(newImage);
        newPin.style.opacity = 1;
    };
}

function resetModal() {
    addPinModal.style.opacity = 0;
    addPinModal.style.pointerEvents = "none";
    uploadImgLabel.style.display = "block";
    modalPin.style.display = "none";
    modalPin.style.opacity = 0;

    if (modalPinImageContainer.firstChild) {
        modalPinImageContainer.removeChild(modalPinImageContainer.firstChild);
    }

    pinTitleInput.value = "";
    pinDescriptionInput.value = "";
    pinDestinationInput.value = "";
    pinSizeInput.value = "";
    pinImageBlob = null;
}
