const urls = [
  'https://missav.live',
  'https://motchillfl.net',
  'https://kisskh.do'
];

const resultsDiv = document.getElementById('results');

urls.forEach(url => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  fetch(url, {
    method: 'GET',
    redirect: 'manual',
    signal: controller.signal
  })
  .then(response => {
    clearTimeout(timeout);
    let div = document.createElement('div');
    div.className = 'result';

    if (response.status >= 300 && response.status < 400) {
      div.classList.add('redirect');
      div.innerHTML = `<strong>${url}</strong><br>Status: ${response.status} (Redirect)<br>Location: ${response.headers.get("Location") || "Unknown"}`;
    } else if (!response.ok) {
      div.classList.add('error');
      div.innerHTML = `<strong>${url}</strong><br>Status: ${response.status} (Lỗi)`;
    } else {
      div.classList.add('ok');
      div.innerHTML = `<strong>${url}</strong><br>Status: ${response.status} (OK)`;
    }

    resultsDiv.appendChild(div);
  })
  .catch(error => {
    let div = document.createElement('div');
    div.className = 'result error';
    div.innerHTML = `<strong>${url}</strong><br>Lỗi: ${error.message}`;
    resultsDiv.appendChild(div);
  });
})
