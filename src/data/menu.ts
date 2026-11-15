export type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
};

export type MenuCategoryMap = Record<string, MenuItem[]>;

const MENU_IMAGE_BASE_PATH = '/menu%20images';

const menuImage = (fileName: string) => `${MENU_IMAGE_BASE_PATH}/${encodeURIComponent(fileName)}`;

const menuImageMap: Partial<Record<number, string>> = {
  101: menuImage('Plain DOAsa.jpg'),
  102: menuImage('Egg Dosa.jpeg'),
  103: menuImage('Ghee karam Dosa.jpeg'),
  104: menuImage('Ghee pudi thatte idli.jpg'),
  105: menuImage('Set dosa.jpg'),
  106: menuImage('chessedosa.jpg'),
  107: menuImage('Onion Dosa.webp'),

  201: menuImage('Benne dosa.jpg'),
  202: menuImage('mysore masala DOSa.jpeg'),

  301: menuImage("Chef's Special Dosa.jpg"),

  401: menuImage('Thatte idli.webp'),
  402: menuImage('ghee pudi idli.jpeg'),
  403: menuImage('Ghee karam Thatte idli.webp'),
  404: menuImage('Sambar Thatte idli.jpeg'),

  501: menuImage('reg chitti idli.avif'),
  502: menuImage('Ghee pudi chitti idli.png'),
  503: menuImage('karam chittti idli.jpeg'),
  504: menuImage('Sambar chitti idli.jpeg'),

  601: menuImage('Pani_Puri.jpeg'),
  602: menuImage('masala puri.jpeg'),
  603: menuImage('dahi-puri.jpg'),
  604: menuImage('Bhel puri.jpg'),
  605: menuImage('samosa-chaat.jpg'),
  606: menuImage('samosa-Dahi chaat.jpg'),
  607: menuImage('samosa-chaat.jpg'),
  608: menuImage('samosa.webp'),

  701: menuImage('Muri mixture.avif'),

  801: menuImage('chikoo shake.cms'),
  802: menuImage('falooda.jpeg'),
  803: menuImage('lime soda.jpeg'),
  804: menuImage('tea.jpeg'),
  805: menuImage('filter coffe.jpeg'),

  901: menuImage('Bun_Maska.jpg'),

  1001: menuImage('chkn_momos.jpg'),
  1002: menuImage('veg momos.jpeg'),


  1201: menuImage('mirchi bajji.jpg'),
  1202: menuImage('Egg Bajji.jpg'),
  1203: menuImage('chitti-punugulu.jpg'),
  1204: menuImage('aloo-bonda.jpg'),

  1301: menuImage('plain-vada.jpg'),
  1302: menuImage('sambar-vada.jpg'),
  1303: menuImage('dahi-vada.jpg'),
};

