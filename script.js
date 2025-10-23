let profiles = [];

// Load profiles from localStorage
function loadFromLocalStorage() {
  const data = localStorage.getItem('profiles');
  if (data) profiles = JSON.parse(data);
  loadProfiles();
}

// Save profiles to localStorage
function saveToLocalStorage() {
  localStorage.setItem('profiles', JSON.stringify(profiles));
}

// Show/Hide Add Profile Form
function showAddForm() {
  document.getElementById('formSection').classList.toggle('hidden');
}

// Helper: Create colored skill tags
function createTags(skills, type) {
  return skills.split(',').map(s => `<span class="skill-tag ${type}">${s.trim()}</span>`).join(' ');
}

// Add new profile
function addProfile() {
  const name = document.getElementById('name').value.trim();
  const dept = document.getElementById('dept').value.trim();
  const teach = document.getElementById('teach').value.trim();
  const learn = document.getElementById('learn').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !teach) {
    alert("Name and Skills to Teach are required!");
    return;
  }

  profiles.push({ name, dept, teach, learn, contact });
  saveToLocalStorage();
  loadProfiles();

  document.getElementById('formSection').classList.add('hidden');
  document.getElementById('name').value = '';
  document.getElementById('dept').value = '';
  document.getElementById('teach').value = '';
  document.getElementById('learn').value = '';
  document.getElementById('contact').value = '';
}

// Copy contact to clipboard
function copyContact(contact) {
  navigator.clipboard.writeText(contact).then(() => {
    alert(`Copied to clipboard: ${contact}`);
  }).catch(err => console.error('Failed to copy:', err));
}

// Load all profiles
function loadProfiles() {
  const container = document.getElementById('profiles');
  container.innerHTML = '';

  if (profiles.length === 0) {
    container.innerHTML = `<p class="no-profiles">No profiles added yet. Add your profile!</p>`;
    return;
  }

  profiles.forEach(p => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p><b>${p.dept}</b></p>
      <p>🏷️ Teaches: ${createTags(p.teach, 'teach')}</p>
      <p>📘 Learns: ${createTags(p.learn, 'learn')}</p>
      <p>✉️ ${p.contact} <button class="copy-btn" onclick="copyContact('${p.contact}')">Copy</button></p>
    `;
    container.appendChild(card);
  });
}

// Search profiles by skill
function searchSkill() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const container = document.getElementById('profiles');
  container.innerHTML = '';

  const filtered = profiles.filter(p =>
    p.teach.toLowerCase().includes(query) ||
    p.learn.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<p class="no-profiles">No profiles match "${query}"</p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p><b>${p.dept}</b></p>
      <p>🏷️ Teaches: ${createTags(p.teach, 'teach')}</p>
      <p>📘 Learns: ${createTags(p.learn, 'learn')}</p>
      <p>✉️ ${p.contact} <button class="copy-btn" onclick="copyContact('${p.contact}')">Copy</button></p>
    `;
    container.appendChild(card);
  });
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Initialize
loadFromLocalStorage();