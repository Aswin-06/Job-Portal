import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./component/Login.jsx"
import Home from "./component/Home.jsx"
import ImageShow from "./component/ImageShow.jsx"
import AddJob from "./component/AddJob.jsx"
import Internship from "./component/Internship.jsx"
import Jobs from "./component/Jobs.jsx"
import Intern from "./component/Intern.jsx"
import Job from "./component/Job.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<><Login/></>}/>
        <Route path="/" element={<><Home/></>} />
        <Route path="/add" element={<AddJob/>}/>
        <Route path="/internships" element={<Internship/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="intern/:id" element={<Intern/>}/>
        <Route path="job/:id" element={<Job/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
