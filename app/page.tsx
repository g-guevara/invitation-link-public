'use client';

import {
  Card,
  CardHeader,
  Calendar,
  Input,
  Button,
  Form,
} from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend, DateValue } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import React from "react";
import "@/styles/globals.css";

export default function Home() {
  let now = today(getLocalTimeZone());

  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 14 }), now.add({ days: 16 })],
    [now.add({ days: 23 }), now.add({ days: 24 })],
  ];

  let { locale } = useLocale();

  let isDateUnavailable = (date: DateValue) =>
    isWeekend(date, locale) ||
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 &&
        date.compare(interval[1]) <= 0
    );

  const availableHours = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);

  const [action, setAction] = React.useState<string | null>(null);

  return (
    <section className="flex flex-col items-center justify-center px-4 py-10 gap-1 lg:gap-10 mb-10">
      {/* Encabezado */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Crea &nbsp;        <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 ">paginas increíbles,</span>
          <br />
          solo tienes que pedirlo.
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Invitación para crear páginas web con Guillermo Guevara.
        </p>
      </div>

      {/* Tarjeta de Atención */}
      <div className="max-w-xl w-full px-6">
      <Card className="p-5" style={{ boxShadow: "1px 6px 20px rgba(83, 143, 240, 0.3)" }}>
          <CardHeader className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2563eb"
            >
              <path d="M11.209 3.816a1 1 0 0 0-1.966.368l.325 1.74a5.338 5.338 0 0 0-2.8 5.762l.276 1.473.055.296c.258 1.374-.228 2.262-.63 2.998-.285.52-.527.964-.437 1.449.11.586.22 1.173.75 1.074l12.7-2.377c.528-.1.418-.685.308-1.27-.103-.564-.636-1.123-1.195-1.711-.606-.636-1.243-1.306-1.404-2.051-.233-1.085-.275-1.387-.303-1.587-.009-.063-.016-.117-.028-.182a5.338 5.338 0 0 0-5.353-4.39l-.298-1.592Z" />
              <path
                fillRule="evenodd"
                d="M6.539 4.278a1 1 0 0 1 .07 1.412c-1.115 1.23-1.705 2.605-1.83 4.26a1 1 0 0 1-1.995-.15c.16-2.099.929-3.893 2.342-5.453a1 1 0 0 1 1.413-.069Z"
                clipRule="evenodd"
              />
              <path d="M8.95 19.7c.7.8 1.7 1.3 2.8 1.3 1.6 0 2.9-1.1 3.3-2.5l-6.1 1.2Z" />
            </svg>
            <div className="ml-2 font-semibold text-blue-600">Atención</div>
          </CardHeader>
          <p className="text-gray-700 pl-2 pb-3">
            Antes de pedir una hora, ten en cuenta que debes llevar una idea clara de lo que quieres.
            Lo ideal sería un boceto, para poder evaluar la viabilidad de tu proyecto.
          </p>

        </Card>
      </div>

      {/* Sección principal: Calendario, Horarios y Formulario */}
      <div className="grid gap-8 md:gap-12 lg:grid-cols-3 w-full max-w-5xl">
        {/* Calendario */}
        <div className="justify-self-center lg:justify-self-start">
          

        <div className="mb-2">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
>
<circle cx="12" cy="12" r="11" fill="none" stroke="black" strokeWidth="1" />
  <text
    x="12"
    y="16"
    fontSize="12"
    fontWeight="bold"
    textAnchor="middle"
    fill="black"
  >
    1
  </text>
</svg>
</div>



          <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
            Selecciona una fecha
          </h2>
          <Calendar
            aria-label="Date (Unavailable)"
            isDateUnavailable={isDateUnavailable}
          />
        </div>

        {/* Botones de horarios */}
        <div >

          <div className="mb-2">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
>
  <circle cx="12" cy="12" r="11" fill="none" stroke="black" strokeWidth="1" />
  <text
    x="12"
    y="16"
    fontSize="12"
    fontWeight="bold"
    textAnchor="middle"
    fill="black"
  >
    2
  </text>
</svg>
</div>

          <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
            Horarios disponibles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableHours.map((hour) => (
              <button
                key={hour}
                className="w-full py-2 rounded-md bg-[#f4f5f4] text-gray-800 shadow hover:bg-gray-200 transition"
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div>
        <div className="mb-2">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="24"
  height="24"
>
<circle cx="12" cy="12" r="11" fill="none" stroke="black" strokeWidth="1" />
  <text
    x="12"
    y="16"
    fontSize="12"
    fontWeight="bold"
    textAnchor="middle"
    fill="black"
  >
    3
  </text>
</svg>
</div>

          <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
            Completa tus datos
          </h2>
          <Form
            className="flex flex-col gap-4"
            validationBehavior="native"
            onReset={() => setAction("reset")}
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));
              setAction(`submit ${JSON.stringify(data)}`);
            }}
          >
            <Input
              isRequired
              errorMessage="Por favor ingresa tu nombre"
              label="Nombre"
              labelPlacement="outside"
              name="nombre"
              placeholder="Ingresa tu nombre"
              type="text"
            />

            <Input
              isRequired
              errorMessage="Por favor ingresa un email válido"
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="Ingresa tu email"
              type="email"
            />
            <div className="flex gap-2">
              <Button color="primary" type="submit">
                Enviar
              </Button>
              <Button type="reset" variant="flat">
                Reiniciar
              </Button>
            </div>
            {action && (
              <div className="text-sm text-gray-600">
                Acción: <code>{action}</code>
              </div>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
}
