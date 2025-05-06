const urls = [
  'https://missav.live',
  'https://motchillfl.net',
  'https://kisskh.do'
];

const resultsDiv = document.getElementById('results');

urls.forEach(url => {
  const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);

  fetch(proxyUrl, { method: 'GET' })
    .then(response => {
      let div = document.createElement('div');
      div.className = 'result';

      if (response.redirected) {
        div.classList.add('redirect');
        div.innerHTML = `<strong>${url}</strong><br>Status: Redirected to ${response.url}`;
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
