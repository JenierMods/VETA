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
  window.open('https://wa.me/+50577530939', '_blank');
        }

        function openFacebook() {
            window.open('https://www.facebook.com/share/1B7o3hPAr4/', '_blank');
        }
        
        function openGithub() {
            window.open('https://github.com/JenierMods', '_blank');
        }