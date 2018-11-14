import * as functions from 'firebase-functions';
import * as express from 'express'
import * as bodyParser from 'body-parser'
/*import * as admin from 'firebase-admin'
admin.initializeApp(functions.config().firestore)
const db = admin.firestore()*/

const app = express()
let bananakm = ""
let yes = ""
let scale = 0;
//let data = [bananakm, scale, yes]

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('<pre>' + JSON.stringify(bananakm) + ' ' + JSON.stringify(scale) + ' ' + JSON.stringify(yes) + '</pre>')
});

app.post('/hook', function(req,res) {  
    try {
        bananakm = req.body.form_response.answers[0].choice.label
        scale = req.body.form_response.answers[1].number
        yes = req.body.form_response.answers[2].choice.label
        res.sendStatus(200)
        return;
      } catch (e) {
        console.log("Error: " + e);
        res.sendStatus(401);
      }
})

exports.readWebhookData = functions.https.onRequest(app)

