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
      return allData
        .map(
          (item) =>
            `INSERT INTO ${tableName} (id, email, city) VALUES (${item.id}, '${item.email}', '${item.city}')`
        )
        .join("\n");
    }

    if (format === 'json') {
      return JSON.stringify(allData, null, 2);
    }

    if (format === 'xml') {
      return js2xmlparser.parse(tableName, allData);
    }

    if (format === 'csv') {
      return ["id,email,city", ...allData.map((item) => `${item.id},${item.email},${item.city}`)].join("\n");
    }

    return ''; 
  } catch (error) {
    ShowError(String(error));
    return ''; 
  }
};
