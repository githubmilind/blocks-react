/*
** Blockchain - Concepts & Demo
** Milind Pansare
*/

import React, { Component } from 'react';

const BlockHash = ({title, id, nonce, blockData}) => {
    return (
        <div>
            <div>
                <div>{title}</div>
                <div>0x{hashval}</div>
            </div>
        </div>
    );
};

export default BlockHash;
