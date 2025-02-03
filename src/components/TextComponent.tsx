import React, { useEffect, useState } from "react";
import DocumentFormat from "./DocumentFormat";
import { useGlobalState } from "../useGlobalState";
import "../css/TextComponent.css";
import { ConvertToFileTypes } from "../utils/ConvertToFileTypes";

const TextComponent: React.FC = () => {
  const [state] = useGlobalState(); // Get the global state
  const [limitedContent, setLimitedContent] = useState(""); 
  const [format, setFormat] = useState("sql");

  // Re-render the component when the state changes
  useEffect(() => {
    // Limits shown content to 1000 rows of information, to reduce loading charge on the browser
    const fileContent = ConvertToFileTypes({ tableName: state.tableName, allData: state.allData.slice(0, 1000), format: format });
    setLimitedContent(fileContent);
  }, [state.allData, format, state.tableName]);


  return (
    <section className="text-component">
      {/* DocumentFormat component to select the format displayed/downloaded of the document */}
      <DocumentFormat handleChange={setFormat} />
      <textarea className="text-area" value={limitedContent} readOnly />
    </section>
  );
};

export default TextComponent;
