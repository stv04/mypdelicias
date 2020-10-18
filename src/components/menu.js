import hamburguesa from './imagenes/hamburguesa.png'
import sandwich from './imagenes/sandwich.png'
import perro from './imagenes/perro.png'
import wraps from './imagenes/wraps.png'
import maicitos from './imagenes/maicitos.png'
import salchipapas from './imagenes/salchipapas.png'

export default {
	Hamburguesas: {
		img: hamburguesa,
		productos :[
		{
			id: 1,
			name: 'Hamburguesa Tradicional',
			pryce: 8000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Carne', 
			'Queso', 'Salsas de la casa']
		},
		{
			id: 2,
			name: 'Hamburguesa Especial',
			pryce: 9000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Carne', 'Queso', 
			'Tocineta', 'Salsas de la casa']
		},
		{
			id: 3,
			name: 'Hamburguesa Hawaiiana',
			pryce: 9000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Carne', 'Queso', 
			'Piña', 'Salsas de la casa']
		},
		{
			id: 4,
			name: 'Hamburguesa Ranchera',
			pryce: 10000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Carne', 'Queso', 
			'Tocineta', 'Salchicha Ranchera', 'Salsas de la casa']
		},
		{
			id: 5,
			name: 'Hamburguesa M&P',
			pryce: 12000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Doble Carne', 'Queso', 
			'Tocineta', 'Salsas de la casa']
		},
		{
			id: 6,
			name: 'Hamburguesa M&P Ranchera',
			pryce: 13000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Doble Carne', 'Doble Queso', 
			'Tocineta', 'Salchicha Ranchera', 'Salsas de la casa']
		},
		{
			id: 7,
			name: 'Hamburguesa Mixta',
			pryce: 12000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Doble Carne', 'Queso', 
			'Tocineta', 'Salsas de la casa']
		},
		{
			id: 8,
			name: 'Hamburguesa de Pollo',
			pryce: 9000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Pollo', 'Queso',
			'Salsas de la casa']
		},
		{
			id: 9,
			name: 'Hamburguesa de Pollo Especial',
			pryce: 10000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Pollo', 'Queso', 
			'Tocineta', 'Salsas de la casa']
		},
		{
			id: 10,
			name: 'Hamburguesa de Pollo Ranchera',
			pryce: 12000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Pollo', 'Queso', 
			'Tocineta', 'Salchicha Ranchera', 'Salsas de la casa']
		},
		{
			id: 11,
			name: 'Hamburguesa de Pollo M&P',
			pryce: 13000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Doble Pollo', 'Queso', 
			'Tocineta', 'Salsas de la casa']
		},
		{
			id: 12,
			name: 'Hamburguesa de pollo M&P Ranchera',
			pryce: 14000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Doble Pollo', 'Queso', 
			'Tocineta', 'Salchicha Ranchera', 'Salsas de la casa']
		},
		{
			id: 13,
			name: 'Hamburguesa Vegetariana',
			pryce: 7000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Maíz', 'Piña', 
			'Queso']
		},
		{
			id: 14,
			name: 'Hamburguesa M&P Extrema',
			pryce: 20000,
			ingredientes: ['Lechuga', 'Ripio', 'Tomate', 'Cebolla', 'Doble Carne', 'Doble Pollo', 
			'Triple Queso', 'Extra tocineta', 'Salchicha Ranchera', 'Salsas de la casa']
		}
	]},

	Sandwiches:{ 
		img: sandwich,
		productos: [
			{
				id: 15,
				name: 'Sándwich Cubano Especial',
				pryce: 6500,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Doble Queso', 'Doble Jamón',
				'salsa de la casa']
			},
			{
				id: 16,
				name: 'Sándwich Napolitano',
				pryce: 6000,
				ingredientes: ['Pan Francés', 'Triple Queso', 'Tomate', 'Oregano', 'Lechuga',
				'salsa de la casa']
			},
			{
				id: 17,
				name: 'Sándwich Hawaiiano',
				pryce: 6000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Jamón',
				'Piña en cuadros','salsa de la casa']
			},
			{
				id: 18,
				name: 'Sándwich Ranchero',
				pryce: 7000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Jamón',
				'Salchicha Ranchera', 'salsa de la casa']
			},
			{
				id: 19,
				name: 'Sándwich Ranchero Especial',
				pryce: 8000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Jamón',
				'Salchicha Ranchera', 'Tocineta', 'salsa de la casa']
			},
			{
				id: 20,
				name: 'Sándwich de Pollo BBQ',
				pryce: 8000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso',
				'Pollo a la BBQ', 'salsa de la casa']
			},
			{
				id: 21,
				name: 'Sándwich de Pollo Especial',
				pryce: 9000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso',
				'Pollo a la BBQ', 'Tocineta', 'salsa de la casa']
			},
			{
				id: 22,
				name: 'Sándwich de Pollo Ranchero',
				pryce: 10000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Pollo a la BBQ',
				'Salchicha Ranchera', 'Tocineta', 'salsa de la casa']
			},
			{
				id: 23,
				name: 'Sándwich Cordero',
				pryce: 10000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Jamón de Cordero',
				'salsa de la casa']
			},
			{
				id: 24,
				name: 'Sándwich M&P',
				pryce: 1200,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Doble Queso', 'Doble Jamón',
				'Jamón de Cordero', 'salsa de la casa']
			},
			{
				id: 25,
				name: 'Sándwich Vegetariano',
				pryce: 5500,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Piña',
				'Maíz', 'salsa de la casa']
			},
			{
				id: 26,
				name: 'Sándwich Mixto',
				pryce: 12000,
				ingredientes: ['Pan Francés', 'Lechuga', 'Tomate', 'Queso', 'Pollo a la BBQ',
				'Carne', 'salsa de la casa']
			}
	]},

	Perros: {
	img: perro,
	productos:[
		{
			id: 27,
			name: 'Perro Tradicional',
			pryce: 7000,
			ingredientes: ['Lechuga', 'Ripio', 'Cebolla', 'Salchicha', 'Queso']
		},
		{
			id: 28,
			name: 'Perro Especial',
			pryce: 8000,
			ingredientes: ['Lechuga', 'Ripio', 'Cebolla', 'Salchicha', 'Queso', 'Tocineta']
		},
		{
			id: 29,
			name: 'Perro Hawaiiano',
			pryce: 8000,
			ingredientes: ['Lechuga', 'Ripio', 'Cebolla', 'Salchicha', 'Queso', 'Piña']
		},
		{
			id: 30,
			name: 'Perro Ranchero',
			pryce: 9000,
			ingredientes: ['Lechuga', 'Ripio', 'Cebolla', 'Salchicha', 'Queso', 'Tocineta',
			'Salchicha Ranchera']
		},
		{
			id: 31,
			name: 'Perro M&P',
			pryce: 11000,
			ingredientes: ['Lechuga', 'Ripio', 'Cebolla', 'Pollo', 'Queso', 'Tocineta']
		},
		{
			id: 32,
			name: 'Perro M&P Extremo',
			pryce: 16000,
			ingredientes: ['Lechuga', 'Ripio', 'Cebolla', 'Salchicha', 'Pollo', 'Extra Tocineta',
			'Extra Queso', 'Salchicha Ranchera']
		}
	]},

	Wraps: {
	img: wraps,
	productos: [
		{
			id: 33,
			name: 'Wrap Tradicional',
			pryce: 8000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Pollo', 'Queso']
		},
		{
			id: 34,
			name: 'Wrap Especial',
			pryce: 9000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Pollo', 'Queso', 'Tocineta']
		},
		{
			id: 35,
			name: 'Wrap ranchero',
			pryce: 10000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Salchicha Ranchera', 'Queso', 'Tocineta']
		},
		{
			id: 36,
			name: 'Wrap Hawaiiano',
			pryce: 8000,
			ingredientes: ['Lechuga', 'Piña', 'Jamón', 'Queso']
		},
		{
			id: 37,
			name: 'Wrap Cordero',
			pryce: 10000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Jamón de Cordero', 'Queso']
		},
		{
			id: 38,
			name: 'Wrap M&P',
			pryce: 12000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Pollo', 'Jamón de Cordero',
			'Doble Queso']
		},
		{
			id: 39,
			name: 'Wrap Vegetariano',
			pryce: 7000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Cebolla', 'Queso']
		},
		{
			id: 40,
			name: 'Wrap Mixto',
			pryce: 12000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Pollo', 'Carne', 'Queso']
		},
		{
			id: 41,
			name: 'Wrap Extremo',
			pryce: 17000,
			ingredientes: ['Lechuga', 'Tomate', 'Maíz', 'Pollo', 'Carne', 'Salchicha Ranchera',
			'Extra Queso', 'Tocineta']
		}
	]},

	Maicitos: {
		img: maicitos,
		productos: [
		{
			id: 42,
			name: 'Maicito Especial',
			pryce: 10000,
			ingredientes: ['Maíz', 'Pollo en cuadros', 'Extra Queso', 'Salsas de la casa']
		},
		{
			id: 43,
			name: 'Maicito Ranchero',
			pryce: 10000,
			ingredientes: ['Maíz', 'Salchicha Ranchera', 'Extra Queso', 'Tocineta',
			'Salsas de la casa']
		},
		{
			id: 44,
			name: 'Maicito M&P',
			pryce: 12000,
			ingredientes: ['Maíz', 'Pollo en cuadros', 'Salchicha Ranchera', 'Extra Queso',
			'Tocineta', 'Salsas de la casa']
		}
	]},

	Salchipapas: {
		img: salchipapas,
		productos: [
		{
			id: 49,
			name: 'salchipapa Especial',
			pryce: 7000,
			ingredientes: ['Papas a La Francesa', 'Salchicha Manguera', 'Queso', 'Tocineta']
		},
		{
			id: 50,
			name: 'salchipapa Ranchera',
			pryce: 9000,
			ingredientes: ['Papas a La Francesa', 'Salchicha Manguera', 'Salchicha Ranchera',
			'Queso', 'Tocineta']
		},
		{
			id: 51,
			name: 'salchipollo',
			pryce: 10000,
			ingredientes: ['Papas a La Francesa', 'Salchicha Manguera', 'Pollo', 'Queso',
			'Tocineta']
		},
		{
			id: 52,
			name: 'salchipapa M&P',
			pryce: 7000,
			ingredientes: ['Papas a La Francesa', 'Salchicha Manguera', 'Pollo',
			'Salchicha Ranchera', 'Queso', 'Tocineta']
		},
		{
			id: 53,
			name: 'porcion de Papas',
			pryce: 3500,
			ingredientes: ['Papas a La Francesa']
		}
	]},

	Bebidas:
		{
			varios: true,
			id: [54, 55, 56, 57, 58],
			name: ['Gaseosa "400ml"', 'Gaseosa "1\xBDL"', 'Agua', 'Cervesa Corona', 'Cervesa'],
			pryce: [3000, 5000, 3000, 5000, 3500]
		},

	Adiciones: 
		{
			varios: true,
			id: [59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
			name: ['Queso', 'Tocineta', 'Jamón', 'Salchicha Ranchera', 'Carne de Res', 'Pollo', 
			'Jamón de Cordero', 'Maicitos', 'Ripio de papas', 'Salsa', 'Piña'],
			pryce: [2500, 3500, 2500, 3000, 3000, 3000, 3000, 2500, 1500, 1000, 1500]
		}
	
}