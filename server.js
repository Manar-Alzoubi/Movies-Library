'use strict';

require('dotenv').config();

//use the packages
const express= require('express');
const cors = require('cors');
const axios= require('axios');

const PORT= process.env.PORT;

const myMovie=require(`./Movies-Library/MovieData/data.json`);

//let url = `https://api.themoviedb.org/3/trending/all/week?apiKey=${process.env.APIKEY}`;

//  //creating a server
 const server= express();
 server.use(cors());

 server.get('/',handelHomePage);
 server.get('/fav', handelfavPage);
 
 server.get('/searchMov',searchMovHandler);
 server.get('/trending',trendsHandler);
 server.use('*',handelNotFound);
server.use(errorHandler);


function Movie(title,poster_path,overview){
    this.title= title;
    this.poster_path = poster_path;
    this.overview= overview;
 }





function handelHomePage(req,res){
    
    let mov = new Movie ( myMovie.title , myMovie.poster_path,myMovie.overview);

     return res.status(200).json(mov);
    } 

    server.listen(PORT,()=>{
        console.log(`listining to port ${PORT}`)
    })

    function handelfavPage(req,response)
{
    console.log("test");
    return response.status(200).send("Welcome to Favorite Page");
}



    function trendsHandler(req,res){
        axios.get(url)
        .then((result)=>{
            result.data.movies.forEach(movie1 =>{
                newArr.push(new Movie(movie1.id,movie1.title,movie1.release_date,movie1.poster_path,movie1.overview));
            })
        }).catch((err)=>{
    
        })
    }
           
       



    function searchMovHandler(req,res){
        let url = `https://api.themoviedb.org/3/search/movie??apiKey=${process.env.APIKEY}`;
        axios.get(url)
        .then((result)=>{
            let recipemoviess = result.data.movies.map(movie1 =>{
                newArr.push(new Movie(movie1.id,movie1.title,movie1.release_date,movie1.poster_path,movie1.overview));
            })
        }).catch((err)=>{
    
        })
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
server.listen(PORT,()=>{
    console.log(`listining to port ${PORT}`)
})





