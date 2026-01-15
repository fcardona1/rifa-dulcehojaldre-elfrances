const API_URL = "https://script.google.com/macros/s/AKfycbyzxYC1Hj92FJYXN5QvgLNyc4SeuuIKC9tfp38uK-x1IIPou62-MZrxfUwlrvgG5ZbbUQ/exec";
const contenedor = document.getElementById("numeros");
const loading = document.getElementById("loading");

// 🔥 CARGAR NÚMEROS AL INICIO
async function cargarNumeros() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    loading.style.display = "none";
    
    data.forEach(item => {
      const num = document.createElement("div");
      num.textContent = item.numero;
      num.style.cssText = `
        width:55px;
        height:55px;
        border-radius:50%;
        background:#1c120c;
        color:#ffd369;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:'Montserrat', sans-serif;
        font-weight:600;
        cursor:pointer;
        transition:transform .2s, box-shadow .2s;
      `;
      
      if (item.ocupado) {
        num.style.background = "#999";
        num.style.color = "#fff";
        num.style.pointerEvents = "none";
        num.textContent = "X";
      } else {
        num.onmouseover = () => {
          num.style.transform = "scale(1.1)";
          num.style.boxShadow = "0 6px 15px rgba(0,0,0,.25)";
        };
        num.onmouseout = () => {
          num.style.transform = "scale(1)";
          num.style.boxShadow = "none";
        };
        num.onclick = () => registrar(item.numero, num);
      }
      
      contenedor.appendChild(num);
    });
  } catch (error) {
    loading.textContent = "❌ Error al cargar. Recarga la página.";
    console.error("Error:", error);
  }
}

// 🔥 REGISTRAR NÚMERO
async function registrar(numero, elemento) {
  const confirmar = confirm(`¿Confirmas el número ${numero}?`);
  if (!confirmar) return;

  const nombre = prompt("Escribe tu nombre completo:");
  if (!nombre || nombre.trim() === "") {
    alert("El nombre es obligatorio");
    return;
  }

  const telefono = prompt("Escribe tu teléfono:");
  if (!telefono || telefono.trim() === "") {
    alert("El teléfono es obligatorio");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        numero: numero, 
        nombre: nombre.trim(), 
        telefono: telefono.trim() 
      })
    });

    alert(`🎉 ¡Número registrado con éxito!

Nombre: ${nombre}
Número: ${numero}

¡Mucha suerte!`);

    // BLOQUEAR NÚMERO
    elemento.style.background = "#999";
    elemento.style.color = "#fff";
    elemento.style.pointerEvents = "none";
    elemento.textContent = "X";
    elemento.onclick = null;

  } catch (error) {
    alert("❌ Error al registrar. Intenta de nuevo.");
    console.error("Error:", error);
  }
}

// INICIAR
cargarNumeros();
