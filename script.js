<script>
  const API_URL = "https://script.google.com/macros/s/AKfycbyzxYC1Hj92FJYXN5QvgLNyc4SeuuIKC9tfp38uK-x1IIPou62-MZrxfUwlrvgG5ZbbUQ/exec";
  const contenedor = document.getElementById("numeros");

  alert("JS CARGADO OK");

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

    // 🔥 AQUÍ ESTABA LO QUE FALTABA
    num.onclick = () => registrar(i, num);

    contenedor.appendChild(num);
  }

  function registrar(numero, elemento) {
    const confirmar = confirm(`¿Confirmas el número ${numero}?`);
    if (!confirmar) return;

    const nombre = prompt("Escribe tu nombre completo");
    if (!nombre) return;

    const telefono = prompt("Escribe tu teléfono");
    if (!telefono) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero, nombre, telefono })
    })
    .then(res => res.json())
    .then(() => {
      alert("🎉 Número registrado con éxito");

      // 🔒 BLOQUEAR NÚMERO VISUALMENTE
      elemento.style.background = "#999";
      elemento.style.color = "#fff";
      elemento.style.pointerEvents = "none";
      elemento.textContent = "X";
    })
    .catch(err => {
      alert("❌ Error al registrar");
      console.error(err);
    });
  }
</script>
