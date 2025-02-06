import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "../useGlobalState";
import { data } from "../constants/constants";
import logo from '../assets/sqldatagenerator.svg';
import { QueryConverter } from "../utils/QueryConverter";
import "../css/ParameterComponent.css";
import 'remixicon/fonts/remixicon.css';
import ModalComponent from "./ModalComponent";
import { debounce, forEach } from 'lodash';
import ShowError from "../utils/ShowError";
import { Link } from "react-router-dom";


const ParameterComponent: React.FC = () => {
  const [state, updateState] = useGlobalState(); //Global state
  // Displayed rows management states
  const [rows, setRows] = useState<number[]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedValues, setSelectedValues] = useState<Map<number, [number, string]>>(new Map());
  const [columnValues, setColumnValues] =
    useState<{
      [key: number]:
      {
        record_name?: string,
        length?: string,
        min_value?: string,
        max_value?: string,
        min_date?: string,
        max_date?: string
        include_time?: string,
        include_code?: string,
        has_letters?: string,
        query?: string,
      }
    }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFetchingRef = useRef(false);
  const [deletingRow, setDeletingRow] = useState<number | null>(null);

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ tableName: event.target.value.trim() });
  };

  const checkInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.key.match(/^[0-9]$/)
      && event.key !== "Backspace") event.preventDefault();
  };

  const handleRecordsChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      updateState({ records: Number.parseInt(event.target.value) });
    }, 500), []   //Delays the operation to wait for the user to stop typing
  );


  const handleInputChange = useCallback(
    debounce((rowId: number, event: React.ChangeEvent<HTMLInputElement>) => {
      let { name, value } = event.target;
      if (name === 'length') {
        const numericValue = Number(value);
        //Api does not support length greater than 40
        if (!isNaN(numericValue) && numericValue > 40) {
          ShowError('The length cannot be greater than 40');
          return;
        }
      }

      // Converts the name of the input to a key of the columnValues object
      const column = name as keyof typeof columnValues[number];
      if (!column) return;
      if (event.target.type === 'checkbox') {
        const { checked } = event.target as HTMLInputElement;
        if (name === 'has_letters' || name === 'include_time' || name === 'include_code') {
          // Converts value from on/off to true and false
          value = checked.toString();
        }
      }

      //updates the column values with the name of the input as the key
      setColumnValues((prevValues) => {
        const currentRow = prevValues[rowId];
        // Removes query to later update it
        delete currentRow.query;
        const updatedValues = { ...prevValues };

        // Only updates the value if it is not 0 or empty, 
        if (value === '0' || value.length === 0) {
          const { [column]: _, ...remainingRow } = updatedValues[rowId];
          updatedValues[rowId] = remainingRow;
        } else {
          updatedValues[rowId] = {
            ...updatedValues[rowId],
            [column]: value
          };
        }
        updatedValues[rowId].query = QueryConverter(updatedValues[rowId]);
        return updatedValues;
      });
    }, 500), [] //Delays the operation to wait for the user to stop typing
  );


  const handleFetchData = useCallback(async () => {
    forEach(rows, (value, _key) => {
      if (selectedValues.has(value)) {
        return;
      }
    });
    // Prevents fetching data if the number of records is invalid
    if (state.records < 0 && Number.isNaN(state.records)) {
      return;
    }
    // Prevents multiple requests
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      // Fetches data for each row, based on selected data type (selectedValues), 
      // extra parameters (columnValues) and the number of records (state.records)
      const promises = Object.keys(columnValues).map(async (key) => {
        const selectedKey = selectedValues.get(Number(key))?.[0];
        if (!selectedKey || selectedKey === 0) return [];

        // Query for the selected data type, with standarized records to ensure
        const query = `?records=${state.records}&${columnValues[Number(key)]?.query}`;
        return data[selectedKey as keyof typeof data](query as string);
      });
      const results = await Promise.all(promises);
      if (results.includes(undefined)) {
        results.splice(results.indexOf(undefined), 1);
      };
      // Removes all empty results
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].length === 0) {
          results.splice(i, 1);
        }
      }

      // If there are no results, return
      if (Object.keys(results).length === 0) return;

      // Merges the results into a single array 
      const mergedResults = results[0].map((_: any, index: number) => {
        return results.reduce((acc, arr) => {
          Object.entries(arr[index]).forEach(([key, value]) => {
            let newKey = key;
            let counter = 1;

            // Ensure unique keys by appending a number if necessary
            while (acc.hasOwnProperty(newKey)) {
              newKey = `${key}_${counter}`;
              counter++;
            }

            acc[newKey] = value;
          });

          return acc;
        }, {});
      });

      // Updates the global state with the merged results to update in other components
      updateState({ allData: mergedResults });
    } finally {
      isFetchingRef.current = false;
    }
  }, [state.records, selectedValues, columnValues]); //render when values selected in rows or records change

  // Fetches data when the number of records changes
  useEffect(() => {
    if (state.records > 0 && !Number.isNaN(state.records)) {
      handleFetchData();
    }
  }, [state.records, handleFetchData]);


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
    setIsModalOpen(true); // Show data selection modal
  };

  const addRow = () => {
    const newRowId = Date.now(); // Unique id for the row
    setRows((prevRows) => [...prevRows, newRowId]); // Adds the new row to the rows array
    setColumnValues((prevValues) => ({ ...prevValues, [newRowId]: {} })); // Adds the new row to the columnValues object
  };

  const deleteRow = (rowId: number) => {
    setDeletingRow(rowId);
    setTimeout(() => {
      setRows((prevRows) => prevRows.filter((id) => id !== rowId));
      setSelectedValues((prevValues) => {
        const updatedValues = new Map(prevValues);
        updatedValues.delete(rowId);
        return updatedValues;
      });
      setColumnValues((prevValues) => {
        const newColumnValues = { ...prevValues };
        delete newColumnValues[rowId];
        return newColumnValues;
      });
      setDeletingRow(null);
    }, 300);
  };

  return (
    <section className="parameter-component">
      <div className="parameters">
        <Link to="/" className='link'>
          <img src={logo} alt="logo" className='logo' />
        </Link>
        {/* Input for the number of records */}
        <label htmlFor="records">Records to generate:
          <input
            type="text"
            placeholder="Records"
            name="records"
            onChange={(e) => handleRecordsChange(e)}
            onKeyDown={(e) => checkInput(e)}
          />
        </label>
        {/* Input for the table name */}
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
              <th>Customization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((rowId) => (
              <tr key={rowId} className={deletingRow === rowId ? "deleting-row" : ""}>
                <td>
                  {/* Input for the row column name */}
                  <input
                    type="text"
                    name="record_name"
                    placeholder="Column name..."
                    onChange={(e) => handleInputChange(rowId, e)}
                  /></td>
                <td>

                  {/* Button to show modal for row data type selection */}
                  <input
                    type="button"
                    name="select-value-button"
                    onClick={() => handleRowButtonClick(rowId)}
                    value={selectedValues.get(rowId)?.[1] || 'Select Value'}
                    data-value={selectedValues.get(rowId)?.[0] || 0}
                  />
                  {/* Modal to select the row data type */}
                  <ModalComponent
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelect={handleSelectValue}
                  />
                </td>
                <td>
                  {/* Check if theres a valid row id and a valid data type */}
                  {selectedValues.has(rowId) && selectedValues.get(rowId)?.[0] !== 0 && (
                    (() => {
                      {/* Displays the extra parameters based on the selected data type */ }
                      switch (selectedValues.get(rowId)?.[0]) {
                        case 1:
                          return (
                            <>
                              {/* Input for the length of the string */}
                              <input
                                className="multiple-parameter"
                                type="text"
                                name="length"
                                placeholder="Length of the ID"
                                onChange={(e) => handleInputChange(rowId, e)}
                                onKeyDown={(e) => checkInput(e)}
                              />
                              {/* Checkbox to include letters */}
                              <label htmlFor="has_letters" >
                                Include letters:
                                <input
                                  type="checkbox"
                                  name="has_letters"
                                  onChange={(e) => handleInputChange(rowId, e)}
                                />
                              </label>
                            </>
                          );
                        case 9:
                          return (
                            <>
                              {/* Input for the minimum and maximum value of the date */}
                              <input
                                className="multiple-parameter"
                                type="date"
                                name="min_date"
                                placeholder="Minimum value of the date (optional)"
                                onChange={(e) => handleInputChange(rowId, e)}
                              />
                              {/* Input for the maximum value of the date */}
                              <input
                                className="multiple-parameter"
                                type="date"
                                name="max_date"
                                placeholder="Maximum value of the date (optional)"
                                onChange={(e) => handleInputChange(rowId, e)}
                              />
                              {/* Checkbox to include time */}
                              <label htmlFor="includeTime" className="input-animate">Include time:
                                <input
                                  type="checkbox"
                                  name="include_time"
                                  onChange={(e) => handleInputChange(rowId, e)}
                                />
                              </label>
                            </>
                          );
                        case 11:
                          return (
                            <>
                              {/* Input for the length of the telephone */}
                              <input
                                type="text"
                                name="length"
                                className="multiple-parameter"
                                placeholder="Length of the telephone (optional)"
                                onChange={(e) => handleInputChange(rowId, e)}
                                onKeyDown={(e) => checkInput(e)}
                              />
                              {/* Checkbox to include code */}
                              <label htmlFor="includeCode">Include code:
                                <input
                                  type="checkbox"
                                  name="include_code"
                                  onChange={(e) => handleInputChange(rowId, e)}
                                />
                              </label>
                            </>
                          );
                        case 12:
                          return (
                            <>
                              {/* Input for the minimum and maximum value of the number */}
                              <input
                                type="text"
                                name="min_value"
                                className="multiple-parameter"
                                placeholder="Minimum value of the number"
                                onChange={(e) => handleInputChange(rowId, e)}
                                onKeyDown={(e) => checkInput(e)}
                              />
                              {/* Input for the maximum value of the number */}
                              <input
                                type="text"
                                name="max_value"
                                className="multiple-parameter"
                                placeholder="Maximum value of the number"
                                onChange={(e) => handleInputChange(rowId, e)}
                                onKeyDown={(e) => checkInput(e)}
                              />

                            </>
                          );
                        default:
                          return null;
                      }
                    })()
                  )}

                </td>
                <td>
                  {/* Button to delete the row */}
                  <button className="delete-row-button" onClick={() => deleteRow(rowId)}>
                    <i className="ri-delete-bin-2-fill align-middle"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Button to add a new row */}
        <button className="add-row-button" onClick={addRow}>Add row</button>
      </div>
    </section>
  );
};

export default ParameterComponent;