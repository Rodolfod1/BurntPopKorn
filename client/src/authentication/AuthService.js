// import { json } from "express";

export const AuthService = {
    login: user => {
        console.log(user);
        return fetch('/user/login', {
            method: "post",
            body : JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //   .then(res => res.json())
        //   .then(data => data);

        // This deviates from the tutorial. Part 7, 22:00
        // he adds the code below
        .then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return {isAuthenticated: false, user: {username: ''}};

        })



    },
    register: user => {
        return fetch('/user/register', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
          .then(data => data);
    },
    logout: () => {
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated')
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(data => data)
                    else
                        return { isAuthenticated: false, user: {username: ''}};
                });
    }
}