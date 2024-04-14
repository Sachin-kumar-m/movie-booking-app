import React from 'react'
import { Form, Space, message, Input} from 'antd'
import Button from '../../components/button'
import { updateUser } from '../../apis'
import { useDispatch,useSelector} from "react-redux";
import { hideLoading, showLoading } from '../../redux/loaderSlice';
import { useNavigate } from "react-router-dom";



function Profile() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.users) 
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const ID = loggedInUser.user._id
      const response = await updateUser({ ...values, ID })
      message.success(response.message)
      dispatch(hideLoading())
      localStorage.removeItem("token")
      setTimeout(()=>navigate("/login"),1000)
    }
    catch (err) {
      message.error(err)
    }

  }

  return (
    <div style={{width:"50%",display:"flex",justifyContent:"center"}}>
      <Form name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish} initialValues={{userName:loggedInUser?.user?.userName,userEmail:loggedInUser?.user?.userEmail}}>
        <Form.Item
          name="userName"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="userEmail"
          label="Email"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="New Password"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button title={"Submit"}>Submit</Button>
            {/* <Button title={"Reset"} htmlType="reset" onClick={()=>{}}>Reset</Button> */}
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Profile