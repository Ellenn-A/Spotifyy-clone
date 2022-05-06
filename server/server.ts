import express, { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import cors from "cors";
import bodyParser from "body-parser";
import {Client as GeniusClient} from "genius-lyrics";


const app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

app.post("/refresh", (req:Request, res: Response) =>{
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "8f273efb99e646baaa11d22dc9e41803",
        clientSecret: "bd1115f5380246b0b777477b041d7ef0",
        refreshToken
      });
      spotifyApi
    .refreshAccessToken()
    .then(
        (data) => {
            // console.log(data.body);
            res.json({
                accessToken : data.body.access_token,
                expiresIn: data.body.expires_in

            })
        }).catch((err)=> {
            console.log(err);
            res.sendStatus(400);
        })
})

app.post("/login", (req: Request, res: Response) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "8f273efb99e646baaa11d22dc9e41803",
    clientSecret: "bd1115f5380246b0b777477b041d7ef0",
  });
  spotifyApi.authorizationCodeGrant(code).then((data) => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  }).catch((err)=>{
    console.log(err); 
      res.sendStatus(400);
  })
});


const client = new GeniusClient();
app.get('/lyrics', async (req:Request,res:Response) =>{
  console.log(req.body)
  console.log(req.query)
const searches = await client.songs.search(req.query.track as string);

// Pick first one
const firstSong = searches[0];
console.log("About the Song:\n", firstSong, "\n");

// Ok lets get the lyrics
const lyrics = await firstSong.lyrics();
console.log("Lyrics of the Song:\n", lyrics, "\n");

res.send({lyrics})
})

app.listen(3001);


// import {Client} from 'genius-lyrics'; //need to do import * as because there is no default export for the package 



