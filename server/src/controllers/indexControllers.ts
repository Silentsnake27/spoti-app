import { Request,Response } from 'express';
import request from 'request';
//Aqui puede comenzar a importar una db
//import db from '../database/dbconfig'; o algo parecido

class IndexController {

    public spotifyToken (req: Request,res: Response) {
      
    //   res.json({
    //       text: 'El enlace esta en /'
    //   })

        let client_id = 'd0d723f3450c42468b7043cd36a0e18f';
        let client_secret = '06283de8a95c4038955cb4bfc1ee2e4a';
        let spotifyUrl = 'https://accounts.spotify.com/api/token';
    
        console.log(client_id,client_secret)
        var authOptions = {
            url: spotifyUrl,
            headers: {
                Authorization: 'Basic ' +  Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
    
    
        request.post(authOptions, (err, httpResponse, body) => {
    
            if (err) {
                console.log(err);
                
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se pudo obtener el token',
                    err
                })
            }
    
            res.json(body);
    
        });

  }

    //    this.router.get('/spotify/:client_id/:client_secret', (req, resp) => {

    //     let client_id = req.params.client_id;
    //     let client_secret = req.params.client_secret;
    //     let spotifyUrl = 'https://accounts.spotify.com/api/token';
    
    //     var authOptions = {
    //         url: spotifyUrl,
    //         headers: {
    //             Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
    //         },
    //         form: {
    //             grant_type: 'client_credentials'
    //         },
    //         json: true
    //     };
    
    
    //     request.post(authOptions, (err, httpResponse, body) => {
    
    //         if (err) {
    //             return resp.status(400).json({
    //                 ok: false,
    //                 mensaje: 'No se pudo obtener el token',
    //                 err
    //             })
    //         }
    
    //         resp.json(body);
    
    //     });
    
    // });
}


export const indexController = new IndexController();
// Otra forma de exportar es:

// const indexController = new IndexController();
//export default indexController;