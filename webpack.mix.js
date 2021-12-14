const mix = require("laravel-mix");

// Compile modern JavaScript and copy index.html / assets
mix.js("src/index.js", "index.js").react().setPublicPath("dist");
mix.copy("src/index.html", "dist/index.html");
mix.copy("src/assets/images", "dist/images");

// Disable success notifications
mix.disableSuccessNotifications();
// "react": "^17.0.2",
//         "react-datepicker": "^4.5.0",
//         "react-dom": "^17.0.2",
//         "react-router-dom": "^6.0.2",
