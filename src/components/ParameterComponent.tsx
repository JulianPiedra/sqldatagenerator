import React, { useState } from "react";
import { useGlobalState } from "../useGlobalState";
import { GetIds } from "../services/IdService";
import { GetEmails } from "../services/EmailService";
import { GetCities } from "../services/CityService";
import { QueryConverter } from "../utils/QueryConverter";
import "../css/ParameterComponent.css";
import 'remixicon/fonts/remixicon.css';
import ModalWithReturn from "./Modal";

const ParameterComponent: React.FC = () => {
  const [_state, updateState] = useGlobalState();
  const [rows, setRows] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<Map<number, [number, string]>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

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

    updateState({ allData: mergedData });
  };
  const handleRecordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const records = Number(event.target.value);
    if (records > 0) fetchData(records);
  };

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    updateState({ tableName: inputValue });
  };



  const handleSelectValue = (value: number, valueMap: string) => {
    if (selectedRowIndex !== null) {
      setSelectedValues((prevValues) => new Map(prevValues).set(selectedRowIndex, [value, valueMap]));
    }
  };

  const handleRowButtonClick = (rowIndex: number) => {
    setSelectedRowIndex(rowIndex);
    setIsModalOpen(true);
  };
  const deleteRow = () => {
    setRows((prevRows) => prevRows.slice(0, prevRows.length - 1)); // Eliminar la última fila del estado
  }
  const addRow = () => {
    setRows((prevRows) => [...prevRows, prevRows.length]); // Agregar una nueva fila al estado
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

      <ModalWithReturn
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectValue}
      />

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
            {rows.map((rowIndex) => (
              <tr key={rowIndex}>
                <td><input 
                type="text"
                required
                placeholder="Column name..."/></td>
                <td>
                  <input
                    type="button"
                    onClick={() => handleRowButtonClick(rowIndex)}
                    value={selectedValues.get(rowIndex)?.[1] || 'Select Value'}
                    data-value={selectedValues.get(rowIndex)?.[0] || 0}
                  />
                </td>
                <td>
                  
                </td>
                <td>
                  <button className="delete-row-button" onClick={deleteRow}><i className="ri-delete-bin-2-fill align-middle"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-row-button" onClick={addRow}>Add row</button>
      </div>
    </section>
  );
};

export default ParameterComponent;


