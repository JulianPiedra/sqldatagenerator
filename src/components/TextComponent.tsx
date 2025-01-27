// TextComponent.tsx
import React, { useEffect, useState, useMemo } from 'react';
import DocumentFormat from './DocumentFormat';
import * as js2xmlparser from 'js2xmlparser';
import '../css/TextComponent.css';
import { TextComponentProps } from '../models/TextComponentProps';

const TextComponent: React.FC<TextComponentProps> = ({ allData = [], tableName }) => {
  const [format, setFormat] = useState('sql');
  const [displayedData, setDisplayedData] = useState(allData.slice(0, 1000));

  useEffect(() => {
    setDisplayedData(allData.slice(0, 1000)); // When allData changes, update displayedData
  }, [allData]);

  const sql = useMemo(() =>
    displayedData
      .map((item) => `INSERT INTO ${tableName} (id, email, city) VALUES (${item.id}, '${item.email}', '${item.city}')`)
      .join('\n'),
    [displayedData, tableName] // Recompute SQL when either displayedData or tableName changes
  );

  const json = useMemo(() => JSON.stringify(displayedData, null, 2), [displayedData]);

  const xml = useMemo(() => js2xmlparser.parse(`${tableName}`, displayedData), [displayedData]);

  const csv = useMemo(() =>
    displayedData.map((item) => `${item.id},${item.email},${item.city}`).join('\n'),
    [displayedData]
  );

  const formatDelegates = useMemo(() => ({
    sql: () => sql,
    json: () => json,
    xml: () => xml,
    csv: () => csv,
  }), [sql, json, xml, csv]);

  const content = formatDelegates[format]();

  const handleChange = (format: string) => {
    setFormat(format);
  };

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
};

export default TextComponent;
