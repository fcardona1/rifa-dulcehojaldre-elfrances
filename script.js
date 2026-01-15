<script>
  const API_URL = "https://script.google.com/macros/s/AKfycbxdS5giLmSwJPDMJ_OzAV062UhVYgdxeYThHHZLvLeOeipzJNAeoMuhcfGHJMayqpnLZg/exec";

  const contenedor = document.getElementById("numeros");

  for (let i = 1; i <= 99; i++) {
    const num = document.createElement("div");
    num.textContent = i;

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

    num.onmouseover = () => {
      num.style.transform = "scale(1.1)";
      num.style.boxShadow = "0 6px 15px rgba(0,0,0,.25)";
    };

    num.onmouseout = () => {
      num.style.transform = "scale(1)";
      num.style.boxShadow = "none";
    };

    // 👉 CLICK FUNCIONAL
    num.onclick = () => registrar(i, num);

    contenedor.appendChild(num);
  }

  function registrar(numero, elemento) {
    if (!confirm(`¿Confirmas el número ${numero}?`)) return;

    const nombre = prompt("Escribe tu nombre completo");
    if (!nombre) return;

    const telefono = prompt("Escribe tu teléfono");
    if (!telefono) return;

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ numero, nombre, telefono })
    })
    .then(res => res.json())
    .then(() => {
      alert("🎉 Número registrado con éxito");

      // 🔒 Bloqueo visual
      elemento.style.background = "#cfa349";
      elemento.style.color = "#5a3620";
      elemento.style.cursor = "not-allowed";
      elemento.onclick = null;
    })
    .catch(() => alert("❌ Error al registrar"));
  }
</script>
