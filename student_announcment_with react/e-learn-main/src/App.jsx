import './App.css'
import Sidebar from './components/sidebar';
import Header from './components/header';
import img1 from './assets/images/Untitled-65.png'
import img2 from './assets/images/Untitled-4.png'
import Announcements from './pages/Announcements';
function App() {
  let lang = localStorage.getItem('lang');
  return (
    <body dir={`${lang == "ar" ? "rtl" : "ltr"}`}>
          <div  className='page'>
          <img className={`logo${lang == "ar" ? "Ar" : "En" }`} src={img1} alt="" />
            <img className={`logo-responsive${lang == "ar" ? "Ar" : "En" }`} src={img2}  alt="" />
            <Sidebar/> 
            <div className='content'>
                 <Header/>
                 <Announcements/>
            </div>
        </div>
    </body>
  )
}

export default App
