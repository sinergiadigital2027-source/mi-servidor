const http = require("http");

const puerto = process.env.PORT || 3000;

const servidor = http.createServer((peticion, respuesta) => {
  respuesta.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  respuesta.end("¡Hola, mi servidor funciona!");
});

servidor.listen(puerto, "0.0.0.0", () => {
  console.log("Servidor encendido en el puerto " + puerto);
});
