import React, { useState } from "react";
import { useGlobalState } from "../useGlobalState";
import { GetIds } from "../services/IdService";
import { GetEmails } from "../services/EmailService";
import { GetCities } from "../services/CityService";
import { QueryConverter } from "../utils/QueryConverter";
import { extraControls } from "../constants.tsx";
import "../css/ParameterComponent.css";
import 'remixicon/fonts/remixicon.css';
import ModalComponent from "./ModalComponent";

const ParameterComponent: React.FC = () => {
  const [_state, updateState] = useGlobalState();
  const [rows, setRows] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<Map<number, [number, string]>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [columnValues, setColumnValues] = useState<{ [key: number]: string }>({});

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
    updateState({ tableName: event.target.value.trim() });
  };

  const handleColumnValueChange = (rowId: number, value: string) => {
    setColumnValues((prevValues) => ({ ...prevValues, [rowId]: value }));
  };

  const handleSelectValue = (value: number, valueMap: string) => {
    if (selectedRowIndex !== null) {
      setSelectedValues((prevValues) => {
        const newValues = new Map(prevValues);
        newValues.set(selectedRowIndex, [value, valueMap]);
        return newValues;
      });
    }
  };

  const handleRowButtonClick = (rowId: number) => {
    setSelectedRowIndex(rowId);
    setIsModalOpen(true);
  };

  const deleteRow = (rowId: number) => {
    setRows((prevRows) => {
      const newRows = prevRows.filter((id) => id !== rowId);

      const updatedValues = new Map<number, [number, string]>();
      newRows.forEach((id) => {
        if (selectedValues.has(id)) {
          updatedValues.set(id, selectedValues.get(id)!);
        }
      });

      setSelectedValues(updatedValues);
      setColumnValues((prevValues) => {
        const newColumnValues = { ...prevValues };
        delete newColumnValues[rowId];
        return newColumnValues;
      });

      return newRows;
    });
  };

  const addRow = () => {
    const newRowId = Date.now();
    setRows((prevRows) => [...prevRows, newRowId]);
    setColumnValues((prevValues) => ({ ...prevValues, [newRowId]: "" }));
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

      <ModalComponent
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
            {rows.map((rowId) => (
              <tr key={rowId}>
                <td><input
                  type="text"
                  name="columnName"
                  required
                  placeholder="Column name..."
                  value={columnValues[rowId] || ""}
                  onChange={(e) => handleColumnValueChange(rowId, e.target.value)}
                /></td>
                <td>
                  <input
                    type="button"
                    name="select-value-button"
                    onClick={() => handleRowButtonClick(rowId)}
                    value={selectedValues.get(rowId)?.[1] || 'Select Value'}
                    data-value={selectedValues.get(rowId)?.[0] || 0}
                  />
                </td>
                <td>
                  {selectedValues.has(rowId) && selectedValues.get(rowId)?.[0] !== 0 ? (
                    extraControls[Number(selectedValues.get(rowId)?.[0])] || null
                  ) : null}
                </td>
                <td>
                  <button className="delete-row-button" onClick={() => deleteRow(rowId)}>
                    <i className="ri-delete-bin-2-fill align-middle"></i>
                  </button>
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