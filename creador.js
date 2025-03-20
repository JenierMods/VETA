function resizeImage() {
    var size = document.getElementById("image-size").value;
    var image = document.getElementById("creatorImage");
    image.style.width = size + "px";
    image.style.height = size + "px";
    document.getElementById("image-size-value").textContent = size + "px";
}
const creatorImage = document.querySelector('.creator-image');
let isAnimatingOut = false;
creatorImage.addEventListener('click', toggleAnimation);
function toggleAnimation() {
  if (!isAnimatingOut) {
    creatorImage.classList.add('animate-out');
    isAnimatingOut = true;
  } else {
    creatorImage.classList.remove('animate-out');
    creatorImage.classList.add('animate-in');
    setTimeout(() => {
      creatorImage.classList.remove('animate-in');
      isAnimatingOut = false;
    }, 1000);
  }
}
function openWhatsApp() {
  window.open('https://wa.me/+50577530939?text=Hola%20Papi%20Rico🫦', '_blank');
}
function openFacebook() {
    window.open('https://www.facebook.com/share/1B7o3hPAr4/', '_blank');
}
function openGithub() {
    window.open('https://github.com/JenierMods', '_blank');
}

function openPayPal() {
    window.open('https://paypal.me/JenierMods?country.x=NI&locale.x=es_XC', '_blank');
}
