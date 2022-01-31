'use strict';

require('dotenv').config();

//use the packages
const express= require('express');
const cors = require('cors');
const axios= require('axios');

const PORT= process.env.PORT;

const myMovie=require(`./Movies-Library/MovieData/data.json`);


//  //creating a server
 const server= express();
 server.use(cors());

 server.get('/fav', handelfavPage);
 server.get('/',handelHomePage);
 server.use('*',handelNotFound);
server.use(errorHandler);


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




function handelHomePage(req,res){
    
    let mov = new Movie ( myMovie.title , myMovie.poster_path,myMovie.overview);

     return res.status(200).json(mov);
    } 


function handelNotFound(req,response)
{
    return response.status(404).send("Sorry, something went wrong");
    
       
}

function errorHandler (error ,req ,res){
    const err=
        {
            status: 500,
            message: error
            }
            res.status(500).send (err);
    }

    
//run the server
 server.listen(3000,()=>{
    console.log("my server is listining to port 3000");
});





