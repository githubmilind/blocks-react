import React, { Component } from 'react';

const BasicComponent = (props) => {
    return (
        <div>
            <div>
                <div>{props.title}</div>
                <div>{props.value}</div>
            </div>
        </div>
    );
};

export default BasicComponent;
