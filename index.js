const form = document.getElementById('guest-form');
const input = document.getElementById('guest-input');
const guestList = document.getElementById('guest-list');
const limitMsg = document.getElementById('guest-limit-msg');
const categorySelect = document.getElementById('guest-category');

let guests = [];
const GUEST_LIMIT = 10;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = input.value.trim();
  const category = categorySelect.value;

  if (name === '') return;

  if (guests.length >= GUEST_LIMIT) {
    limitMsg.classList.remove('hidden');
    return;
  }

  addGuest(name, category);
  input.value = '';
  limitMsg.classList.add('hidden');
});

function addGuest(name, category) {
  const li = document.createElement('li');

  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;

  const categorySpan = document.createElement('span');
  categorySpan.textContent = (`${category}`);
  categorySpan.style.fontWeight = 'bold';
  categorySpan.style.color = getColor(category);

  const timeSpan = document.createElement('span');
  const time = new Date().toLocaleTimeString();
  timeSpan.textContent = [`Added: ${time}`];
  timeSpan.style.fontSize = '12px';
  timeSpan.style.color = '#777';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    const newName = prompt('Update name:', nameSpan.textContent);
    if (newName && newName.trim() !== '') {
      nameSpan.textContent = newName.trim();
    }
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    guestList.removeChild(li);
    guests = guests.filter(g => g !== name);
    if (guests.length < GUEST_LIMIT) {
      limitMsg.classList.add('hidden');
    }
  });

  li.appendChild(nameSpan);
  li.appendChild(categorySpan);
  li.appendChild(timeSpan);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);

  guestList.appendChild(li);
  guests.push(name);
}

function getColor(category) {
  switch (category) {
    case 'Friend': return 'blue';
    case 'Family': return 'green';
    case 'Colleague': return 'purple';
    default: return 'black';
  }
}

