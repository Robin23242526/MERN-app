const mongoose = require('mongoose');

(async () => {
  try {
    const mongoURI = "mongodb+srv://user:user123@cluster0.7joikdr.mongodb.net/gofoodmern?retryWrites=true&w=majority";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    const FoodData = await mongoose.model("food_items", new mongoose.Schema({}));
    const FoodCat = await mongoose.model("cat", new mongoose.Schema({}));
    const data = await FoodData.find({});
    const Cat = await FoodCat.find({});
    global.food_items= data;
    global.food_category = Cat;
    // console.log(global.food_items, global.food_category);
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();