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
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
     // dispatch({ type: 'query', payload: { id: match[1] } })
      dispatch({ type: 'login/login',values})
    })
  }

  return (
   
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="userName" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('passWord', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="passWord" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('code', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="text" onPressEnter={handleOk} placeholder="code" className={styles.codeTxt} />)}
          <img src={loading.state} className={styles.codeImg}  />
          <span>{loading.state}</span>
        </FormItem>
        <Row>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            Sign in
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