export const menuCategories: MenuCategoryMap = {
  '🥞 DOSA (Crispy South Indian Crepes)': [
    { id: 101, name: 'Plain Dosa', desc: 'A classic South Indian crepe made from fermented rice and lentils, cooked until golden and crispy on the outside with a light, slightly tangy flavor. Served with two house-made chutneys and sambar.', price: '$9.99', isVegan: true, isGlutenFree: true },
    { id: 102, name: 'Egg Dosa', desc: 'A crispy dosa cooked with a freshly cracked egg spread on top, creating a soft, savory layer combined with the crisp crepe underneath. Served with two house-made chutneys and sambar.', price: '$12.49', isGlutenFree: true },
    { id: 103, name: 'Ghee Karam Dosa', desc: 'A bold and flavorful dosa spread with spicy chili-garlic paste and finished with rich clarified butter (ghee) for a spicy, buttery taste. Served with two house-made chutneys and sambar.', price: '$11.99', isGlutenFree: true },
    { id: 104, name: 'Ghee Pudi Dosa', desc: 'Crispy dosa coated with aromatic spiced lentil powder (gunpowder spice mix) and drizzled with melted ghee for a rich, nutty flavor. Served with two house-made chutneys and sambar.', price: '$11.99', isGlutenFree: true },
    { id: 105, name: 'Set Dosa', desc: 'Soft, thick, and fluffy mini dosas served in a set of three. These are lighter and more bread-like compared to crispy dosas. Served with two house-made chutneys and sambar.', price: '$11.99', isVegan: true, isGlutenFree: true },
    { id: 106, name: 'Cheese Dosa', desc: 'Crispy dosa filled with melted cheese, creating a fusion-style dish that is crunchy outside and creamy inside. Served with two house-made chutneys and sambar.', price: '$13.49', isGlutenFree: true },
    { id: 107, name: 'Onion Dosa', desc: 'Crispy dosa topped with caramelized sautéed onions that add sweetness and crunch to every bite. Served with two house-made chutneys and sambar.', price: '$11.49', isVegan: true, isGlutenFree: true },
  ],
  '🌟 KARNATAKA SPECIALS': [
    { id: 201, name: 'Benne Dosa', desc: 'A famous buttery dosa from Karnataka made with extra butter, giving it a rich aroma, crispy edges, and soft center. Served with two house-made chutneys and sambar.', price: '$12.99', isGlutenFree: true },
    { id: 202, name: 'Mysore Masala Dosa', desc: 'A spicy variation of dosa spread with fiery red chili chutney and stuffed with lightly spiced mashed potato filling. Served with two house-made chutneys and sambar.', price: '$13.99', isGlutenFree: true },
  ],
  '👨🍳 CHEF’S SPECIAL DOSA': [
    { id: 301, name: "Chef's Special Dosa", desc: 'A rotating signature dosa created by our chef using seasonal ingredients and unique flavor combinations. Served with two house-made chutneys and sambar.', price: '$15.99', isGlutenFree: true },
  ],
  '🍽️ IDLI (Steamed Rice Cakes)': [
    { id: 401, name: 'Thatte Idli', desc: 'A large, plate-sized soft steamed rice cake that is airy, spongy, and slightly tangy in flavor, served hot with two house-made chutneys and sambar.', price: '$6.99', isVegan: true, isGlutenFree: true },
    { id: 402, name: 'Ghee Pudi Thatte Idli', desc: 'Large steamed idli topped generously with spiced lentil powder and hot melted ghee, giving a rich, nutty, and spicy taste. Served with two house-made chutneys and sambar.', price: '$7.99', isGlutenFree: true },
    { id: 403, name: 'Ghee Karam Thatte Idli', desc: 'Soft large idli tossed in a spicy chili-garlic mix and finished with ghee for a bold and flavorful kick. Served with two house-made chutneys and sambar.', price: '$7.99', isGlutenFree: true },
    { id: 404, name: 'Sambar Thatte Idli', desc: 'Large soft idli soaked in warm lentil soup (sambar), making it soft, flavorful, and comforting. Served with two house-made chutneys.', price: '$7.49', isGlutenFree: true },
  ],
  'Medu Vada (Savory Lentil Fritters)': [
    { id: 1301, name: 'Plain Vada (3 pieces)', desc: 'Three savory, doughnut-shaped fritters made with black lentils. Crisp outside and fluffy inside, served with two chutneys for dipping.', price: '$7.99' },
    { id: 1302, name: 'Sambar Vada', desc: 'Savory lentil fritters soaked in sambar, a warm South Indian lentil and vegetable stew seasoned with spices.', price: '$7.99' },
    { id: 1303, name: 'Dahi Vada', desc: 'Soft lentil fritters soaked in cool, creamy yogurt and finished with seasonings. Tangy and refreshing.', price: '$7.99' },
  ],
  '🔥 GUNTUR SPECIALS': [
    { id: 501, name: 'Chitti Idli', desc: 'Small bite-sized steamed rice cakes that are soft and fluffy, often enjoyed as a snack or street-style dish. Served with two house-made chutneys and sambar.', price: '$7.99', isVegan: true, isGlutenFree: true },
    { id: 502, name: 'Ghee Pudi Chitti Idli', desc: 'Mini idlis coated in spicy lentil powder and tossed with ghee for a rich, flavorful bite-sized snack. Served with two house-made chutneys and sambar.', price: '$8.99', isGlutenFree: true },
    { id: 503, name: 'Ghee Karam Chitti Idli', desc: 'Mini idlis mixed with spicy chili seasoning and ghee, creating a bold, street-style flavor. Served with two house-made chutneys and sambar.', price: '$8.99', isGlutenFree: true },
    { id: 504, name: 'Sambar Idli', desc: 'Soft steamed idlis soaked in hot, mildly spiced lentil soup for a comforting and filling dish. Served with two house-made chutneys.', price: '$7.49', isGlutenFree: true },
  ],
  '🥙 CHAATS (Indian Street Snacks)': [
    { id: 601, name: 'Pani Puri', desc: 'Crispy hollow shells filled with spicy, tangy flavored water, mashed potatoes, and chickpeas for a burst of flavor in every bite.', price: '$8.99', isVegan: true },
    { id: 602, name: 'Masala Puri', desc: 'Crushed crispy puris topped with warm spiced peas curry, onions, and tangy chutneys.', price: '$8.99', isVegan: true },
    { id: 603, name: 'Dahi Puri', desc: 'Crispy puris filled with potatoes, yogurt, sweet and spicy chutneys, and crunchy toppings.', price: '$9.99' },
    { id: 604, name: 'Bhel Puri', desc: 'A light and crunchy mix of puffed rice, onions, tomatoes, chutneys, and spices.', price: '$8.49', isVegan: true },
    { id: 605, name: 'Samosa Chaat', desc: 'Crushed crispy samosa topped with chickpeas, onions, and sweet & tangy chutneys, finished with fresh herbs and spices.', price: '$9.49' },
    { id: 606, name: 'Samosa Dahi Chaat', desc: 'Samosa served with creamy yogurt, tamarind chutney, and spices for a rich flavor mix.', price: '$9.99' },
    { id: 607, name: 'Bajji Chaat', desc: 'Crispy fried fritters topped with chutneys, onions, and spices in chaat style.', price: '$8.99' },
    { id: 608, name: 'Aloo Samosa', desc: 'Deep-fried pastry filled with seasoned mashed potatoes and spices.', price: '$3.99' },
  ],
  '🌊 VIZAG SPECIAL': [
    { id: 701, name: 'Muri Mixture', desc: 'A crunchy and spicy snack made with puffed rice, peanuts, onions, fresh raw mango pieces, curry leaves, and traditional Indian spices.', price: '$7.99', isVegan: true, isGlutenFree: true },
  ],
  '🥯 HYDERABADI SPECIAL': [
    { id: 901, name: 'Bun Maska', desc: 'Soft bakery bun lightly toasted and generously spread with butter, traditionally served with hot tea.', price: '$4.99' },
  ],
  '🥟 MOMOS (Steamed Dumplings)': [
    { id: 1001, name: 'Chicken Momos (Steamed / Fried)', desc: 'Juicy chicken momos served your way: soft steamed or crispy fried, with house chili sauce.', price: '$11.99' },
    { id: 1002, name: 'Veg Momos', desc: 'Steamed dumplings filled with mixed vegetables and mild seasoning.', price: '$10.99' },
  ],
  'Fried Snacks (Bajji & Fritters)': [
    { id: 1203, name: 'Chitti Punugulu', desc: 'Bite-sized fritters made from fermented rice and lentil batter. Golden and crunchy on the outside, soft inside, and served hot with chutneys.', price: '$9.99' },
    { id: 1204, name: 'Aloo Bonda (5 pieces)', desc: 'Five balls of seasoned mashed potato dipped in chickpea-flour batter and fried until golden. Crispy outside and soft inside.', price: '$7.99' },
    { id: 1201, name: 'Mirchi Bajji (Regular / Stuffed / Cut)', desc: 'Green chilies dipped in spiced batter and deep fried, crispy on the outside with a mild spicy kick inside.', price: '$7.99', isVegan: true, isGlutenFree: true },
    { id: 1202, name: 'Egg Bajji', desc: 'Boiled egg coated in seasoned batter and deep fried until crispy and golden.', price: '$8.49', isGlutenFree: true },
  ],
  '🥤 DRINKS': [
    { id: 801, name: 'Chikoo Shake', desc: 'A thick and creamy milkshake made from chikoo (sapodilla), a naturally sweet tropical fruit.', price: '$5.99', isGlutenFree: true },
    { id: 802, name: 'Falooda', desc: 'A rich and indulgent dessert drink made with sweet milk, basil seeds, vermicelli, rose syrup, and ice cream.', price: '$8.99', isGlutenFree: true },
    { id: 803, name: 'Fresh Lime Soda', desc: 'A refreshing drink made with fresh lime juice, soda, and a choice of sweet or salty flavor.', price: '$3.99', isVegan: true, isGlutenFree: true },
    { id: 804, name: 'Tea', desc: 'Traditional Indian milk tea brewed with aromatic spices for a strong and comforting flavor.', price: '$3.49', isGlutenFree: true },
    { id: 805, name: 'Filter Coffee', desc: 'Authentic South Indian coffee brewed using a metal filter and mixed with hot milk for a strong, rich taste.', price: '$3.99', isGlutenFree: true },
  ],
};

