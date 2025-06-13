// Smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Testimonials Carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function updateSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  updateSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  updateSlide(currentIndex);
});

// Tabs for Faculty/Alumni
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.content-list').forEach(list => {
      list.classList.add('hide');
    });
    document.getElementById(`${btn.dataset.tab}-list`).classList.remove('hide');
  });
});

// Calendar
const events = [
  { date: '2025-07-15', title: 'Summer Leadership Camp' },
  { date: '2025-09-01', title: 'New Student Orientation' },
  { date: '2025-12-10', title: 'Carol Service & Awards' },
];

function renderCalendar() {
  const container = document.getElementById('calendar');
  events.forEach(e => {
    const div = document.createElement('div');
    div.className = 'event-item';
    div.innerHTML = `<strong>${e.date}</strong>: ${e.title}`;
    container.appendChild(div);
  });
}
renderCalendar();

// Form submission (basic fetch setup — replace /api/contact if needed)
document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  const status = document.getElementById('form-status');
  status.textContent = 'Sending...';
  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    status.textContent = 'Message sent!';
    form.reset();
  } catch (err) {
    status.textContent = 'Something went wrong.';
  }
});
