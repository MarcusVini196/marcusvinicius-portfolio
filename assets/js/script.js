function openMenu() {
    document.getElementById("sideMenu").classList.add("open");
}

function closeMenu() {
    document.getElementById("sideMenu").classList.remove("open");
}

const form = document.getElementById("formContato");
const loadingModal = document.getElementById("loadingModal");
const loadingText = document.getElementById("loadingText");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Abrir modal
  loadingModal.classList.add("active");
  loadingText.textContent = "Enviando mensagem...";

  const data = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("mensagem").value
  };

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      loadingText.textContent = "Mensagem enviada com sucesso! ✅";
      form.reset();

      setTimeout(() => {
        loadingModal.classList.remove("active");
      }, 2000);
    } else {
      loadingText.textContent = "Erro ao enviar mensagem ❌";

      setTimeout(() => {
        loadingModal.classList.remove("active");
      }, 2000);
    }
  } catch {
    loadingText.textContent = "Erro de conexão ⚠️";

    setTimeout(() => {
      loadingModal.classList.remove("active");
    }, 2000);
  }
})
