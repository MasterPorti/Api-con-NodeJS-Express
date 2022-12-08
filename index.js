const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "Me tengo que suscribir a @midudev en YouTube",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Tengo que estudiar las clases del FullStack Bootcamp",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "Repasar los retos de JS de midudev",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//const id = notes[notes.length].id + 1;

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

app.get("/", (request, response) => {
  response.send("<h1>Hola get</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    return response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;
  const Newid = notes.length + 1;
  const newNote = {
    id: Newid,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    datea: new Date().toISOString,
  };
  notes = notes.concat(newNote);
  console.log(newNote);
  response.json(newNote);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
