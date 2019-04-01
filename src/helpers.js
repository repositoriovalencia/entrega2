const hbs = require('hbs');
const fs = require('fs');
listaCursos = [];//vector vacio de cursos
listaInscritos = [];//vector vacio de inscritos
//----------------------------------------------------------------------------------------------------
hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) =>{
	return (nota1+nota2+nota3)/3
});

hbs.registerHelper('obtenerCurso', (cursoI) =>{
	return (cursoI);
});
//----------------------------------------------------------------------------------------------------
//funcion para registrar el curso
hbs.registerHelper('registrarCurso', (id, nombre, modalidad, valor, descripcion, intensidad, estado) =>{
	//funcion crear que crea un objeto cur con la informacion del curso
	//console.log(id + ' ' + nombre + ' ' + modalidad + ' ' + valor + ' ' + descripcion + ' ' + intensidad + ' ' + estado);
	//return(id + ' ' + nombre + ' ' + modalidad + ' ' + valor + ' ' + descripcion + ' ' + intensidad + ' ' + estado)
	//const crear = () => {
		//listar();//va a traer lo que tenia anteriormente el archivo json y le va a agregar el nuevo estudiante
		let cur = {
			id: id,
			nombre: nombre,
			modalidad: modalidad,
			valor: valor,
			descripcion: descripcion,
			intensidad: intensidad,
			estado: estado
		};
		//funcion find para trabajar con arreglos de javascript
		//se declara la variable duplicado para no permitir ingresar un nombre ya existente en el arreglo
		let duplicado = listaCursos.find(buscar => buscar.id == id)//si encuentra un id ya registrado igual al que se esta ingresando
		//si no encontro duplicado
		if(!duplicado){
			listaCursos.push(cur);//almacena en el vector estudiante el objeto est, est es a su ves un conjunto de objetos
			console.log(listaCursos);
			//guardar();
			let datos = JSON.stringify(listaCursos);
			fs.writeFile('../cursos.json', datos, (err)=>{
				if(err) throw(err);
				console.log('Archivo creado con exito..');
			});

		}else
			//console.log('ya existe un estudiante con ese id');
			return('ya existe un curso con id:' + id);
});
//-----------------------------------------------------------------------------------------------
hbs.registerHelper('listarCursos', () =>{
	listaCursos = require('../cursos.json')
	//let texto = ' Lista de cursos <br>';
	let texto = "<div class='shadow col-1 col-sm-4 col-md-8 container'><table class='table table-striped table-hover' > \
				 <thead class='thead-dark'> \
				 <th> id </th> \
				 <th> curso </th> \
				 <th> modalidad </th> \
				 <th> valor </th> \
				 <th> descripcion </th> \
				 <th> intensidad </th> \
				 <th> Estado </th> \
				 </thead> \
				 <tbody>";
			listaCursos.forEach(curso => {
			texto = texto + '<tr>' +
					'<td>' + curso.id + '</td>' +
					'<td>' + curso.nombre + '</td>' +
					'<td>' + curso.modalidad + '</td>' +
					'<td>' + curso.valor + '</td>' +
					'<td>' + curso.descripcion + '</td>' +
					'<td>' + curso.intensidad + '</td>' +
					'<td>' + curso.estado + '</td>' +
					'</tr>';
			});
			texto = texto + '</tbody></table></div>';
	return texto;
});
//-----------------------------------------------------------------------------------------------
hbs.registerHelper('listar', () =>{
	listaEstudiantes = require('./listado.json')
	//let texto = ' Lista de Estudiantes <br>';
	let texto = "<table class='table table-striped table-hover'> \
				 <thead class='thead-dark'> \
				 <th> Nombre </th> \
				 <th> Matemáticas </th> \
				 <th> Inglés </th> \
				 <th> Programación </th> \
				 </thead> \
				 <tbody>";
	
			listaEstudiantes.forEach(estudiante => {
			texto = texto + '<tr>' +
					'<td>' + estudiante.nombre + '</td>' +
					'<td>' + estudiante.matematicas + '</td>' +
					'<td>' + estudiante.ingles + '</td>' +
					'<td>' + estudiante.programacion + '</td>' +
					'</tr>';
			});
			texto = texto + '</tbody></table>';
	return texto;
});
//----------------------------------------------------------------------------------------------------
hbs.registerHelper('listar2', () =>{
	listaEstudiantes = require('./listado.json')
	//let texto = ' Lista de Estudiantes <br>';
	let texto = "<div class='accordion' id='accordionExample'>";
	i=1;
			listaEstudiantes.forEach(estudiante => {
			texto = texto + `<div class="card">
							    <div class="card-header" id="heading${i}">
							      <h2 class="mb-0">
							        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
							          ${estudiante.nombre}
							        </button>
							      </h2>
							    </div>

							    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
							      <div class="card-body">
							        Tiene una nota en matematicas de ${estudiante.matematicas} <br>
							        Tiene una nota en ingles de ${estudiante.ingles} <br>
							        Tiene una nota en programacion de ${estudiante.programacion} <br>
							      </div>
							    </div>
							  </div>`
	i=i+1;
			})
			texto = texto + '</div>';
	return texto;
});
//----------------------------------------------------------------------------------------------------
hbs.registerHelper('listardetalleCurso', () =>{
	listaCursos = require('../cursos.json')
	//let texto = ' Lista de Estudiantes <br>';
	let texto = "<div class='accordion container row justify-content-md-center' id='accordionExample'>";
	i=1;
	listaCursos.forEach(curso => {
	if(curso.estado == 'disponible'){
		texto = texto + `<div class="shadow card">
					    <div class="card-header" id="heading${i}">
					      <h2 class="mb-0">
					        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
					         <B>Nombre del Curso:</B> ${curso.nombre} <br>
					         Valor: ${curso.valor}
					        </button>
					      </h2>
					    </div>

					    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
					      	<div class="card-body">
						        <B>Curso:</B> ${curso.nombre} <br>
						        <B>Valor:</B> ${curso.valor} <br>
						        <B>Descripción:</B> ${curso.descripcion} <br>
						        <B>Modalidad:</B> ${curso.modalidad} <br>
						        <B>Intensidad:</B> ${curso.intensidad} <br>
					    	</div>
					    </div>
					  </div>`
		i=i+1;
		};
	})
	texto = texto + '</div>';
	return texto;
});
//----------------------------------------------------------------------------------------------------
hbs.registerHelper('selectCursos', () =>{
	listaCursos = require('../cursos.json')
	let texto = "<select name='curso' style='width:150px'>";
			listaCursos.forEach(curso => {
			if(curso.estado == 'disponible'){
				texto = texto + '<option value='+ curso.nombre +'>' + curso.nombre + '</option>';
			};
		});
			texto = texto + '</select>';
			return texto;
});
//selecciona los cursos para listar las personas inscritas
hbs.registerHelper('selectCurso', () =>{
	listaCursos = require('../cursos.json')
	let texto = "<navbar navbar-light bg-light class='nav-tabs' style='background-color: #e3f2fd;'>";
			listaCursos.forEach(curso => {
			if(curso.estado == 'disponible'){
				texto = texto + '<a href="/mostrarInscritos?cursoI='+curso.nombre+'">' + curso.nombre  + '</a><br>';
			};
		});
			texto = texto + '<navbar>';
			return texto;
});
//----------------------------------------------------------------------------------------------------
//funcion para matricular el curso
hbs.registerHelper('matricularCurso', (documento, email, nombre, telefono, curso) =>{
		let matr = {
			documento: documento,
			email: email,
			nombre: nombre,
			telefono: telefono,
			curso: curso
		};
		
		let duplicado = listaInscritos.find(buscar => (buscar.documento == documento && buscar.curso == curso))
		//let jabh = cursosxpersona.filter(buscar => !(buscar.course_id == 26 && buscar.user_id == 999))
		//si no encontro duplicado
		console.log(duplicado);
		if(!duplicado){
			listaInscritos.push(matr);//almacena en el vector estudiante el objeto est, est es a su ves un conjunto de objetos
			console.log(listaInscritos);
			//guardar();
			let datos = JSON.stringify(listaInscritos);
			fs.writeFile('../inscritos.json', datos, (err)=>{
				if(err) throw(err);
				console.log('Archivo creado con exito..');
			});
			return('El estudiante: ' + nombre + ' se matriculó con éxito en el curso: ' + curso);
		}else
			//console.log('ya existe un estudiante con ese id');
			return('El estudiante: ' + nombre + ' ya se encuentra registrado en el curso: ' + curso);
});
//----------------------------------------------------------------------------------------------------
hbs.registerHelper('listardetalleInscritos', () =>{
	listaInscritos = require('../inscritos.json')

	listaCursos = require('../cursos.json')

	let  texto = "<div class='accordion container row justify-content-md-center' id='accordionExample'>";
	i=1;
			listaInscritos.forEach(curso => {

				texto = texto + `<div class='shadow card'>
							    <div class="card-header" id="heading${i}">
				      			<h2 class="mb-0">
					        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
					         <B>Nombre del Curso:</B> ${curso.curso} <br>
					        </button>
					      </h2>
					    </div>

					    <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
					      	<div class="card-body">
						        <B>Curso:</B> ${curso.nombre} <br>
						        <B>Valor:</B> ${curso.valor} <br>
						        <B>Descripción:</B> ${curso.descripcion} <br>
						        <B>Modalidad:</B> ${curso.modalidad} <br>
						        <B>Intensidad:</B> ${curso.intensidad} <br><br>
					    	</div>
					    </div>
					  </div>`
				i=i+1;
			})
			texto = texto + '</div>';
	return texto;
});
//----------------------------------------------------------------------------------------------------
hbs.registerHelper('listardetalleInscritosCurso', (cursoI) =>{
	listaInscritos = require('../inscritos.json')
	listaCursos = require('../cursos.json')

	let  texto = "<form action='/eliminarMatricula' method='get'><div class='accordion container row justify-content-md-center' id='accordionExample'> \
				  <div class='shadow card'>";
	i=1;
	texto = texto + `<div class="card-header" id="headingOne">
			     		<h2 class="mb-0">
			        		<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
			         			<B>Curso:</B> ${cursoI} <br>
			        		</button>
			      		</h2>
		    		</div>
	    			<table class='table table-striped table-hover'>
		    			<thead class='thead-dark'>
				 		<th> Identificacion </th>
				 		<th> Nombre </th>
				 		<th> Telefono </th>
				 		<th> email </th>
				 		<th> Eliminar </th>
			 		</thead>
			 		<tbody>`
					listaInscritos.forEach(curso => {
						if (curso.curso == cursoI){
							texto = texto + `<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
									<tr>
										<td> ${curso.documento} </td>
									    <td> ${curso.nombre} </td>
									    <td> ${curso.telefono} </td>
									    <td> ${curso.email} </td>`
					    //texto = texto +	'<td><button type='submit' name='boton' value='+curso.documento +'" class="btn btn-danger">Eliminar</button></td> \
						texto = texto + '<td><a href="/eliminarMatricula?documento='+curso.documento+'&curso='+curso.curso+'">eliminar</a></td>' +
								    '</tr>' +
							    '</div>' +
							 '</div>'
							i=i+1;
						}
					})
		texto = texto + '</tbody></table></div></form>';
return texto;
});

