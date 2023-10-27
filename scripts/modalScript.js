let pin_image_blob = null;
const upload_img = document.querySelector("#uploadImg");
const upload_img_label = document.querySelector("#uploadImgLabel");
const modal_pin_image_container = document.querySelector(".addPinModal .pinImage");

upload_img.addEventListener("change", (event) => {
    const { files } = event.target;

    if (files && files[0] && /image\/*/.test(files[0].type)) {
        const reader = new FileReader();

        reader.onload = function() {
            const new_image = new Image();
            new_image.src = reader.result;
            pin_image_blob = reader.result;

            new_image.onload = function() {
                const modals_pin = document.querySelector(".addPinModal .modalsPin");
                new_image.classList.add("pinMaxWidth");

                modal_pin_image_container.appendChild(new_image);

                upload_img_label.style.display = "none";
                modals_pin.style.display = "block";

                const { width, height } = new_image.getBoundingClientRect();
                const parent_width = new_image.parentElement.getBoundingClientRect().width;
                const parent_height = new_image.parentElement.getBoundingClientRect().height;

                if (width < parent_width || height < parent_height) {
                    new_image.classList.remove("pinMaxWidth");
                    new_image.classList.add("pinMaxHeight");
                }

                modals_pin.style.opacity = 1;
            };
        };

        reader.readAsDataURL(files[0]);
    }

    upload_img.value = "";
});

document.querySelector(".savePin").addEventListener("click", () => {
    const users_data = {
        author: "Jack",
        board: "default",
        title: document.querySelector("#pin_title").value,
        description: document.querySelector("#pin_description").value,
        destination: document.querySelector("#pin_destination").value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector("#pin_size").value,
    };

    console.log(users_data);
});
