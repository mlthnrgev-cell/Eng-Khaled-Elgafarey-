const CMS_KEY = "khaledPortfolioContent";

const defaultContent = {
  heroEyebrow: "مرحبًا بك في موقعي الشخصي",
  heroText: "طالب في أكاديمية السويدي الفنية - قسم الإلكترونيات، شغوف بالإلكترونيات وتطوير تطبيقات الموبايل وتصميم مواقع الويب وبناء حلول تجمع بين البرمجة والهاردوير.",
  aboutTitle: "أبني مهاراتي بين البرمجة والإلكترونيات",
  aboutName: "Eng. Khaled Elgafarey",
  aboutText: "أنا خالد الجعفري، طالب في أكاديمية السويدي الفنية بقسم الإلكترونيات. أهتم بتطوير تطبيقات الهواتف الذكية، وإنشاء مواقع ويب حديثة، وبرمجة الأنظمة المدمجة مثل ESP32 وArduino، واستخدام تقنيات الذكاء الاصطناعي في حلول عملية ومفيدة.",
  educationSchool: "أكاديمية السويدي الفنية",
  educationDepartment: "قسم الإلكترونيات - طالب حاليًا",
  contactTitle: "جاهز للتعاون وتبادل الأفكار",
  projectTitle1: "BioSmart Drop",
  projectText1: "مشروع تقني يجمع بين البرمجة والتطبيق العملي.",
  projectTitle2: "تطبيقات Android",
  projectText2: "واجهات موبايل حديثة وتجارب استخدام منظمة.",
  projectTitle3: "ESP32 & Arduino",
  projectText3: "نماذج إلكترونية وأنظمة مدمجة قابلة للتطوير.",
  skills: [
    "Android",
    "Web Development",
    "HTML / CSS / JavaScript",
    "Flutter",
    "Python",
    "Arduino",
    "ESP32",
    "Electronics",
    "Artificial Intelligence",
    "UI / UX Design"
  ],
  goals: [
    "تطوير تطبيقات احترافية.",
    "إنشاء مواقع ويب عصرية.",
    "دمج الذكاء الاصطناعي مع الإلكترونيات.",
    "تنفيذ مشاريع تخدم المجتمع.",
    "التعلم المستمر ومواكبة أحدث التقنيات."
  ],
  email: "khaledkhaled010104740@email.com",
  phone: "+20 1010474002",
  facebook: "https://www.facebook.com/share/19GdoNNczA/",
  typingPhrases: [
    "Eng. Khaled Elgafarey",
    "مطور ويب وتطبيقات",
    "طالب إلكترونيات",
    "Arduino & ESP32 Maker"
  ],
  profileImage: "assets/images/khaled-profile.jpeg",
  projectImage1: "",
  projectImage2: "",
  projectImage3: ""
};

const form = document.getElementById("dashboardForm");
const saveButton = document.getElementById("saveDashboard");
const resetButton = document.getElementById("resetDashboard");
const saveStatus = document.getElementById("saveStatus");
const themeToggle = document.getElementById("themeToggle");
const passwordGate = document.getElementById("passwordGate");
const passwordForm = document.getElementById("passwordForm");
const dashboardPassword = document.getElementById("dashboardPassword");
const passwordError = document.getElementById("passwordError");
const DASHBOARD_PASSWORD = "qweQWE123@#$";
const SESSION_KEY = "khaledDashboardUnlocked";

document.body.classList.add("dashboard-locked");

const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

function unlockDashboard() {
  passwordGate.classList.add("unlocked");
  document.body.classList.remove("dashboard-locked");
  sessionStorage.setItem(SESSION_KEY, "true");
}

if (sessionStorage.getItem(SESSION_KEY) === "true") {
  unlockDashboard();
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (dashboardPassword.value === DASHBOARD_PASSWORD) {
    passwordError.textContent = "";
    unlockDashboard();
    return;
  }

  passwordError.textContent = "كلمة المرور غير صحيحة.";
  dashboardPassword.value = "";
  dashboardPassword.focus();
});

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

function isFirebaseConfigured() {
  return Boolean(
    window.firebaseConfig &&
    window.firebaseConfig.apiKey &&
    !window.firebaseConfig.apiKey.includes("PUT_YOUR")
  );
}

function getFirestoreDoc() {
  if (!isFirebaseConfigured() || !window.firebase?.firestore) {
    return null;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(window.firebaseConfig);
  }

  return firebase.firestore().doc(window.firestoreContentPath || "portfolio/main");
}

function getRealtimeRef() {
  if (!isFirebaseConfigured() || !window.firebase?.database) {
    return null;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(window.firebaseConfig);
  }

  return firebase.database().ref(window.firebaseContentPath || "portfolio/main");
}

async function loadRealtimeContent() {
  const ref = getRealtimeRef();
  if (!ref) {
    return false;
  }

  try {
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const localContent = content;
      const remoteContent = snapshot.val();
      content = { ...localContent, ...remoteContent };
      ["profileImage", "projectImage1", "projectImage2", "projectImage3"].forEach((key) => {
        if (!remoteContent[key] && localContent[key]) content[key] = localContent[key];
      });
      localStorage.setItem(CMS_KEY, JSON.stringify(content));
      return true;
    }
  } catch (error) {
    console.warn("Realtime Database content was not loaded:", error);
    setStatus("تعذر قراءة Realtime Database، سيتم استخدام بيانات المتصفح.");
  }

  return false;
}

