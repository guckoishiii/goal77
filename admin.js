"use strict";

/* ==========================
   GOAL77 Admin v2.2 FINAL
   admin.js (Part 1/4)
========================== */

const $ = (id) => document.getElementById(id);

const stadium = $("stadium");
const status = $("status");
const pairs = $("pairs");
const image = $("image");
const imageVersion = $("imageVersion");
const githubToken = $("githubToken");

const previewStadium = $("previewStadium");
const previewStatus = $("previewStatus");
const previewImage = $("previewImage");

const progress = $("progress");
const publishLog = $("publishLog");

/* ==========================
   Bangkok Date
========================== */

function bangkokDate() {

    const parts = new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: "Asia/Bangkok",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    ).formatToParts(new Date());

    const obj = {};

    parts.forEach(p => {

        if (p.type !== "literal") {

            obj[p.type] = p.value;

        }

    });

    return obj.year + obj.month + obj.day;

}

if (!imageVersion.value) {

    imageVersion.value = bangkokDate();

}

/* ==========================
   Current Data
========================== */

function getData() {

    return {

        brand: "กลุ่มไก่ใต้ GOAL77 โปรโมชั่นคืนยอดเสีย",

        stadium:
            stadium.value.trim(),

        status:
            Number(status.value),

        pairs:
            parseInt(pairs.value) || 0,

        image:
            "og-image.jpg",

        version:
            imageVersion.value.trim() || bangkokDate(),

        line:
            "https://lin.ee/Lklfa53"

    };

}

/* ==========================
   Status Text
========================== */

function statusText(data) {

    switch (data.status) {

        case 1:

            return "🐣 ไก่กำลังเคียง";

        case 2:

            return `🐥 ตอนนี้เคียงได้ ${data.pairs} คู่ มีเคียงเพิ่ม`;

        case 3:

            return `✅ สรุปไก่ทั้งหมด ${data.pairs} คู่ !!!`;

        case 4:

            return `✅ สรุปไก่ทั้งหมด ${data.pairs} คู่ !!!<br>🐓 ไก่ลงแล้ว!!`;

        default:

            return "";

    }

}

/* ==========================
   Preview
========================== */

function updatePreview() {

    const data = getData();

    previewStadium.textContent =
        data.stadium || "-";

    if (data.status === 4) {

        previewStatus.innerHTML =
            statusText(data);

    } else {

        previewStatus.textContent =
            statusText(data);

    }

}

/* ==========================
   Preview Image
========================== */

image.addEventListener("change", () => {

    const file = image.files[0];

    if (!file) return;

    previewImage.src =
        URL.createObjectURL(file);

});

/* ==========================
   Auto Refresh
========================== */

[
    stadium,
    status,
    pairs,
    imageVersion
].forEach(el => {

    el.addEventListener("input", updatePreview);

    el.addEventListener("change", updatePreview);

});

updatePreview();

/* ==========================
   Download File
========================== */

