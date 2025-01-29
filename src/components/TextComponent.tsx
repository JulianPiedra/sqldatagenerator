import React, { useEffect, useState } from "react";
import DocumentFormat from "./DocumentFormat";
import { useGlobalState } from "../useGlobalState";
import "../css/TextComponent.css";
import { ConvertToFileTypes } from "../utils/ConvertToFileTypes";

const TextComponent: React.FC = () => {
  const [state] = useGlobalState(); // Obtiene el estado global
  const {tableName, allData } = state;
  const [limitedContent, setLimitedContent] = useState("");
  const [format, setFormat] = useState("sql");
  useEffect(() => {
    UpdateContent()
  }, [allData, format, tableName]);
  const UpdateContent = () => {
    const fileContent = ConvertToFileTypes(tableName, allData, format);
    setLimitedContent(fileContent
      .split("\n") 
      .slice(0, 1000) 
      .join("\n")) ;  
  };
  return (
    <section className="text-component">
      <DocumentFormat handleChange={setFormat} />
      <textarea className="text-area" value={limitedContent} readOnly  />
    </section>
  );
};

export default TextComponent;
