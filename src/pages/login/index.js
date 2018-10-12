import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'

const FormItem = Form.Item


const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    
  },login
}) => {
  let {imgUrl}=login;

  // let imgUrl='api/v2/randomCode?t=?t='+new Date().getTime();
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

     //let payload = values;
     var payload= new FormData();
     payload.append('name','test');

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
      <form>
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
        <FormItem hasFeedback>
          {getFieldDecorator('randCode', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="text" onPressEnter={handleOk} placeholder="randCode" className={styles.codeTxt} />)}
          <img src={imgUrl} className={styles.codeImg} onClick={resetCode}  />
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
