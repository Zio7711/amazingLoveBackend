import BucketListItem from "../../models/BucketListItem.js";
import Couple from "../../models/Couple.js";
import data from "../seedData/bucketListItemData.js";

const seedBucketListItem = async () => {
  // drop all items in the bucketListItem
  BucketListItem.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("bucketListItem modal dropped");
    }
  });

  // drop all bucket list item in the couple
  Couple.updateMany(
    {},
    { $set: { bucketList: [] } },
    { multi: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("bucketListItem reset in couple modal");
      }
    }
  );

  // loop through the data array, using foreach
  data.forEach(async (seed) => {
    // create a new bucketListItem
    const bucketListItemCreated = await BucketListItem.create(seed);

    // find couple by id and add bucketListItem to couple
    const couple = await Couple.findById(seed.couple);
    couple.bucketList.push(bucketListItemCreated._id);
    await couple.save();
  });

  console.log("bucketListItem modal seeded");
};

export default seedBucketListItem;
