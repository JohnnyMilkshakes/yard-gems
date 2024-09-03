import YardSale from "../models/yard-sale.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createItem } from "../controllers/items.js";
import Item from "../models/item.js";

const exampleData = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
  { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

const items = [
  {
    name: "Vintage Wooden Chair",
    price: 25,
    quantity: 2,
    description:
      "Solid oak wood chair with a classic design. Some scratches but sturdy.",
  },
  {
    name: "KitchenAid Mixer",
    price: 100,
    quantity: 1,
    description:
      "Lightly used, in excellent condition. Comes with original attachments.",
  },
  {
    name: "Leather Jacket",
    price: 40,
    quantity: 1,
    description: "Black leather jacket, men's size M, barely worn.",
  },
  {
    name: "Set of 6 Wine Glasses",
    price: 15,
    quantity: 6,
    description: "Crystal wine glasses, no chips or cracks.",
  },
  {
    name: "Electric Guitar",
    price: 150,
    quantity: 1,
    description:
      "Fender Stratocaster copy, good condition, includes a soft case.",
  },
  {
    name: "Cookbook Collection",
    price: 20,
    quantity: 10,
    description:
      "Assorted cookbooks covering various cuisines, all in good condition.",
  },
  {
    name: "Antique Table Lamp",
    price: 35,
    quantity: 1,
    description: "Brass base with stained glass shade, works perfectly.",
  },
  {
    name: "Board Games Bundle",
    price: 50,
    quantity: 5,
    description:
      "Includes Monopoly, Scrabble, Catan, and others. All pieces included.",
  },
  {
    name: "Men's Running Shoes",
    price: 30,
    quantity: 1,
    description: "Nike, size 10, barely used.",
  },
  {
    name: "Porcelain Tea Set",
    price: 45,
    quantity: 1,
    description:
      "Delicate floral design, includes teapot, sugar bowl, creamer, and 4 cups.",
  },
  {
    name: "Bicycle",
    price: 80,
    quantity: 1,
    description: "Mountain bike with 21-speed gears, recently tuned up.",
  },
  {
    name: "Ceramic Vase",
    price: 15,
    quantity: 1,
    description: "Hand-painted, blue and white design, perfect condition.",
  },
  {
    name: "Camping Tent",
    price: 60,
    quantity: 1,
    description: "4-person tent, used twice, comes with all poles and stakes.",
  },
  {
    name: "Garden Tools Set",
    price: 25,
    quantity: 1,
    description: "Includes shovel, rake, hoe, and gloves. Lightly used.",
  },
  {
    name: "Children's Books",
    price: 10,
    quantity: 15,
    description: "Assorted titles, all in good condition.",
  },
  {
    name: "Blu-ray Movie Collection",
    price: 75,
    quantity: 30,
    description:
      "A mix of action, drama, and comedy films, all discs included.",
  },
  {
    name: "Handmade Quilt",
    price: 90,
    quantity: 1,
    description:
      "Queen size, multicolored patchwork design, excellent craftsmanship.",
  },
  {
    name: "Pet Carrier",
    price: 20,
    quantity: 1,
    description: "Medium size, suitable for cats or small dogs, barely used.",
  },
  {
    name: "Snowboard",
    price: 120,
    quantity: 1,
    description: "Burton, 155cm, used one season, includes bindings.",
  },
  {
    name: "Office Chair",
    price: 35,
    quantity: 1,
    description:
      "Ergonomic design, adjustable height, and recline. Some wear on the armrests.",
  },
  {
    name: "Yoga Mat",
    price: 15,
    quantity: 1,
    description: "Thick and comfortable, non-slip surface, lightly used.",
  },
  {
    name: "Golf Clubs Set",
    price: 100,
    quantity: 1,
    description: "Complete set with bag, includes driver, irons, and putter.",
  },
  {
    name: "Digital Camera",
    price: 80,
    quantity: 1,
    description: "Canon, 16MP, includes case and 32GB memory card.",
  },
  {
    name: "Rocking Chair",
    price: 50,
    quantity: 1,
    description: "Classic wooden rocking chair, good condition.",
  },
  {
    name: "Lawn Mower",
    price: 150,
    quantity: 1,
    description: "Gas-powered, 21-inch cutting deck, runs well.",
  },
  {
    name: "Smartphone",
    price: 200,
    quantity: 1,
    description: "iPhone 11, 64GB, some minor scratches on the screen.",
  },
  {
    name: "Sewing Machine",
    price: 60,
    quantity: 1,
    description: "Singer, includes various attachments, in working order.",
  },
  {
    name: "Barbecue Grill",
    price: 100,
    quantity: 1,
    description: "Charcoal grill, large cooking surface, with cover.",
  },
  {
    name: "Laptop",
    price: 300,
    quantity: 1,
    description: "Dell XPS 13, 8GB RAM, 256GB SSD, good condition.",
  },
  {
    name: "Wall Art",
    price: 30,
    quantity: 3,
    description: "Abstract paintings on canvas, each 16x20 inches.",
  },
  {
    name: "Dining Table",
    price: 200,
    quantity: 1,
    description: "Solid wood, seats 6, some wear on the surface.",
  },
  {
    name: "Canoe",
    price: 250,
    quantity: 1,
    description: "16-foot aluminum canoe, includes paddles.",
  },
  {
    name: "Fishing Rods",
    price: 40,
    quantity: 4,
    description: "Assorted rods, all in good condition.",
  },
  {
    name: "Vinyl Record Collection",
    price: 150,
    quantity: 50,
    description: "Classic rock albums, all in original sleeves.",
  },
  {
    name: "Coffee Maker",
    price: 20,
    quantity: 1,
    description: "Keurig single-serve, includes a box of pods.",
  },
  {
    name: "Power Tools",
    price: 100,
    quantity: 1,
    description: "Set of power tools including drill, saw, and sander.",
  },
  {
    name: "Patio Furniture Set",
    price: 120,
    quantity: 1,
    description:
      "Includes table, 4 chairs, and umbrella, some rust on the frame.",
  },
  {
    name: "Baking Supplies",
    price: 15,
    quantity: 1,
    description:
      "Mixing bowls, measuring cups, and baking pans, all lightly used.",
  },
  {
    name: "Kids' Bicycle",
    price: 25,
    quantity: 1,
    description: "Small bike with training wheels, good condition.",
  },
  {
    name: "Dog Crate",
    price: 35,
    quantity: 1,
    description: "Large size, suitable for medium to large dogs.",
  },
  {
    name: "Coffee Table",
    price: 50,
    quantity: 1,
    description: "Glass top with metal frame, some minor scratches.",
  },
  {
    name: "Carpet Cleaner",
    price: 80,
    quantity: 1,
    description: "Hoover, used a few times, works well.",
  },
  {
    name: "Picnic Set",
    price: 20,
    quantity: 1,
    description: "Includes basket, blanket, and dishware for 4.",
  },
  {
    name: "Dresser",
    price: 75,
    quantity: 1,
    description: "6-drawer wooden dresser, some wear on the surface.",
  },
  {
    name: "Cookware Set",
    price: 50,
    quantity: 1,
    description: "Non-stick pots and pans, includes lids, lightly used.",
  },
  {
    name: "Basketball Hoop",
    price: 100,
    quantity: 1,
    description: "Portable hoop with adjustable height.",
  },
  {
    name: "Treadmill",
    price: 250,
    quantity: 1,
    description: "Folding treadmill, multiple speed settings, lightly used.",
  },
  {
    name: "Microwave Oven",
    price: 40,
    quantity: 1,
    description: "Panasonic, 1200W, works perfectly.",
  },
  {
    name: "Electric Kettle",
    price: 15,
    quantity: 1,
    description: "Stainless steel, 1.7L capacity, lightly used.",
  },
  {
    name: "Wooden Bookshelf",
    price: 60,
    quantity: 1,
    description: "5 shelves, solid wood, some scratches.",
  },
];

const results = [];

export const runSeed = async () => {
  for (const [index, example] of exampleData.entries()) {
    const userInDatabase = await User.findOne({ username: `test${index}` });
    if (userInDatabase) {
      const deleted = await User.findByIdAndDelete(userInDatabase._id);

      if (deleted) {
        console.log("Test user Deleted!");
      }
    }

    console.log("creating user");
    const user = await User.create({
      username: `test${index}`,
      password: bcrypt.hashSync("test", 12),
    });

    console.log(`user created ${user}`);

    const yardSaleInDatabase = await YardSale.findOne({ name: example.key });
    if (yardSaleInDatabase) {
      const deleted = await YardSale.findByIdAndDelete(yardSaleInDatabase._id);

      if (deleted) {
        console.log("Yard Sale Deleted!");
      }
    }

    const yardSale = {
      yardOwner: user._id,
      name: example.key,
      lat: example.location.lat,
      lng: example.location.lng,
      physicalDisplayDates: [],
      itemsForSale: [],
    };

    const createdYardSale = await YardSale.create(yardSale);

    console.log(`Yard Sale Created: ${createdYardSale}`);

    user.yardSale = createdYardSale._id;


    const numItemsToAdd = Math.floor(Math.random() * 5) + 3; // Random number between 3 and 7

    // Shuffle items array
    const shuffledItems = items.sort(() => 0.5 - Math.random());

    // Select the first 'numItemsToAdd' items from the shuffled array
    for (let i = 0; i < numItemsToAdd; i++) {
      shuffledItems[i].itemOwner = user._id;
      console.log(shuffledItems[i]);

      const item = await Item.create(shuffledItems[i]);

      createdYardSale.itemsForSale.push(item._id);
      user.items.push(item._id)
    }
    user.save();


    createdYardSale.save();

    results.push({ user, yardSale: createdYardSale });
  }

  console.log(results);
};
