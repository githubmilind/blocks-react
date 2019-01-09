import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';

class BlockList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            blocks: [{id: 0, valid:'true', hash:'0x00'},],
            lastId: 1
        };

        this.addNewBlock = this.addNewBlock.bind(this);
        this.invalidateBlocks = this.invalidateBlocks.bind(this);
    }

    invalidateBlocks(blockId, hashValue){
        var oldState = this.state.blocks.slice();
        
        oldState = this.state.blocks.map(item => {return {id : item.id,  valid : item.id > blockId ? 'false' : 'true', 
                                                        hash: blockId == item.id ? hashValue : item.hash}; });

        this.setState({blocks: oldState});
    }

    addNewBlock(){
        this.setState({ blocks: this.state.blocks.concat({id: this.state.lastId, valid:'true', hash:'0x00'}),
                         lastId: this.state.lastId+1
                         });
    }

    render(){
        return (
            <div>
            <p>Block chain in react</p>
            {this.state.blocks.map((item, index, array) => (<Block key={item.id} 
                                    blockId={item.id} 
                                    prevHash={index-1 > -1 ? array[index-1].hash : '0x001'}
                                    blockStatus={item.valid} 
                                    invalidateBlocks={this.invalidateBlocks} />))}
            <button className="btn btn-primary btn-lg" onClick={this.addNewBlock}>Add New Block</button>
            </div>
        );
    }
}

export default BlockList;
