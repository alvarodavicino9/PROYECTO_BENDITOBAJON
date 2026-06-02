export const PRODUCTS = [
  { id:'b1',  name:'CLASICA',        cat:"Burger's",  popular: true,  img:'/img/burg1.png', desc:'Carne smasheada, cheddar x2, lechuga, tomate, aderezo Bendito.', rm:['Sin Lechuga','Sin Tomate','Sin Cheddar','Sin Aderezo'] },
  { id:'b2',  name:'OKLAHOMA',       cat:"Burger's",  popular: true,  img:'/img/burg2.png', desc:'Carne smasheada, cheddar x2, cebolla finamente cortada y cocinada con los medallones.', rm:['Sin Cebolla','Sin Cheddar'] },
  { id:'b3',  name:'CUARTO',         cat:"Burger's",  popular: false, img:'/img/burg3.png', desc:'Carne smasheada, cheddar x2, cebollita picada, ketchup y mostaza.', rm:['Sin Cebollita','Sin Ketchup','Sin Mostaza'] },
  { id:'b4',  name:'EXTRA CHEDDAR',  cat:"Burger's",  popular: false, img:'/img/burg4.png', desc:'Carne smasheada, cheddar x3, aderezo Bendito Bajon.', rm:['Sin Aderezo'] },
  { id:'b5',  name:'CHEESE BURGER',  cat:"Burger's",  popular: false, img:'/img/burg1.png', desc:'Carne smasheada, cheddar x2, aderezo Bendito Bajon.', rm:['Sin Cheddar','Sin Aderezo'] },
  { id:'be1', name:'BUTTER',         cat:'Benditas',  popular: true,  img:'/img/burg2.png', desc:'Carne smasheada, cheddar x2, manteca en coccion, mayonesa de ajo Hellmans.', rm:['Sin Cheddar','Sin Mayonesa de ajo'] },
  { id:'be2', name:'CHEESE BACON',   cat:'Benditas',  popular: true,  img:'/img/burg3.png', desc:'Carne smasheada, cheddar x2, panceta ahumada, barbacoa.', rm:['Sin Panceta','Sin Cheddar','Sin Barbacoa'] },
  { id:'be3', name:'BACON 2.0',      cat:'Benditas',  popular: false, img:'/img/burg4.png', desc:'Carne smasheada, cheddar x2, panceta ahumada, cebolla caramelizada, alioli.', rm:['Sin Panceta','Sin Cebolla Caramelizada'] },
  { id:'be4', name:'AMERI',          cat:'Benditas',  popular: false, img:'/img/burg1.png', desc:'Carne smasheada, cheddar x2, cebolla morada en cubos, mayonesa de ajo Hellmans.', rm:['Sin Cebolla Morada','Sin Cheddar'] },
  { id:'ba1', name:'MDB',            cat:'Bajoneras', popular: true,  img:'/img/burg2.png', desc:'Carne smasheada, cheddar x2, mozzarella, lechuga en la tapa, chiminesa.', rm:['Sin Mozzarella','Sin Lechuga'] },
  { id:'ba2', name:'ARGENTA',        cat:'Bajoneras', popular: false, img:'/img/burg3.png', desc:'Carne smasheada, queso emmental x2, morrones salteados, salsa criolla, mayonesa casera.', rm:['Sin Morrones','Sin Emmental'] },
  { id:'ba3', name:'BENDITA CRISPY', cat:'Bajoneras', popular: true,  img:'/img/burg4.png', desc:'Carne smasheada, cheddar x2, cebolla Crispy, panceta ahumada, barbacoa o aderezo Bendito.', rm:['Sin Cebolla Crispy','Sin Panceta'] },
  { id:'ba4', name:'BENDITA PICKLE', cat:'Bajoneras', popular: false, img:'/img/burg1.png', desc:'Carne smasheada, queso danbo x2, cebolla morada, mayonesa casera y pepinillos caseros.', rm:['Sin Pepinillos','Sin Cebolla Morada'] },
]

export const EXTRAS = [
  { name:'Huevo Frito', price:'$500' },
  { name:'Pepinillos caseros', price:'$500' },
  { name:'Reemplazar Cheddar por Danbo', price:'Gratis' },
  { name:'Dip de Aderezo', price:'$500' },
]

export const SALSAS = [
  { name:'Salsa Bendito Bajon', img:'/img/salsa1.png' },
  { name:'California Sauce',    img:'/img/salsa2.png' },
  { name:'Marinara',            img:'/img/salsa3.png' },
  { name:'BBQ',                 img:'/img/salsa4.png' },
  { name:'Ali Oli',             img:'/img/salsa1.png' },
  { name:'Relish Sauce',        img:'/img/salsa2.png' },
]

export const CATEGORIES = ["Todos", "Burger's", "Benditas", "Bajoneras"]

export const WA_NUMBER = '5493491440753'
export const WA_LINK   = 'https://wa.me/5493491440753'
export const IG_LINK   = 'https://www.instagram.com/bendito.bajon_'
export const MAPS_LINK = 'https://maps.google.com/?q=Lavalle+y+3+de+Febrero,+Ceres,+Santa+Fe'

export function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

export const WA_MSG_INFO     = '¡Hola! Me gustaría obtener más información para realizar un pedido. 🍔'
export const WA_MSG_CONTACTO = '¡Hola! Me gustaría hacer una consulta sobre Bendito Bajón.'
export const WA_MSG_DELIVERY = '¡Hola! Quería consultar sobre la zona de delivery y disponibilidad. 🛵'

// ── Config del local — el cliente edita estos valores ──
// popular: true/false en cada producto para mostrar en "Lo más pedido"
// WAIT_TIME_MIN / MAX: minutos estimados de espera
// LOCAL_ABIERTO_OVERRIDE: null = automático | true = forzar abierto | false = forzar cerrado
export const WAIT_TIME_MIN          = 20
export const WAIT_TIME_MAX          = 35
export const LOCAL_ABIERTO_OVERRIDE = null
