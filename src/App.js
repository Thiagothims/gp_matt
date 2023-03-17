import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import Container from './components/layout/Container';
import Projects from './components/pages/Projects';


function App() {
    return (
        <BrowserRouter>

        <NavBar/>

        <Container customClass='min_heigth'>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/company" element={<Company/>}></Route>
                <Route exact path="/newproject" element={<NewProject/>}></Route>
                <Route exact path="/projects" element={<Projects/>}></Route>
                <Route exact path="/contact" element={<Contact/>}></Route>
            </Routes>
        </Container>
        
        <Footer/>

        </BrowserRouter>
    )
}

export default App;
