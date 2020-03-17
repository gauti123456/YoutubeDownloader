const express = require('express');
const bodyParser = require('body-parser')

const ytdl = require('ytdl-core');

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/download', (req,res) => {
    var URL = req.query.url
    if (ytdl.validateURL(URL)) {
        var format = req.query.format
        console.log(URL)
        console.log(format)
    
        res.header('Content-Disposition', `attachment; filename=video.${format}`);
        ytdl(URL, {
            format: `${format}`
        }).pipe(res);
    } 
    
});