import React, { useState, createContext } from 'react';

export const Context = createContext();
export const ContextProvider = ({ children }) => {
    const [items, setItems] = useState([{"data__student-first-name":null, "data__student-last-name":null, "data__student-mobile":null, "data__student-email":null, "data__parent-first-name":null, "data__parent-last-name":null, "data__parent-mobile":null, "data__parent-email":null, "data__student-grade":null, "data__student-school":null, "numselectedcourses":0, "data__selected-options":null, "data__selected-options1":null, "data__selected-times":null, "siteName": "Project Academy", "name": "Enquiries Forms", "data__Send Email To": null, "data__Discovery": null,}]);

    return (
        <Context.Provider value={{ items, setItems }}>
            {children}
        </Context.Provider>    
    ); 
};
 