function downloadFile(filename, content, type) {

    const blob = new Blob(
        [content],
        {
            type: type
        }
    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    setTimeout(() => {

        URL.revokeObjectURL(url);

    },1000);

}

/* ==========================
   Escape HTML
========================== */

function escapeHtml(str){

    return String(str)

    .replace(/&/g,"&amp;")

    .replace(/</g,"&lt;")

    .replace(/>/g,"&gt;")

    .replace(/"/g,"&quot;")

    .replace(/'/g,"&#39;");

}

/* ==========================
   JSON Safe
========================== */

function js(value){

    return JSON.stringify(value)

    .replace(/</g,"\\u003c");

}

/* ==========================
   Generate config.js
========================== */

function generateConfig(){

    const d =
        getData();

    return `const DATA = {

    brand : ${js(d.brand)},

    stadium : ${js(d.stadium)},

    status : ${d.status},

    pairs : ${d.pairs},

    image : "og-image.jpg",

    logo : "logo.png",

    line : "${d.line}"

};`;

}

/* ==========================
   Download config.js
========================== */

function downloadConfig(){

    downloadFile(

        "config.js",

        generateConfig(),

        "text/javascript;charset=utf-8"

    );

}

/* ==========================
   Version String
========================== */

function imageVersionString(){

    return imageVersion.value.trim()

    ||

    bangkokDate();

}

/* ==========================
   Site URL
========================== */

const SITE_URL =
"https://guckoishiii.github.io/goal77/";

/* ==========================
   Image URL
========================== */

function imageUrl(){

    return SITE_URL +

    "og-image.jpg?v=" +

    encodeURIComponent(

        imageVersionString()

    );

}

/* =====================================================
   Part 3/4
   Generate index.html
===================================================== */

function generateIndex() {

    const d = getData();

    return `<!DOCTYPE html>
<html lang="th">
<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>\${escapeHtml(d.brand)}</title>

<meta name="description"
content="\${escapeHtml(d.stadium)}">

<meta property="og:type"
content="website">

<meta property="og:title"
content="\${escapeHtml(statusText(d).replace(/<br>/g," "))}">

<meta property="og:description"
content="\${escapeHtml(d.stadium)}">

<meta property="og:image"
content="\${imageUrl()}">

<meta property="og:url"
content="\${SITE_URL}">

<meta name="twitter:card"
content="summary_large_image">

<link rel="stylesheet"
href="style.css">

</head>

<body>

<div class="wrap">

<img src="logo.png"
class="logo">

<p
class="brand"
id="brand"></p>

<p
class="location"
id="stadium"></p>

<h1 id="status"></h1>

<h2 id="pairs"></h2>

<img
id="poster"
class="poster">

<a
id="line"
class="btn">

📲 เข้ากลุ่ม LINE

</a>

<div class="info-box">

<h2>

🔥 กลุ่มไก่ใต้ GOAL77 โปรโมชั่นคืนยอดเสีย 🔥

</h2>

</div>

</div>

<script src="config.js"><\/script>

<script>

(function(){

const d = DATA;

document.getElementById("brand").textContent =
d.brand;

document.getElementById("stadium").textContent =
d.stadium;

document.getElementById("poster").src =
d.image;

document.getElementById("line").href =
d.line;

const status =
document.getElementById("status");

const pairs =
document.getElementById("pairs");

switch(Number(d.status)){

case 1:

status.textContent =
"🐣 ไก่กำลังเคียง";

pairs.style.display =
"none";

break;

case 2:

status.textContent =
"🐥 ตอนนี้เคียงได้ " +
d.pairs +
" คู่ มีเคียงเพิ่ม";

pairs.style.display =
"none";

break;

case 3:

status.textContent =
"✅ สรุปไก่ทั้งหมด " +
d.pairs +
" คู่ !!!";

pairs.style.display =
"none";

break;

case 4:

status.innerHTML =
"✅ สรุปไก่ทั้งหมด " +
d.pairs +
" คู่ !!!<br>🐓 ไก่ลง

/* =====================================================
   Part 4/4
   GitHub Publish + Token + Progress
===================================================== */

const REPO_OWNER = "guckoishiii";
const REPO_NAME = "goal77";
const BRANCH = "main";

/* ==========================
   Log
========================== */

function addLog(text){

    const time =
        new Date().toLocaleTimeString("th-TH");

    publishLog.innerHTML +=
        `<div>[${time}] ${text}</div>`;

    publishLog.scrollTop =
        publishLog.scrollHeight;

}

/* ==========================
   Progress
========================== */

function setProgress(text){

    progress.innerHTML =
        `<b>${text}</b>`;

}

/* ==========================
   Save Token
========================== */

if(localStorage.getItem("goal77_token")){

    githubToken.value =
        localStorage.getItem("goal77_token");

}

githubToken.addEventListener("change",()=>{

    localStorage.setItem(

        "goal77_token",

        githubToken.value.trim()

    );

});

/* ==========================
   Base64
========================== */

function base64Bytes(bytes){

    let binary="";

    const size=0x8000;

    for(

        let i=0;

        i<bytes.length;

        i+=size

    ){

        binary+=String.fromCharCode(

            ...bytes.subarray(i,i+size)

        );

    }

    return btoa(binary);

}

function base64Text(text){

    return base64Bytes(

        new TextEncoder()

        .encode(text)

    );

}

/* ==========================
   SHA
========================== */

async function getSha(path){

    const r=await fetch(

`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,

{

headers:{

Authorization:

`Bearer ${githubToken.value.trim()}`

}

}

);

    if(r.status===404)

        return null;

    if(!r.ok)

        throw new Error(path);

    return (await r.json()).sha;

}

/* ==========================
   Upload File
========================== */

async function uploadFile(

path,

content

){

    const sha=

    await getSha(path);

    const r=

    await fetch(

`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,

{

method:"PUT",

headers:{

Authorization:

`Bearer ${githubToken.value.trim()}`,

"Content-Type":

"application/json"

},

body:JSON.stringify({

message:

"Update GOAL77",

branch:BRANCH,

content,

...(sha?{sha}:{})

})

}

);

    if(!r.ok){

        throw new Error(path);

    }

}

/* ==========================
   Publish
========================== */

document

.getElementById("publish")

.addEventListener(

"click",

async()=>{

try{

publishLog.innerHTML="";

setProgress(

"เริ่ม Publish..."

);

addLog("เริ่ม");

const img=

image.files[0];

if(!img)

throw new Error(

"กรุณาเลือกรูป"

);

setProgress(

"Upload Poster..."

);

await uploadFile(

"og-image.jpg",

base64Bytes(

new Uint8Array(

await img.arrayBuffer()

)

)

);

addLog(

"✔ Poster"

);

setProgress(

"Upload config.js"

);

await uploadFile(

"config.js",

base64Text(

generateConfig()

)

);

addLog(

"✔ config.js"

);

setProgress(

"Upload index.html"

);

await uploadFile(

"index.html",

base64Text(

generateIndex()

)

);

addLog(

"✔ index.html"

);

setProgress(

"เสร็จแล้ว"

);

addLog(

"🎉 Publish Success"

);

document

.getElementById(

"publishStatus"

)

.innerHTML=

`<b>

✅ Publish สำเร็จ

</b>

<br><br>

<a

href="${SITE_URL}"

target="_blank">

🌐 เปิดเว็บไซต์

</a>`;

}catch(err){

setProgress("ผิดพลาด");

addLog(

"❌ "+err.message

);

alert(

err.message

);

}

}

);
