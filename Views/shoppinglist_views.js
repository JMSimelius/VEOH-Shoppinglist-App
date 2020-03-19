const shoppinglists_view = ((data) => {
    let html = `
    <html>
    <body>
    <head>
    <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
    <link rel="stylesheet" href="styles.css"/>
    </head>
    <div class="login">
    <h1>Ostoslista äppi</h1>
    <br>
    Logged in as user: ${data.user_name}
    <form action="/logout" method="POST">
        <button type="submit">Log out</button>
    </form>
    <h4><a href="/">Go back</a></h4>
    </div>
    <h2>Listat: </h2>
    `;

    data.shoppinglists.forEach((shoppinglist) =>{
        html += `
        <div class="lists">
        <a href="/shoppinglists/${shoppinglist._id}">${shoppinglist.name}</a>
        <form action="/delete-shoppinglist" method="POST">
        <input type="hidden" name="shoppinglist_id", value="${shoppinglist._id}">
        <button type="submit">Delete shoppinglist</button>
        </form></div>`;
    });
        html += `
        <div class="addlist">
        <form action="/add-shoppinglist" method="POST">
        <input type="text" name="name">
        <button type="submit">Tee uusi ostoslista </button>
        </form>
        </div>
        </html>
        </body>`;
        return html;
    
});

const shoppinglist_view = ((data) => {
    
    let html = `
    <html>
    <head>
    <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
    <link rel="stylesheet" href="/styles.css"/>
    </head>
    <body>
    <h1>Ostoslista appi</h1>
    <h2>${data.shoppinglist.name}</h2>
    <h4><a href="/">Go back</a></h4>
    
    
    <br>
    `
    console.log(data);
     data.shoppinglist.products.forEach((product) => {
        html += product.title
         html += `
         <div class="listsview">
         <p>
         
         <h3> Name: ${product.title}<br></h3>
         <img src="${product.imagePath}" width="50px" height="50px" />
         quantity: ${product.quantity} </p>
         </div>
         </body>
         </html>
         `;
        });
        html += `
        <form action="/add-product" method="POST">

        <p>Ostosten lisäys ostoskoriin </p><br>
        <input type="hidden" name="shoppinglist_id" value="${data.shoppinglist._id}">
        Mitä lisätään listalle?<br>
            <input type="text" name="title"><br>
        Anna linkki kuvaan <br>
            <input type="img" name="imagePath"><br>
        Montako kappaletta tarvitaan?<br>
            <input type="number" name="quantity"><br><br>
            <button type="submit">Lisää ostos listalle</button>
        </form></div></div></div>
        </html>
        </body>`;
         return html;
     
    });


module.exports.shoppinglists_view = shoppinglists_view;
module.exports.shoppinglist_view = shoppinglist_view;


