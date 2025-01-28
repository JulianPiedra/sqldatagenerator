// ParameterComponent.tsx
import React from "react";
import { useGlobalState } from "../useGlobalState";
import { GetIds } from "../services/IdService";
import { GetEmails } from "../services/EmailService";
import { GetCities } from "../services/CityService";
import { QueryConverter } from "../utils/QueryConverter";
import "../css/ParameterComponent.css";

const ParameterComponent: React.FC = () => {
  const [, updateState] = useGlobalState(); // Obtiene el estado global y su actualizador

  const handleRecordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const records = Number(event.target.value);
    if (records > 0) fetchData(records); // Valida y llama a la función de fetch
  };

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim(); // Elimina espacios en blanco innecesarios

    updateState({ tableName: inputValue }); // Actualiza el estado global
  };


  const fetchData = async (records: number) => {
    const query = QueryConverter({ records, length: 4, has_letters: true });
    const [ids, emails, cities] = await Promise.all([
      GetIds(query),
      GetEmails(query),
      GetCities(query),
    ]);

    const mergedData = ids.map(( index: number) => ({
      id: ids[index]?.id || "No id found",
      email: emails[index]?.email || "No email found",
      city: cities[index]?.city || "No city found",
    }));

    updateState({ allData: mergedData }); // Actualiza los datos en el estado global
  };

  return (
    <section className="parameter-component">
      <div className="">
        <label htmlFor="records">Records to generate:
          <input
            type="number"
            placeholder="Records"
            name="records"
            onChange={handleRecordsChange}
          />
        </label>
        <label htmlFor="tableName">Table Name:
          <input
            type="text"
            placeholder="Table Name"
            name="tableName"
            onChange={handleTableNameChange}
          />
        </label>
      </div>
    </section>
  );
};

export default ParameterComponent;
