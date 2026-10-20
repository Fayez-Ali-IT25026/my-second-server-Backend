import express from 'express';
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb';
 import 'dotenv/config'


// const client = new MongoClient("mongodb+srv://<db_username>:<db_password>@cluster0.f8kuo50.mongodb.net/");

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());
















// console.log(process.env.DB_USER);


// const client = new MongoClient("mongodb+srv://DB_USER:DB_PASS@cluster0.f8kuo50.mongodb.net/");   ""  to `` only cuz we are using ${}
const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f8kuo50.mongodb.net/`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}


// await connectToMongoDB()
const connectedClient = await connectToMongoDB()
const db = connectedClient.db('crudDB');

// console.log('Database name:', db.databaseName);
// console.log('All databases:', await connectedClient.db().admin().listDatabases());




const users = db.collection('users')



app.get('/users',async(req,res)=>{
    const cursor = users.find({});
    const allUsers = await cursor.toArray();
    res.send(allUsers);
 });

















app.get('/',(req,res)=>{
    res.send('yo bro');
 });

// app.get('/users',async(req,res)=>{
//     const cursor = users.find({});
//     const allUsers = await cursor.toArray();
//     res.send(allUsers);
//  });






//           AI
// app.get('/users', async (req, res) => {
//   try {
//     console.log('Database:', db.databaseName);
//     console.log('Collection:', users.collectionName);

//     const allUsers = await users.find({}).toArray();

//     console.log('Users found:', allUsers.length);
//     console.log(allUsers);

//     res.send(allUsers);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Failed to fetch users' });
//   }
// });




















//  app.post('/users',(req,res)=>{
  
// const newUser = req.body
//     console.log( newUser)
//     res.send('WELL DONE')
//      res.send({success:true , message : 'user added'})
//  })


app.post('/users',async(req,res)=>{
  
const newUser = req.body
    console.log( newUser)
    // res.send('WELL DONE')
    //  res.send({success:true , message : 'user added'})


    const result = await users.insertOne(newUser);
    res.send(result);
 })














 app.get('/users/:id', async (req, res) =>{

console.log('params in the server', req.params);
const id = req.params.id ;


const query = { _id : new ObjectId(id)};


const result = await users.findOne(query);
res.send(result);



 })








app.patch('/users/:id', async (req, res) =>{
   
  const id = req.params.id;
  const updatedUser = req.body;

  console.log("updating user id ",id,'with',updatedUser);


  const filter = {

    _id : new ObjectId(id)

  }


const options = {upsert : true};
const updateDoc = {
 
  $set : {

    name : updatedUser.name ,
    email : updatedUser.email

  }


}




const result = await users.updateOne(filter, updateDoc , options)

res.send(result);



})















 app.delete('/users/:id', async (req, res) =>{


const id = req.params.id ;


const query = { _id : new ObjectId(id)};


const result = await users.deleteOne(query);
res.send(result);



 })



 



















 app.listen(PORT,()=>{

    // console.log('server running on PORT ${PORT}')
    console.log(`server running on PORT ${PORT}`)
    
});