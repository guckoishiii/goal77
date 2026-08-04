/* GOAL77 index.html template — loaded by admin.js */
(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function statusText(status, pairs) {
    switch (Number(status)) {
      case 1:
        return "🐣 ไก่กำลังเคียง";
      case 2:
        return `🐥 ตอนนี้เคียงได้ ${pairs} คู่ มีเคียงเพิ่ม`;
      default:
        return "🐓 ไก่ลงแล้ว!!";
    }
  }

  window.GOAL77_INDEX_TEMPLATE = function buildGoal77Index(data) {
    const stadium = String(data.stadium || "").trim();
    const pairs = Math.max(0, Number.parseInt(data.pairs, 10) || 0);
    const status = Number(data.status) || 3;
    const imageVersion = String(data.imageVersion || "1").trim();
    const title = statusText(status, pairs);
    const brand = "กลุ่มไก่ใต้ GOAL77 โปรโมชั่นคืนยอดเสีย";
    const siteUrl = "https://guckoishiii.github.io/goal77/";
    const imageUrl = `${siteUrl}og-image.jpg?v=${encodeURIComponent(imageVersion)}`;
    const safe = escapeHtml;

    return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safe(brand)}</title>
  <meta name="description" content="${safe(stadium || brand)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${safe(title)}">
  <meta property="og:description" content="${safe(stadium || brand)}">
  <meta property="og:image" content="${safe(imageUrl)}">
  <meta property="og:url" content="${siteUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safe(title)}">
  <meta name="twitter:description" content="${safe(stadium || brand)}">
  <meta name="twitter:image" content="${safe(imageUrl)}">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="wrap">
    <img src="logo.png" class="logo" alt="GOAL77 Logo">
    <p class="brand" id="brand"></p>
    <p class="location" id="stadium"></p>
    <h1 id="status"></h1>
    <h2 id="pairs"></h2>
    <img id="poster" class="poster" alt="Poster">
    <a id="line" class="btn">📲 เข้ากลุ่ม LINE</a>
    <div class="info-box">
      <h2>🔥 กลุ่มไก่ใต้ GOAL77 โปรโมชั่นคืนยอดเสีย 🔥</h2>
      <div class="notice">💥 ภาพชัดระดับ <b>HD</b> มีราคากลางอากาศ ยิงสดส่งตรงจากสังเวียน 💥</div>
      <div class="promo-card">
        <h3>🎁 โปรโมชั่นคืนยอดเสีย 5% - 15%</h3>
        <div class="promo-item"><span>เสีย 3,000 บาทขึ้นไป</span><strong>รับคืน 5%</strong></div>
        <div class="promo-item"><span>เสีย 10,000 บาทขึ้นไป</span><strong>รับคืน 10%</strong></div>
        <div class="promo-item"><span>เสีย 20,000 บาทขึ้นไป</span><strong>รับคืน 15%</strong></div>
      </div>
      <div class="promo-card">
        <h3>🎁 โปรโมชั่นแนะนำเพื่อน</h3>
        <div class="promo-item"><span>รับค่าแนะนำ</span><strong>10%</strong></div>
      </div>
      <div class="promo-card">
        <h3>🎁 กิจกรรมพิเศษ</h3>
        <div class="promo-item"><span>ทายคู่ไก่</span><strong>โบนัส 500 บาท</strong></div>
      </div>
    </div>
  </div>
  <script src="config.js"><\/script>
  <script>
    (function () {
      "use strict";
      var statusText = "";
      var pairsElement = document.getElementById("pairs");
      document.getElementById("brand").textContent = DATA.brand;
      document.getElementById("stadium").textContent = DATA.stadium;
      document.getElementById("poster").src = DATA.image;
      document.getElementById("poster").alt = DATA.brand;
      document.getElementById("line").href = DATA.line;
      document.title = DATA.brand;
      switch (Number(DATA.status)) {
        case 1:
          statusText = "🐣 ไก่กำลังเคียง";
          pairsElement.hidden = true;
          break;
        case 2:
          statusText = "🐥 ตอนนี้เคียงได้ " + DATA.pairs + " คู่ มีเคียงเพิ่ม";
          pairsElement.hidden = true;
          break;
        default:
          statusText = "🐓 ไก่ลงแล้ว!!";
          pairsElement.textContent = "📋 สรุปไก่ทั้งหมด " + DATA.pairs + " คู่ชน";
          pairsElement.hidden = false;
      }
      document.getElementById("status").textContent = statusText;
    }());
  <\/script>
</body>
</html>`;
  };
}());
