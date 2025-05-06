const urls = [
  "https://motchillfl.net",
  "https://missav.live",
  "https://kisskh.do"
];

const container = document.getElementById("result");

urls.forEach(async (url) => {
  const box = document.createElement("div");
  box.className = "url-box";
  box.innerHTML = `<strong>${url}</strong><br>Đang kiểm tra...`;
  container.appendChild(box);

  try {
    const res = await fetch(`https://api.redirect-checker.net/?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (data && data.length > 0) {
      const finalStatus = data[data.length - 1];
      let chainInfo = data.map((step, i) =>
        `${i + 1}. [${step.status}] ${step.url}`
      ).join("<br>");

      box.innerHTML = `
        <strong>${url}</strong><br>
        <span class="status ok">OK</span><br>
        ${chainInfo}
      `;
    } else {
      box.innerHTML = `<strong>${url}</strong><br><span class="status error">Không có dữ liệu phản hồi</span>`;
    }
  } catch (e) {
    box.innerHTML = `<strong>${url}</strong><br><span class="status error">Lỗi: ${e.message}</span>`;
  }
});
