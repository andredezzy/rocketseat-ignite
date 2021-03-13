const express = require('express');

const app = express();

app.use(express.json());

app.get('/courses', (request, response) => {
  return response.json(['Course 1', 'Course 2', 'Course 3']);
});

app.post('/courses', (request, response) => {
  return response.json(['Course 1', 'Course 2', 'Course 3', 'Course 4']);
});

app.put('/courses/:id', (request, response) => {
  return response.json(['Course 1', 'Course 2', 'Course 3', 'Course 5']);
});

app.delete('/courses/:id', (request, response) => {
  return response.json(['Course 1', 'Course 2', 'Course 3']);
});

app.listen(3333, () => {
  console.log('🚀 Server started on http://localhost:3333')
});