async function loadFirestoreContent() {
  const docRef = getFirestoreDoc();
  if (!docRef) {
    return;
  }

  try {
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      const localContent = content;
      const remoteContent = snapshot.data();
      content = { ...localContent, ...remoteContent };
      ["profileImage", "projectImage1", "projectImage2", "projectImage3"].forEach((key) => {
        if (!remoteContent[key] && localContent[key]) content[key] = localContent[key];
      });
      localStorage.setItem(CMS_KEY, JSON.stringify(content));
    }
  } catch (error) {
    console.warn("Firestore content was not loaded:", error);
    setStatus("تعذر قراءة قاعدة البيانات، سيتم استخدام بيانات المتصفح.");
  }
}

async function loadRemoteContent() {
  const realtimeLoaded = await loadRealtimeContent();
  if (!realtimeLoaded) {
    await loadFirestoreContent();
  }
}

async function saveRealtimeContent(nextContent) {
  const ref = getRealtimeRef();
  if (!ref) {
    return false;
  }

  await ref.set(nextContent);
  return true;
}

async function saveFirestoreContent(nextContent) {
  const docRef = getFirestoreDoc();
  if (!docRef) {
    return false;
  }

  await docRef.set(nextContent, { merge: true });
  return true;
}

function listToText(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function textToList(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function setStatus(message) {
  saveStatus.textContent = message;
  setTimeout(() => {
    saveStatus.textContent = "";
  }, 2600);
}

function fillForm() {
  Object.entries(content).forEach(([key, value]) => {
    const field = form.elements[key];
    if (!field || field.type === "file") {
      return;
    }

    field.value = Array.isArray(value) ? listToText(value) : value;
  });

  updatePreviews();
}

function updatePreviews() {
  document.querySelectorAll("[data-preview]").forEach((preview) => {
    const image = content[preview.dataset.preview];
    preview.style.backgroundImage = image ? `url("${image}")` : "";
    preview.classList.toggle("has-custom-image", Boolean(image));
    preview.textContent = image ? "" : "لا توجد صورة مختارة";
  });
}

async function readFileAsDataUrl(file) {
  const source = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("تعذرت قراءة الصورة."));
    reader.readAsDataURL(file);
  });

  const image = await new Promise((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error("ملف الصورة غير صالح."));
    element.src = source;
  });

  const maxDimension = 1280;
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

  const compressed = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.76));
  if (!compressed || compressed.size >= file.size) return source;

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("تعذر تجهيز الصورة للحفظ."));
    reader.readAsDataURL(compressed);
  });
}

async function saveForm() {
  const nextContent = { ...content };
  const formData = new FormData(form);

  try {
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0) {
          setStatus("جاري تجهيز الصور للحفظ...");
          nextContent[key] = await readFileAsDataUrl(value);
        }
        continue;
      }

      if (["skills", "goals", "typingPhrases"].includes(key)) {
        nextContent[key] = textToList(value);
      } else {
        nextContent[key] = value.trim();
      }
    }
  } catch (error) {
    console.error("Portfolio images could not be prepared:", error);
    setStatus("تعذر تجهيز الصور. اختر ملفات صور صالحة ثم حاول مجددًا.");
    return;
  }

  content = nextContent;
  try {
    localStorage.setItem(CMS_KEY, JSON.stringify(content));
  } catch (error) {
    console.error("Portfolio content could not be stored in this browser:", error);
    setStatus("تعذر حفظ الصور في المتصفح. اختر صورًا أصغر أو قلل عدد الصور.");
    return;
  }
  let savedToDatabase = false;

  try {
    savedToDatabase = await saveRealtimeContent(content);
    if (!savedToDatabase) {
      savedToDatabase = await saveFirestoreContent(content);
    }
  } catch (error) {
    console.warn("Firebase content was not saved:", error);
  }

  updatePreviews();
  setStatus(savedToDatabase ? "تم الحفظ في قاعدة البيانات. افتح الصفحة الرئيسية لمشاهدة النتيجة." : "تم الحفظ في هذا المتصفح فقط. راجع إعدادات Firebase للحفظ في قاعدة البيانات.");
}

document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) {
      return;
    }

    try {
      content[input.name] = await readFileAsDataUrl(file);
    } catch (error) {
      console.error("Image could not be prepared:", error);
      setStatus("تعذر تجهيز الصورة. جرّب ملف صورة آخر.");
      input.value = "";
      return;
    }
    if (input.name === "profileImage") {
      content.profileImageRemoved = false;
    }
    updatePreviews();
  });
});

document.querySelectorAll("[data-remove-image]").forEach((button) => {
  button.addEventListener("click", async () => {
    const imageKey = button.dataset.removeImage;
    content[imageKey] = "";
    if (imageKey === "profileImage") {
      content.profileImageRemoved = true;
    }

    const input = form.elements[imageKey];
    if (input) {
      input.value = "";
    }

    localStorage.setItem(CMS_KEY, JSON.stringify(content));
    updatePreviews();

    try {
      const savedToDatabase = await saveRealtimeContent(content) || await saveFirestoreContent(content);
      setStatus(savedToDatabase ? "تم حذف الصورة وحفظ التغيير." : "تم حذف الصورة من هذا المتصفح.");
    } catch (error) {
      console.warn("Image removal was not saved to Firebase:", error);
      setStatus("تم حذف الصورة من هذا المتصفح.");
    }
  });
});

saveButton.addEventListener("click", saveForm);

resetButton.addEventListener("click", () => {
  localStorage.removeItem(CMS_KEY);
  content = { ...defaultContent };
  form.reset();
  fillForm();
  setStatus("تم استرجاع البيانات الافتراضية.");
});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

reveals.forEach((element) => observer.observe(element));
loadRemoteContent().finally(fillForm);
