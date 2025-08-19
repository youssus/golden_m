import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/home/Home';
import MediaPage from './pages/media/media'; // Import your media page
import StoryPage from './pages/story/story'; // Import StoryPage
import BlogPage from './pages/blog/pages_vlog/main_blog';
import Blog1 from './pages/blog/pages_vlog/blog1'; // Import Blog1
import Blog2 from './pages/blog/pages_vlog/blog2'; // Import Blog2
import Blog3 from './pages/blog/pages_vlog/blog3'; // Import Blog3
import Blog4 from './pages/blog/pages_vlog/blog4'; // Import Blog4
import Blog5 from './pages/blog/pages_vlog/blog5'; // Import Blog5
import Blog6 from './pages/blog/pages_vlog/blog6'; // Import Blog6
import Contact from './pages/contact/contact'; // Import Contact
import './styles/themes.css'; // Import des styles de thème
import HomeServ from './pages/service/home_serv';
import Article from './pages/service/article'; // ou le bon chemin



//admin routes
import LoginAdmin from './admin/pages/loginAdmin'
import Dashboard from './admin/pages/dashboard'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/blog4" element={<Blog4 />} />
        <Route path="/blog5" element={<Blog5 />} />
        <Route path="/blog6" element={<Blog6 />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/service" element={<HomeServ />} />
        <Route path="/article" element={<Article />} />
        <Route path="/dashboard" element={<Dashboard />} />


        
        {/* Admin routes */}
        <Route path='/login' element={<LoginAdmin/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;