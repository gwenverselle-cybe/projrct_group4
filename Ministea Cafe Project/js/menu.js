const menuData = {
    drinks: {
        'Iced Coffee': ['Iced Americano', 'Iced Latte', 'Iced Mocha', 'Cold Brew', 'Iced Cappuccino'],
        'Hot Coffee': ['Espresso', 'Americano', 'Cappuccino', 'Latte', 'Macchiato'],
        'Non Coffee': ['Hot Chocolate', 'Matcha Latte', 'Chai Latte', 'Milk Tea', 'Milo'],
        'Fresh and Cold': ['Fresh Lemonade', 'Iced Tea', 'Fruit Shake', 'Smoothie', 'Acai Bowl'],
        'Tea and Infusions': ['Green Tea', 'Black Tea', 'Herbal Tea', 'Chamomile', 'Peppermint']
    },
    pastries: {
        'Puff Pastry': ['Croissant', 'Danish', 'Apple Turnover', 'Cheese Puff', 'Almond Croissant'],
        'Shortcrust Pastry': ['Apple Pie', 'Lemon Tart', 'Quiche', 'Jam Tart', 'Custard Tart'],
        'Choux Pastry': ['Eclair', 'Profiterole', 'Cream Puff', 'Paris Brest', 'Choux au Craquelin'],
        'Phyllo Pastry': ['Baklava', 'Spanakopita', 'Apple Strudel', 'Tiropita', 'Borek'],
        'Flaky Pastry': ['Pain au Chocolat', 'Raisin Roll', 'Cheese Stick', 'Ham & Cheese', 'Cinnamon Roll']
    },
    'light-meals': {
        'Sandwiches': ['Club Sandwich', 'BLT', 'Tuna Melt', 'Chicken Caesar', 'Veggie Wrap'],
        'Pasta': ['Carbonara', 'Aglio Olio', 'Pesto Pasta', 'Marinara', 'Alfredo'],
        'Rice Meals': ['Chicken Adobo', 'Pork BBQ', 'Beef Salpicao', 'Chicken Teriyaki', 'Fried Rice'],
        'Salads': ['Caesar Salad', 'Greek Salad', 'Garden Salad', 'Cobb Salad', 'Quinoa Salad'],
        'All day meals': ['Chicken & Rice', 'Pork Steak', 'Fish Fillet', 'Burger Steak', 'Sisig']
    },
    desserts: {
        'Cakes': ['Chocolate Cake', 'Red Velvet', 'Cheesecake', 'Carrot Cake', 'Tiramisu'],
        'Ice Cream': ['Vanilla Scoop', 'Chocolate Scoop', 'Matcha Scoop', 'Mango Scoop', 'Sundae'],
        'Waffles': ['Classic Waffle', 'Chocolate Waffle', 'Berry Waffle', 'Ice Cream Waffle', 'Nutella Waffle'],
        'Pancakes': ['Classic Pancakes', 'Blueberry Pancakes', 'Banana Pancakes', 'Oreo Pancakes', 'Matcha Pancakes'],
        'Crepe': ['Nutella Crepe', 'Lemon Crepe', 'Berry Crepe', 'Banana Crepe', 'Ice Cream Crepe']
    },
    snacks: {
        'Fries': ['Classic Fries', 'Truffle Fries', 'Cheese Fries', 'Sweet Potato Fries', 'Loaded Fries'],
        'Nachos': ['Classic Nachos', 'Cheese Nachos', 'Guacamole Nachos', 'Chili Nachos', 'Supreme Nachos'],
        'Chicken Wings': ['Buffalo Wings', 'Honey Garlic', 'Spicy BBQ', 'Teriyaki Wings', 'Lemon Pepper'],
        'Mozzarella': ['Mozzarella Sticks', 'Mozzarella Bites', 'Mozzarella Balls', 'Mozzarella Skins', 'Mozzarella Wedges'],
        'Mini Burgers': ['Classic Slider', 'Cheese Slider', 'BBQ Slider', 'Teriyaki Slider', 'Mushroom Slider']
    }
};

// Menu initialization function
window.initMenu = function() {
    const sidebar = document.querySelector('.sidebar');
    const menuContent = document.getElementById('menu-content');
    const menuTabs = document.querySelectorAll('.menu-tab');
    let currentCategory = 'drinks';
    let currentSubcategory = null;
    
    function updateSidebar(category) {
        sidebar.innerHTML = `<h4>${formatCategoryName(category)}</h4>`;
        
        Object.keys(menuData[category]).forEach(subcategory => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = subcategory;
            link.dataset.subcategory = subcategory.toLowerCase().replace(/ & /g, '').replace(/ /g, '-');
            sidebar.appendChild(link);
        });
    }
    function loadSubcategoryContent(subcategory) {
        const products = menuData[currentCategory][subcategory];
        menuContent.innerHTML = generateProductsHTML(subcategory, products);
        bindCartButtons();
    }
    // Generate products HTML (5 products per subcategory)
    function generateProductsHTML(subcategory, products) {
        return `
            <div class="menu-section">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="section-title mb-0">${subcategory}</h5>
                    <a href="#" class="back-link" data-back="${currentCategory}">
                    </a>
                </div>
                <div class="row">
                    ${products.map((product, index) => `
                        <div class="col-md-6 col-lg-4 mb-4 product-item">
                            <div class="drink-img"></div>
                            <div class="drink-name">${product}</div>
                            <button class="btn-cart w-100">Add to Cart</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    function formatCategoryName(category) {
        return category.charAt(0).toUpperCase() + category.replace('-', ' ').slice(1);
    }
    function bindCartButtons() {
        document.querySelectorAll('.btn-cart').forEach(btn => {
            btn.onclick = function() {
                const productName = this.previousElementSibling.previousElementSibling.textContent;
                const price = this.previousElementSibling.textContent;
                alert(`${productName} ${price} added to cart!`);
            };
        });
    }
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            updateSidebar(currentCategory);
            loadSubcategoryContent(Object.keys(menuData[currentCategory])[0]); 
        });
    });
    document.addEventListener('click', function(e) {
        if (e.target.closest('.sidebar a')) {
            e.preventDefault();
            document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
            e.target.closest('a').classList.add('active');
            
            const subcategory = e.target.closest('a').textContent;
            currentSubcategory = subcategory;
            loadSubcategoryContent(subcategory);
        }
        if (e.target.matches('.back-link')) {
            e.preventDefault();
            const firstSubcategory = Object.keys(menuData[currentCategory])[0];
            loadSubcategoryContent(firstSubcategory);
        }
    });
    updateSidebar('drinks');
    loadSubcategoryContent('Iced Coffee');
};