import Header from '../components/Header'
import Hero from '../components/Hero'
import LaunchSection from '../components/LaunchSection'
import Video from '../components/Video'
import Features from '../components/Features'
import SignupPerks from '../components/SignupPerks'
import FAQ from '../components/FAQ'
import { useEffect } from 'react'
const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [1])
  return (
    <div className="relative w-screen overflow-x-hidden">
      <Header />
      <Hero />
      <LaunchSection />
      <Video/>
      <Features />
      <SignupPerks />
      <FAQ />
    </div>
  )
}

export default LandingPage
