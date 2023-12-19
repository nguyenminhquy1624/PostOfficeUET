import banner from '/src/assets/img/landpage.png'
import {motion} from 'framer-motion'
import { fadeIn } from '../effect/variants'

const Home = () => {
  return (
    <div id='home' className='md:px-12 p-4 max-w-screen mx-10 mt-24'>
        <div className='gradientBg rounded-xl rounded-br-[80px] shadow-xl'>
            <div className='flex flex-col md:flex-row-reverse justify-center items-center gap-5'> 
                <motion.div variants={fadeIn("down", 0.2)} initial="hidden" whileInView={"show"} viewport={{once:false, amount:0.7}}>
                    <img src = {banner} alt='' className='lg:h-[500px] p-5'/>
                </motion.div>
                
                <motion.div variants={fadeIn("up", 0.2)} initial="hidden" whileInView={"show"} viewport={{once:false, amount:0.7}} className='md:w-[60%] p-5 mr-16'>
                    <h2 className='md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed'>Dịch vụ vận chuyển uy tín, tin cậy</h2>
                    <p className='text-[#EBEBEB] text-2xl mb-8'>Chào mừng quý khách hàng đến với dịch vụ vận chuyển hỏa tốc đến từ Magic Post !!!</p>
                    <div className='pt-10'>
                        <button className='py-3 px-8 bg-secondary font-semibold text-white rounded hover:bg-primary transition-all duration-300'>Get Started</button>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Home