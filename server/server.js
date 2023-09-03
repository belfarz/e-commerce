const express = require("express")
const mongoose = require("mongoose");
const Cars = require("./models/car");

const app = express();
mongoose.set('strictQuery',false);

if (process.env.NODE_ENV !== "production" ) {
    require("dotenv").config();
} 
//database conection
const CONNECTION = process.env.CONNECTION;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const PORT = process.env.PORT || 3000;


const data = {users:[{ id: "1", name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple" },
{ id: "2", name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged" },
{ id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury" },
{ id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple" },
{ id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury" },

{ id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple" }
]}

const mockDatabase = [
    { id: 1, email: 'User1@email.com', password: 'pass1' },
    { id: 2, email: 'User2@email.com', password: 'pass2' },
    { id: 3, email: 'User3@email.com', password: 'pass3' },
    { id: 4, email: 'User4@email.com', password: 'pass4' },
    { id: 5, email: 'User5@email.com', password: 'pass5' },
  ];

app.get("/api",async(req, res)=>{
    const data = await Cars.find()
    try {
       // console.log(undefinedVariable);
        res.json(data);
    } catch (error) {
       res.status(404).json({error: error.message}) 
    }
});

app.get("/api/cars/:id",async (req, res) => {
    const userId = req.params.id;
    try {
       // console.log(undefinedVariable);
        const user = await Cars.findOne({"id": userId});
        res.json(user);
    } catch (error) {
        res.status(404).json({error: error.message})  
    }

  });

  app.get("/api/host/cars",async (req,res)=>{
    const data = await Cars.find({hostId:"123"})
    try {
       res.json(data) 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
  });

  app.post("/api/login", async(req, res)=>{
    console.log(req.body)
    const {email, password} = req.body;
   try {
            const foundUser = await mockDatabase.find(user => user.email === email && user.password === password);
            if (!foundUser) {
                return res.status(401).json({ message: "No user with those credentials found!" });
            }

            
            //foundUser.password = undefined
            res.status(200).json({
                user: foundUser,
                token: "Enjoy your pizza, here's your tokens."
              });
   } catch (error) {
    res.status(404).json({ error: error.message });
   }
  })

  app.post("/api/car",async(req, res)=>{
    const car = new Cars(req.body);

    try {
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
  })


const start = async() => {
    try {
    await mongoose.connect(CONNECTION);
 
    app.listen( PORT, ()=>{
       console.log("app listening on port " + PORT + " and database connection is a sucess");
    });
    } catch (error) {
       console.log(error.message);  
    };
 };
 
 start();
