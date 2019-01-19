import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';

class BlockList extends React.Component {

    constructor(props){
        super(props);

        var storedState = localStorage.getItem('BlockList');
        if (storedState && storedState !== "") {
            this.state = JSON.parse(storedState);
        } else {
            this.state = {
                blocks: [{ id: 0, mined: 'new', blockData:'', hash: '0x00', nonce: 0 },],
                lastId: 1
            };
        } 
        
        this.addNewBlock = this.addNewBlock.bind(this);
        this.invalidateBlocks = this.invalidateBlocks.bind(this);
        this.resetBlockList = this.resetBlockList.bind(this);
    }

    invalidateBlocks(blockId, newBlockData, newNonce, hashValue){
        var oldState = this.state.blocks.slice();
        
        oldState = this.state.blocks.map(item => {return {id : item.id,  mined : item.id > blockId ? 'false' : 
                                                                            item.id == blockId ? 'true' : item.mined, 
                                                        blockData: item.id == blockId ? newBlockData : item.blockData,
                                                        hash: item.id == blockId ? hashValue : item.hash,
                                                        nonce: item.id == blockId ? newNonce: item.nonce}; });

        this.setState({blocks: oldState});
    }

    addNewBlock(){
        this.setState({ blocks: this.state.blocks.concat({id: this.state.lastId, mined:'new', blockData:'', hash:'0x00', nonce: 0}),
                         lastId: this.state.lastId+1
                         });
    }

    resetBlockList(){
        this.setState({blocks: [{ id: 0, mined: 'new', blockData: '', hash: '0x00', nonce: 0 },], lastId: 1});
    }

    componentDidUpdate(){
        localStorage.setItem('BlockList', JSON.stringify(this.state));
    }

    render() {
        return (
            <div>
                <div style={{height:40}}>
                    <div style={{float:"left", width:100}}>Block list</div>
                    <div style={{float:"left", width:100}}><button onClick={this.resetBlockList}>Reset</button></div> 
                </div>
                <div style={{ display: 'table', clear:"left" }}>
                    {this.state.blocks.map((item, index, array) => (<div key={item.id} style={{ display: 'table-cell', paddingRight: 5 }}><Block key={item.id}
                        blockId={item.id}
                        nonce={item.nonce}
                        blockHash={item.hash}
                        prevHash={index - 1 > -1 ? array[index - 1].hash : '0x00'}
                        blockStatus={item.mined}
                        invalidateBlocks={this.invalidateBlocks} 
                        blockData={item.blockData}/></div>))}
                    <div className="align-items-center justify-content-center">
                        <button className="btn btn-primary btn-lg" onClick={this.addNewBlock}>Add New Block</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockList;
