const Product = require('../models/productModel');

const seedProducts = async () => {
  try {
    const count = await Product.count();
    if (count > 0) {
      console.log(`ℹ️ Seed skipped: ${count} products already exist`);
      return;
    }
    await Product.bulkCreate([
      {
        name: "Vegetarian Noodles",
        description: "Fresh vegetarian noodles with seasonal vegetables",
        price: 22.00,
        image: "/images/vegetarian-noodles.jpg",
        category: "Asian",
        rating: 4.9,
        isAvailable: true,
        protein: 8,
        carbs: 45,
        fat: 10,
        fiber: 4,
        prepTime: '15 min',
        reviewsCount: 132,
        ingredients: ['Noodles', 'Carrots', 'Bell pepper', 'Soy sauce', 'Garlic'],
        allergens: ['Gluten', 'Soy'],
        sizes: [
          { id: 'sm', name: 'Small', price: 20.00, calories: 380 },
          { id: 'md', name: 'Medium', price: 22.00, calories: 460 },
          { id: 'lg', name: 'Large', price: 25.00, calories: 540 },
        ],
        extras: [
          { id: 'ex1', name: 'Extra veggies', price: 2.00 },
          { id: 'ex2', name: 'Tofu', price: 3.50 }
        ]
      },
      {
        name: "Pizza Hut - Luminta",
        description: "Classic pizza with signature sauce",
        price: 19.50,
        image: "/images/pizza.jpg",
        category: "Italian",
        rating: 4.8,
        isAvailable: true,
        protein: 12,
        carbs: 55,
        fat: 15,
        fiber: 3,
        prepTime: '20 min',
        reviewsCount: 98,
        ingredients: ['Dough', 'Tomato sauce', 'Mozzarella', 'Basil'],
        allergens: ['Gluten', 'Dairy'],
        sizes: [
          { id: 'p-sm', name: 'Small', price: 17.00, calories: 520 },
          { id: 'p-md', name: 'Medium', price: 19.50, calories: 680 },
          { id: 'p-lg', name: 'Large', price: 23.00, calories: 820 },
        ],
        extras: [
          { id: 'ex3', name: 'Extra cheese', price: 2.50 },
          { id: 'ex4', name: 'Olives', price: 1.50 }
        ]
      },
      {
        name: "Mozzarella Cheese Burger",
        description: "Juicy burger with melted mozzarella",
        price: 22.50,
        image: "/images/burger.jpg",
        category: "American",
        rating: 4.6,
        isAvailable: true,
        protein: 20,
        carbs: 38,
        fat: 22,
        fiber: 2,
        prepTime: '12 min',
        reviewsCount: 210,
        ingredients: ['Bun', 'Beef patty', 'Mozzarella', 'Lettuce', 'Tomato'],
        allergens: ['Gluten', 'Dairy'],
        sizes: [
          { id: 'b-reg', name: 'Regular', price: 22.50, calories: 700 },
          { id: 'b-dbl', name: 'Double', price: 26.00, calories: 920 },
        ],
        extras: [
          { id: 'ex5', name: 'Bacon', price: 3.00 },
          { id: 'ex6', name: 'Fries', price: 4.00 }
        ]
      },
      {
        name: "Fresh Garden Salad",
        description: "Mixed fresh vegetables with house dressing",
        price: 15.00,
        image: "/images/salad.jpg",
        category: "Healthy",
        rating: 4.7,
        isAvailable: true,
        protein: 5,
        carbs: 18,
        fat: 7,
        fiber: 5,
        prepTime: '8 min',
        reviewsCount: 75,
        ingredients: ['Lettuce', 'Cucumber', 'Tomato', 'Onion', 'Dressing'],
        allergens: [],
        sizes: [
          { id: 's-sm', name: 'Small', price: 12.00, calories: 180 },
          { id: 's-lg', name: 'Large', price: 15.00, calories: 260 },
        ],
        extras: [
          { id: 'ex7', name: 'Chicken', price: 3.50 },
          { id: 'ex8', name: 'Avocado', price: 2.50 }
        ]
      },
      {
        name: "Grilled Chicken Bowl",
        description: "Grilled chicken with rice and vegetables",
        price: 18.50,
        image: "/images/chicken-bowl.jpg",
        category: "Healthy",
        rating: 4.9,
        isAvailable: true,
        protein: 25,
        carbs: 30,
        fat: 12,
        fiber: 6,
        prepTime: '18 min',
        reviewsCount: 180,
        ingredients: ['Chicken', 'Rice', 'Broccoli', 'Carrots', 'Teriyaki sauce'],
        allergens: ['Soy'],
        sizes: [
          { id: 'c-reg', name: 'Regular', price: 18.50, calories: 520 },
          { id: 'c-xl', name: 'XL', price: 22.00, calories: 700 },
        ],
        extras: [
          { id: 'ex9', name: 'Boiled egg', price: 1.50 },
          { id: 'ex10', name: 'Extra chicken', price: 4.00 }
        ]
      }
    ]);
    
    console.log('✅ Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = seedProducts;
