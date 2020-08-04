"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const request_1 = __importDefault(require("request"));
//Aqui puede comenzar a importar una db
//import db from '../database/dbconfig'; o algo parecido
class IndexController {
    spotifyToken(req, res) {
        //   res.json({
        //       text: 'El enlace esta en /'
        //   })
        let client_id = 'd0d723f3450c42468b7043cd36a0e18f';
        let client_secret = '06283de8a95c4038955cb4bfc1ee2e4a';
        let spotifyUrl = 'https://accounts.spotify.com/api/token';
        console.log(client_id, client_secret);
        var authOptions = {
            url: spotifyUrl,
            headers: {
                Authorization: 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        request_1.default.post(authOptions, (err, httpResponse, body) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se pudo obtener el token',
                    err
                });
            }
            res.json(body);
        });
    }
}
exports.indexController = new IndexController();
// Otra forma de exportar es:
// const indexController = new IndexController();
//export default indexController;
