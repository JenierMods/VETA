document.addEventListener("DOMContentLoaded", function() {
    const supportForm = document.getElementById("supportForm");
    const claimsList = document.getElementById("claimsList");
    supportForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const issue = document.getElementById("issue").value;
        if (name && email && issue) {
            const claimItem = document.createElement("li");
            claimItem.textContent = `${name} (${email}): ${issue}`;
            claimsList.appendChild(claimItem);
            supportForm.reset();
            alert("Reclamación enviada con éxito.");
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
});
function enviarCorreo() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;
    if (!nombre || !correo || !mensaje) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    const asunto = encodeURIComponent("Reclamación de Cliente - VETA");
    const cuerpo = encodeURIComponent(`Nombre: ${nombre}%0AEmail: ${correo}%0A%0AMensaje:%0A${mensaje}`);
    window.location.href = `mailto:VETANCR@gmail.com?subject=${asunto}&body=${cuerpo}`;
}
function enviarWhatsApp() {
    const nombre = document.getElementById("nombre").value;
    const mensaje = document.getElementById("mensaje").value;
    if (!nombre || !mensaje) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    const numeroWhatsApp = "+50577530939";
    const texto = encodeURIComponent(`Hola, soy ${nombre}. Tengo la siguiente reclamación: ${mensaje}`);
    window.open(`https://wa.me/${numeroWhatsApp}?text=${texto}`, "_blank");
}
document.getElementById("reclamacionForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const reclamacion = document.getElementById("reclamacion").value;
  const email = document.getElementById("email").value;
  localStorage.setItem("reclamacion", reclamacion);
  localStorage.setItem("email", email);
  document.getElementById("respuesta").style.display = "block";
  document.getElementById("whatsappBtn").disabled = false;
  document.getElementById("gmailBtn").disabled = false;
});
function enviarCorreo() {
  const reclamacion = localStorage.getItem("reclamacion");
  const email = localStorage.getItem("email");
  const mailtoLink = `mailto:VETANCR@gmail.com?subject=Reclamación desde VETA&body=${encodeURIComponent(reclamacion)}`;
  window.location.href = mailtoLink;
  localStorage.removeItem("reclamacion");
  localStorage.removeItem("email");
  document.getElementById("whatsappBtn").disabled = true;
  document.getElementById("gmailBtn").disabled = true;
  document.getElementById("respuesta").style.display = "none";
}
function enviarWhatsApp() {
  const reclamacion = localStorage.getItem("reclamacion");
  const email = localStorage.getItem("email");
  const message = `Reclamación: ${reclamacion}\nCorreo: ${email}`;
  const phoneNumber = "+50577530939";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");
  localStorage.removeItem("reclamacion");
  localStorage.removeItem("email");
  document.getElementById("whatsappBtn").disabled = true;
  document.getElementById("gmailBtn").disabled = true;
  document.getElementById("respuesta").style.display = "none";
}
document.getElementById('toggleReglasBtn').addEventListener('click', function() {
    let historial = document.getElementById('historial');
    let boton = document.getElementById('toggleReglasBtn');
    if (historial.style.display === "none" || historial.style.display === "") {
        historial.style.display = "block";
        boton.textContent = "❌ Quitar Reglas";
    } else {
        historial.style.display = "none";
        boton.textContent = "📜 Reglas";
    }
});
