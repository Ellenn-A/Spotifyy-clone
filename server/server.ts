import express, { Request, Response } from 'express'; 
import SpotifyWebApi from 'spotify-web-api-node';
import cors from 'cors';
import bodyParser from 'body-parser';

interface IRequestBody {
    code: string
}

interface IResponseBody {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.post('/login', (
    req: Request<{}, IResponseBody, IRequestBody>,
    res: Response<IResponseBody>
) =>{
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri:'http://localhost:3000',
        clientId:'8f273efb99e646baaa11d22dc9e41803',
        clientSecret:'bd1115f5380246b0b777477b041d7ef0'
    })
    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err=>{
        console.log(err);
        res.sendStatus(400)
    });
})

app.listen(3001);