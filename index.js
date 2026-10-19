import express from 'express';


const app = express();
const PORT = process.env.PORT || 5000 ;



app.get('/',(req,res)=>{
    res.send('yo bro');
 });





 app.listen(PORT,()=>{

    // console.log('server running on PORT ${PORT}')
    console.log(`server running on PORT ${PORT}`)
    
});