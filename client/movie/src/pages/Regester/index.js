
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import Button from "../../components/button";
import { registerUser } from "../../apis";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            const response = await registerUser(values)
            if (response.success) {
                message.success(response.message)
                console.log(response.message);
                navigate("/login")
                window.location.reload(false)
            }
            else {
                message.error(response.message)
                console.log(response.message)
            }
        }
        catch (error) {
            const errorMessage = error.message
            message.error(errorMessage)
            console.log(errorMessage)
        }
    }

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <div className="card p-3 w-400" style={{ background: "#9290C3", borderRadius:"50px" }} >
                <h1 className="text-xl mb-1 flex justify-center">
                    Book Movies Online Register User {" "}
                </h1>
                <hr />
                <Form layout="vertical" className="mt-1" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="userName"
                        rules={[{ required: true, message: "Please input your name!" }]}
                    >
                        <input type="text" placeholder="Name" style={{ borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="userEmail"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <input type="email" placeholder="Email" style={{ borderRadius: "10px", paddingLeft: "5px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <input type="password" placeholder="Password" style={{ borderRadius: "10px", paddingLeft: "5px" }} />
                    </Form.Item>


                    <div className="flex flex-col mt-2 gap-1">
                        <Button fullWidth title={"Register"} type={"Submit"}/>
                        <Link to="/login" className="text-primary">
                            {" "}
                            Already have an account? Login
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register