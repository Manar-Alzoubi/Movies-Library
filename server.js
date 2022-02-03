'use strict';

require('dotenv').config();
const express= require('express');
const cors = require('cors');
const axios= require('axios');
const pg = require('pg');
const PORT= process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);

const server= express();
server.use(cors());
server.use(express.json());


 server.use(cors());

 server.get('/',handelHomePage);
 server.get('/fav', handelfavPage);
 
 server.get('/search',searchMovHandler);
 server.get('/trending',trendsHandler);
 server.post('/addMovie',addFavMovie);
server.get('/getMovies',myFavMovies);
server.use(errorHandler);
server.use('*',notFoundHandler);

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
    

    function trendsHandler(req,res){
        let url = `https://api.themoviedb.org/3/trending/all/week?${process.env.API_KEY}&language=en-US`;
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
           let url= `https://api.themoviedb.org/3/search/movie?${process.env.API_KEY}&language=en-US&query=The&page=2`;
           function searchMovHandler(req,res){
           
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
    

    function handelfavPage(req,response)
{
    console.log("test");
    return response.status(200).send("Welcome to Favorite Page");
}

function addFavMovie(req,res){
    const movi = req.body;
    let sql = `INSERT INTO anyMovie(title,release_date,poster,overview,commentl) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
    let values=[movi.title,movi.release_date,movi.poster,movi.overview,movi.commentl];
    client.query(sql,values).then(data =>{
        res.status(200).json(data.rows);
    }).catch(error=>{
        errorHandler(error,req,res)
    });
  }
  
  function myFavMovies(req,res){
    let sql = `SELECT * FROM anyMovie;`;
    client.query(sql).then(data=>{
       res.status(200).json(data.rows);
    }).catch(error=>{
        errorHandler(error,req,res)
    });
}



    function notFoundHandler(req,res){
        res.status(404).send("This page is not found")
     }


function errorHandler (error ,req ,res){
    const err=
        {
            status: 500,
            message: error
            }
            res.status(500).send (err);
    }

client.connect().then(()=>{
    server.listen(PORT,()=>{
        console.log(`listining to port ${PORT}`)
    })
})
