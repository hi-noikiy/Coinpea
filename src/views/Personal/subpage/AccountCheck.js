/* 
    身份认证页入口
*/
import React, { Component } from 'react';
import { Form,Radio, } from 'antd';
import SubpageHead from '../../../components/shared/SubpageHead'
import Identity from '../../../components/personal/Identity';
import PassPort from '../../../components/personal/PassPort';

import intl from 'react-intl-universal';

import './PersonalTwo.scss';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            form:'china',
            backLink: '/personal',
            backText: intl.get('返回个人中心'),
            columText: intl.get('身份认证')
        }
    }
    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }


    render() {      

        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 8 },
        }

        return (
            <div id="personalTwo">
                <SubpageHead
                    backLink={this.state.backLink}
                    backText={this.state.backText}
                    columText={this.state.columText}
                />
                <div className="personalTwo_con" style={{padding:'30px 0 60px'}}>
                    <p>*<span>{intl.get('身份认证提示')}</span></p>
                    <div>
                        <Form>
                            <FormItem
                            {...formItemLayout}
                                label={intl.get('选择类型')}
                            >
                            <RadioGroup onChange={this.changeFrom.bind(this)}  defaultValue='china'>
                                <Radio value="china">{intl.get('中国大陆')}</Radio>
                                <Radio value="other">{intl.get('其他国家和地区')}</Radio>
                            </RadioGroup>
                            </FormItem>

                            { this.state.form === 'china' ? <Identity /> : <PassPort /> }

                        </Form>   
                    </div>
                    
                    
                </div>
            </div>
        )
    }   

    changeFrom(event){
        const value = event.target.value;
        if(value === 'china'){
            this.setState({
                form:'china'
            })
        }else{
            this.setState({
               form:'other'
            })
        }
    }
}

ChangePassword = createForm()(ChangePassword);

export default ChangePassword; 