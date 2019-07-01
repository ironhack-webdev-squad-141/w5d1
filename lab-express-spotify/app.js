const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

// Remember to insert your credentials here
const clientId = "",
  clientSecret = "";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");

// setting the spotify-api goes here:

// the routes go here:

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/artists/", (req, res) => {
  const search = req.query.search;
  spotifyApi
    .searchArtists(search)
    .then(data => {
      const items = data.body.artists.items;

      //   res.render("artists", { items: items });

      res.render("artists", { items });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/albums/:artistId", (req, res) => {
  const artistId = req.params.artistId;

  spotifyApi
    .getArtistAlbums(artistId)
    .then(data => {
      const items = data.body.items;

      res.render("albums", { items });
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/tracks/:albumId", (req, res) => {
  const albumId = req.params.albumId;

  spotifyApi
    .getAlbumTracks(albumId)
    .then(data => {
      const items = data.body.items;

      res.render("tracks", { items });
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
