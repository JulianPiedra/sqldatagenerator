import React, { useState, useEffect, useRef } from 'react';
import { GetIds } from '../services/IdService.ts';
import { GetEmails } from '../services/EmailService.ts';
import { GetCities } from '../services/CityService.ts';
import DocumentFormat from './DocumentFormat.tsx';
import { QueryConverter } from '../utils/QueryConverter.ts';
import * as js2xmlparser from 'js2xmlparser';
import '../css/TextComponent.css';

function TextComponent() {
  const [allData, setAllData] = useState([]);
  const [format, setFormat] = useState('sql'); // State for selected format
  const hasFetched = useRef(false);
  const displayedData = allData.slice(0, 1000);
  const sql = displayedData
  .map((item) => `INSERT INTO {table}({tablas}) VALUES (${item.id}, '${item.email}', '${item.city}')`)
  .join('\n');
  const json = JSON.stringify(displayedData, null, 2);
  const xml = js2xmlparser.parse("tabla", displayedData);
  const csv = displayedData.map((item) => `${item.id},${item.email},${item.city}`).join('\n');
  const [selected, setSelected] = React.useState("sql");

  // SQL, JSON, and XML representations

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      const records = 100000;
      const length = 6; 
      const has_letters = false;
      const values = { records, length, has_letters };
      const values2 = { records };

      const query = QueryConverter(values);
      const query2 = QueryConverter(values2);
      const query3 = QueryConverter(values2);

      // Execute both queries in parallel
      const [data, data2, data3] = await Promise.all([
        GetIds(query),
        GetEmails(query2),
        GetCities(query3),
      ]);
      // Efficiently merge data using a loop
      const merged = data.map((item, index) => ({
        ...item,
        email: data2[index]?.email || 'No email found',
        city: data3[index]?.city || 'No city found',
      }));
       
      setAllData(merged);
    };

    fetchData();
  }, []);

  // Update format when the user selects a different option
    const handleChange = (format:string) => {
        setFormat(format);
    };

  // Create a mapping of formats to the corresponding data
  const formatDelegates = {
    sql: () => sql,
    json: () => json,
    xml: () => xml,
    csv: () => csv,
  };

  // Get the content based on the selected format
  const content = formatDelegates[format]();

  return (
    
    <section className="text-component">
      <DocumentFormat handleChange={handleChange} allData={allData} />     
      <textarea
        className="text-area"
        value={content}
        readOnly
      />
            
    </section>

  );
}

export default TextComponent;
