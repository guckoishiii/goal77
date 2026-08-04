// ==============================
// GOAL77 Admin v2.1 FINAL
// ==============================

const stadium = document.getElementById("stadium");
const status = document.getElementById("status");
const pairs = document.getElementById("pairs");
const image = document.getElementById("image");

const previewStadium = document.getElementById("previewStadium");
const previewStatus = document.getElementById("previewStatus");
const previewPairs = document.getElementById("previewPairs");
const previewImage = document.getElementById("previewImage");

const btnGenerate = document.getElementById("generate");

// ==============================
// Preview
// ==============================

function updatePreview(){

    previewStadium.textContent = stadium.value;

    switch(Number(status.value)){

        case 1:

            previewStatus.textContent =
            "🐣 ไก่กำลังเคียง";

            previewPairs.style.display = "none";

            break;

        case 2:

            previewStatus.textContent =
            "🐥 ตอนนี้เคียงได้ " +
            pairs.value +
            " คู่ มีเคียงเพิ่ม";

            previewPairs.style.display = "none";

            break;

        case 3:

        default:

            previewStatus.textContent =
            "🐓 ไก่ลงแล้ว!!";

            previewPairs.style.display = "block";

            previewPairs.textContent =
            "📋 สรุปไก่ทั้งหมด " +
            pairs.value +
            " คู่ชน";

            break;

    }

}

// ==============================
// Preview Image
// ==============================

image.addEventListener("change",function(){

    const file = this.files[0];

    if(!file) return;

    previewImage.src =
    URL.createObjectURL(file);

});

// ==============================
// Events
// ==============================

stadium.addEventListener("input",updatePreview);

status.addEventListener("change",updatePreview);

pairs.addEventListener("input",updatePreview);

// ==============================
// Generate config.js
// ==============================

btnGenerate.addEventListener("click",function(){

    const config = `const DATA = {

    brand: "กลุ่มไก่ใต้ GOAL77 โปรโมชั่นคืนยอดเสีย",

    stadium: "${stadium.value}",

    pairs: ${pairs.value},

    status: ${status.value},

    image: "og-image.jpg",

    logo: "logo.png",

    line: "https://lin.ee/Lklfa53"

};`;

    const blob = new Blob(
        [config],
        {
            type:"text/javascript"
        }
    );

    const a =
    document.createElement("a");

    a.href =
    URL.createObjectURL(blob);

    a.download =
    "config.js";

    a.click();

});

// ==============================

updatePreview();