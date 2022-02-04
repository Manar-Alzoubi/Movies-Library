'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pg = require('pg');
const PORT = process.env.PORT;

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

const server = express();
server.use(express.json());

//const myMovie=require(`./Movies-Library/MovieData/data.json`);
//const res = require('express/lib/response');

server.use(cors());

server.get('/', handelHomePage);
server.get('/fav', handelfavPage);

server.get('/search', searchMovHandler);
server.get('/trending', trendsHandler);
server.post('/addMovie', addFavMovie);
server.get('/getMovies', myFavMovies);
//server.use(errorHandler);

server.get('/oneFavMovie/:id',oneFavMovie);


server.put('/updateMovie/:id',updateMovie); // the name param is just for testing 
server.delete('/deleteMovie/:id',deleteMovie);
server.use('*', notFoundHandler);

function Movie(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}


function handelHomePage(req, res) {

    let mov = new Movie(myMovie.title, myMovie.poster_path, myMovie.overview);

    return res.status(200).json(mov);
}


function trendsHandler(req, res) {
   // https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US
    let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`;
    axios.get(url)
        .then((x) => {
            console.log(x.data);
            // console.log("inside trending");
            let movies = x.data.results.map(movie1 => {

                return new Movie(movie1.id, movie1.title, movie1.release_date, movie1.poster_path, movie1.overview);
            })
            res.status(200).json(movies);
        }).catch((err) => {
            errorHandler(err, req, res);
        })
}
let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=The&page=2`;


function searchMovHandler(req, res) {

    // console.log("search");
    axios.get(url)
        .then((x) => {
            let movies = x.data.results.map(movie1 => {
                return new Movie(movie1.title, movie1.overview, movie1.original_title, movie1.poster_path, movie1.backdrop_path);
            })
            res.status(200).json(movies);
        }).catch((err) => {
            errorHandler(err, req, res);
        })

}


function handelfavPage(req, response) {
    console.log("test");
    return response.status(200).send("Welcome to Favorite Page");
}

function addFavMovie(req, res) {
    const movi = req.body;
    let sql = `INSERT INTO anyMovie(title,release_date,poster_path,overview,comment) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
    let values = [movi.title||'', movi.release_date||'', movi.poster_path||'', movi.overview||'',movi.comment||'']
    console.log(values);
    client.query(sql, values).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        errorHandler(error, req, res)
    });
}

function myFavMovies(req, res) {
    let sql = `SELECT * FROM anyMovie;`;
    client.query(sql).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        errorHandler(error, req, res)
    });
  }
    function searchMovHandler(req,res){
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=The&page=3`;
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

    function oneFavMovie (req,res){
        console.log()
        let sql = `SELECT * FROM anyMovie WHERE id=${req.params.id};`;
       
    
        client.query(sql).then(data=>{
           res.status(200).json(data.rows);
        }).catch(error=>{
            errorHandler(error,req,res)
        });
    }

    function updateMovie (req,res){
        console.log("Inside update fun");
        const id = req.params.id;
        console.log(req.params.name);
        const movie = req.body;
        const sql = `UPDATE anyMovie SET title =$1, release_date = $2, poster_path = $3 ,overview=$4, comment=$5 WHERE id=$6 RETURNING *;`; 

        let values=[movie.title||'', movie.release_date||'', movie.poster_path||'', movie.overview||'',movie.comment||'',id];
        console.log(values);
        client.query(sql,values).then(data=>{
        res.status(200).json(data.rows);
           
        }).catch(error=>{
            errorHandler(error,req,res)
        });
    
   
    }
    
    function deleteMovie(req,res){
        console.log("Inside delete fun");
        const id = req.params.id;
        const sql = `DELETE FROM anyMovie WHERE id=${id};` 
       
        client.query(sql).then(()=>{
            res.status(200).send("The Movie has been deleted");
    
        }).catch(error=>{
            errorHandler(error,req,res)
        });
    }
    
    



function notFoundHandler(req, res) {
    res.status(404).send("This page is not found")
}


function errorHandler (error,req,res){
    const err = {
         status : 500,
         messgae : error
     }
     res.status(500).send(err);
 }

client.connect().then(() => {
    server.listen(PORT, () => {
        console.log(`listining to port ${PORT}`)
    })
})



