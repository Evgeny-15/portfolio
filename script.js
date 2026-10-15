// Интерактивность портфолио
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Фильтрация проектов
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// Окно с подробностями проекта
const projectInfo = {
  northway: {
    title: "Northway — путешествия",
    description: "Концепция лендинга туристического бренда. В этом учебном примере сделан акцент на крупной типографике, визуальной атмосфере и понятном призыве к действию. Следующий шаг — добавить реальные маршруты и форму заявки.",
    tags: ["Лендинг", "HTML", "CSS", "Адаптивный дизайн"]
  },
  form: {
    title: "FORM — дизайн-студия",
    description: "Концепция сайта креативной студии с минималистичной подачей, выразительными заголовками и геометрическими элементами. В реальном проекте сюда можно добавить кейсы, команду и форму брифа.",
    tags: ["Бизнес", "Типографика", "UI-концепт"]
  },
  mono: {
    title: "Mono — интернет-магазин",
    description: "Визуальная концепция магазина аудиотехники. Демонстрирует композицию товарного промо-блока. Это не полноценный магазин: корзина, платежи и каталог требуют отдельной разработки.",
    tags: ["Концепт", "E-commerce", "CSS"]
  }
};

const projectDialog = document.querySelector("#projectDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogTags = document.querySelector("#dialogTags");

document.querySelectorAll(".project-details").forEach((button) => {
  button.addEventListener("click", () => {
    const item = projectInfo[button.dataset.project];
    if (!item) return;

    dialogTitle.textContent = item.title;
    dialogDescription.textContent = item.description;
    dialogTags.replaceChildren();
    item.tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      dialogTags.append(element);
    });
    projectDialog.showModal();
  });
});

document.querySelector("#dialogClose").addEventListener("click", () => projectDialog.close());
document.querySelector("#dialogOk").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

// Контактная форма: создаёт письмо в почтовом приложении пользователя.
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const toast = document.querySelector("#toast");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();

  // Замените адрес на свой перед публикацией сайта.
  const recipient = "your-email@example.com";
  const subject = encodeURIComponent(`Запрос с сайта от ${name}`);
  const body = encodeURIComponent(
    `Имя: ${name}\nEmail для ответа: ${email}\n\nСообщение:\n${message}`
  );

  formNote.textContent = "Открываем почтовое приложение. Если оно не запустилось, напишите на your-email@example.com.";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  showToast("Письмо подготовлено. Проверьте почтовое приложение.");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3500);
}

// Плавное появление блоков при прокрутке
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Актуальный год в подвале
document.querySelector("#year").textContent = new Date().getFullYear();
