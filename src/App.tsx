// App.tsx
import TextComponent from './components/TextComponent';
import ParameterComponent from './components/ParameterComponent';
import './App.css';

function App() {
 

  return (
    <div className="App">
      <ParameterComponent  />
      <TextComponent  /> {/* Pass tableName to TextComponent */}
    </div>
  );
}

export default App;
