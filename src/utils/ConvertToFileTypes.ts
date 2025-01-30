import * as js2xmlparser from "js2xmlparser";
import ShowError from "./ShowError";

export const ConvertToFileTypes = (
  tableName: string,
  allData: any[],
  format: string,
): string => {
  try {
    if (tableName === '') tableName = 'table';

    if (format === 'sql') {
      if (allData.length === 0) return `INSERT INTO ${tableName} VALUES (example, examples) \n ('No data', 'available') ;`;
      const headers = Object.keys(allData[0]); // Obtener las claves del primer objeto como las cabeceras
      const rows = allData.map(item =>
        `(${headers.map(header => `'${item[header]}'`).join(",")})`
      );

      return `INSERT INTO ${tableName} (${headers.join(",")})\n` + rows.join(",\n") + ';';
    }

    if (format === 'json') {
      if (allData.length === 0) return JSON.stringify({ message: "No data available" }, null, 2);
      return JSON.stringify(allData, null, 2);
    }

    if (format === 'xml') {
      if (allData.length === 0) return js2xmlparser.parse(tableName, { message: "No data available" });
      return js2xmlparser.parse(tableName, allData);
    }

    if (format === 'csv') {
      if (allData.length === 0) return 'No,Data,Available';
      const headers = Object.keys(allData[0]); // Obtener las claves del primer objeto como las cabeceras
      const rows = allData.map(item => headers.map(header => item[header]).join(",")); // Mapear los valores de cada objeto según las cabeceras

      return [headers.join(","), ...rows].join("\n");
    }

    return '';
  } catch (error) {
    ShowError(String(error));
    return '';
  }
};