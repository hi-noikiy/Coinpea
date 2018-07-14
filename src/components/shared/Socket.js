import React from 'react';
import io from 'socket.io-client';

export default class Socket extends React.Component {

    componentDidMount() {
        const socket = io('http:47.94.194.143/coinex-interface/trade');
     
        socket.on('connect', () => {
                if(socket.connected) {
                 
                    socket.emit('message', this.props.message)
                }
          })
    }
    render() {
        return <div url={this.props.url} message={this.props.message}></div>
    }
}