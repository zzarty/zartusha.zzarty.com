function toggleTOS() {
  const content = document.getElementById("tos-content");
  const header = document.querySelector(".collapsible-header");
  const isOpen = content.classList.contains("open");

  if (isOpen) {
    content.classList.remove("open");
    header.classList.remove("open");
    content.style.maxHeight = "0";
  } else {
    content.classList.add("open");
    header.classList.add("open");
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
}

const form = document.getElementById("commission-form");
const usertag = document.getElementById("usertag");
const tosAgree = document.getElementById("tos-agree");
const error = document.getElementById("error");
let errorTimeout = null;
let isAnimating = false;

form.addEventListener("submit", (event) => {
  let hasError = false;
  let errorMessage = "";

  if (errorTimeout) {
    clearTimeout(errorTimeout);
    errorTimeout = null;
  }

  if (!usertag.validity.valid || usertag.value.trim() === "") {
    errorMessage = "Please enter your Discord/Telegram handle.";
    hasError = true;
  }

  if (!tosAgree.checked) {
    if (hasError) {
      errorMessage =
        "Please enter your Discord/Telegram handle and agree to the Terms of Service.";
    } else {
      errorMessage = "Please agree to the Terms of Service.";
    }
    hasError = true;
  }

  if (hasError) {
    event.preventDefault();
    if (
      error.classList.contains("active") &&
      error.textContent !== errorMessage
    ) {
      isAnimating = true;
      error.classList.remove("active");
      errorTimeout = setTimeout(() => {
        error.textContent = errorMessage;
        error.classList.add("active");
        isAnimating = false;
        errorTimeout = setTimeout(() => {
          error.classList.remove("active");
          errorTimeout = null;
        }, 3000);
      }, 600);
    } else if (!isAnimating) {
      error.textContent = errorMessage;
      error.classList.add("active");
      errorTimeout = setTimeout(() => {
        error.classList.remove("active");
        errorTimeout = null;
      }, 3000);
    }
  } else {
    if (error.classList.contains("active") && !isAnimating) {
      error.classList.remove("active");
    }
    error.textContent = "";
  }
});