hbs.registerHelper('verlistarCursos', () =>{
	listaCursos = require('../cursos.json')
	//let texto = ' Lista de cursos <br>';
	let texto = "<form	action='/cambiarEstadoCurso' method='get'> \
				 <div class='shadow col-1 col-sm-4 col-md-8 container'><table class='table table-striped table-hover' > \
				 <thead class='thead-dark'> \
				 <th> id </th> \
				 <th> curso </th> \
				 <th> modalidad </th> \
				 <th> valor </th> \
				 <th> descripcion </th> \
				 <th> intensidad </th> \
				 <th> Estado </th> \
				 <th> Cambiar Estado </th> \
				 </thead> \
				 <tbody>";
			listaCursos.forEach(curso => {
			texto = texto + '<tr>' +
					'<td>' + curso.id + '</td>' +
					'<td>' + curso.nombre + '</td>' +
					'<td>' + curso.modalidad + '</td>' +
					'<td>' + curso.valor + '</td>' +
					'<td>' + curso.descripcion + '</td>' +
					'<td>' + curso.intensidad + '</td>' +
					'<td>' + curso.estado + '</td>' +
					// '<td><a href="/cambiarEstadoCurso?id='+curso.id+'&estado='+curso.estado+'">cerrar</a></td>' +
					'<td><a href="/cambiarEstadoCurso?id='+curso.id+'&nombre='+curso.nombre+'&modalidad='+curso.modalidad+'&valor='+curso.valor+'&descripcion='+curso.descripcion+'&intensidad='+curso.intensidad+'&estado='+curso.estado+'">cerrar</a></td>' +
					'</tr>';
			});
			texto = texto + '</tbody></table></div>';
	return texto;
});

