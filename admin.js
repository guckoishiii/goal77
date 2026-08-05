// GOAL77 Admin v2.1 FINAL
// Uses template.js to download a static index.html for LINE Open Graph previews.
(function () {
  "use strict";

  const byId = (id) => document.getElementById(id);
  const stadium = byId("stadium");
  const status = byId("status");
  const pairs = byId("pairs");
  const image = byId("image");
  const previewStadium = byId("previewStadium");
  const previewStatus = byId("previewStatus");
  const previewPairs = byId("previewPairs");
  const previewImage = byId("previewImage");
  const generateConfigButton = byId("generate");

  if (!stadium || !status || !pairs || !previewStadium || !previewStatus || !previewPairs || !generateConfigButton) {
    console.error("GOAL77 Admin: required form elements are missing.");
    return;
  }

  let previewObjectUrl = null;

  function bangkokDate() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date()).reduce((out, part) => {
      if (part.type !== "literal") out[part.type] = part.value;
      return out;
    }, {});
    return `${parts.year}${parts.month}${parts.day}`;
  }

  function ensureImageVersionInput() {
    let field = byId("imageVersion");
    if (field) return field;
    const label = document.createElement("label");
    label.htmlFor = "imageVersion";
    label.textContent = "รหัสรูปใหม่ (v=)";
    field = document.createElement("input");
    field.id = "imageVersion";
    field.type = "text";
    field.value = bangkokDate();
    field.placeholder = "เช่น 20260804 หรือ 20260804-2";
    const anchor = image && image.parentNode;
    if (anchor) {
      anchor.insertBefore(label, image.nextSibling);
      anchor.insertBefore(field, label.nextSibling);
    }
    return field;
  }

  const imageVersion = ensureImageVersionInput();

  function ensureIndexButton() {
    let button = byId("downloadIndex");
    if (button) return button;
    button = document.createElement("button");
    button.id = "downloadIndex";
    button.type = "button";
    button.textContent = "🌐 Download index.html";
    generateConfigButton.insertAdjacentElement("afterend", button);
    return button;
  }

  const downloadIndexButton = ensureIndexButton();

  function values() {
    return {
      stadium: stadium.value.trim(),
      status: Number(status.value),
      pairs: Math.max(0, Number.parseInt(pairs.value, 10) || 0),
      imageVersion: imageVersion.value.trim() || bangkokDate()
    };
  }

  function getStatusText(data) {
    if (data.status === 1) return "🐣 ไก่กำลังเคียง";
    if (data.status === 2) return `🐥 ตอนนี้เคียงได้ ${data.pairs} คู่ มีเคียงเพิ่ม`;
    return "🐓 ไก่ลงแล้ว!!";
  }

  function updatePreview() {
    const data = values();
    previewStadium.textContent = data.stadium || "-";
    previewStatus.textContent = getStatusText(data);
    const showPairs = data.status === 3;
    previewPairs.hidden = !showPairs;
    previewPairs.textContent = `📋 สรุปไก่ทั้งหมด ${data.pairs} คู่ชน`;
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type: type || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function jsString(value) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
  }

  function buildConfig(data) {
    return `const DATA = {\n  brand: ${jsString("กลุ่มไก่ใต้ GOAL77 โปรโมชั่นคืนยอดเสีย")},\n  stadium: ${jsString(data.stadium)},\n  pairs: ${data.pairs},\n  status: ${data.status},\n  image: "og-image.jpg",\n  logo: "logo.png",\n  line: "https://lin.ee/Lklfa53"\n};\n`;
  }

  function loadTemplate(callback) {
    if (typeof window.GOAL77_INDEX_TEMPLATE === "function") return callback();
    let script = document.querySelector('script[data-goal77-template]');
    if (!script) {
      script = document.createElement("script");
      script.src = "template.js";
      script.defer = true;
      script.dataset.goal77Template = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", callback, { once: true });
    script.addEventListener("error", () => alert("ไม่พบ template.js กรุณาวางไฟล์นี้ไว้โฟลเดอร์เดียวกับ admin.html"), { once: true });
  }

  if (image) {
    image.addEventListener("change", () => {
      const file = image.files && image.files[0];
      if (!file || !previewImage) return;
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = URL.createObjectURL(file);
      previewImage.src = previewObjectUrl;
    });
  }

  [stadium, status, pairs, imageVersion].forEach((field) => {
    field.addEventListener("input", updatePreview);
    field.addEventListener("change", updatePreview);
  });

  generateConfigButton.addEventListener("click", () => download("config.js", buildConfig(values()), "text/javascript;charset=utf-8"));

  downloadIndexButton.addEventListener("click", () => {
    loadTemplate(() => {
      if (typeof window.GOAL77_INDEX_TEMPLATE !== "function") return;
      download("index.html", window.GOAL77_INDEX_TEMPLATE(values()), "text/html;charset=utf-8");
    });
  });

  updatePreview();
  loadTemplate(() => {});
}());
