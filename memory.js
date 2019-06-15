var ime_igraca = document.getElementById('ime');
var igrac = document.getElementById('igrac');
var nova_igra = document.getElementById('nova_igra');
var vreme = document.getElementById('vreme');
var tabla = document.getElementById('tabla');
var poeni = document.getElementById('poeni');

ime_igraca.addEventListener('focus', dodajIvice);
ime_igraca.addEventListener('blur', skloniIvice);
ime_igraca.addEventListener('input', promeniIme);
nova_igra.addEventListener('click', novaIgra);

nova_igra.disabled = true;

var matrica;

var igra_u_toku = 0;

var prva_kartica;
var druga_kartica;

var broj_poena;

var dozvoljen_potez = 0;

var preostalo_polja;

var preostalo_vreme = 180;
vreme.innerHTML = preostalo_vreme;



function dodajIvice() {
	ime_igraca.style.border = "2px solid blue";
}


function skloniIvice() {
	ime_igraca.style.border = "none";
}


function promeniIme() {
	igrac.innerHTML = this.value.trim();

	if (ime_igraca.value.trim().length > 0)
		nova_igra.disabled = false;
	else
		nova_igra.disabled = true;
}

function novaIgra() {
	preostalo_polja = 30;
	dozvoljen_potez = 1;

	broj_poena = 0;
	poeni.innerHTML = 0;

	nova_igra.disabled = true;
	igra_u_toku = 1;
	preostalo_vreme = 180;

	prva_kartica = undefined;
	druga_kartica = undefined;

	inicijalizujMatricu();

	nacrtajTablu();

	pokreniTajmer();
}


function pokreniTajmer() {
	if (igra_u_toku == 0)
		return;

	vreme.innerHTML = preostalo_vreme;

	if (preostalo_vreme != 0) {
		preostalo_vreme--;

		setTimeout(pokreniTajmer, 1000);
	}
	else 
	{
		alert("KRAJ IGRE");
		igra_u_toku = 0;
		nova_igra.disabled = false;
	}
}


function nacrtajTablu() {

	var i, j;

	tabla.innerHTML = "";


	for (i = 0; i < 5; i++) {

		for (j = 0; j < 6; j++) {

			polje = document.createElement('div');
			polje.setAttribute('class', 'polje');


			kartica = document.createElement('img');
			kartica.setAttribute('src', 'images/back.jpg');
			kartica.setAttribute('data-okrenuta', 0);
			kartica.setAttribute('data-broj', matrica[i][j]);

			kartica.style.transition = '0.5s';

			kartica.addEventListener('click', okreniKarticu);
			kartica.addEventListener('mouseover', prikaziSenku);
			kartica.addEventListener('mouseleave', skloniSenku);


			polje.appendChild(kartica);

			tabla.appendChild(polje);
		}
	}
}

function okreniKarticu() {
	if (igra_u_toku == 1 && dozvoljen_potez == 1 && this.getAttribute('data-okrenuta') == 0) {
		this.setAttribute('src', 'images/' + this.getAttribute('data-broj') + '.jpg');
		this.setAttribute('data-okrenuta', 1);

		if (prva_kartica == undefined) {
			prva_kartica = this;
		}
		else {
			druga_kartica = this;

			if (prva_kartica.getAttribute('data-broj') == druga_kartica.getAttribute('data-broj')) {

				broj_poena += 1;
				poeni.innerHTML = broj_poena;

				prva_kartica = undefined;
				druga_kartica = undefined;

				preostalo_polja -= 2;

				if (preostalo_polja == 0) {
					alert("POBEDA!");
					igra_u_toku = 0;
					nova_igra.disabled = false;
				}
			}
			else {
				dozvoljen_potez = 0;
				setTimeout(function () {

					prva_kartica.setAttribute('data-okrenuta', 0);
					druga_kartica.setAttribute('data-okrenuta', 0);


					prva_kartica.setAttribute('src', 'images/back.jpg');
					druga_kartica.setAttribute('src', 'images/back.jpg');

					prva_kartica = undefined;
					druga_kartica = undefined;
					dozvoljen_potez = 1;

				}, 1000);
			}
		}
	}
}


function inicijalizujMatricu() {

	matrica = new Array();

	for (i = 0; i < 5; i++) {
		matrica[i] = [];

		for (j = 0; j < 6; j++) {
			matrica[i][j] = 0;
		}
	}

	var i1, j1, i2, j2;

	for (var k = 1; k <= 15; k++) {
		do {

			i1 = Math.random();
			i1 = Math.trunc(i1 * 100) % 5;

			j1 = Math.random();
			j1 = Math.trunc(j1 * 100) % 6;

		} while (matrica[i1][j1] != 0)

		matrica[i1][j1] = k;

		do {

			i2 = Math.random();
			i2 = Math.trunc(i2 * 100) % 5;

			j2 = Math.random();
			j2 = Math.trunc(j2 * 100) % 6;

		} while (matrica[i2][j2] != 0)

		matrica[i2][j2] = k;
	}
}


function prikaziSenku() {
	this.style.boxShadow = '0px 0px 15px 3px white';
}

function skloniSenku() {
	this.style.boxShadow = 'none';
}