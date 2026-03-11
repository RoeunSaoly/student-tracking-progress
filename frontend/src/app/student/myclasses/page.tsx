
import Footers from '../../components/Footer/page';
import Class from '../../components/students/Class';

export default function RootLayout() {
  return (
    <div className='bg-gray-50'>
        <Class/>
        <Footers/>
    </div>
  );
}