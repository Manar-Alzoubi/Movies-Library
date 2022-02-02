'use strict';

require('dotenv').config();

//use the packages
const express= require('express');
const cors = require('cors');
const axios= require('axios');
const pg = require('pg');



// I attempt to make pull and it dosent make 
console.log ("my name is Manar");


const client = new pg.Client(process.env.DATABASE_URL);
const PORT= process.env.PORT;

server.use(express.json());

//const myMovie=require(`./Movies-Library/MovieData/data.json`);
const res = require('express/lib/response');

let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`;


//  //creating a server
 const server= express();
 server.use(cors());

 server.get('/',handelHomePage);
 server.get('/fav', handelfavPage);
 
 server.get('/search',searchMovHandler);
 server.get('/trending',trendsHandler);
 server.use('*',handelNotFound);
server.use(errorHandler);


function Movie(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title= title;
    this.release_date=release_date;
    this.poster_path = poster_path;
    this.overview= overview;
 }





function handelHomePage(req,res){
    
    let mov = new Movie ( myMovie.title , myMovie.poster_path,myMovie.overview);

     return res.status(200).json(mov);
    } 


    function handelfavPage(req,response)
{
    console.log("test");
    return response.status(200).send("Welcome to Favorite Page");
}



    function trendsHandler(req,res){
 console.log(url);       
        axios.get(url)
        .then((x)=>{
            console.log(x.data);
           let movies= x.data.results.map(movie1 =>{
            
                return new Movie(movie1.id,movie1.title,movie1.release_date,movie1.poster_path,movie1.overview);
            })
            res.status(200).json(movies);
        }).catch((err)=>{
            errorHandler(err,req,res);
        })
    }
           
       



    function searchMovHandler(req,res){
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=The&page=3`;
        console.log(url);
        axios.get(url)
        .then((x)=>{
            let movies = x.data.results.map(movie1 =>{
                return new Movie(movie1.title,movie1.overview,movie1.original_title,movie1.poster_path,movie1.backdrop_path);
            })
            res.status(200).json(movies);
        }).catch((err)=>{
                errorHandler(err,req,res);
        })
        
    }


    function addMovie(req, res)
{   const movieObj = req.body;

      let sql =  `INSERT INTO addMovie(title,genre_ids,original_language,original_title,poster_path,video,vote_average,overview,release_date,vote_count,id,adult,backdrop_path,popularity,media_type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *;`
      let values=[movieObj.title,movieObj.genre_ids,movieObj.original_language,movieObj.original_title,movieObj.poster_path,movieObj.video,movieObj.vote_average,movieObj.vote_average,movieObj.overview,movieObj.release_date,movieObj.vote_count,movieObj.id,movieObj.adult,movieObj.backdrop_path,movieObj.popularity,movieObj.media_type,];
      client.query(sql,values).then(data =>{

    client.query(sql,values).then(data =>{
        res.status(200).json(data.rows);
    }).catch(error=>{
        errorHandler(error,req,res)
    });
},



    function getMovies(req,res){
        const movieObj = req.body;
      
        let sql = `INSERT INTO addMovie(title,genre_ids,original_language,original_title,poster_path,video,vote_average,overview,release_date,vote_count,id,adult,backdrop_path,popularity,media_type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *;`
        let values=[movieObj.title,movieObj.genre_ids,movieObj.original_language,movieObj.original_title,movieObj.poster_path,movieObj.video,movieObj.vote_average,movieObj.vote_average,movieObj.overview,movieObj.release_date,movieObj.vote_count,movieObj.id,movieObj.adult,movieObj.backdrop_path,movieObj.popularity,movieObj.media_type,];
        client.query(sql,values).then(data =>{
            res.status(200).json(data.rows);
        }).catch(error=>{
            errorHandler(error,req,res)
        });
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
















// I hope it makes Pull request since it dosent be able