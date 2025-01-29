import React, { useState, useMemo, useEffect } from "react";
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
    event.preventDefault(); // Evita selección de texto
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Agrega eventos al `window` para que funcionen en cualquier parte
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Limpia los eventos cuando se suelta el mouse
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      className="draggable-container"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleMouseDown}
    >
      <div className="floating-container">
        <div className="flap"></div>

        <div className="format-buttons">

          <div className="indicator" style={{
            transform: `translateX(${buttonValues.indexOf(selected) * 100}%)`,
            borderTopLeftRadius: `${buttonValues.indexOf(selected) === 0 ? 30 : 0}px`,
            borderTopRightRadius: `${buttonValues.indexOf(selected) === 3 ? 30 : 0}px`
          }} />
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
