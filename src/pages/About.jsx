// About.jsx
import Header from '../components/Header'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="About Us" 
        subtitle="Learn more about our mission and values"
      />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We are passionate developers committed to creating amazing web experiences. 
            Our team combines modern technologies with user-centered design to build 
            applications that make a difference.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This application showcases our expertise in React, Vite, Tailwind CSS, 
            and modern web development practices. We believe in clean code, 
            responsive design, and seamless user experiences.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About