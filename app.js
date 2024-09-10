const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const fs = require('fs');
const file_path = "./data.json"
try{
    if(fs.existsSync(file_path)){  
    } else {
        const data = fs.writeFileSync('data.json', "{}");
    }
} catch(err){
    console.error(err);
}

const data = JSON.parse(fs.readFileSync('./data.json',{encoding:'utf8', flag:'r'}))

function saveList(arrData){
    const arrInJson = JSON.stringify(arrData);
    const data = fs.writeFileSync('data.json', arrInJson);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('list', { rows: data })
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/add', (req, res) => {

    data.push({name: req.body.name, height: parseInt(req.body.height), weight: parseFloat(req.body.weight), birthdate: req.body.birthdate, married: JSON.parse(req.body.married)})
    saveList(data);
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    const index = req.params.id
    data.splice(index, 1);
    saveList(data);
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    res.render('edit', {item: data[req.params.id]})
})

app.post('/edit/:id', (req, res) => {
    data[req.params.id] = {name: req.body.name, height: parseInt(req.body.height), weight: parseFloat(req.body.weight), birthdate: req.body.birthdate, married: JSON.parse(req.body.married)}
    saveList(data);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})