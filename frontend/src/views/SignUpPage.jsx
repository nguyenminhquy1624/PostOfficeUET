import { TERipple } from "tw-elements-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../components/effect/variants";
import { Button } from "flowbite-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios'
const SignUpPage = () => {

  const [name, setname] = useState("")
  const [phonenumber, setphonenumber] = useState("")
  const [username,setusername] = useState("")
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
  // const [role, setrole] = useState("");

  let navigate = useNavigate();
  const roles = [
    { Id: "1", Name: "Lãnh đạo" },
    { Id: "2", Name: "Trưởng điểm giao dịch" },
    { Id: "3", Name: "Giao dịch viên" },
    { Id: "4", Name: "Nhân viên giao hàng" },
    { Id: "5", Name: "Trưởng điểm tập kết" },
    { Id: "6", Name: "Tập kết viên" },
  ];
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   //  email validation
  //   const emailRegex = /^\S+@\S+\.\S+$/;
  //   if (!emailRegex.test(email)) {
  //     seterror("Email không đúng định dạng.");
  //     return false;
  //   }

  //   // password matching validation
  //   if (password !== confirmPassword) {
  //     seterror("Password should match.");
  //     return;
  //   }

  //   // setrole(findNameById(roles, role));

  //   alert("Form submitted successfully.");
  //   console.log("Email: ", email);
  //   console.log("Password: ", password);
  //   console.log("Confirm Password: ", confirmPassword);
  //   console.log("Role", findNameById(roles, role));
  //   // empty the input fields after submitting the form
  //   setemail("");
  //   setpassword("");
  //   setconfirmPassword("");
  //   seterror("");
  //   setrole("");
  // };
  const findNameById = (cities, id) => {
    const findCity = cities.find((city) => city.Id === id);
    return findCity ? findCity.Name : null;
  };
  const backToHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    
    const check = validateRegister(e)

    if (check) {
      console.log("name: ", name)
      console.log("phonenumber: ", phonenumber)
      console.log("username: ", username)
      console.log("Password: ", password);
      console.log("Email: ", email);
      console.log("Confirm Password: ", confirmPassword);

      let payload = {
        username: username,
        password: password,
        HoVaTen: name,
        SoDienThoai: phonenumber,
        email: email
      }

      try {
        let response = await axios.post(
            "http://127.0.0.1:8000/api/customer/register/", payload
        )
        console.log(response.data)
        console.log(JSON.parse(localStorage.getItem("access")))
        alert("Đăng kí thành công")
        backToHome("/")
      }
      catch (err) {
        console.log(err.response.data)
        alert("Đăng kí không thành công")
      }

      
      setname("");
      setphonenumber("");
      setusername("");
      setpassword("");
      setconfirmPassword("");
      setemail("");
      seterror("");
    }
    
    // setrole("");
  };
  // const findNameById = (cities, id) => {
  //   const findCity = cities.find((city) => city.Id === id);
  //   return findCity ? findCity.Name : null;
  // };
  
  return (
    <section className="h-screen">
      <div className="m-5 h-1/3 px-24 py-10 ">
        <Button className="rounded-full " color="blue" onClick={backToHome}>
          <IoMdArrowRoundBack className="" />
        </Button>
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* <!-- Left column container with background--> */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12"
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </motion.div>

          {/* <!-- Right column container with form --> */}
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12"
          >
            <h1 className="text-4xl font-bold text-primary text-center mb-10">
              Đăng ký tài khoản
            </h1>
            <form
              onSubmit={handleSubmit}
              className="p-20 rounded-xl shadow-3xl"
            >
              {/* <!-- Email input --> */}
              <h1>Nhập họ và tên</h1>
              <div className="relative">
                <input
                  type="name"
                  id="name"
                  required
                  className="input-field focus:outline-none w-full px-3 py-2 border-primary border rounded-md appearance-none text-primary m-2"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              <h1>Nhập số điện thoại</h1>
              <div className="relative">
                <input
                  type="phonenumber"
                  id="phonenumber"
                  required
                  className="input-field focus:outline-none w-full px-3 py-2 border-primary border rounded-md appearance-none text-primary m-2"
                  autoComplete="off"
                  value={phonenumber}
                  onChange={(e) => setphonenumber(e.target.value)}
                />
              </div>

              <h1>Nhập địa chỉ Email</h1>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  className="input-field focus:outline-none w-full px-3 py-2  border-primary border rounded-md appearance-none text-primary m-2"
                  placeholder="example@gmail.com"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <h1>Chọn vai trò</h1>
              <div className="relative">
                <select
                  onChange={(e) => setrole(e.target.value)}
                  id="role"
                  className="input-field focus:outline-none w-full px-3 py-2 border-primary border rounded-md appearance-none text-primary m-2"
                >
                  <option value="" selected>
                    Chọn vai trò
                  </option>
                  {roles.map((role) => (
                    <option key={role.Id} value={role.Id}>
                      {role.Name}
                    </option>
                  ))}
                </select>
              </div>

              <h1>Nhập mật khẩu</h1>
              <div className="relative">
                <input
                  type="password"
                  id="Password"
                  required
                  className="input-field focus:outline-none w-full px-3 py-2  border-primary border rounded-md appearance-none text-primary m-2"
                  placeholder="****"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <h1>Xác nhận mật khẩu</h1>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="input-field focus:outline-none w-full px-3 py-2  border-primary border rounded-md appearance-none text-primary m-2"
                  placeholder="****"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>

              

              <div className="pl-2 font-semibold text-red-500 py-2">
                {error}
              </div>
              {/* <!-- Remember me checkbox --> */}
              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck3"
                    defaultChecked
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck3"
                  >
                    Ghi nhớ
                  </label>
                </div>

                {/* <!-- Forgot password link --> */}
                {/* <a
                  href="#!"
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >
                  Quên mật khẩu?
                </a> */}
              </div>

              {/* <!-- Submit button --> */}

              <TERipple rippleColor="light" className="w-full">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Đăng ký
                </button>
              </TERipple>

              <a
                href="login"
                className="flex justify-center mt-4 text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Bạn đã có tài khoản?
              </a>

           

             
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
