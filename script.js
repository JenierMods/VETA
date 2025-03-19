document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
    updateSubscriptionStatus();
    animateSubscriptionBoxes();
});

// Verificar si el usuario está autenticado
function checkLoginStatus() {
    let userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
        console.log("Usuario autenticado:", userEmail);
        document.querySelector(".g_id_signin").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
    } else {
        console.log("Usuario no autenticado");
        document.querySelector(".g_id_signin").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    }
}

// Función para actualizar la UI con el estado de suscripción
function updateSubscriptionStatus() {
    let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    let lastPaymentDate = localStorage.getItem('lastPaymentDate');
    let subscriptionType = localStorage.getItem('subscriptionType');

    if (isSubscribed && checkSubscription(lastPaymentDate, subscriptionType)) {
        document.getElementById('subscription').style.display = 'none';
        document.getElementById('scannerSection').style.display = 'block';
        let scanBtn = document.getElementById('scanBtn');
        if (scanBtn) scanBtn.style.display = 'inline-block';
    } else {
        document.getElementById('subscription').style.display = 'block'; // Asegurar que se muestre la suscripción
        document.getElementById('scannerSection').style.display = 'none';
        let scanBtn = document.getElementById('scanBtn');
        if (scanBtn) scanBtn.style.display = 'none';
    }
}

// Verificar si la suscripción sigue activa
function checkSubscription(lastPaymentDate, subscriptionType) {
    if (!lastPaymentDate || !subscriptionType) return false;

    const paymentDate = new Date(lastPaymentDate);
    const currentDate = new Date();
    const diffTime = currentDate - paymentDate;
    const daysAllowed = subscriptionType === 'annual' ? 365 : 30;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= daysAllowed;
}

// Mostrar opciones de pago
function openPayment(type) {
    document.getElementById('subscription').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
    loadPayPalButton(type);
}

// Cargar botón de pago de PayPal
function loadPayPalButton(type) {
    let price = type === 'annual' ? '150.00' : '20.00';
    document.getElementById('paypal-button-container').innerHTML = '';

    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{ amount: { value: price } }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('Pago realizado con éxito. ¡Bienvenido!');
                localStorage.setItem('lastPaymentDate', new Date().toISOString());
                localStorage.setItem('isSubscribed', 'true');
                localStorage.setItem('subscriptionType', type);
                updateSubscriptionStatus();
                document.getElementById('paymentSection').style.display = 'none';
            });
        },
        onError: function (err) {
            console.error("Error al procesar el pago", err);
            alert("Hubo un error con el pago. Intenta de nuevo.");
        }
    }).render('#paypal-button-container');
}

// Animación de aparición de las cajas de suscripción
function animateSubscriptionBoxes() {
    const boxes = document.querySelectorAll('.subscription-box');
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add('animate');
        }, 300 * index);
    });
}

// Cerrar sesión
function logout() {
    sessionStorage.clear();
    alert("Has cerrado sesión");
    checkLoginStatus();
    updateSubscriptionStatus(); // Asegurar que la UI vuelva a la vista de suscripción
}






document.addEventListener("DOMContentLoaded", function() {
  checkLoginStatus();
  updateSubscriptionStatus();
  animateSubscriptionBoxes();
});

// Verificar si el usuario está autenticado
function checkLoginStatus() {
  let userEmail = localStorage.getItem("userEmail");
  
  if (userEmail) {
    console.log("Usuario autenticado:", userEmail);
    document.querySelector(".g_id_signin").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
  } else {
    console.log("Usuario no autenticado");
    document.querySelector(".g_id_signin").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
  }
}

// Función para actualizar la UI con el estado de suscripción
function updateSubscriptionStatus() {
  let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
  let lastPaymentDate = localStorage.getItem('lastPaymentDate');
  let subscriptionType = localStorage.getItem('subscriptionType');
  
  if (isSubscribed && checkSubscription(lastPaymentDate, subscriptionType)) {
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

// Verificar si la suscripción sigue activa
function checkSubscription(lastPaymentDate, subscriptionType) {
  if (!lastPaymentDate || !subscriptionType) return false;
  
  const paymentDate = new Date(lastPaymentDate);
  const currentDate = new Date();
  const diffTime = currentDate - paymentDate;
  const daysAllowed = subscriptionType === 'annual' ? 365 : 30;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= daysAllowed;
}

// Mostrar opciones de pago
function openPayment(type) {
  document.getElementById('subscription').style.display = 'none';
  document.getElementById('paymentSection').style.display = 'block';
  loadPayPalButton(type);
}

// Cargar botón de pago de PayPal
function loadPayPalButton(type) {
  let price = type === 'annual' ? '150.00' : '20.00';
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
        localStorage.setItem('lastPaymentDate', new Date().toISOString());
        localStorage.setItem('isSubscribed', 'true');
        localStorage.setItem('subscriptionType', type);
        updateSubscriptionStatus();
        document.getElementById('paymentSection').style.display = 'none';
      });
    },
    onError: function(err) {
      console.error("Error al procesar el pago", err);
      alert("Hubo un error con el pago. Intenta de nuevo.");
    }
  }).render('#paypal-button-container');
}

// Animación de aparición de las cajas de suscripción
function animateSubscriptionBoxes() {
  const boxes = document.querySelectorAll('.subscription-box');
  boxes.forEach((box, index) => {
    setTimeout(() => {
      box.classList.add('animate');
    }, 300 * index);
  });
}

// Cerrar sesión
function logout() {
  localStorage.clear();
  console.log("Usuario ha cerrado sesión");
  
  // Mostrar mensaje de éxito con estilo bonito en el centro
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
  
  // Actualizar el estado de la sesión y suscripción
  checkLoginStatus();
  updateSubscriptionStatus();
}

function handleCredentialResponse(response) {
  console.log("ID Token recibido:", response.credential);
  
  try {
    const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
    localStorage.setItem("userName", responsePayload.name);
    localStorage.setItem("userEmail", responsePayload.email);
    localStorage.setItem("userPicture", responsePayload.picture);
    
    // Mostrar mensaje de éxito con un estilo bonito
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
    
    // Ocultar botón de inicio de sesión si existe
    let signinBtn = document.querySelector(".g_id_signin");
    if (signinBtn) signinBtn.style.display = "none";
    
    // Mostrar botón de cierre de sesión
    document.getElementById("logoutBtn").style.display = "block";
    
  } catch (error) {
    console.error("Error al procesar el token JWT:", error);
  }
}
