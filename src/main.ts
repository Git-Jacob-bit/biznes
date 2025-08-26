import './dist/main.css'


window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
  document.body.classList.add("page-enter");
});

// Animacje fade-in-on-scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 }
)

document.querySelectorAll(".fade-in-on-scroll").forEach(el => {
  observer.observe(el)
})

// Animacja wejścia strony
document.body.classList.add("page-enter");

// Animacja wyjścia przy klikaniu w linki
document.querySelectorAll("a[href]").forEach(link => {
  const href = link.getAttribute("href");
  if (!href || href.includes("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

  link.addEventListener("click", e => {
    e.preventDefault();
    document.body.classList.add("page-leave");

    setTimeout(() => {
      window.location.href = href;
    }, 300); // dopasuj do długości animacji .pageOut
  });
});

const form = document.getElementById("contact-form") as HTMLFormElement;
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // zablokuj domyślną wysyłkę

    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/movladwd", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        if (status) {
          status.textContent = "✅ Dziękuję! Wiadomość została wysłana.";
          status.style.color = "green";
        }
      } else {
        if (status) {
          status.textContent = "❌ Coś poszło nie tak. Spróbuj ponownie później.";
          status.style.color = "red";
        }
      }
    } catch (error) {
      if (status) {
        status.textContent = "❌ Błąd połączenia. Sprawdź internet.";
        status.style.color = "red";
      }
    }
  });
}


