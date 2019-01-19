import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';

class BlockList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            blocks: [{id: 0, mined:'new', hash:'0x00'},],
            lastId: 1
        };

        this.addNewBlock = this.addNewBlock.bind(this);
        this.invalidateBlocks = this.invalidateBlocks.bind(this);
    }

    invalidateBlocks(blockId, hashValue){
        var oldState = this.state.blocks.slice();
        
        oldState = this.state.blocks.map(item => {return {id : item.id,  mined : item.id > blockId ? 'false' : 
                                                                            item.id == blockId ? 'true' : item.mined, 
                                                        hash: blockId == item.id ? hashValue : item.hash}; });

        this.setState({blocks: oldState});
    }

    addNewBlock(){
        this.setState({ blocks: this.state.blocks.concat({id: this.state.lastId, mined:'new', hash:'0x00'}),
                         lastId: this.state.lastId+1
                         });
    }

    render() {
        return (
            <div>
                <p>Block list</p>
                <div style={{ display: 'table' }}>
                    {this.state.blocks.map((item, index, array) => (<div key={item.id} style={{ display: 'table-cell', paddingRight: 5 }}><Block key={item.id}
                        blockId={item.id}
                        prevHash={index - 1 > -1 ? array[index - 1].hash : '0x00'}
                        blockStatus={item.mined}
                        invalidateBlocks={this.invalidateBlocks} /></div>))}
                    <div className="align-items-center justify-content-center">
                        <button className="btn btn-primary btn-lg" onClick={this.addNewBlock}>Add New Block</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockList;
