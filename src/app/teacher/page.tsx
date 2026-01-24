import Dashboard from '../components/teachers/Dashborad';
import Footers from '../components/Footer/page';

export default function RootLayout() {
  return (
    <div className='bg-gray-50'>
      <Dashboard/>
      <Footers/>
    </div>
  );
}