
import { Form } from "antd";
import { Link } from "react-router-dom";
import Button from "../../components/button";


function Register() {

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <div className="card p-3 w-400" style={{ background: "#9290C3", borderRadius:"50px" }} >
                <h1 className="text-xl mb-1 flex justify-center">
                    Book Movies Online {" "}
                </h1>
                <hr />
                <Form layout="vertical" className="mt-1">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input your name!" }]}
                    >
                        <input type="text" placeholder="Name" style={{ borderRadius: "10px" }} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
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