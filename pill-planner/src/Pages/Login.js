// import LoginForm from '../Components/LoginForm';

// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6')] bg-cover bg-center opacity-20"></div>
//       <LoginForm />
//     </div>
//   );
// }

// export default App

import LoginForm from '../Components/LoginForm';

function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/4260415/4260415-sd_640_360_25fps.mp4" // Replace with the URL of your professional video
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-animate-gradient-to-color opacity-90"></div> 



      {/* Login Form */}
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
