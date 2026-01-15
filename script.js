const API_URL = "https://script.google.com/macros/s/AKfycbyzxYC1Hj92FJYXN5QvgLNyc4SeuuIKC9tfp38uK-x1IIPou62-MZrxfUwlrvgG5ZbbUQ/exec";
const contenedor = document.getElementById("numeros");

/* 🔹 CARGAR NÚMEROS DESDE GOOGLE SHEETS */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "numero";

      if (item.ocupado) {
        div.classList.add("ocupado");
        div.innerText = "OCUPADO";
      } else {
        div.classList.add("disponible");
        div.innerText = item.numero;
        div.onclick = () => registrar(item.numero);
      }

      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    alert("❌ Error cargando números");
    console.error(err);
  });

/* 🔹 REGISTRAR NÚMERO */
function registrar(numero) {
  const nombre = prompt("Escribe tu nombre");
  if (!nombre) return;

  const telefono = prompt("Escribe tu teléfono");
  if (!telefono) return;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      numero: numero.toString().padStart(2, '0'),
      nombre,
      telefono
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("🎉 Número registrado con éxito");
    location.reload(); // 🔁 refresca y bloquea
  })
  .catch(err => {
    alert("❌ Error al registrar");
    console.error(err);
  });
}
