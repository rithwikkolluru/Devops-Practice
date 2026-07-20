let currentUser = {
    name: "Alex Jones",
    email: "alex.jones@college.edu",
    dept: "Computer Science & Engineering",
    id: "STU-2026-8891"
};

const eventsData = [
    { id: 1, title: "Hackathon 2026", date: "Oct 12, 2026", time: "10:00 AM", location: "Main Tech Lab", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400" },
    { id: 2, title: "Annual Cultural Fest", date: "Oct 15, 2026", time: "05:00 PM", location: "Open Air Theater", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400" }
];

let userBookings = [];

function switchView(viewId) {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('profile-view').classList.add('hidden');
    document.getElementById('bookings-view').classList.add('hidden');
    document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));

    document.getElementById(viewId).classList.remove('hidden');
    if(viewId === 'home-view') document.getElementById('nav-home').classList.add('active');
    if(viewId === 'bookings-view') {
        document.getElementById('nav-bookings').classList.add('active');
        renderBookings();
    }
    if(viewId === 'profile-view') document.getElementById('nav-profile').classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    document.getElementById('app-header').classList.remove('hidden');
    document.getElementById('welcome-message').innerText = `Hello, ${currentUser.name}! 👋`;
    initProfileFields();
    renderEvents();
    switchView('home-view');
}

function logout() {
    document.getElementById('app-header').classList.add('hidden');
    document.getElementById('login-form').reset();
    userBookings = [];
    switchView('login-view');
}

function renderEvents() {
    const container = document.getElementById('events-container');
    container.innerHTML = '';
    eventsData.forEach(evt => {
        const isBooked = userBookings.some(b => b.id === evt.id);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${evt.img}" alt="${evt.title}" class="card-img">
            <div class="card-body">
                <div>
                    <h3>${evt.title}</h3>
                    <p>📅 ${evt.date} | ⏰ ${evt.time}</p>
                </div>
                <button class="btn-primary" style="width:100%; margin-top:15px; background-color: ${isBooked ? '#10b981' : ''}" 
                    onclick="bookEvent(${evt.id})" ${isBooked ? 'disabled' : ''}>
                    ${isBooked ? '✓ Reserved' : 'Book Time Slot'}
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function bookEvent(eventId) {
    const chosenEvent = eventsData.find(e => e.id === eventId);
    if(chosenEvent && !userBookings.some(b => b.id === eventId)) {
        userBookings.push(chosenEvent);
        alert(`Successfully booked a slot for ${chosenEvent.title}!`);
        renderEvents();
    }
}

function renderBookings() {
    const container = document.getElementById('bookings-container');
    container.innerHTML = '';
    if(userBookings.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 40px;">No reservations yet.</p>`;
        return;
    }
    userBookings.forEach(booking => {
        const div = document.createElement('div');
        div.className = 'booking-item';
        div.innerHTML = `<h3>${booking.title}</h3><button class="btn-secondary" style="color: #ef4444;" onclick="cancelBooking(${booking.id})">Cancel</button>`;
        container.appendChild(div);
    });
}

function cancelBooking(id) {
    userBookings = userBookings.filter(b => b.id !== id);
    renderBookings();
    renderEvents();
}

function initProfileFields() {
    document.getElementById('prof-name').value = currentUser.name;
    document.getElementById('prof-dept').value = currentUser.dept;
    document.getElementById('prof-id').value = currentUser.id;
}

function saveProfile(e) {
    e.preventDefault();
    currentUser.name = document.getElementById('prof-name').value;
    currentUser.dept = document.getElementById('prof-dept').value;
    document.getElementById('side-name').innerText = currentUser.name;
    document.getElementById('side-dept').innerText = currentUser.dept;
    document.getElementById('welcome-message').innerText = `Hello, ${currentUser.name}! 👋`;
    alert("Profile saved!");
}