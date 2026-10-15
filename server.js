const http = require("http");

const puerto = process.env.PORT || 3000;

const servidor = http.createServer((peticion, respuesta) => {
  if (peticion.method === "POST" && peticion.url === "/lead") {
    let texto = "";
    peticion.on("data", (trozo) => (texto += trozo));
    peticion.on("end", () => {
      try {
        const lead = JSON.parse(texto);
        console.log("NUEVO LEAD:", JSON.stringify(lead, null, 2));
      } catch (error) {
        console.log("Llegó algo raro:", texto);
      }
      respuesta.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      respuesta.end("ok");
    });
    return;
  }

  respuesta.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  respuesta.end("¡Hola, mi servidor funciona!");
});

servidor.listen(puerto, "0.0.0.0", () => {
  console.log("Servidor encendido en el puerto " + puerto);
});
