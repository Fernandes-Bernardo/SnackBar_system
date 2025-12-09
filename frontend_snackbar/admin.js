// --- CONFIGURATION AND MOCK DATA ---

// Use localStorage to persist the mock data for the admin view
const STORAGE_KEY = 'golden_ember_menu_data';

const INITIAL_MOCK_DATA = {
    'burgers': [
        { id: 1, name: "The Gold Standard Burger", desc: "Black truffle mayo, 24k gold leaf patty.", price: 24.99, image: 'url' },
        { id: 2, name: "Smoky BBQ Blackout", desc: "Charcoal bun, slow-smoked pork.", price: 18.50, image: 'url' },
    ],
    'sides': [
        { id: 3, name: "Truffle Gold Fries", desc: "Crispy thin-cut fries.", price: 8.99, image: 'url' },
        { id: 4, name: "Ebony Onion Petals", desc: "Thick-cut onions in a black pepper crust.", price: 7.50, image: 'url' },
    ],
    'drinks': [], 'desserts': [], 'combos': [],
};

// Initialize or retrieve data from localStorage
let menuData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (!menuData || Object.keys(menuData).length === 0) {
    menuData = INITIAL_MOCK_DATA;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
}

let currentMenuSlug = 'burgers'; // Default menu to display

// --- DOM ELEMENTS ---
const categorySelector = document.getElementById('admin-category-selector');
const menuItemsList = document.getElementById('menu-items-list');
const currentMenuTitle = document.getElementById('current-menu-title');
const addItemForm = document.getElementById('add-item-form');


// --- HELPER FUNCTIONS ---

/**
 * Persists the current menuData object to localStorage.
 */
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
}

/**
 * Creates a table row (<tr>) for a single menu item.
 */
function createItemRow(item) {
    return `
        <tr data-id="${item.id}" class="hover:bg-gray-800 transition duration-150">
            <td class="p-3">${item.id}</td>
            <td class="p-3 font-semibold text-white">${item.name}</td>
            <td class="p-3 gold-text">$${item.price.toFixed(2)}</td>
            <td class="p-3 space-x-2 whitespace-nowrap">
                <button onclick="handleEdit(${item.id})" class="text-blue-400 hover:text-blue-300 font-semibold text-sm">Edit</button>
                <button onclick="handleDelete(${item.id})" class="text-red-400 hover:text-red-300 font-semibold text-sm">Delete</button>
            </td>
        </tr>
    `;
}

/**
 * Renders the items of the currently selected menu into the table.
 */
function renderMenuItems() {
    const items = menuData[currentMenuSlug] || [];
    currentMenuTitle.textContent = currentMenuSlug;

    if (items.length === 0) {
        menuItemsList.innerHTML = `
            <tr><td colspan="4" class="text-center p-6 text-gray-500">
                No items in the ${currentMenuSlug} menu. Add one above!
            </td></tr>`;
        return;
    }

    menuItemsList.innerHTML = items.map(createItemRow).join('');
}

/**
 * Initializes the category selector buttons.
 */
function initCategorySelector() {
    const slugs = Object.keys(menuData);
    categorySelector.innerHTML = slugs.map(slug => `
        <button data-slug="${slug}" class="menu-category-btn bg-gray-700 text-gray-300 font-semibold py-2 px-5 rounded-lg capitalize border-2 border-transparent ${slug === currentMenuSlug ? 'border-gold text-gold' : 'hover:border-gold hover:text-gold'} transition duration-300">
            ${slug}
        </button>
    `).join('');
    
    // Add click listener to switch menus
    categorySelector.addEventListener('click', (e) => {
        const button = e.target.closest('.menu-category-btn');
        if (button) {
            const newSlug = button.dataset.slug;
            currentMenuSlug = newSlug;
            
            // Update button styles
            document.querySelectorAll('.menu-category-btn').forEach(btn => {
                btn.classList.remove('border-gold', 'text-gold');
                btn.classList.add('border-transparent', 'text-gray-300');
            });
            button.classList.add('border-gold', 'text-gold');
            button.classList.remove('border-transparent', 'text-gray-300');
            
            renderMenuItems();
        }
    });
}


// --- CRUD HANDLERS ---

window.handleDelete = function(id) {
    if (!confirm(`Are you sure you want to delete item ID ${id}?`)) {
        return;
    }
    
    let items = menuData[currentMenuSlug];
    menuData[currentMenuSlug] = items.filter(item => item.id !== id);
    
    saveData();
    renderMenuItems();
    alert(`Item ID ${id} deleted.`);
}

window.handleEdit = function(id) {
    // In a real app, this would open a modal/form for editing.
    alert(`Editing item ID ${id} in the ${currentMenuSlug} menu. (Feature to be implemented)`);
}

addItemForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    const items = menuData[currentMenuSlug];
    // Simple way to get a unique ID (max existing ID + 1)
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;

    const newItem = {
        id: newId,
        name: name,
        description: description,
        price: price,
        image: image || 'placeholder.jpg'
    };

    items.push(newItem);
    saveData();
    renderMenuItems();
    
    this.reset(); // Clear the form
    alert(`New item "${name}" added to the ${currentMenuSlug} menu!`);
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initCategorySelector();
    renderMenuItems(); // Load the default menu ('burgers') on page load
});