import React, {createContext, useReducer, useState} from 'react';

export const Context = createContext();

function Provider({children}){
    const[dados, setDados] = useState(null);
    const[userId, setUserId] = useState(null);

    return(
        <Context.Provider 
        value={{
            dados, setDados,
            userId, setUserId,
            }}>
            {children}
        </Context.Provider>
    )
}

export default Provider;