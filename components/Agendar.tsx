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
    <section>
     

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
