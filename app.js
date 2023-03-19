const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP__IMG = document.querySelector(".popup__img");
const ARROW__LEFT = document.querySelector(".popup__arrow--left");
const ARROW__RIGHT = document.querySelector(".popup__arrow--right");

let currentImgIndex;

const showNextImg = () => {
    if (currentImgIndex === THUMBNAILS.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex = currentImgIndex + 1;
    }
    POPUP__IMG.src = THUMBNAILS[currentImgIndex].src;
};

const showPreviousImg = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = THUMBNAILS.length - 1;
    } else {
        currentImgIndex = currentImgIndex - 1;
    }
    POPUP__IMG.src = THUMBNAILS[currentImgIndex].src;
};

const closePopup = () => {
    POPUP.classList.add("fade-out");
    setTimeout(() => {
        POPUP.classList.add("hidden");
        POPUP.classList.remove("fade-out");
        THUMBNAILS.forEach((element) => {
            element.setAttribute("tabindex", 1);
        });
    }, 300);
};

THUMBNAILS.forEach((thumbnail, index) => {
    const showPopup = (e) => {
        POPUP.classList.remove("hidden");
        POPUP__IMG.src = e.target.src;
        currentImgIndex = index;
        THUMBNAILS.forEach((element) => {
            element.setAttribute("tabindex", -1);
        });
    };
    thumbnail.addEventListener("click", showPopup);

    thumbnail.addEventListener("keydown", (e) => {
        if (e.code === "Enter" || e.keycode === 13) {
            showPopup(e);
        }
    });
});

POPUP_CLOSE.addEventListener("click", closePopup);

ARROW__RIGHT.addEventListener("click", showNextImg);

ARROW__LEFT.addEventListener("click", showPreviousImg);

document.addEventListener("keydown", (e) => {
    if (!POPUP.classList.contains("hidden")) {
        if (e.code === "ArrowRight" || e.keycode === 39) {
            showNextImg();
        }
        if (e.code === "ArrowLeft" || e.keycode === 37) {
            showPreviousImg();
        }
        if (e.code === "Escape" || e.keycode === 27) {
            closePopup();
        }
    }
});

POPUP.addEventListener("click", (e) => {
    if (e.target === POPUP) {
        closePopup();
    }
});
