import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'
import   'jsencrypt'

const FormItem = Form.Item


const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    
  },login
}) => {
  let {imgUrl,keyCode}=login;

  // let imgUrl='api/v2/randomCode?t=?t='+new Date().getTime();

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const payload=values;
      const publicKey = keyCode;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      payload.opPassword=encrypt.encrypt(payload.opPassword);
      dispatch({ type: 'login/login',payload});

    })
  }
  function resetCode(){
 
    dispatch({ type: 'login/getCode'})
  }

  return (
   
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form id="theForm">
        <FormItem hasFeedback>
          {getFieldDecorator('opCode', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="opCode" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('opPassword', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="passWord" onPressEnter={handleOk} placeholder="opPassword" />)}
        </FormItem>
        <FormItem hasFeedback ClassName="codeRow">
        <img src={imgUrl} className={styles.codeImg} onClick={resetCode}  />
          {getFieldDecorator('randCode', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="text" onPressEnter={handleOk} placeholder="randCode" className={styles.codeTxt} />)}
         
        </FormItem>
      
        <Row>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
           sign in
          </Button>
          {/* <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p> */}
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ login,loading }) => ({ login,loading }))(Form.create()(Login))
