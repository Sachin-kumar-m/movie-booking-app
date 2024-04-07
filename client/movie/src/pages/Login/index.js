
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import Button from "../../components/button";
import { loginUser } from "../../apis";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const onFinish = async(values) => {
        try {
            const response = await loginUser(values)
            if (response.success) {
                message.success(response.message)
                console.log(response)
                localStorage.setItem("token",(response.data))
                navigate("/")
            }
            else {
                if (response.message === "User not found") {
                    setTimeout(()=>navigate("/register"),1500)
                }
                message.error(response.message)
                console.log(response.message)
            }
        }
        catch (error) {
            message.error(error.message)
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <div className="card p-3 w-400" style={{ background: "#9290C3", borderRadius:"50px" }} >
                <h1 className="text-xl mb-1 flex justify-center">
                    Book Movies Online {" "}
                </h1>
                <hr />
                <Form layout="vertical" className="mt-1" onFinish={onFinish}>
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
                        <input type="password" placeholder="Password" style={{ borderRadius: "10px", paddingLeft: "5px" }} autocomplete="off" />
                    </Form.Item>


                    <div className="flex flex-col mt-2 gap-1">
                        <Button fullWidth title={"Login"} type={"Submit"}/>
                        <Link to="/register" className="text-primary">
                            {" "}
                            New to App? Register
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login