const menuExplainers: Record<string, string> = {
  '🥞 DOSA (Crispy South Indian Crepes)': 'Traditional South Indian crepes made from fermented rice and lentil batter. Naturally gluten-free, light, and crispy. Served with two house-made chutneys and lentil soup (sambar).',
  '🌟 KARNATAKA SPECIALS': 'A famous buttery dosa from Karnataka made with extra butter, giving it a rich aroma, crispy edges, and soft center. Served with two house-made chutneys and sambar.',
  '👨🍳 CHEF’S SPECIAL DOSA': 'A rotating signature dosa created by our chef using seasonal ingredients and unique flavor combinations. Served with two house-made chutneys and sambar.',
  '🍽️ IDLI (Steamed Rice Cakes)': 'Soft, fluffy steamed cakes made from fermented rice and lentils. Light, healthy, and easy to digest. Served with two house-made chutneys and lentil soup (sambar).',
  '🔥 GUNTUR SPECIALS': 'Small bite-sized steamed rice cakes that are soft and fluffy, often enjoyed as a snack or street-style dish. Served with two house-made chutneys and sambar.',
  '🥙 CHAATS (Indian Street Snacks)': 'Popular Indian street foods known for their mix of sweet, spicy, tangy, and crunchy flavors.',
  '🌊 VIZAG SPECIAL': 'A crunchy and spicy snack made with puffed rice, peanuts, onions, fresh raw mango pieces, curry leaves, and traditional Indian spices.',
  '🥤 DRINKS': 'Refreshing beverages made to perfectly complement our South Indian flavors.',
  '🥯 HYDERABADI SPECIAL': 'Soft bakery bun lightly toasted and generously spread with butter, traditionally served with hot tea.',
  '🥟 MOMOS (Steamed Dumplings)': 'Soft steamed dumplings filled with savory seasonings, a popular fusion snack.',
  'Fried Snacks (Bajji & Fritters)': 'Classic deep-fried fritters, a staple South Indian street snack.',
};

export function getMenuImage(itemId: number) {
  return menuImageMap[itemId];
}

export function getMenuCategorySlug(category: string) {
  // Extract main word if it has emoji/parenthesis for slugging
  const cleanCategory = category.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(' ')[0] || category;
  return cleanCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getMenuExplainer(category: string) {
  return menuExplainers[category] || '';
}

export function getExpandedMenuDescription(category: string, item: MenuItem) {
  return item.desc;
}
