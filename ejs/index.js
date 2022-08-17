const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

const productsArg = [
  { id: 1, title: 'Camiseta Argentina Qatar 2022', price: 18000, thumbnail: 'http://localhost:8080/public/camiseta-adidas-argentina-2022-3.jpg'  },
  { id: 2, title: 'Pelota Qatar 2022', price: 45000 , thumbnail: 'http://localhost:8080/public/pelota-qatar-2022-adidas-al-rihla-league-box-replica-numero-5-blanca-100040h57782001-1.jpg'  },
  { id: 3, title: 'Botines adidas Lionel Messi x Speedflow', price: 19000 , thumbnail: 'http://localhost:8080/public/messi-botines-2022-adidas-x-speedflow-mi-historia-nm.jpg'  }
]

app.get('/products', (req, res) => {
  res.render('pages/products', { title: 'Lista de productos', products: productsArg });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const found = productsArg.find(el => el.id == id)
  if(found) {
    res.render('pages/product', { msg: 'Producto', product: found  });
  }else{
    res.render('pages/error', {error: "Producto no encontrado"})
  }
});

app.get('/form', (req, res) => {
  res.render('pages/form', {title:'Agrega un producto nuevo'})
})

app.post('/products', (req, res) => {
  const {body} = req
  let lastProd = productsArg[productsArg.length - 1]
  if(body) {
    body.id = lastProd.id + 1
  }
  


  productsArg.push(body)
  res.redirect(301, '/products')
})
