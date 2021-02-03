const key = 'f5d6c6ae8a2d5f826fc22b57898543e9';
const endpoint_url= 'https://api.themoviedb.org/3/';

function getListMovie(services, sectiontitle) {
 fetch(endpoint_url + services + "?api_key=" + key + "&language=en-US&page=1")
  .then(status)
  .then(json)
  .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card movie secara dinamis
      var moviesHTML = "";
      data.results.forEach(function(movie) {
        moviesHTML += `
        <div class="col m3 s6">
          <div class="card">
          <a href="./movie.html?id=${movie.id}">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
            </div>
          </a>
          <div class="card-content text-center">
            <strong>${movie.title}</strong> <br>
            <strong>Release: ${movie.release_date}</strong>
          </div>
          </div>
      </div>
      `;
      });

      document.getElementById("movie_list").innerHTML = moviesHTML;
      document.getElementById("section_title").innerHTML = sectiontitle;
    })
    .catch(error);
}

function getMovie(movie_id){
fetch(endpoint_url+ "movie/" + movie_id + "?api_key=" + key + "&language=en-US&page=1")
 .then(status)
 .then(json)
 .then(function(data) {
  var movinfo = "";

  var genre = "";
    for (i = 0; i < data.genres.length; i++) {
        genre += data.genres[i].name + ", ";
    }
  var proname = "";
  for (i = 0; i < data.production_companies.length; i++) {
      proname += data.production_companies[i].name + ", ";
  }

  movinfo += `
  <div id="index-banner" class="parallax-container">
    <div class="parallax">
      <img src="https://image.tmdb.org/t/p/original${data.backdrop_path}"
           srcset="https://image.tmdb.org/t/p/w300${data.backdrop_path} 300w,
                   https://image.tmdb.org/t/p/w780${data.backdrop_path} 780w,
                  https://image.tmdb.org/t/p/w1280${data.backdrop_path} 1280w"
           size="100vw"
           alt="${data.title}"
           style="transform: translate3d(-50%, 50%, 0px);opacity: 1;">
    </div>
  </div>
  <div class="container">
    <h3 class=center>${data.title}</h3>
    <p class="center">${data.tagline}</p>
    <div class="col s12 m5">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light z-depth-3">
          <img src="https://image.tmdb.org/t/p/w500${data.poster_path}"/>
        </div>
      </div>
    </div>
    <div class="col m7 s12">
    <table class="">
      <thead>
        <tr>
          <th>Tanggal Rilis</th>
          <td class="grey-text text-darken-2">${data.release_date}</td>
        </tr>
        <tr>
          <th>Popularitas</th>
          <td class="grey-text text-darken-2"> ${data.popularity}</td>
        </tr>
        <tr>
          <th>Bahasa</th>
          <td class="grey-text text-darken-2"> ${data.original_language}</td>
        </tr>
        <tr>
          <th>Genre</th>
          <td class="grey-text text-darken-2"> ${genre}</td>
        </tr>
        <tr>
          <th>Durasi Film</th>
          <td class="grey-text text-darken-2"> ${data.runtime} Menit</td>
        </tr>
        <tr>
          <th>Status</th>
          <td class="grey-text text-darken-2"> ${data.status}</td>
        </tr>
        <tr>
          <th>Di Produksi Oleh</th>
          <td class="grey-text text-darken-2">${proname}</td>
        </tr>
        <tr>
          <th>Homepage</th>
          <td><a href="${data.homepage}" class="customlink">${data.homepage}</a></td>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <br>
  </div>
      <h3 class="center">Sinopsis Cerita </h3>
      <p>${data.overview}</p>
  </div>
  `;
      document.getElementById("movie_detail").innerHTML = movinfo;
    })
  .catch(error);
}
