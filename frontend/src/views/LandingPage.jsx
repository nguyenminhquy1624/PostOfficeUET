import Home from '/src/components/landingpages/Home'
import SearchPath from '/src/components/landingpages/SearchPath'
import Features from '/src/components/landingpages/Features'
import Feedback from '/src/components/landingpages/Feedback'
import { FooterWithSocialLinks } from '/src/components/footer/Footers'
import IndexNavbars from '/src/components/navbars/IndexNavbars'


const LandingPage = () => {
  return (
    <div>
      <IndexNavbars/>
      <Home/>
      <SearchPath/>
      <Features/>
      <Feedback/>
      <FooterWithSocialLinks/>
    </div>
  )
}

export default LandingPage