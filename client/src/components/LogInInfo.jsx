import { useForm, Controller } from "react-hook-form"; //1. นำเข้า React Hook Form, Controller = เพื่อเชื่อมต่อ field ใน input เข้ากับ react hook form
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";
import ArrowRight from "../images/registration-page/arrow-right.svg";

function LogInInfo() {
  const { userData, setUserData } = useGlobalContext();
  const navigate = useNavigate();

  // 2. เราจะใช้ useForm(); เพื่อกำหนดค่าต่างๆ และส่งค่าที่จะใช้ในการจัดการ form
  const {
    handleSubmit, // <- ใช้เพื่อ manage เวลาส่งฟอร์ม
    control, // <- มาจาก controller .ใช้เพื่อเชื่อมต่อกับ field input ใน form
    setError, // <- function สำหรับจัดการข้อความ error message ที่อยากให้แสดง
    formState: { errors }, // <-  เป็นค่าที่ใช้ในเก็บ error message ที่เรา set ขึ้นมา เวลากรอก form ไม่ครบ
  } = useForm();

  useEffect(() => {
    // ใช้ useEffect เพื่ออัปเดตเวลามีข้อมูลเปลี่ยนแปลง
    console.log("Updated userData:", userData);
  }, [userData]);

  const onSubmit = async (data) => {
    console.log({
      email: control._fields.email._f.value,
      password: control._fields.password._f.value,
    });

    try {
      // ส่งคำขอไปยังเซิร์ฟเวอร์เพื่อตรวจสอบ email
      const response = await fetch(
        `http://localhost:4000/professional?email=${data.email}`
      );
      const result = await response.json();

      if (result.exists) {
        setError("email", {
          type: "manual",
          message: "The email is already taken",
        });
      } else if (data.confirmedPassword !== data.password) {
        setError("confirmedPassword", {
          type: "manual",
          message: "The confirmed password does not match",
        });
      } else {
        await setUserData({
          email: control._fields.email._f.value,
          password: control._fields.password._f.value,
        });
        console.log(data);
        navigate("/user/register2");
      }
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <form className="font-Inter text-[10px]" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="email-input">
          <label htmlFor="email">
            <div className="mb-[4px] font-normal tracking-[1.5px]">EMAIL</div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                  aria-describedby="email-error"
                />
              )}
            />
          </label>
          <div id="email-error" className="text-red-500 text-[10px] uppercase">
            {errors.email && errors.email.message}
          </div>
        </div>

        <div className="password-input">
          <label htmlFor="password">
            <div className="mb-[4px] font-normal tracking-[1.5px]">
              PASSWORD
            </div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  type="password"
                  placeholder="******"
                  {...field}
                  aria-describedby="password-error"
                />
              )}
            />
          </label>
          <div
            id="password-error"
            className="text-red-500 text-[10px] uppercase"
          >
            {errors.password && errors.password.message}
          </div>
        </div>

        <div className="confirmed-password-input">
          <label htmlFor="confirmed-password">
            <div className="mb-[4px] font-normal tracking-[1.5px]">
              PASSWORD CONFIRMATION
            </div>
            <Controller
              name="confirmedPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Password confirmation is required",
              }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="confirmedpassword"
                  type="password"
                  placeholder="******"
                  {...field}
                  aria-describedby="confirmed-password-error"
                />
              )}
            />
          </label>
          <div
            id="confirmed-password-error"
            className="text-red-500 text-[10px] uppercase"
          >
            {errors.confirmedPassword && errors.confirmedPassword.message}
          </div>
        </div>
        <div className="ml-[127px] w-[106px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white leading-[24px] font-[500px] text-[14px] tracking-[1.25px]">
          <button
            className="flex flex-row"
            type="submit"
            disabled={errors.confirmedPassword ? true : false}
          >
            <div className="ml-[10px]">NEXT</div>
            <img src={ArrowRight} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default LogInInfo;
