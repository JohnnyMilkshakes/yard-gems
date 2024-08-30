import YardSale from "../models/yard-sale.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

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

    user.save();

    results.push({ user, yardSale: createdYardSale });
  }

  console.log(results);
};
