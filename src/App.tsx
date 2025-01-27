// App.tsx
import React, { useState } from 'react';
import TextComponent from './components/TextComponent';
import ParameterComponent from './components/ParameterComponent';
import './App.css';

function App() {
  const [allData, setAllData] = useState<any[]>([]);
  const [tableName, setTableName] = useState('table'); // Track table name here

  return (
    <div className="App">
      <ParameterComponent setAllData={setAllData} setTableName={setTableName} />
      <TextComponent allData={allData} tableName={tableName} /> {/* Pass tableName to TextComponent */}
    </div>
  );
}

export default App;
