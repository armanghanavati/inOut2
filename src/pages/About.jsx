import React from "react";
import ax1 from "../asset/tp68whnsss4p.webp";
import MyNavabar from "../components/MyNavabar/MyNavabar";
import MainTitle from "../components2/MainTitle";
const About = () => {
  return (
    <div>
      <MainTitle label="درباره سامانه دینگ" />
      <img src={ax1} alt="" className=" w-full h-auto mt-10" />
      <p className="px-5 leading-7 mt-4 text-justify text-sm">
        سامانه حضور غیاب دینگ متشکل از یک دستگاه بی سیم,اپلیکیشم موبایل و حساب
        اشتراک یکساله می باشد.کارکنان یک مجموعه با نصب اپلیکیشن و قرار داشتن در
        مجاورت دستگاه دینگ ورود وخروج را بصورت آنلاین ثبت میکند.بلافاصله مدیر
        مجموعه از وضعیت حضور غیاب کارکنان بر روی گوشی تلفن هوشمند خود مطلع خواهد
        شد
      </p>
      <div className="mt-20 mb-10 flex items-center justify-around gap-x-3 px-3">
        <button className="rounded-xl text-white bg-emerald-600 p-4 ">
          قوانین و شرایط استفاده
        </button>
        <button className="p-4 rounded-xl border border-black font-bold font-serif">
          Developed By Ding
        </button>
      </div>
    </div>
  );
};

export default About;
