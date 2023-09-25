import React from 'react';
import './number.css'

const Number = () => {
    const Numb = [0,0o00, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <>

            {Numb.map((item, i) => (
                <input  id={item} key={i} type="text" value={item} className='numInput' readOnly />
            ))}
        </>
    );
};

export default Number;
