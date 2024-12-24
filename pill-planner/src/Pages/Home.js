function Home() {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Pill-Planner
            </h1>
            <p className="text-xl text-gray-600 mb-12">
                Your health is in your hands, Let us help you keep it there
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
              <p className="text-gray-600">
              Book appointments with healthcare providers directly through the platform for convenient medical consultations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Medicine Scheduling</h2>
              <p className="text-gray-600">
              Easily schedule and track your medication doses to ensure timely and consistent treatment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Prescription Analysis</h2>
              <p className="text-gray-600">
               Gain insights into your medication usage patterns and identify areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;