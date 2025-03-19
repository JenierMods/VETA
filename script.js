// Recuperar datos de la suscripción
let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
let lastPaymentDate = localStorage.getItem('lastPaymentDate');
let subscriptionType = localStorage.getItem('subscriptionType');

document.addEventListener("DOMContentLoaded", function() {
  // Verifica el estado de la suscripción y muestra/oculta secciones
  if (isSubscribed && checkSubscription()) {
    document.getElementById('subscription').style.display = 'none';
    document.getElementById('scannerSection').style.display = 'block';
    document.getElementById('scanBtn').style.display = 'inline-block';
  } else {
    document.getElementById('subscription').style.display = 'block';
    document.getElementById('scannerSection').style.display = 'none';
    document.getElementById('scanBtn').style.display = 'none';
  }
  
  // Animar la aparición de las cajas de suscripción
  animateSubscriptionBoxes();
});

// Función para animar la aparición de las cajas de suscripción
function animateSubscriptionBoxes() {
  const boxes = document.querySelectorAll('.subscription-box');
  boxes.forEach((box, index) => {
    setTimeout(() => {
      box.classList.add('animate');
    }, 300 * index);
  });
}

// Verificar si la suscripción sigue activa según el tipo de plan
function checkSubscription() {
  if (!lastPaymentDate || !subscriptionType) return false;
  
  const paymentDate = new Date(lastPaymentDate);
  const currentDate = new Date();
  const diffTime = currentDate - paymentDate;
  const daysAllowed = subscriptionType === 'annual' ? 365 : 30;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  return diffDays <= daysAllowed;
}

// Abrir la sección de pago y cargar el botón de PayPal según el tipo de suscripción
function openPayment(type) {
  localStorage.setItem('subscriptionType', type);
  document.getElementById('subscription').style.display = 'none';
  document.getElementById('paymentSection').style.display = 'block';
  loadPayPalButton(type);
}

// Cargar el botón de PayPal con el precio adecuado
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
        document.getElementById('paymentSection').style.display = 'none';
        document.getElementById('scannerSection').style.display = 'block';
        document.getElementById('scanBtn').style.display = 'inline-block';
      });
    },
    onError: function(err) {
      console.error("Error al procesar el pago", err);
      alert("Hubo un error con el pago. Intenta de nuevo.");
    }
  }).render('#paypal-button-container');
}




// Función para abrir el modal de inicio de sesión
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block";
}

// Función para cerrar el modal de inicio de sesión
function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
  let modal = document.getElementById("loginModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Manejar el inicio de sesión (simulado)
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
  if (email === "admin@example.com" && password === "1234") {
    alert("Inicio de sesión exitoso");
    closeLoginModal();
  } else {
    alert("Correo o contraseña incorrectos");
  }
});