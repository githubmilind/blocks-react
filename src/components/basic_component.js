/*
** Blockchain - Concepts & Demo
** Milind Pansare
*/

import React, { Component } from 'react';

const BasicComponent = (props) => {
    return (
        <div>
            <div>
                <div>{props.title}</div>
                <div style={{fontSize:12}}>{props.value}</div>
            </div>
        </div>
    );
};

//<div><font size="3" color="red">{props.value.toString().substr(0, 6)}</font><font size="2">{props.value.toString().substr(6)}</font></div>

export default BasicComponent;
