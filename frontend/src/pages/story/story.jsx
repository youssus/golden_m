import React from 'react';
import './story.css';
import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/footer';
import Story1 from '../../pages/story/story1/story1';
import Story2 from '../../pages/story/story2/story2';
import Story3 from '../../pages/story/story3/story3';
import { useTheme } from '../../contexts/ThemeContext';

const StoryPage = () => {
  const { theme } = useTheme();

  return (
    <Layout className={`story-page ${theme}`} allowScroll={true}>
      <div className={`story-page-container ${theme}`}>
        <Navbar />
        <div className={`story-main-content ${theme}`}>
          <Story1 />
          <Story2 />
          <Story3 />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default StoryPage;
