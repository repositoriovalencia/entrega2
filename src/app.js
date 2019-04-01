const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./helpers');
const dirNode_modules = path.join(__dirname , '../node_modules')

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use	(bodyParser.urlencoded({extended:false}))
//console.log(__dirname)
app.set ('view engine', 'hbs');

app.get('/',(req, res) =>{
	//llamada a index.hbs
	res.render('index',{
		estudiante: 'Juan'
	});
});

app.post('/calculos',(req,res) =>{
	console.log	(req.query);
	//llamada a calculos.hbs
	res.render('calculos', {
		estudiante: req.body.nombre,
		nota1: parseInt(req.body.nota1),
		nota2: parseInt(req.body.nota2),
		nota3: parseInt(req.body.nota3)
	});
});
//------------------------------------------------------------------------------
app.get('/crear',(req, res) =>{
	console.log	(req.query);
	//llamada a crear.hbs
	res.render('crear', {
		estudiante: ''
	});
});

app.post('/crearCurso',(req, res) =>{
	console.log	(req.query);
	//llamada a crearCurso.hbs
	res.render('crearCurso', {
		//estudiante: 'juan',
		id: req.body.id,
		nombre: req.body.nombre,
		modalidad: req.body.modalidad,
		valor: parseInt(req.body.valor),
		descripcion: req.body.descripcion,
		intensidad: parseInt(req.body.intensidad),
		estado: 'disponible'
	});
});
//------------------------------------------------------------------------------
app.get('/listado',(req,res) =>{
	console.log(req.query);
	res.render('listado',{
		estudiante: ''
	});
});

app.get('/listadoCursos',(req,res) =>{
	console.log(req.query);
	res.render('listadoCursos',{
		estudiante: ''
	});
});
//------------------------------------------------------------------------------
app.get('/inscribir',(req, res) =>{
	console.log	(req.query);
	//llamada a crear.hbs
	res.render('inscribir', {
		estudiante: ''
	});
});

app.post('/inscribirCurso',(req, res) =>{
	console.log	(req.query);
	//llamada a crearCurso.hbs
	res.render('inscribirCurso', {
		//estudiante: 'juan',
		documento: req.body.documento,
		email: req.body.email,
		nombre: req.body.nombre,
		telefono: req.body.telefono,
		curso: req.body.curso
	});
});
//------------------------------------------------------------------------------
app.get('/inscritos',(req,res) =>{
	console.log(req.query);
	res.render('inscritos',{
		estudiante: ''
	});
});

app.get('/listadoInscritos',(req,res) =>{
	console.log(req.query);
	res.render('listadoInscritos',{
		estudiante: ''
	});
});

app.get('/mostrarInscritos',(req, res) =>{
	res.render('mostrarInscritos', {
		cursoI: req.query.cursoI
	});
});

app.get('/cambiarEstadoCurso',(req, res) =>{
	res.render('cambiarEstadoCurso', {
		id: req.query.id,
		estado: req.query.estado
	});
});

app.get('/eliminarMatricula',(req, res) =>{
	res.render('eliminarMatricula', {
		documento: req.query.documento,
		curso: req.query.curso
	});
});
//------------------------------------------------------------------------------
app.get('*',(req,res) =>{
	res.render('error',{
		estudiante: 'error'
	});
});

app.listen(3000,() => {
	console.log('escuchando el puerto 3000');
});