let rating = 0;

function showPage(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'reviews') loadReviews();
}

function setStars(n) {
  rating = n;
  document.querySelectorAll('.stars span').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

function saveReview() {
  const name = document.getElementById('name').value.trim();
  const text = document.getElementById('text').value.trim();
  const worth = document.getElementById('worth').value;
  const img = document.getElementById('image').files[0];

  if (!name || !text || !worth || !img || rating === 0) {
    alert('Complete all fields');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ name, text, worth, rating, img: reader.result });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert('Review added successfully!');
    location.reload();
  };
  reader.readAsDataURL(img);
}

function loadReviews() {
  const box = document.getElementById('reviewList');
  box.innerHTML = '';
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  reviews.reverse().forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';

    div.innerHTML = `
      <img src="${r.img}">
      <h3>${r.name}</h3>
      <div>${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <span class="badge ${r.worth}">
        ${r.worth === 'worth' ? 'Worth it' : 'Not worth it'}
      </span>
      <p class="muted">${r.text}</p>
    `;
    box.appendChild(div);
  });
}