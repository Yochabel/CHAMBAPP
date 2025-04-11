document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("abrirChat").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const chambaId = localStorage.getItem("chambaId");

    const perfilRes = await fetch("http://localhost:3000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const perfil = await perfilRes.json();
    const userId = perfil.clients_id || perfil.Clients_ID || perfil.chambeadores_id || perfil.Chambeadores_ID;
    const role = perfil.role;

    const chambaRes = await fetch(`http://localhost:3001/api/chambas/${chambaId}`);
    const chamba = await chambaRes.json();
    const receiverId = role === "cliente" ? chamba.chambeador_id : chamba.client_id;

    localStorage.setItem("roomId", chambaId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("receiverId", receiverId);
    window.location.href = "../html/chat.html";
  });
});
