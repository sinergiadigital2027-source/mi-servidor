const http = require("http");

const puerto = process.env.PORT || 3000;
const URL_HOJA = process.env.SHEETS_URL;

async function guardarEnHoja(lead) {
  if (!URL_HOJA) {
    console.log("Falta la variable SHEETS_URL en Railway");
    return;
  }
  try {
    const respuesta = await fetch(URL_HOJA, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(lead),
    });
    console.log("La hoja respondió:", respuesta.status);
  } catch (error) {
    console.log("Error guardando en la hoja:", error.message);
  }
}

const servidor = http.createServer((peticion, respuesta) => {
  if (peticion.method === "POST" && peticion.url === "/lead") {
    let texto = "";
    peticion.on("data", (trozo) => (texto += trozo));
    peticion.on("end", () => {
      respuesta.writeHead(200, { "Access-Control-Allow-Origin": "*" });
      respuesta.end("ok");
      try {
        const lead = JSON.parse(texto);
        console.log("NUEVO LEAD:", JSON.stringify(lead, null, 2));
        guardarEnHoja(lead);
      } catch (error) {
        console.log("Llegó algo raro:", texto);
      }
    });
    return;
  }

  respuesta.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  respuesta.end("¡Hola, mi servidor funciona!");
});

servidor.listen(puerto, "0.0.0.0", () => {
  console.log("Servidor encendido en el puerto " + puerto);
});
