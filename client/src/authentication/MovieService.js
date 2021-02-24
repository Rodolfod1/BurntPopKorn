// import { response } from "express";

export const MovieService = {
    getMovies : ()=>{
        return fetch('/user/movies')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    postMovie : movie=>{
        return fetch('/user/movie',{
            method : "post",
            body : JSON.stringify(movie),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data)
            }
            else
                return {message: {msgBody: 'UnAuthorized'}, msgError: true};
        })
    },
    getMovieById: id => {
        return fetch('/user/getmovie/' + id)
        .then(response => {
            return response.json().then(data => data);
        })
    },
    deleteMovieById: id => {
        return fetch('/user/deletemovie/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            return response.json().then(data => data);
        })
        // .catch(err => {
        //     console.log(err)
        // })
    },
    updateMovieById: (id, movie) => {
        console.log(id);
        console.log(movie)
        return fetch('/user/updatemovie/' + id, {
            method: 'PUT',
            body : JSON.stringify(movie),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => {
            return response.json().then(data => data);
        });
    }
}