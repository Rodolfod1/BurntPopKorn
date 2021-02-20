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
    }
}