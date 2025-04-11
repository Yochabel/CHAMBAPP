document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const listaChambasDiv = document.getElementById("listaChambas");

  const perfilRes = await fetch("http://localhost:3000/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const perfil = await perfilRes.json();

  const role = perfil.role;
  const id = perfil.clients_id || perfil.Clients_ID || perfil.chambeadores_id || perfil.Chambeadores_ID;
  const endpoint = role === "cliente"
    ? `http://localhost:3001/api/chambas/client/${id}`
    : `http://localhost:3001/api/chambas/chambeador/${id}`;

  const chambasRes = await fetch(endpoint);
  const chambas = await chambasRes.json();

  const tabla = document.createElement("table");
  tabla.innerHTML = chambas.map(ch => `
    <tr>
      <td>${ch.servicio}</td>
      <td><button onclick="iniciarChat(${ch.chamba_id}, '${role}', ${role === 'cliente' ? ch.chambeador_id : ch.client_id})">Chat</button></td>
    </tr>
  `).join('');
  listaChambasDiv.appendChild(tabla);
});

function iniciarChat(chambaId, role, receiverId) {
  const userId = localStorage.getItem("userId") || crypto.randomUUID();
  localStorage.setItem("roomId", chambaId);
  localStorage.setItem("receiverId", receiverId);
  localStorage.setItem("userId", userId);
  window.location.href = "../html/chat.html";
}
