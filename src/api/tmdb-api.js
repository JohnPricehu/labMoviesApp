export const getMovies = (page = 1) => {
  return fetch(
    `/api/movies?page=${page}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
  ).then((res) => res.json())
  .catch((error) => {
    throw error;
  });
};

export const getUpcomingMovies = (page = 1) => {
  return fetch(
    `/api/movies/upcoming?page=${page}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
  ).then(res => res.json())
    .catch((error) => {
       throw error
    });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}`,{headers: {
      'Authorization': window.localStorage.getItem('token')
   }}
  ).then((res) => res.json());
};

export const getGenres = async () => {
return fetch(
  "/api/genres", {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getMovieImages = ({ queryKey }) => {
const [, idPart] = queryKey;
const { id } = idPart;
return fetch(
  `/api/movies/${id}/images`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getMovieReviews = (id) => {
return fetch(
  `/api/movies/${id}/reviews`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getMovieCast = (id) => {
return fetch(
  `/api/movies/${id}/cast`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getSimilarMovies = (id) => {
return fetch(
  `/api/movies/${id}/similar`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getActor = (args) => {
const [, idPart] = args.queryKey;
const { id } = idPart;
return fetch(
  `/api/actors/${id}`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getActorImages = ({ queryKey }) => {
const [, idPart] = queryKey;
const { id } = idPart;
return fetch(
  `/api/actors/${id}/images`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getActorMovies = (id) => {
return fetch(
  `/api/actors/${id}/movies`,{headers: {
    'Authorization': window.localStorage.getItem('token')
 }}
).then(res => res.json())
.catch((error) => {
  throw error
});
};

export const getActors = (page = 1) => {
return fetch(
  `/api/actors?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
).then(res => res.json())
.catch((error) => {
   throw error
});
};

export const signup = (email, password, firstName, lastName) => {
  return fetch('/api/accounts', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
  }).then(res => res.json())
};

export const login = (email, password) => {
  return fetch('/api/accounts/security/token', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ email: email, password: password })
  }).then(res => res.json())
};

