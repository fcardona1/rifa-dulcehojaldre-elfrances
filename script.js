const API_URL = "hhttps://script.google.com/macros/s/AKfycby0at88pOmKQ4Xi6kBDvtenHeA6t_txeO0VIkeH2Wck7NHh74y1qouDu3oJNp_aa8vUGA/exec";
const contenedor = document.getElementById("numeros");
const loading = document.getElementById("loading");

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

async function registrar(numero, elemento) {
  const confirmar = confirm(`¿Confirmas el número ${numero}?`);
  if (!confirmar) return;

  const nombre = prompt("Escribe tu nombre completo:");
  if (!nombre || nombre.trim() === "") {
    alert("El nombre es obligatorio");
    return;
  }

  // Mostrar indicador de carga
  elemento.style.opacity = "0.5";
  elemento.style.pointerEvents = "none";

  try {
    // SIN mode: "no-cors" para que funcione correctamente
    const response = await fetch(API_URL, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        numero: numero,
        nombre: nombre.trim()
      })
    });

    const result = await response.json();
    
    if (result.success) {
      alert(`🎉 ¡Número registrado con éxito!

Nombre: ${nombre}
Número: ${numero}

¡Mucha suerte!`);

      // Bloquear número visualmente
      elemento.style.background = "#999";
      elemento.style.color = "#fff";
      elemento.style.opacity = "1";
      elemento.textContent = "X";
      elemento.onclick = null;
    } else {
      throw new Error(result.error || "Error desconocido");
    }

  } catch (error) {
    alert("❌ Error al registrar: " + error.message);
    console.error("Error completo:", error);
    
    // Restaurar número
    elemento.style.opacity = "1";
    elemento.style.pointerEvents = "auto";
  }
}

cargarNumeros();
