import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import Container from './components/layout/Container';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';


function App() {
    return (
        <BrowserRouter>

        <NavBar/>

        <Container customClass='min_heigth'>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/company" element={<Company/>}/>
                <Route path="/newproject" element={<NewProject/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/project/:id" element={<Project/>}/>
            </Routes>
        </Container>
        
        <Footer/>

        </BrowserRouter>
    )
}

export default App;
