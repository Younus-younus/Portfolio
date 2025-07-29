import {
    About,
    Achievements,
    Contact,
    Experience,
    Footer,
    Header,
    Hero,
    Projects,
    Skills
} from '../components/AllComponents'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white overflow-x-hidden relative">
      {/* Animated background patterns */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
