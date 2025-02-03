import { GetNumbers } from "../services/NumberService";
import { GetGender } from "../services/GenderService";
import { GetIds } from "../services/IdService";
import { GetEmails } from "../services/EmailService";
import { GetCities } from "../services/CityService";
import { GetWholeNames, GetLastNames, GetFirstNames } from "../services/NameService";
import { GetDates } from "../services/DateService";
import { GetTelephones } from "../services/TelephoneService";
import { GetAlphaCode, GetCountries, GetNumericCode } from "../services/CountryService";

//Api url 
export const API_URL = 'https://sqldatageneratorapi.runasp.net/api';

//Dictionary of card values for the data category modal
export const valueMap: { [key: number]: { name: string, description: string } } = {
    1: { name: 'Id generation', description: 'Generates a random id, this can include letters and be casted as integer if the value is numeric only.' },
    2: { name: 'Whole Name Generation', description: 'Generates a random whole name (e.g John Doe).' },
    3: { name: 'First Name Generation', description: 'Generates a random first name.' },
    4: { name: 'Last Name Generation', description: 'Generates a random last name.' },
    5: { name: 'Country Generation', description: 'Picks a random country around the world. (e.g. Argentina)' },
    6: { name: 'City Generation', description: 'Picks a random city around the world. (e.g. Bogotá)' },
    7: { name: 'Alpha Code Generation', description: 'Picks a random 2 letter code of a country. (e.g. US)' },
    8: { name: 'Area Code Generation', description: 'Picks a random area telephone code from a country (e.g +506)' },
    9: { name: 'Date Generation', description: 'Picks random dates from a given range or the default set (1950-2060)' },
    10: { name: 'Email Generation', description: 'Generates a random email.' },
    11: { name: 'Telephone Generation', description: 'Generates a random phone number can also include the numeric code. (e.g +506 80808080)' },
    12: { name: 'Number generation', description: 'Generates a random number on a range, can be casted as integer.' },
    13: { name: 'Gender generation', description: 'Picks a random value from the following list: (Male, Female, Other, Prefer not to say).' },
};

//Dictionary to map api endpoints to the data category
export const data = {
    1: GetIds,
    2: GetWholeNames,
    3: GetFirstNames,
    4: GetLastNames,
    5: GetCountries,
    6: GetCities,
    7: GetAlphaCode,
    8: GetNumericCode,
    9: GetDates,
    10: GetEmails,
    11: GetTelephones,
    12: GetNumbers,
    13: GetGender,
  };

