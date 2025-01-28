import React, { useState, useMemo } from "react";
import "../css/DocumentFormat.css";
import { ConvertToFileTypes } from "../utils/ConvertToFileTypes";
import { useGlobalState } from "../useGlobalState";

interface Props {
  handleChange: (format: string) => void;
}

const DocumentFormat: React.FC<Props> = ({ handleChange }) => {
  const [state] = useGlobalState(); // Obtiene el estado global
  const { tableName, allData } = state;
  const [selected, setSelected] = useState("sql");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const buttonValues = useMemo(() => ["sql", "json", "xml", "csv"], []);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const format = (event.target as HTMLButtonElement).value;
    setSelected(format);
    handleChange(format);
  };

  const handleDownload = () => {
    const content = ConvertToFileTypes(tableName, allData, selected);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `data.${selected}`;
    link.click();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = event.clientX - dragStart.x;
    const newY = event.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      className="draggable-container"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="floating-container">
      <div className="flap"></div>

        <div className="format-buttons">

          <div className="indicator" style={{ transform: `translateX(${buttonValues.indexOf(selected) * 100}%)` }} />
          {buttonValues.map((value) => (
            <button
              className="format-button"
              key={value}
              value={value}
              onClick={handleButtonClick}
            >
              {value.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="download-button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default DocumentFormat;
