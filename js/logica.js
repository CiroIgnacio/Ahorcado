$(document).ready(function() {
		palabras = ["palindromo", "deuterio", "integrador", "sinapsis", "motocicleta", "membrana", "frescura", "aspiradora", "futil", "silicio", "alicate"];
		letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","w","x","y","z"];
		errorcount = 0;
		cantClicks = 0;
		letrasElegidas = [];
		function elegirPalabra(){
			var random = Math.round(Math.random()*10);
			palabraSeleccionada = palabras[random];
			$('.errorCont').append('<img src = "img/img0.jpg">');
			mostrarAbc();
			mostrarPalabra();
			chequearLetra();
			
		}

		function mostrarPalabra(){
			for (var i = 0; i < palabraSeleccionada.length; i++) {
				$('.palabrasCont').append("<div class = 'cajaLetra'><span class = 'letra' id = "+ i +">"+palabraSeleccionada[i]+"</span></div>");
			}
		}

		function mostrarAbc() {
			for (var i = 0; i < letras.length; i++) {
				$('.abcCont').append("<button class = 'letra_abc'>"+letras[i]+"</button>");
			}

			$('.letra_abc').each(function(index){
				$(this).attr('data-letra', letras[index]);
			})

		}
		function añadirClass(letra){
			letra.addClass('seleccionada');
		}

		function chequearLetra() {

			$('.letra_abc').on('click', function() {
			añadirClass($(this));
			letraSelecc = $('.seleccionada').data('letra');
			existe = palabraSeleccionada.indexOf(letraSelecc);
			repetida = letrasElegidas.indexOf(letraSelecc);
			indices = [];
			if (existe != -1 && repetida == -1){
				while (existe != -1){
					indices.push(existe);
					existe = palabraSeleccionada.indexOf(letraSelecc, existe+1);
					letrasElegidas.push(letraSelecc);
				}
			}
			for (var i = 0; i < indices.length; i++) {
				$('#'+indices[i]).css({'visibility':'visible'});
			}

			if (indices.length == 0 && errorcount < 6){
				errorcount++;
				$('img').attr("src", "img/img"+errorcount+".jpg");
			}

			chequearResultado();

			$(this).removeClass('seleccionada');
			

			});
		}

		function chequearResultado() {
			if (errorcount == 6){
				$('.mensajeDerrota').show();
				$('.cajaLetra').css({'display':'none'});
				$('.abcCont').css({'display':'none'});
				$('.palabraSeleccionada').append('<u>'+palabraSeleccionada+'</u>');

			}

			if (letrasElegidas.length == palabraSeleccionada.length){
				$('.mensajeVictoria').show();
				$('.errorCont').css({'display':'none'});
				$('.cajaLetra').css({'display':'none'});
				$('.abcCont').css({'display':'none'});
				$('.palabraSeleccionada').append('<u>'+palabraSeleccionada+'</u>');
			}
		
		}

		elegirPalabra();
		
});