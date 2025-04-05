export interface FoodItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    subcategory?: string;
}

export const categories = [
    "All",
    "Rice & Curries",
    "Fried Rice",
    "Biryani",
    "Nasi Goreng",
    "Lemon Rice",
    "String Hoppers Kottu",
    "Curries",
    "Rotty Kottu",
    "Noodles",
    "Dolphin",
    "Cheese Kottu",
    "Soup",
    "Soft Drinks",
    "Dessert",
    "Mineral Water",
    "Appetizer"
];

export const subcategories = {
    Curries: [
        "Mutton",
        "Chicken",
        "Vegetable",
        "Prawns",
        "Beef",
        "Egg",
        "Cuttlefish",
        "Fish"
    ]
};

export const menuItems: FoodItem[] = [
    {
        id: 1,
        name: "Traditional Rice & Curry",
        price: 1299.00,
        image: "R1.jpg",
        category: "Rice & Curries"
    },
    {
        id: 2,
        name: "Chicken Fried Rice",
        price: 1499.00,
        image: "R1.jpg",
        category: "Fried Rice"
    },
    {
        id: 3,
        name: "Mutton Biryani",
        price: 1699.00,
        image: "R1.jpg",
        category: "Biryani"
    },
    {
        id: 4,
        name: "Seafood Nasi Goreng",
        price: 1599.00,
        image: "R1.jpg",
        category: "Nasi Goreng"
    },
    {
        id: 5,
        name: "Coconut Lemon Rice",
        price: 1099.00,
        image: "R1.jpg",
        category: "Lemon Rice"
    },
    {
        id: 6,
        name: "Egg String Hoppers Kottu",
        price: 1399.00,
        image: "R1.jpg",
        category: "String Hoppers Kottu"
    },
    {
        id: 7,
        name: "Mutton Curry",
        price: 1899.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Mutton"
    },
    {
        id: 8,
        name: "Butter Chicken Curry",
        price: 1699.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Chicken"
    },
    {
        id: 9,
        name: "Mixed Vegetable Curry",
        price: 1299.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Vegetable"
    },
    {
        id: 10,
        name: "Prawn Curry",
        price: 1999.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Prawns"
    },
    {
        id: 11,
        name: "Chicken Rotty Kottu",
        price: 1499.00,
        image: "R1.jpg",
        category: "Rotty Kottu"
    },
    {
        id: 12,
        name: "Seafood Noodles",
        price: 1699.00,
        image: "R1.jpg",
        category: "Noodles"
    },
    {
        id: 13,
        name: "Special Dolphin Rice",
        price: 1899.00,
        image: "R1.jpg",
        category: "Dolphin"
    },
    {
        id: 14,
        name: "Cheese Kottu Special",
        price: 1599.00,
        image: "R1.jpg",
        category: "Cheese Kottu"
    },
    {
        id: 15,
        name: "Tom Yum Soup",
        price: 999.00,
        image: "R1.jpg",
        category: "Soup"
    },
    {
        id: 16,
        name: "Fresh Lime Soda",
        price: 399.00,
        image: "R1.jpg",
        category: "Soft Drinks"
    },
    {
        id: 17,
        name: "Watalappan",
        price: 699.00,
        image: "R1.jpg",
        category: "Dessert"
    },
    {
        id: 18,
        name: "Premium Mineral Water",
        price: 199.00,
        image: "R1.jpg",
        category: "Mineral Water"
    },
    {
        id: 19,
        name: "Chicken Spring Rolls",
        price: 899.00,
        image: "R1.jpg",
        category: "Appetizer"
    },
    {
        id: 20,
        name: "Beef Curry",
        price: 1799.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Beef"
    },
    {
        id: 21,
        name: "Egg Curry",
        price: 1199.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Egg"
    },
    {
        id: 22,
        name: "Cuttlefish Curry",
        price: 1899.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Cuttlefish"
    },
    {
        id: 23,
        name: "Fish Curry",
        price: 1699.00,
        image: "R1.jpg",
        category: "Curries",
        subcategory: "Fish"
    },
    {
        id: 24,
        name: "Vegetable Fried Rice",
        price: 1299.00,
        image: "R1.jpg",
        category: "Fried Rice"
    },
    {
        id: 25,
        name: "Egg Fried Rice",
        price: 1199.00,
        image: "R1.jpg",
        category: "Fried Rice"
    },
    {
        id: 26,
        name: "Seafood Fried Rice",
        price: 1599.00,
        image: "R1.jpg",
        category: "Fried Rice"
    },
    {
        id: 27,
        name: "Spicy Chicken Fried Rice",
        price: 1499.00,
        image: "R1.jpg",
        category: "Fried Rice"
    },
    {
        id: 28,
        name: "Vegetable Biryani",
        price: 1399.00,
        image: "R1.jpg",
        category: "Biryani"
    },
    {
        id: 29,
        name: "Chicken Biryani",
        price: 1499.00,
        image: "R1.jpg",
        category: "Biryani"
    },
    {
        id: 30,
        name: "Fish Biryani",
        price: 1699.00,
        image: "R1.jpg",
        category: "Biryani"
    },
    {
        id: 31,
        name: "Egg Biryani",
        price: 1299.00,
        image: "R1.jpg",
        category: "Biryani"
    },
    {
        id: 32,
        name: "Mutton Biryani",
        price: 1899.00,
        image: "R1.jpg",
        category: "Biryani"
    },
    {
        id: 33,
        name: "Vegetable Noodles",
        price: 1099.00,
        image: "R1.jpg",
        category: "Noodles"
    },
    {
        id: 34,
        name: "Chicken Noodles",
        price: 1299.00,
        image: "R1.jpg",
        category: "Noodles"
    },
    {
        id: 35,
        name: "Beef Noodles",
        price: 1499.00,
        image: "R1.jpg",
        category: "Noodles"
    },
    {
        id: 36,
        name: "Seafood Noodles",
        price: 1599.00,
        image: "R1.jpg",
        category: "Noodles"
    },
    {
        id: 37,
        name: "Egg Noodles",
        price: 1199.00,
        image: "R1.jpg",
        category: "Noodles"
    },
    {
        id: 38,
        name: "Chicken Soup",
        price: 899.00,
        image: "R1.jpg",
        category: "Soup"
    },
    {
        id: 39,
        name: "Vegetable Soup",
        price: 799.00,
        image: "R1.jpg",
        category: "Soup"
    },
    {
        id: 40,
        name: "Seafood Soup",
        price: 999.00,
        image: "R1.jpg",
        category: "Soup"
    },
    {
        id: 41,
        name: "Tomato Soup",
        price: 699.00,
        image: "R1.jpg",
        category: "Soup"
    },
    {
        id: 42,
        name: "Mushroom Soup",
        price: 899.00,
        image: "R1.jpg",
        category: "Soup"
    },
    {
        id: 43,
        name: "Chocolate Cake",
        price: 599.00,
        image: "R1.jpg",
        category: "Dessert"
    },
    {
        id: 44,
        name: "Fruit Salad",
        price: 499.00,
        image: "R1.jpg",
        category: "Dessert"
    },
    {
        id: 45,
        name: "Ice Cream Sundae",
        price: 699.00,
        image: "R1.jpg",
        category: "Dessert"
    },
    {
        id: 46,
        name: "Brownie",
        price: 799.00,
        image: "R1.jpg",
        category: "Dessert"
    },
    {
        id: 47,
        name: "Cheesecake",
        price: 899.00,
        image: "R1.jpg",
        category: "Dessert"
    }
];