hbs.registerHelper('cambiarEstadocurso', (id, nombre, modalidad, valor, descripcion, intensidad, estado) =>{
	listaCursos = require('../cursos.json')
	//let texto = ' Lista de cursos <br>';
	let indice = listaCursos.find(buscar => buscar.id == id);
	if (!indice){
			return 'No existe' + id;
		}
		else {
			listaCursos.id = indice.id,
			listaCursos.nombre = indice.nombre,
			listaCursos.modalidad = indice.modalidad,
			listaCursos.valor = indice.valor,
			listaCursos.descripcion = indice.descripcion,
			listaCursos.intensidad = indice.intensidad,
			listaCursos.estado	= 'cerrado';

			let datos=JSON.stringify(listaCursos);
			fs.writeFile('../cursos.json', datos, (err)=>{
				if(err) throw(err);
				console.log('Archivo actualizado con exito..');
			});
			return 'Elemento actualizado' + id;
		} 

	let texto = "<div class='shadow col-1 col-sm-4 col-md-8 container'><table class='table table-striped table-hover' > \
				 <thead class='thead-dark'> \
				 <th> id </th> \
				 <th> curso </th> \
				 <th> modalidad </th> \
				 <th> valor </th> \
				 <th> descripcion </th> \
				 <th> intensidad </th> \
				 <th> Estado </th> \
				 <th> Cambiar Estado </th> \
				 </thead> \
				 <tbody>";
			listaCursos.forEach(curso => {
			texto = texto + '<tr>' +
					'<td>' + curso.id + '</td>' +
					'<td>' + curso.nombre + '</td>' +
					'<td>' + curso.modalidad + '</td>' +
					'<td>' + curso.valor + '</td>' +
					'<td>' + curso.descripcion + '</td>' +
					'<td>' + curso.intensidad + '</td>' +
					'<td>' + curso.estado + '</td>' +
					'<td><a href="/cambiarEstadoCurso?id='+curso.id+'&nombre="'+curso.nombre+'&modalidad='+curso.modalidad+'&valor='+curso.valor+'&descripcion='+curso.descripcion+'&intensidad='+curso.intensidad+'&estado='+curso.estado+'">' + cerrar  + '</a></td>' +
					'</tr>';
			});
			texto = texto + '</tbody></table></div>';
	return texto;
});

