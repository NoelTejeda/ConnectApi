let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if (pagina < 1000) {
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if (pagina > 1) {
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);

		console.log(respuesta);

		// Si la respuesta es correcta
		if (respuesta.status === 200) {
			const datos = await respuesta.json();

			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if (respuesta.status === 401) {
			console.log('Pusiste la llave mal');
		} else if (respuesta.status === 404) {
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch (error) {
		console.log(error);
	}

}

cargarPeliculas();

/* 
fetch es una función que nos permite colocar una cadena de texto, que es la dirección url a la que se quiere hacer 
la petición

Cuando se usa fetch nos vá a devolver una promesa, y esa promesa se está guardando en la variable respuesta.

la promesa significa que se está haciendo una petición, pero en este caso tenemos que esperar que esta acabe antes
de hacer algo, y es que cuandoo hacemos una petición al sevidor, nosotros le enviamos lo que queremos como la 
información de una pelicula, el servidor tiene que procesar esa petición, etc. y nos vá a devolver la información,
pero todo esto tarda tiempo, no es instántaneo, entonces tenemos que esperar y esto lo hacemos con la palabra "await"

si se quiere usar await solo se puede usar con las funciones asincronas (async) que es sólo colocarle la palabra
async. entonces quedaria así:

	const cargarPeliculas = async () => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);

		 console.log(respuesta);
	
	----------------------------------------------------------------
	----------------------------------------------------------------

	cuando se trabaja con funciones asincronas se deberia trabajar con try catch. para que el caso de que no se ejecute. podamos atraparlo y mostrarlo. 
	
 */