// ParameterComponent.tsx
import React, { useState, useEffect } from 'react';
import { GetIds } from '../services/IdService.ts';
import { GetEmails } from '../services/EmailService.ts';
import { GetCities } from '../services/CityService.ts';
import { QueryConverter } from '../utils/QueryConverter.ts';
import { TextComponentProps } from '../models/TextComponentProps';
import '../css/ParameterComponent.css';

const ParameterComponent: React.FC<TextComponentProps> = ({ setAllData, setTableName }) => {
  const [records, setRecords] = useState(0); // Inicializado en 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= 0) return; // Validamos que el valor sea mayor o igual a 0
    setRecords((_prevRecords) => {
      const updatedValue = value; // Usamos el valor del evento actual
      fetchData(updatedValue); // Pasamos el nuevo valor a la función de fetch
      return updatedValue;
    });
  };

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setTableName) {
      setTableName(event.target.value); // Update table name when input changes
    }
  };

  const fetchData = async (updatedRecords: number = records) => { // Usamos el valor actualizado
    const length = 6;
    const has_letters = false;
    const values = { records: updatedRecords, length, has_letters };
    const values2 = { records: updatedRecords };

    const query = QueryConverter(values);
    const query2 = QueryConverter(values2);
    const query3 = QueryConverter(values2);

    const [data, data2, data3] = await Promise.all([
      GetIds(query),
      GetEmails(query2),
      GetCities(query3),
    ]);

    const merged = data.map((item: Number, index: string) => ({
      ...item,
      email: data2[index]?.email || 'No email found',
      city: data3[index]?.city || 'No city found',
    }));

    if (setAllData) {
      setAllData(merged);
    }
  };

  return (
    <section className="parameter-component">
      <input
        type="number"
        placeholder="Records"
        onChange={handleChange} // Corregimos el evento para usar el nuevo valor
      />
      <input
        type="text"
        placeholder="Table Name"
        onChange={handleTableNameChange} // Update table name on change
      />
    </section>
  );
};

export default ParameterComponent;
