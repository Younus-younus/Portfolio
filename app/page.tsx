import {
    Achievements,
    Contact,
    Experience,
    Footer,
    Header,
    Hero,
    Projects,
    Skills
} from '../components/MLComponents'

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden transition-colors">
      {/* Main content */}
      <div className="relative">
        <Header />
        <Hero />
        <Achievements />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
