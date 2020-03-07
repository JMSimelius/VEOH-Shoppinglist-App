
const login_view = () => {
    let html = `
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
    <link rel="stylesheet" href="styles.css"/>
    <title>Shopping Cart App</title>
</head>
    <body>
    <div class="container">
        <h1>Shopping Cart app</h1>
        <p>App where you can log in and create your own shopping list.</p>
    
        <h5>Oletko jo käyttäjä? Kirjaudu sisään!</h5>
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <h5>Jos et ole vielä käyttäjä, rekisteröidy!</h5>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>
    </div>
    </body>
    <html>
    `;
    return html;  // näin palauttaa ylläolevan html-pätkän
}

module.exports.login_view = login_view;