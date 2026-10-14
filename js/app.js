const CMS_KEY = "khaledPortfolioContent";
const birthDate = new Date(2009, 0, 20);

const defaultContent = {
  heroEyebrow: "مرحبًا بك في موقعي الشخصي",
  heroText: "طالب في أكاديمية السويدي الفنية - قسم الإلكترونيات، شغوف بتطوير الويب وتطبيقات الموبايل والإلكترونيات، وبناء حلول تجمع بين البرمجة والهاردوير.",
  aboutTitle: "أبني مهاراتي بين البرمجة والإلكترونيات",
  aboutName: "Eng. Khaled Elgafarey",
  aboutText: "أنا خالد الجعفري، طالب في أكاديمية السويدي الفنية بقسم الإلكترونيات. أهتم بتطوير تطبيقات الهواتف الذكية، وإنشاء مواقع ويب حديثة، وبرمجة الأنظمة المدمجة مثل ESP32 وArduino، واستخدام تقنيات الذكاء الاصطناعي في حلول عملية ومفيدة.",
  educationSchool: "أكاديمية السويدي الفنية",
  educationDepartment: "قسم الإلكترونيات - طالب حاليًا",
  contactTitle: "جاهز للتعاون وتبادل الأفكار",
  projectTitle1: "BioSmart Drop",
  projectText1: "مشروع تقني يجمع بين البرمجة والتطبيق العملي.",
  projectTitle2: "App Eshara",
  projectText2: "منصة ذكية لتعلُّم لغة الإشارة والتواصل بدون حواجز.",
  projectTitle3: "Smart Home",
  projectText3: "نظام المنزل الذكي باستخدام ESP32.",
  skills: ["Android", "Web Development", "HTML / CSS / JavaScript", "Flutter", "Python", "Arduino", "ESP32", "Electronics", "Artificial Intelligence", "UI / UX Design"],
  goals: ["تطوير تطبيقات احترافية.", "إنشاء مواقع ويب عصرية.", "دمج الذكاء الاصطناعي مع الإلكترونيات.", "تنفيذ مشاريع تخدم المجتمع.", "التعلم المستمر ومواكبة أحدث التقنيات."],
  email: "khaledkhaled010104740@email.com",
  phone: "+20 1010474002",
  facebook: "https://www.facebook.com/share/19GdoNNczA/",
  typingPhrases: ["Khaled Elgafarey", "مطور ويب وتطبيقات", "طالب إلكترونيات", "Arduino & ESP32 Maker"],
  profileImage: "assets/images/khaled-profile.jpeg",
  projectImage1: "",
  projectImage2: "",
  projectImage3: ""
};

function getStoredContent() {
  try {
    const savedContent = JSON.parse(localStorage.getItem(CMS_KEY) || "{}");
    return {
      ...defaultContent,
      ...savedContent,
      profileImage: savedContent.profileImageRemoved ? "" : (savedContent.profileImage || defaultContent.profileImage)
    };
  } catch {
    return { ...defaultContent };
  }
}

let content = getStoredContent();

const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const typingName = document.getElementById("typingName");
const footerAge = document.getElementById("footerAge");
const aboutAge = document.getElementById("aboutAge");
const siteHeader = document.querySelector(".site-header");
siteHeader?.querySelectorAll('.nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader.querySelectorAll('.nav a[href^="#"]').forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
  });
});

const sectionNavLinks = [...(siteHeader?.querySelectorAll('.nav a[href^="#"]') || [])];
const navSections = sectionNavLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const introSection = document.getElementById("intro");
if (introSection && !navSections.includes(introSection)) navSections.push(introSection);
if ("IntersectionObserver" in window && navSections.length) {
  const sectionNavObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
    if (!current) return;
    sectionNavLinks.forEach((link) => {
      const isHomeIntro = current.target.id === "intro" && link.getAttribute("href") === "#home";
      if (isHomeIntro || link.getAttribute("href") === `#${current.target.id}`) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-22% 0px -62% 0px", threshold: 0 });
  navSections.forEach((section) => sectionNavObserver.observe(section));
}

const biosmartDialog = document.getElementById("biosmart-details");
document.querySelector("[data-open-biosmart]")?.addEventListener("click", (event) => {
  event.preventDefault();
  biosmartDialog?.showModal();
});
biosmartDialog?.querySelector(".project-details-close")?.addEventListener("click", () => biosmartDialog.close());
biosmartDialog?.addEventListener("click", (event) => {
  if (event.target === biosmartDialog) biosmartDialog.close();
});

const esharaDialog = document.getElementById("eshara-details");
document.querySelector("[data-open-eshara]")?.addEventListener("click", (event) => {
  event.preventDefault();
  esharaDialog?.showModal();
});
esharaDialog?.querySelector(".project-details-close")?.addEventListener("click", () => esharaDialog.close());
esharaDialog?.addEventListener("click", (event) => {
  if (event.target === esharaDialog) esharaDialog.close();
});

const smartHomeDialog = document.getElementById("smarthome-details");
document.querySelector("[data-open-smarthome]")?.addEventListener("click", (event) => {
  event.preventDefault();
  smartHomeDialog?.showModal();
});
smartHomeDialog?.querySelector(".project-details-close")?.addEventListener("click", () => smartHomeDialog.close());
smartHomeDialog?.addEventListener("click", (event) => {
  if (event.target === smartHomeDialog) smartHomeDialog.close();
});

document.querySelectorAll(".skills-section .art-skill-label").forEach((label) => {
  let resetTapAnimation;
  label.addEventListener("click", () => {
    label.classList.remove("is-activated");
    void label.offsetWidth;
    label.classList.add("is-activated");
    window.clearTimeout(resetTapAnimation);
    resetTapAnimation = window.setTimeout(() => label.classList.remove("is-activated"), 520);
  });
});

function updateHeaderVisibility() {
  siteHeader?.classList.toggle("is-visible", window.scrollY > 80);
}

window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
updateHeaderVisibility();

window.addEventListener("load", () => {
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 700);
  }
});

