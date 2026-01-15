const API_URL = "https://script.google.com/macros/s/AKfycbyzxYC1Hj92FJYXN5QvgLNyc4SeuuIKC9tfp38uK-x1IIPou62-MZrxfUwlrvgG5ZbbUQ/exec";

const contenedor = document.getElementById("numeros");

for (let i = 1; i <= 99; i++) {
  const n = document.createElement("div");
  n.className = "numero";
  n.innerText = i;

  n.onclick = () => registrar(i);

  contenedor.appendChild(n);
}

function registrar(numero) {
  const nombre = prompt("Escribe tu nombre");
  if (!nombre) return;

  const telefono = prompt("Escribe tu teléfono");
  if (!telefono) return;

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ numero, nombre, telefono })
  })
  .then(() => alert("🎉 Número registrado con éxito"))
  .catch(() => alert("❌ Error al registrar"));
}
