export const API_URL = 'https://sqldatageneratorapi.azurewebsites.net/api';


export const valueMap: { [key: number]: { name: string, description: string } } = {
    1: { name: 'Id generation', description: 'Generates a random id, this can include letters and be casted as integer if the value is numeric only.' },
    2: { name: 'Whole Name Generation', description: 'Generates a random whole name (e.g John Doe).' },
    3: { name: 'First Name Generation', description: 'Generates a random first name.' },
    4: { name: 'Last Name Generation', description: 'Generates a random last name.' },
    5: { name: 'Country Generation', description: 'Picks a random country around the world. (e.g. Argentina)' },
    6: { name: 'City Code Generation', description: 'Picks a random city around the world. (e.g. Bogotá)' },
    7: { name: 'Alpha Code Generation', description: 'Picks a random 2 letter code of a country. (e.g. US)' },
    8: { name: 'Numeric Code Generation', description: 'Picks a random numeric telephone code from a country (e.g +506)' },
    9: { name: 'Date Generation', description: 'Picks random dates from a given range or the default set (1950-2060)' },
    10: { name: 'Email Generation', description: 'Generates a random email.' },
    11: { name: 'Phone Generation', description: 'Generates a random phone number can also include the numeric code. (e.g +506 80808080)' },
    12: { name: 'Number generation', description: 'Generates a random number on a range, can be casted as integer.' },
    13: { name: 'Gender generation', description: 'Picks a random value from the following list: (Male, Female, Other, Prefer not to say).' },
};

export const extraControls: { [key: number]: JSX.Element[] } = {
    1: [
        <input type="number" name="length" placeholder="Lenght of the ID"/>,
        <label htmlFor="hasLetters">Include letters: 
            <input type="checkbox" name="hasLetters" className="multiple-parameter" />
        </label>,
    ],
    9: [
        <input type="date" name="minDate" placeholder="Minimun value of the date (optional)"/>,
        <input type="date" name="maxDate" placeholder="Maximum value of the date (optional)"/>,
        <label htmlFor="includeTime">Include time: 
            <input type="checkbox" name="includeTime" className="multiple-parameter" />
        </label>,
    ],
    11: [
        <input type="number" name="length" placeholder="Lenght of the thelephone (optional)"/>,
        <label htmlFor="includeCode">Include code: 
            <input type="checkbox" name="includeCode" className="multiple-parameter" />
        </label>,
    ],

    12: [
        <input type="number" name="minNumber" placeholder="Minimun value of the number"/>,
        <input type="number" name="maxNumber" placeholder="Maximum value of the number"/>,
        <label htmlFor="isInteger">Cast as integer: 
            <input type="checkbox" name="isInteger" className="multiple-parameter" />
        </label>,
    ]

};