const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

function calculateAge(date) {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const birthdayThisYear = new Date(today.getFullYear(), date.getMonth(), date.getDate());

  if (today < birthdayThisYear) {
    age -= 1;
  }

  return age;
}

function applyContent() {
  document.querySelectorAll("[data-cms-text]").forEach((element) => {
    const key = element.dataset.cmsText;
    if (content[key]) {
      element.textContent = content[key];
    }
  });

  document.querySelectorAll("[data-cms-bg]").forEach((element) => {
    const image = content[element.dataset.cmsBg];
    if (image) {
      element.style.backgroundImage = `url("${image}")`;
      element.classList.add("has-custom-image");
    } else {
      element.style.backgroundImage = "";
      element.classList.remove("has-custom-image");
    }
  });

  const profilePhoto = document.getElementById("profilePhoto");
  if (profilePhoto) {
    const image = content.profileImage;
    profilePhoto.style.backgroundImage = image ? `url("${image}")` : "";
    profilePhoto.classList.toggle("has-custom-image", Boolean(image));
  }

  document.querySelectorAll(".brand-photo").forEach((photo) => {
    const image = content.profileImage;
    const badge = photo.closest(".has-photo");
    if (image) {
      photo.src = image;
      badge?.classList.add("has-photo");
    } else {
      photo.removeAttribute("src");
      badge?.classList.remove("has-photo");
    }
  });

  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    const levels = [85, 90, 80, 80, 75, 70, 70, 75, 60, 65];
    const icons = [
      '<path d="M7 8 5 4m12 4 2-4M5 10h14v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7ZM8 20v2m8-2v2M5 13H3v4h2m14-4h2v4h-2"/><circle cx="9" cy="13" r=".7"/><circle cx="15" cy="13" r=".7"/>',
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
      '<path d="m5 3 14 0-2 18-5 1-5-1L5 3Zm4 5h6l-5 4h5l-6 5"/>',
      '<path d="M4 5h16l-1 14-7 2-7-2L4 5Zm4 4h8M8 12h5l-5 4h8"/>',
      '<path d="M8 7c-4-1-5 3-2 5l8 3c3 1 2 5-2 4l-4-1m8-14 3 2-2 3-3-2m-7 8-3 2 2 3 3-2"/>',
      '<path d="M4 9c2-4 5-4 8 0s6 4 8 0M4 15c2 4 5 4 8 0s6-4 8 0"/>',
      '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 2v5m6-5v5M9 17v5m6-5v5M2 9h5m-5 6h5m10-6h5m-5 6h5"/>',
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2"/>',
      '<path d="M9 4a3 3 0 0 0-5 2 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 5 2V4Zm6 0a3 3 0 0 1 5 2 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-5 2V4ZM9 8h2m-2 5h2m4-5h-2m2 5h-2"/>',
      '<path d="m5 3 14 8-6 1-3 6L5 3Z"/><path d="m13 16 4 4"/>'
    ];
    skillsGrid.replaceChildren(...content.skills.map((skill, index) => {
      const item = document.createElement("span");
      const icon = document.createElement("b");
      icon.className = "skill-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[index] || icons[0]}</svg>`;
      const label = document.createElement("span");
      label.className = "skill-label";
      label.textContent = skill;
      const meter = document.createElement("i");
      meter.className = "skill-meter";
      meter.setAttribute("aria-hidden", "true");
      const fill = document.createElement("i");
      fill.className = "skill-meter-fill";
      meter.append(fill);
      const percentage = document.createElement("em");
      percentage.className = "skill-percentage";
      percentage.textContent = `${levels[index] || 70}%`;
      item.append(icon, label, meter, percentage);
      item.dataset.level = levels[index] || 70;
      item.style.setProperty("--level", `${levels[index] || 70}%`);
      fill.style.width = `${levels[index] || 70}%`;
      item.setAttribute("aria-label", `${skill}: ${levels[index] || 70}%`);
      return item;
    }));
  }

  const goalsList = document.getElementById("goalsList");
  if (goalsList) {
    const goalIcons = ["✧", "▧", "✥", "⚒", "▤"];
    goalsList.replaceChildren(...content.goals.map((goal, index) => {
      const item = document.createElement("div");
      const icon = document.createElement("span");
      icon.className = "goal-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = goalIcons[index] || "✧";
      const label = document.createElement("span");
      label.className = "goal-label";
      label.textContent = goal;
      const arrow = document.createElement("span");
      arrow.className = "goal-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "›";
      item.append(icon, label, arrow);
      return item;
    }));
  }

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.textContent = content.email;
    emailLink.href = `mailto:${content.email}`;
  }

  const phoneLink = document.getElementById("phoneLink");
  if (phoneLink) {
    phoneLink.textContent = content.phone;
    phoneLink.href = `tel:${content.phone.replace(/\s/g, "")}`;
  }

  const facebookLink = document.getElementById("facebookLink");
  if (facebookLink) {
    facebookLink.href = content.facebook;
  }
}

