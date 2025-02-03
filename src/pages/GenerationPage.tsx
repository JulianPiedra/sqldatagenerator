import  TextComponent  from '../components/TextComponent';
import ParameterComponent  from '../components/ParameterComponent';
import '../css/GenerationPage.css';

function GenerationPage() {
  return (
    <div className="GenerationPage">
      <ParameterComponent  />
      <TextComponent  /> 
    </div>
  );
}

export default GenerationPage;
