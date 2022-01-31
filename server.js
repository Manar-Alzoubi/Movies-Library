'use strict';

//use the packages
const express= require('express');
const cors = require('cors');
const memesData=require(`./Movies-Library/MovieData/data.json`);


//  //creating a server
 const server= express();
 server.use(cors());


 server.get('/fav', handelfavPage);
 server.get('/',handelHomePage);
 //server.get('/err',handErr);
 server.get('*',handelNotFound);

function Movie(title,poster_path,overview){
    this.title= title;
    this.poster_path = poster_path;
    this.overview= overview;
 }

function handelfavPage(req,response)
{
    console.log("test");
    return response.status(200).send("Welcome to Favorite Page");
}
function handelNotFound(req,response)
{
    return response.status(404).send("Sorry, something went wrong");
    
       
}

// function handelNotFound(req,response)
// {
//     return response.status(500).send("Sorry, something went wrong");
    
       
// }

function handelHomePage(req,res){

    let memes =new Movie(memesData.title,memesData.poster_path,memesData.overview);

     return res.status(200).json(memes);} 


    
//run the server
 server.listen(3000,()=>{
    console.log("my server is listining to port 3000");
});





