import React from "react";
import "../css/DocumentFormat.css";
import * as js2xmlparser from 'js2xmlparser';

interface Props {
    handleChange: (format: string) => void;
    allData: never[]
}

const DocumentFormat: React.FC<Props> = ({ handleChange , allData }) => {
    const [selected, setSelected] = React.useState("sql");
    const buttonValues = ["sql", "json", "xml", "csv"];
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const format = (event.target as HTMLButtonElement).value;
        setSelected(format);
        handleChange(format);
    };
    const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
        const filename = "data." + selected;
        const content = {
            sql: allData
                .map((item) => `INSERT INTO {table}({tablas}) VALUES (${item.id}, '${item.email}', '${item.city}')`)
                .join("\n"),
            json: JSON.stringify(allData, null, 2),
            xml: js2xmlparser.parse("tabla", allData),
            csv: allData.map((item) => `${item.id},${item.email},${item.city}`).join("\n"),
        };
        const blob = new Blob([content[selected]], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();  // Call the click method properly
    };

    const selectedIndex = buttonValues.indexOf(selected);

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

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    return (
        <div className="draggable-container"
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>

            <div className="floating-container">

                <div className="format-buttons">
                    <div
                        className="indicator"
                        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
                    />
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
                <button className="download-button" onClick={handleDownload}>Download</button>
            </div>
            <div className="flap"></div>

        </div>

    );
};

export default DocumentFormat;
