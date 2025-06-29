const Header = ({ title, subtitle, className = "" }) => {
  return (
    <header className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}

export default Header