import fastImg from "/src/assets/img/fast.png";
import highrateImg from "/src/assets/img/highrate.png"
import qualityImg from "/src/assets/img/quality.png"
import {motion} from 'framer-motion'
import { fadeIn } from '../effect/variants'


const Features = () => {
  return ( 
    <div id="features" className="my-32 md:px-14 max-w-screen mx-[40px]">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <motion.div variants={fadeIn("down", 0.2)} initial="hidden" whileInView={"show"} viewport={{once:false, amount:0.7}} className="lg:w-1/4">
          <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">
            Tại sao dịch vụ của chúng tôi lại tốt hơn?
          </h3>
          <p className="text-base text-tartiary">
            Giao hàng với tốc độ nhanh chóng, thuận lợi, bảo quản tốt.
          </p>
        </motion.div>

        <motion.div variants={fadeIn("up", 0.2)} initial="hidden" whileInView={"show"} viewport={{once:false, amount:0.7}} className="w-full lg:w-3/4">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
            <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 flex justify-center items-center hover:-translate-y-4 transition-all duration-300">
              <div className="">
                <img src={fastImg} />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">
                  Tốc độ giao hàng nhanh
                </h5>
                <h6 className=" text-primary px-5 text-center">Luôn luôn có đội ngũ vận chuyển kịp thời và giao hàng trong nước chỉ 2-3 ngày.</h6>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 flex justify-center items-center hover:-translate-y-4 transition-all duration-300 mt-20">
              <div className="">
                <img src={highrateImg} />
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">
                  Dịch vụ uy tín, đảm bảo
                </h5>
                <h6 className=" text-primary px-5 text-center">luôn thể hiện sự tôn trọng đối với khách hàng, và luôn đảm bảo những quyền lợi tốt nhất cho khách hàng.</h6>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 flex justify-center items-center hover:-translate-y-4 transition-all duration-300">
              <div className="">
                <img src={qualityImg} className="h-[250px]"/>
                <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">
                  Nhân viên chất lượng
                </h5>
                <h6 className=" text-primary px-5 text-center">Thân thiện, cởi mở với khách hàng.</h6>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
