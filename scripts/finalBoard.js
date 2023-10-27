// Constants and variables
const addPinModal = document.querySelector(".addPinModal");
let pinImageBlob = null;

// Display modal when 'addPin' is clicked
document.querySelector(".addPin").addEventListener("click", () => {
    addPinModal.style.opacity = 1;
    addPinModal.style.pointerEvents = "all";
});

// Hide modal when clicking outside
document.querySelector(".addPinModal").addEventListener("click", (event) => {
    if (event.target === addPinModal) {
        resetModal();
    }
});

// Image upload handler
document.querySelector("#uploadImg").addEventListener("change", (event) => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function () {
                const newImage = new Image();
                newImage.src = reader.result;
                pinImageBlob = reader.result;

                newImage.onload = function () {
                    const modalsPin = document.querySelector(".addPinModal .modalsPin");
                    newImage.classList.add("pinMaxWidth");
                    document.querySelector(".addPinModal .pinImage").appendChild(newImage);
                    document.querySelector("#uploadImgLabel").style.display = "none";
                    modalsPin.style.display = "block";

                    // Adjust image dimensions if necessary
                    if (
                        newImage.getBoundingClientRect().width <
                        newImage.parentElement.getBoundingClientRect().width ||
                        newImage.getBoundingClientRect().height <
                        newImage.parentElement.getBoundingClientRect().height
                    ) {
                        newImage.classList.remove("pinMaxWidth");
                        newImage.classList.add("pinMaxHeight");
                    }

                    modalsPin.style.opacity = 1;
                };
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
    document.querySelector("#uploadImg").value = "";
});

// Save Pin event handler
document.querySelector(".savePin").addEventListener("click", () => {
    const usersData = {
        author: "Jack",
        board: "default",
        title: document.querySelector("#pinTitle").value,
        description: document.querySelector("#pinDescription").value,
        destination: document.querySelector("#pinDestination").value,
        imgBlob: pinImageBlob,
        pinSize: document.querySelector("#pinSize").value,
    };

    createPin(usersData);
    resetModal();
});

// Function to create a pin
function createPin(pinDetails) {
    const newPin = document.createElement("DIV");
    const newImage = new Image();

    newImage.src = pinDetails.imgBlob;
    newPin.style.opacity = 0;

    newImage.onload = function () {
        newPin.classList.add("card");
        newPin.classList.add(`card${pinDetails.pinSize}`);
        newImage.classList.add("pinMaxWidth");

        newPin.innerHTML = `
            <div class="pinTitle">${pinDetails.title}</div>
            <div class="pinModal">
                <div class="modalHead">
                    <div class="saveCard">Save</div>
                </div>
                <div class="modalFoot">
                    <div class="destination">
                        <div class="pintMockIconContainer">
                            <img src="./images/upper-right-arrow.png" alt="destination" class="pintMockIcon">
                        </div>
                        <span>${pinDetails.destination}</span>
                    </div>
                    <div class="pintMockIconContainer">
                        <img src="./images/send.png" alt="send" class="pintMockIcon">
                    </div>
                    <div class="pintMockIconContainer">
                        <img src="./images/ellipse.png" alt="edit" class="pintMockIcon">
                    </div>
                </div>
            </div>
            <div class="pinImage"></div>
        `;

        document.querySelector(".pinContainer").appendChild(newPin);
        newPin.children[2].appendChild(newImage);

        // Adjust image dimensions if necessary
        if (
            newImage.getBoundingClientRect().width <
            newImage.parentElement.getBoundingClientRect().width ||
            newImage.getBoundingClientRect().height <
            newImage.parentElement.getBoundingClientRect().height
        ) {
            newImage.classList.remove("pinMaxWidth");
            newImage.classList.add("pinMaxHeight");
        }

        newPin.style.opacity = 1;
    };
}

// Function to reset modal
function resetModal() {
    const modalsPin = document.querySelector(".addPinModal .modalsPin");
    addPinModal.style.opacity = 0;
    addPinModal.style.pointerEvents = "none";
    document.querySelector("#uploadImgLabel").style.display = "block";
    modalsPin.style.display = "none";
    modalsPin.style.opacity = 0;

    // Remove uploaded image from the modal if exists
    if (modalsPin.children[0].children[0])
        modalsPin.children[0].removeChild(modalsPin.children[0].children[0]);

    document.querySelector("#pinTitle").value = "";
    document.querySelector("#pinDescription").value = "";
    document.querySelector("#pinDestination").value = "";
    document.querySelector("#pinSize").value = "";
    pinImageBlob = null;
}
