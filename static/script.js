async function uploadPDF() {
  const file = document.getElementById('pdf-upload').files[0];
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  displayText(data.text);
}

function displayText(text) {
  const container = document.getElementById('text-container');
  container.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');
}

function readAloud() {
  const spans = document.querySelectorAll('#text-container span');
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = Array.from(spans).map(s => s.textContent).join(' ');
  utterance.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function highlightSelection() {
  const selection = window.getSelection().toString();
  if (!selection) return alert('Please select text to highlight.');

  const container = document.getElementById('text-container');
  const regex = new RegExp(`(${selection})`, 'g');
  container.innerHTML = container.innerHTML.replace(regex, '<span class="highlight">$1</span>');
}
