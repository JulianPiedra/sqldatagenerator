import * as js2xmlparser from "js2xmlparser";
import ShowError from "./ShowError";
import { IConvert } from "../constants/interfaces";
export const ConvertToFileTypes = ({ tableName, allData, format }: IConvert): string => {
  try {
    if (tableName === '') tableName = 'table';
    
    // Converts the received to an sql insert query
    if (format === 'sql') {
      if (allData.length === 0) return `INSERT INTO ${tableName} VALUES (example, examples) \n ('No data', 'available');`;
      const headers = Object.keys(allData[0]);
      const rows = allData.map(item =>
        `(${headers.map(header => `'${item[header]}'`).join(",")})`
      );
      return `INSERT INTO ${tableName} (${headers.join(",")}) VALUES\n` + rows.join(",\n") + ';';
    }

    // Converts the received data to a json
    if (format === 'json') {
      if (allData.length === 0) return JSON.stringify({ message: "No data available" }, null, 2);
      return JSON.stringify(allData, null, 2);
    }

    // Converts the received data to an xml file
    if (format === 'xml') {
      if (allData.length === 0) return js2xmlparser.parse(tableName, { message: "No data available" });
      return js2xmlparser.parse(tableName, allData);
    }

    // Converts the received data to a csv file
    if (format === 'csv') {
      if (allData.length === 0) return 'No,Data,Available';
      const headers = Object.keys(allData[0])
      const rows = allData.map(item => headers.map(header => item[header]).join(",")); 
      return [headers.join(","), ...rows].join("\n");
    }

    return '';
  } catch (error) {
    ShowError(String(error));
    return '';
  }
};