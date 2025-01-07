import mongoose from 'mongoose';

// Conexión a la base de datos
const MONGODB_URI = "mongodb+srv://admin:AmjuBfihm8vtX8tq@test.gmqrn.mongodb.net/?retryWrites=true&w=majority&appName=test";

// Garantiza que la conexión a la base de datos solo se realice una vez
if (!global.mongoose) {
  global.mongoose = mongoose.connect(MONGODB_URI);
}

// Definir el esquema y modelo de agenda
const ScheduleSchema = new mongoose.Schema({
  date: String, // Fecha seleccionada
  time: String, // Hora seleccionada
  name: String, // Nombre del usuario
  email: String, // Email del usuario
});

const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

// Métodos API
export async function GET(req) {
  try {
    const schedules = await Schedule.find(); // Obtén todas las agendas
    return new Response(JSON.stringify(schedules), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener agendas' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // Lee el cuerpo de la solicitud
    const schedule = new Schedule(body); // Crea una nueva agenda
    await schedule.save(); // Guarda la agenda en la base de datos
    return new Response(JSON.stringify(schedule), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear la agenda' }), { status: 500 });
  }
}
