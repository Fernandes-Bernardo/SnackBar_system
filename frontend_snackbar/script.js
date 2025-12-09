// --- CONFIGURATION AND DATA ---

// Map slugs to your 5 API endpoints (replace with your actual URLs later)
const API_ENDPOINTS = {
    'burgers': '/api/burgers',
    'sides': '/api/sides',
    'drinks': '/api/drinks',
    'desserts': '/api/desserts',
    'combos': '/api/combos',
};

// Mock data structure to simulate the response from your 5 APIs
const MOCK_API_DATA = {
    'Burgers': [
        { id: 1, name: "The Gold Standard Burger", desc: "Black truffle mayo, 24k gold leaf patty, on a jet black bun.", price: 24.99, image: 'https://images.unsplash.com/photo-1571091655782-70c8d8879d71?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, name: "Smoky BBQ Blackout Ribs", desc: "Slow-cooked ribs with a dark molasses and gold shimmer glaze.", price: 32.00, image: 'https://images.unsplash.com/photo-1596205763591-6f4142d5940d?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
    'Acompanhamentos': [
        { id: 3, name: "Truffle Gold Fries", desc: "Crispy thin-cut fries tossed in truffle oil and edible gold dust.", price: 8.99, image: 'https://images.unsplash.com/photo-1541544719258-414868018318?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 4, name: "Ebony Onion Petals", desc: "Thick-cut onions in a black pepper crust, served with chipotle gold sauce.", price: 7.50, image: 'https://images.unsplash.com/photo-1513292415147-987593c66289?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
    'Bebidas': [
        { id: 5, name: "Velvet Black Espresso", desc: "Deep, rich espresso with a gold flake crema.", price: 5.00, image: 'https://images.unsplash.com/photo-1557997321-2947a98555ce?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
    'Sobremesas': [
        { id: 6, name: "Molten Gold Lava Cake", desc: "Dark chocolate cake with a molten gold caramel center.", price: 9.50, image: 'https://images.unsplash.com/photo-1620353139049-d128b9d562f7?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
    'Combos': [
        { id: 7, name: "The Royal Combo", desc: "Burger, Truffle Gold Fries, and Velvet Black Espresso. A full experience.", price: 34.99, image: 'https://images.unsplash.com/photo-1565299624942-4386810a7c64?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
};

// --- DOM ELEMENTS (existing code for brevity) ---
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const fullMenu = document.getElementById('full-menu');
const menuLinks = document.querySelectorAll('.menu-link');
const exploreBtn = document.getElementById('explore-btn');
const menuTitle = document.getElementById('menu-title');
const menuItemsGrid = document.getElementById('menu-items-grid');
const categorySelector = document.getElementById('category-selector');
const menuContainer = document.getElementById('menu-container');

// --- HELPER FUNCTIONS ---

/**
 * Creates the HTML for a single menu item card with enhanced design and animations.
 * * New Animations/Effects:
 * 1. Staggered Entrance (using animate__fadeInUp and animation-delay)
 * 2. Card Hover Lift and Gold Shadow (transform: scale, custom shadow-3xl-gold)
 * 3. Image Zoom on Hover (group-hover:scale-110)
 * 4. Button Slide-Up Animation (group-hover:translate-y-0)
 * 5. Gold Accent Border on Hover (border-b-4 border-gold)
 */
function createMenuItemCard(item, index) {
    // Stagger the animation delay by 0.1s for each item
    const delay = (index * 0.1) + 0.3; 

    return `
        <div class="group bg-gray-900 rounded-xl overflow-hidden cursor-pointer 
                    border-b-4 border-transparent hover:border-gold transition-all duration-500 
                    transform hover:scale-[1.03] hover:shadow-3xl-gold
                    animate__animated animate__fadeInUp"
             style="animation-delay: ${delay}s;">
            
            <div class="relative overflow-hidden">
                <div class="h-60 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                     style="background-image: url('${item.image}');">
                </div>
                
                <span class="absolute top-4 right-4 bg-black-theme gold-text text-xl font-extrabold py-1 px-4 rounded-full shadow-lg border border-gold">
                    $${item.price.toFixed(2)}
                </span>
            </div>

            <div class="p-6 text-center">
                <h3 class="text-3xl font-bold gold-text mb-2 tracking-wide">${item.name}</h3>
                <p class="text-base text-gray-400 mb-6">${item.desc}</p>
                
                <button class="w-full py-3 bg-gold text-black font-semibold rounded-full uppercase tracking-wider 
                               opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0
                               transition-all duration-300 ease-out hover:bg-yellow-400">
                    Adicionar ao pedido
                </button>
            </div>
        </div>
    `;
}

/**
 * Fetches and renders menu items for a given slug. (Updated to pass index)
 */
async function loadMenu(slug) {
    menuTitle.textContent = `${slug.toUpperCase()} MENU`;
    menuTitle.classList.add('animate__flipInX'); 
    menuItemsGrid.innerHTML = '<p class="col-span-full text-center text-gold text-xl animate__animated animate__pulse">Loading...</p>';

    const placeholder = document.getElementById('placeholder-text');
    if (placeholder) placeholder.remove();

    try {
        // --- MOCK API CALL (For immediate use) ---
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        const items = MOCK_API_DATA[slug] || [];

        // RENDER: Pass the item and its index (for staggered animations)
        menuItemsGrid.innerHTML = items.map((item, index) => createMenuItemCard(item, index)).join('');
        
        setTimeout(() => menuTitle.classList.remove('animate__flipInX'), 1000); 

    } catch (error) {
        console.error('Error fetching menu:', error);
        menuItemsGrid.innerHTML = `
            <p class="col-span-full text-center text-red-500 text-lg">
                Error loading menu. Please check the '${slug}' API endpoint.
            </p>`;
    }
}

// --- EVENT LISTENERS (existing code for brevity) ---
menuToggle.addEventListener('click', () => {
    fullMenu.classList.remove('menu-hidden');
    fullMenu.classList.add('animate__animated', 'animate__fadeIn');
    document.body.style.overflow = 'hidden'; 
});

closeMenu.addEventListener('click', () => {
    fullMenu.classList.add('menu-hidden');
    fullMenu.classList.remove('animate__animated', 'animate__fadeIn');
    document.body.style.overflow = ''; 
});

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = link.dataset.menu;
        
        loadMenu(slug);
        menuContainer.scrollIntoView({ behavior: 'smooth' });
        
        fullMenu.classList.add('menu-hidden');
        document.body.style.overflow = '';
    });
});

exploreBtn.addEventListener('click', () => {
    loadMenu('burgers');
    menuContainer.scrollIntoView({ behavior: 'smooth' });
});

function initCategorySelector() {
    const slugs = Object.keys(API_ENDPOINTS);
    categorySelector.innerHTML = slugs.map(slug => `
        <button data-slug="${slug}" class="menu-category-btn bg-gray-700 text-gray-300 font-semibold py-2 px-5 rounded-full capitalize border-2 border-transparent hover:border-gold hover:text-gold transition duration-300">
            ${slug}
        </button>
    `).join('');
    
    categorySelector.addEventListener('click', (e) => {
        const button = e.target.closest('.menu-category-btn');
        if (button) {
            const slug = button.dataset.slug;
            loadMenu(slug);
            
            // Highlight the active button
            document.querySelectorAll('.menu-category-btn').forEach(btn => {
                btn.classList.remove('border-gold', 'text-gold');
                btn.classList.add('border-transparent', 'text-gray-300');
            });
            button.classList.add('border-gold', 'text-gold');
            button.classList.remove('border-transparent', 'text-gray-300');
            
            menuContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initCategorySelector();
});