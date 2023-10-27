const picture_input = document.querySelector("#picture");
const pin_image = document.querySelector(".pinImage img");

picture_input.addEventListener("change", (event) => {
    const [file] = event.target.files;

    if (file && /image\/*/.test(file.type)) {
        const reader = new FileReader();
        
        reader.onload = function() {
            pin_image.src = reader.result;
        };
        
        reader.readAsDataURL(file);
    }
    
    picture_input.value = "";
});
