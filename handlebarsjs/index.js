const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

// CONFIGURACION DEL MOTOR HANDLEBARS

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

//FIN DE CONFIGURACION DEL MOTOR HANDLEBARS





//ENVIO DE PRODUCTOS AL ARCHIVO *PRODUCTSLIST* Y USARLOS COMO SI FUESE FRONTEND

// app.get('/products', (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  //ARMAR LA PAGINA EN EL BACKEND
  // res.render('productslist', { products: productsArg, productsExist: true });
// });



// app.get('/products/:id', (req, res) => {
//   const {id} = req.params
//   console.log(id)

//   try {
//     const found = productsArg.find(el => el.id == id)
//     if(found){
//       res.render('products', {product: found, title: "detalles del producto"})
//     }else{
//       res.render('productoNoEncontrado', {msg:'Error Producto no encontrado'})
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })

// app.get('/products', (req, res) => {
//   res.render('products', { title: 'listado de productos', products: productsArg });
// });

// app.get('/form', (req, res) => {
//   res.render('form', {title: "Agrega un producto nuevo"})
// })

// app.post('/products', (req, res) => {
//   const {body} = req
//   let lastProd = productsArg[productsArg.length - 1]
//   if(body) {
//     body.id = lastProd.id + 1
//   }
//   productsArg.push(body)
//   console.log(body)
//   res.json(body)
// })

const productsArg = [
  { id: 1, title: 'Camiseta Argentina Qatar 2022', price: 18000, thumbnail: 'http://localhost:8080/public/camiseta-adidas-argentina-2022-3.jpg'  },
  { id: 2, title: 'Pelota Qatar 2022', price: 45000 , thumbnail: 'http://localhost:8080/public/pelota-qatar-2022-adidas-al-rihla-league-box-replica-numero-5-blanca-100040h57782001-1.jpg'  },
  { id: 3, title: 'Botines adidas Lionel Messi x Speedflow', price: 19000 , thumbnail: 'http://localhost:8080/public/messi-botines-2022-adidas-x-speedflow-mi-historia-nm.jpg'  }
]

app.get('/productos', (req,res) => {
  res.render('productos', {productos: productsArg})
})

app.get('/form', (req,res) => {
  res.render('form', {title: "Agrega un nuevo producto"})
})

app.post('/productos', (req,res) => {
  const {body} = req
  console.log(body)
  res.redirect(302, '/productos')
})