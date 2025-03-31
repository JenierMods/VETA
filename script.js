document.addEventListener("DOMContentLoaded", function() {
  checkLoginStatus();
  updateSubscriptionStatus();
  animateSubscriptionBoxes();
});
function checkLoginStatus() {
  let userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    console.log("Usuario autenticado:", userEmail);
    document.querySelector(".g_id_signin").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    updateBonitaVisibility(userEmail);
  } else {
    console.log("Usuario no autenticado");
    document.querySelector(".g_id_signin").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("bonita").style.display = "none";
  }
}
function updateSubscriptionStatus() {
  let userEmail = localStorage.getItem("userEmail");
  let subscriptionData = getUserSubscription(userEmail);
  if (subscriptionData && checkSubscription(subscriptionData.lastPaymentDate, subscriptionData.subscriptionType)) {
    document.getElementById('subscription').style.display = 'none';
    document.getElementById('scannerSection').style.display = 'block';
    let scanBtn = document.getElementById('scanBtn');
    if (scanBtn) scanBtn.style.display = 'inline-block';
  } else {
    document.getElementById('subscription').style.display = 'block';
    document.getElementById('scannerSection').style.display = 'none';
    let scanBtn = document.getElementById('scanBtn');
    if (scanBtn) scanBtn.style.display = 'none';
  }
}
function getUserSubscription(email) {
  if (!email) return null;
  return JSON.parse(localStorage.getItem(`subscription_${email}`)) || null;
}
function saveUserSubscription(email, subscriptionData) {
  if (!email) return;
  localStorage.setItem(`subscription_${email}`, JSON.stringify(subscriptionData));
}
function checkSubscription(lastPaymentDate, subscriptionType) {
  if (!lastPaymentDate || !subscriptionType) return false;
  const paymentDate = new Date(lastPaymentDate);
  const currentDate = new Date();
  const diffTime = currentDate - paymentDate;
  const daysAllowed = subscriptionType === 'annual' ? 365 : 30;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= daysAllowed;
}
function updateBonitaVisibility(userEmail) {
  let subscriptionData = getUserSubscription(userEmail);
  if (subscriptionData && checkSubscription(subscriptionData.lastPaymentDate, subscriptionData.subscriptionType)) {
    document.getElementById("bonita").style.display = "block";
  } else {
    document.getElementById("bonita").style.display = "none";
  }
}
function openPayment(type) {
  document.getElementById('subscription').style.display = 'none';
  document.getElementById('paymentSection').style.display = 'block';
  loadPayPalButton(type);
}
function loadPayPalButton(type) {
  let price = type === 'annual' ? '149.99' : '19.99';
  document.getElementById('paypal-button-container').innerHTML = '';
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{ amount: { value: price } }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Pago realizado con éxito. ¡Bienvenido!');
        let userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          alert("Error: No hay usuario autenticado.");
          return;
        }
        let subscriptionData = {
          lastPaymentDate: new Date().toISOString(),
          isSubscribed: true,
          subscriptionType: type
        };
        saveUserSubscription(userEmail, subscriptionData);
        updateSubscriptionStatus();
        updateBonitaVisibility(userEmail);
        document.getElementById('paymentSection').style.display = 'none';
      });
    },
    onError: function(err) {
      console.error("Error al procesar el pago", err);
      alert("Hubo un error con el pago. Intenta de nuevo.");
    }
  }).render('#paypal-button-container');
}
function animateSubscriptionBoxes() {
  const boxes = document.querySelectorAll('.subscription-box');
  boxes.forEach((box, index) => {
    setTimeout(() => {
      box.classList.add('animate');
    }, 300 * index);
  });
}
function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userPicture");
  console.log("Usuario ha cerrado sesión");
  const logoutMessage = document.createElement('div');
  logoutMessage.classList.add('login-message');
  logoutMessage.textContent = "Has cerrado sesión exitosamente.";
  document.body.appendChild(logoutMessage);
  setTimeout(() => {
    logoutMessage.style.opacity = '0';
    setTimeout(() => {
      logoutMessage.remove();
    }, 500);
  }, 3000);
  checkLoginStatus();
  updateSubscriptionStatus();
  document.getElementById("bonita").style.display = "none";
}
function handleCredentialResponse(response) {
  console.log("ID Token recibido:", response.credential);
  try {
    const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
    localStorage.setItem("userName", responsePayload.name);
    localStorage.setItem("userEmail", responsePayload.email);
    localStorage.setItem("userPicture", responsePayload.picture);
    const loginMessage = document.createElement('div');
    loginMessage.classList.add('login-message');
    loginMessage.textContent = `Inicio de sesión exitoso: ${responsePayload.name}`;
    document.body.appendChild(loginMessage);
    setTimeout(() => {
      loginMessage.style.opacity = '0';
      setTimeout(() => {
        loginMessage.remove();
      }, 500);
    }, 3000);
    let signinBtn = document.querySelector(".g_id_signin");
    if (signinBtn) signinBtn.style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    updateSubscriptionStatus();
    updateBonitaVisibility(responsePayload.email);
  } catch (error) {
    console.error("Error al procesar el token JWT:", error);
  }
}
changeFooterTextSize(5);
document.addEventListener("DOMContentLoaded", function() {
  checkLoginStatus();
  updateSubscriptionStatus();
  animateSubscriptionBoxes();
});
function checkLoginStatus() {
  let userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    console.log("Usuario autenticado:", userEmail);
    document.querySelector(".g_id_signin").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
    updateBonitaVisibility(userEmail);
    updateFooterTextVisibility(userEmail);
  } else {
    console.log("Usuario no autenticado");
    document.querySelector(".g_id_signin").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("bonita").style.display = "none";
    document.getElementById("footer-text").style.display = "block";
  }
}
function updateSubscriptionStatus() {
  let userEmail = localStorage.getItem("userEmail");
  let subscriptionData = getUserSubscription(userEmail);
  if (subscriptionData && checkSubscription(subscriptionData.lastPaymentDate, subscriptionData.subscriptionType)) {
    document.getElementById('subscription').style.display = 'none';
    document.getElementById('scannerSection').style.display = 'block';
    let scanBtn = document.getElementById('scanBtn');
    if (scanBtn) scanBtn.style.display = 'inline-block';
    updateFooterTextVisibility(userEmail);
  } else {
    document.getElementById('subscription').style.display = 'block';
    document.getElementById('scannerSection').style.display = 'none';
    let scanBtn = document.getElementById('scanBtn');
    if (scanBtn) scanBtn.style.display = 'none';
  }
}
function updateFooterTextVisibility(userEmail) {
  let subscriptionData = getUserSubscription(userEmail);
  if (subscriptionData && checkSubscription(subscriptionData.lastPaymentDate, subscriptionData.subscriptionType)) {
    document.getElementById("footer-text").style.display = "none";
  } else {
    document.getElementById("footer-text").style.display = "block";
  }
}
function getUserSubscription(email) {
  if (!email) return null;
  return JSON.parse(localStorage.getItem(`subscription_${email}`)) || null;
}
function saveUserSubscription(email, subscriptionData) {
  if (!email) return;
  localStorage.setItem(`subscription_${email}`, JSON.stringify(subscriptionData));
}
function checkSubscription(lastPaymentDate, subscriptionType) {
  if (!lastPaymentDate || !subscriptionType) return false;
  const paymentDate = new Date(lastPaymentDate);
  const currentDate = new Date();
  const diffTime = currentDate - paymentDate;
  const daysAllowed = subscriptionType === 'annual' ? 365 : 30;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= daysAllowed;
}
function updateBonitaVisibility(userEmail) {
  let subscriptionData = getUserSubscription(userEmail);
  if (subscriptionData && checkSubscription(subscriptionData.lastPaymentDate, subscriptionData.subscriptionType)) {
    document.getElementById("bonita").style.display = "block";
  } else {
    document.getElementById("bonita").style.display = "none";
  }
}
function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userPicture");
  console.log("Usuario ha cerrado sesión");
  const logoutMessage = document.createElement('div');
  logoutMessage.classList.add('login-message');
  logoutMessage.textContent = "Has cerrado sesión exitosamente.";
  document.body.appendChild(logoutMessage);
  setTimeout(() => {
    logoutMessage.style.opacity = '0';
    setTimeout(() => {
      logoutMessage.remove();
    }, 500);
  }, 3000);
  checkLoginStatus();
  updateSubscriptionStatus();
  document.getElementById("bonita").style.display = "none";
  document.getElementById("footer-text").style.display = "block";
}
