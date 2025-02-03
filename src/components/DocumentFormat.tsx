import React, { useState, useMemo, useEffect } from "react";
import "../css/DocumentFormat.css";
import { ConvertToFileTypes } from "../utils/ConvertToFileTypes";
import { useGlobalState } from "../useGlobalState";

interface Props {
  handleChange: (format: string) => void;
}

const DocumentFormat: React.FC<Props> = ({ handleChange }) => {
  const [state] = useGlobalState(); // Global state to get the data

  // Format outputs
  const [selected, setSelected] = useState("sql");
  const buttonValues = useMemo(() => ["sql", "json", "xml", "csv"], []);

  // States to handle the dragging of the component
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });


  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const format = (event.target as HTMLButtonElement).value;
    setSelected(format);
    handleChange(format);
  };

  const handleDownload = () => {
    //Conver the entire data to the selected format
    const content = ConvertToFileTypes({ tableName: state.tableName, allData: state.allData, format: selected });
    // Create a blob with the content
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Download the file
    link.download = `data-output.${selected}`;
    link.click();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true); // Set the dragging state to true
    setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y }); // Set the initial position
    event.preventDefault(); // Prevents the text from being selected
  };

  useEffect(() => {
    if (!isDragging) return;

    // Updates the position of the component on mouse down and move
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      });
    };

    // Updates the dragging state to false when the mouse is up
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Adds event listeners to the window to handle the dragging 
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Removes the event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      className="draggable-container"
      // Moves the component through the screen with the x and y from the state
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
          {/* Button grid with the format values*/}
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
