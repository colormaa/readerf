import logo from './logo.svg';
import './App.css';
import Writer from './components/Writer';

function App() {
  return (
    <div className='w-full h-screen flex flex-col p-5 md:p-10 justify-center item-center'>
      <div className='text-center text-2xl'>English-Mongolian Reader</div>
      <Writer/>
      
    </div>
  );
}

export default App;
