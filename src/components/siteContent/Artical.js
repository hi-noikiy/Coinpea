/* 
    站点文章组件
*/

import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { getSiteContent } from '../../api/site';
import './Artical.scss';

export default class Artical extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content:''
        }
    }


    componentDidMount() {
        this.getInfoContent();
    }



    getInfoContent = async ()=>{
        let id=this.props.typeid;
         const res =  await getSiteContent(id);
         if(res.status === 1){
            this.setState({
                content:res.data?res.data.content:'',
                title: res.data?res.data.title:'',
            })
         }

    }

    render() {
        return (
            <div className="artical-wrap">
                <h2>{this.state.title}</h2>
                    <div className="artical-content" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
            </div>
        )
    }
}