function isFirebaseConfigured() {
  return Boolean(
    window.firebaseConfig &&
    window.firebaseConfig.apiKey &&
    !window.firebaseConfig.apiKey.includes("PUT_YOUR")
  );
}

function initFirebaseApp() {
  if (!isFirebaseConfigured() || !window.firebase?.firestore) {
    return false;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(window.firebaseConfig);
  }

  return true;
}

async function loadRealtimeContent() {
  if (!isFirebaseConfigured() || !window.firebase?.database) {
    return false;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }

    const path = window.firebaseContentPath || "portfolio/main";
    const snapshot = await firebase.database().ref(path).once("value");

    if (snapshot.exists()) {
      const localContent = content;
      const remoteContent = snapshot.val();
      content = { ...localContent, ...remoteContent };
      ["profileImage", "projectImage1", "projectImage2", "projectImage3"].forEach((key) => {
        if (!remoteContent[key] && localContent[key]) content[key] = localContent[key];
      });
      return true;
    }
  } catch (error) {
    console.warn("Realtime Database content was not loaded:", error);
  }

  return false;
}

async function loadFirestoreContent() {
  if (!initFirebaseApp()) {
    return false;
  }

  try {
    const path = window.firestoreContentPath || "portfolio/main";
    const snapshot = await firebase.firestore().doc(path).get();

    if (snapshot.exists) {
      const localContent = content;
      const remoteContent = snapshot.data();
      content = { ...localContent, ...remoteContent };
      ["profileImage", "projectImage1", "projectImage2", "projectImage3"].forEach((key) => {
        if (!remoteContent[key] && localContent[key]) content[key] = localContent[key];
      });
      return true;
    }
  } catch (error) {
    console.warn("Firestore content was not loaded:", error);
  }

  return false;
}

async function loadRemoteContent() {
  const realtimeLoaded = await loadRealtimeContent();
  if (!realtimeLoaded) {
    await loadFirestoreContent();
  }
}

function typeName() {
  if (!typingName) {
    return;
  }

  const phrases = content.typingPhrases.length ? content.typingPhrases : defaultContent.typingPhrases;
  let phraseIndex = 0;
  let index = 0;
  let deleting = false;

  function tick() {
    const text = phrases[phraseIndex];
    typingName.textContent = text.slice(0, index);

    if (!deleting && index < text.length) {
      index += 1;
      setTimeout(tick, 100);
      return;
    }

    if (!deleting && index === text.length) {
      deleting = true;
      setTimeout(tick, 2000);
      return;
    }

    if (deleting && index > 0) {
      index -= 1;
      setTimeout(tick, 50);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(tick, 250);
  }

  tick();
}

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

reveals.forEach((element) => observer.observe(element));

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function runCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = target > 100 ? 1400 : 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = Math.floor(progress * target).toLocaleString("en-US");

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

const stats = document.querySelector(".stats");
if (stats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      const age = calculateAge(birthDate);
      document.querySelector('[data-target="17"]').dataset.target = age;
      if (footerAge) {
        footerAge.textContent = age;
      }
      runCounters();
    }
  }, { threshold: 0.35 });

  statsObserver.observe(stats);
}

if (footerAge) {
  footerAge.textContent = calculateAge(birthDate);
}
if (aboutAge) {
  aboutAge.textContent = `${calculateAge(birthDate)} سنة`;
}

applyContent();
loadRemoteContent().then(() => {
  applyContent();
  typeName();
});

