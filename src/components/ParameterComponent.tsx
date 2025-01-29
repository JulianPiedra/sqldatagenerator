// ParameterComponent.tsx
import React from "react";
import { useGlobalState } from "../useGlobalState";
import { GetIds } from "../services/IdService";
import { GetEmails } from "../services/EmailService";
import { GetCities } from "../services/CityService";
import { QueryConverter } from "../utils/QueryConverter";
import "../css/ParameterComponent.css";
import 'remixicon/fonts/remixicon.css';

const ParameterComponent: React.FC = () => {
  const [_state, updateState] = useGlobalState(); 

  const handleRecordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const records = Number(event.target.value);
    if (records > 0) fetchData(records); 
  };

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim(); 

    updateState({ tableName: inputValue }); 
  };


  const fetchData = async (records: number) => {
    const query = QueryConverter({ records, length: 4, has_letters: true });
    const [ids, emails, cities] = await Promise.all([
      GetIds(query),
      GetEmails(query),
      GetCities(query),
    ]);

    const mergedData = ids.map((_item: number, index: number) => ({
      id: ids[index]?.id || "No id found",
      email: emails[index]?.email || "No email found",
      city: cities[index]?.city || "No city found",
    }));

    updateState({ allData: mergedData }); // Actualiza los datos en el estado global
  };

  return (
    <section className="parameter-component">
      <div className="parameters">
        <label htmlFor="records">Records to generate:
          <input
            type="number"
            placeholder="Records"
            name="records"
            onChange={handleRecordsChange}
          />

        </label>
        <label htmlFor="tableName">Table name:

          <input
            type="text"
            placeholder="Table Name"
            name="tableName"
            onChange={handleTableNameChange}
          />
        </label>
      </div>

      <div className="parameter-table-container">

        <table className="parameter-table">
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Data Type</th>
              <th>Extra parameters</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input/>
              </td>
              <td>
                <select>
                </select>
              </td>
              <td>
                <select>
                </select>
                <input />
                <input />
              </td>
              <td>
                <button className="delete-row-button"><i className="ri-delete-bin-2-fill align-middle"></i></button>
              </td>
            </tr>
            <tr>
              <td>
                <input/>
              </td>
              <td>
                <select>
                </select>
              </td>
              <td>
                <select>
                </select>
                <input />
                <input />
              </td>
              <td>
                <button className="delete-row-button"><i className="ri-delete-bin-2-fill align-middle"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="add-row-button">Add row</button>



      </div>
    </section>
  );
};

export default ParameterComponent;
