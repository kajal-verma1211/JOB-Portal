import CategoryCarouse from "./CategoryCarouse"
import HeroSection from "./HeroSection"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"


const Home = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarouse/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home

