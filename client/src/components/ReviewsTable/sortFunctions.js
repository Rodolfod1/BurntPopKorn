export const username = data => {
    return data.sort((a, b) => {
        const usernameA = (a.username).toUpperCase();
        const usernameB = (b.username).toUpperCase();
        if (usernameA < usernameB) {
            return -1;
        }
        if (usernameA > usernameB) {
            return 1;
        }
        return 0;
    });
};

export const title = data => {
    return data.sort((a, b) => {
        const titleA = (a.movie.title).toUpperCase();
        const titleB = (b.movie.title).toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
};

export const worst = data => {
    return data.sort((a, b) => {
        const scoreA = (a.movie.userRating);
        const scoreB = (b.movie.userRating);
        if (scoreA < scoreB) {
            return -1;
        }
        if (scoreA > scoreB) {
            return 1;
        }
        return 0;
    });
};

export const best = data => {
    return data.sort((a, b) => {
        const scoreA = (a.movie.userRating);
        const scoreB = (b.movie.userRating);
        if (scoreA > scoreB) {
            return -1;
        }
        if (scoreA < scoreB) {
            return 1;
        }
        return 0;
    });

};