hbs.registerHelper('eliminarmatriculaCurso', (documento, curso) =>{
		listaInscritos = require('../inscritos.json')
		let duplicado = listaInscritos.find(buscar => (buscar.documento == documento && buscar.curso == curso))
		if(!duplicado){
			//return('El estudiante: ' + nombre + ' se matriculó con éxito en el curso: ' + curso);
		}else{
			listaInscritos.splice(duplicado,1)
			let datos = JSON.stringify(listaInscritos);
			fs.writeFile('../inscritos.json', datos, (err)=>{
				if(err) throw(err);
				console.log('Archivo creado con exito..');
			});
			return('Matricula eliminada --> Identificacion: ' + documento + ',  curso: ' + curso);
		}
});

hbs.registerHelper('imprimirInscritosCurso', () =>{
	listaInscritos = require('../inscritos.json')
	listaCursos = require('../cursos.json')

	let  texto = "<div class='shadow col-1 col-sm-4 col-md-8 container'>";
	texto = texto + `<table class='table table-striped table-hover'>
		    			<thead class='thead-dark'>
				 		<th> Identificacion </th>
				 		<th> Nombre </th>
				 		<th> Telefono </th>
				 		<th> email </th>
				 		<th> curso </th>
			 		</thead>
			 		<tbody>`
					listaInscritos.forEach(curso => {
							texto = texto + `<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">`
							texto = texto + '<tr>' +
								'<td>' + curso.documento + '</td>' +
							    '<td>' + curso.nombre + '</td>' +
							    '<td>' + curso.telefono + '</td>' +
							    '<td>' + curso.email + '</td>' +
							    '<td>' + curso.Curso + '</td>' +
						 		'</tr>' +
							    '</div>' +
							 '</div>'
						})
		texto = texto + '</tbody></table></div>';
return texto;
});