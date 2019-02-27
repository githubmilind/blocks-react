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

export default BasicComponent;
