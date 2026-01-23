// app/page.js
import Header from './components/Header/page';
import Heros from './components/Home/Hero';
import ProgressTrackings from './components/Home/ProgressTracking';
import Feature  from './components/Home/Features';
import Samples from './components/Home/Sample';
import Stores from './components/Home/Store';
import Footer from './components/Footer/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200  from-blue-50 to-white">
      <Header />
      <Heros/> 
      < ProgressTrackings />
      <Feature/>
      <Samples/>
      <Stores/>
      <Footer/>
    </div>
    
  );
}