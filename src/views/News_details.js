import './NewsDetails.scss';
import React, { Component } from 'react';
import { newsLists } from '../api/news'
class NeawsDetails extends Component {
   state={
     data:''
   }
    componentDidMount() {
        let id=Number(this.props.location.state.id)
        this.getListData(id); 
      }
      getListData = async (id) =>{
        let index=this.props.location.state.index;
        const res=await newsLists(id);
        if(res.status === 1){
            this.setState({
              data: res.data[index].content,
            });
        }
      }
    render () {
        return (
        <div className="neawsDeBox">
            <div dangerouslySetInnerHTML={{__html:this.state.data}} className="content"></div>
        </div>
        )
    }

}
export default NeawsDetails;