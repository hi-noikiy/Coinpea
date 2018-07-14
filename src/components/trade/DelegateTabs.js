/* 
    委托列表
*/

import React from 'react';
import './DelegateTabs.scss';

import { Table } from 'antd';
import intl from 'react-intl-universal'


class DelegateTabs extends React.Component {
   
    
    render() {
      
       return  (
            <Table 
                    rowKey={this.props.rowKeys}
                    key={this.props.rowKey+'cc'}
                    style={{display:this.props.isShow?'block':'none'}}
                    className="my-tabs"
                    columns={this.props.columns} 
                    dataSource={this.props.dataSource}
                    pagination={false}  
                    locale={{emptyText: intl.get('暂无数据') }}                
             />
       )
    }
}

export default DelegateTabs;