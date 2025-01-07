'use client';

import React, { useState, useEffect } from "react";
import { Calendar, Input, Button, Form } from "@nextui-org/react";
import { today, getLocalTimeZone, DateValue, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

export default function Agendar() {
  const now = today(getLocalTimeZone());
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [reservedData, setReservedData] = useState<any[]>([]); // Datos de horarios reservados
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);

  const { locale } = useLocale();

  // Función para obtener los datos de la base de datos
  const fetchReservedData = async () => {
    try {
      const res = await fetch('/api/schedules', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setReservedData(data);
      } else {
        throw new Error('Error al obtener datos reservados');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Actualizar horarios disponibles según la fecha seleccionada
  useEffect(() => {
    fetchReservedData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const allHours = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);
      const reservedHours = reservedData
        .filter((item) => item.date === selectedDate) // Filtrar horas reservadas para la fecha seleccionada
        .map((item) => item.time);
      const available = allHours.filter((hour) => !reservedHours.includes(hour));
      setAvailableHours(available);
    }
  }, [selectedDate, reservedData]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const payload = {
      ...data,
      date: selectedDate,
      time: selectedHour,
    };

    try {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setAction(`Agendado: ${JSON.stringify(result)}`);
        fetchReservedData(); // Actualizar datos después de enviar
        setSelectedHour(null); // Limpiar hora seleccionada
      } else {
        throw new Error('Error al enviar datos');
      }
    } catch (error) {
      console.error(error);
      setAction('Error al enviar datos');
    }
  };

  return (
    <div className="grid gap-8 md:gap-12 lg:grid-cols-3 w-full max-w-5xl px-4 md:px-8 mx-auto">
      {/* Calendario */}
      <div className="justify-self-center lg:justify-self-start mt-10 sm:mt-0 md:mt-0">
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Selecciona una fecha</h2>
        <Calendar
          aria-label="Date (Unavailable)"
          onChange={(selectedDate) => {
            if (selectedDate) {
              const formattedDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
              setSelectedDate(formattedDate);
            }
          }}
        />
      </div>

      {/* Botones de horarios */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Horarios disponibles</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4">
          {availableHours.map((hour) => (
            <button
              key={hour}
              className={`w-full py-2 rounded-md ${
                selectedHour === hour ? 'bg-blue-500 text-white' : 'bg-[#f4f5f4] text-gray-800'
              } shadow hover:bg-gray-200 transition text-sm sm:text-base`}
              onClick={() => setSelectedHour(hour)}
              disabled={reservedData.some((item) => item.date === selectedDate && item.time === hour)}
            >
              {hour}
            </button>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">Completa tus datos</h2>
        <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            errorMessage="Por favor ingresa tu nombre"
            label="Nombre"
            labelPlacement="outside"
            name="name"
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
          <div className="flex flex-col sm:flex-row gap-2">
            <Button color="primary" type="submit" className="w-full sm:w-auto" disabled={!selectedHour}>
              Enviar
            </Button>
            <Button type="reset" variant="flat" className="w-full sm:w-auto" onClick={() => setSelectedHour(null)}>
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
  );
}
