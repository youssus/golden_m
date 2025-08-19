import React, { useEffect } from 'react';
import './blog2.css';
import Navbar from '../../../components/blog_navbar/blognav';
import Footer from '../../../components/Footer/footer';
import BlogNav from '../../../components/blog_navbar/blognav';
import Suggestions from './Suggestions';

const Blog1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog1-page">
      <BlogNav />
      
      {/* Header Section */}
      <section className="blog1-header-section">
        <div className="header-content">
          <div className="header-text">
            <h1 className="main-title">
               <span className="blue-text"> The Woman</span>
            </h1>
            <p className="intro-text">
              adipiscing elit, sed diam nonummy nibh sed diam nonummy nibh sed diam nonummy nibhsed diam nonummy .
              nibh sed diam nonummy nibhsed diam nonummy .
            </p>
          </div>
          <div className="header-image">
            <img src="/femme_2_blog.png" alt="The Woman" className="portrait-image" />
          </div>
        </div>
      </section>

      {/* Content Section with lettrine */}
      <section className="content-section">
        <div className="paragraph-container">
          <p className="paragraph-with-lettrine">
            <span className="lettrine">A</span>dipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniamadiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex
          </p>
        </div>
      </section>

      {/* Nouvelle section avec l'image blog1_img2 */}
      <section className="second-image-section">
        <div className="second-image-container">
          <img src="/blog1_2img.png" alt="Group illustration" className="second-image" />
          <div className="blue-text-section">
            <p className="blue-caption">
              consectetuercing elit, sed diam nonummy nibh euismconsectetuer adipiscing elit, sed euismconsectetuer adipiscing elit, sed
            </p>
          </div>
          <div className="content-below-image">
            <p className="regular-paragraph">
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur <strong>adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo</strong>
            </p>
            <p className="regular-paragraph">
              consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo
            </p>
            <p className="regular-paragraph">
              consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo
            </p>
          </div>
        </div>
      </section>

      <section className="third-image-section">
        <div className="third-image-container">
          <img src="/blog1_img3.png" alt="Group illustration" className="second-image" />
          <div className="blue-text-section">
            <p className="blue-caption">
              consectetuercing elit, sed diam nonummy nibh euismconsectetuer adipiscing elit, sed euismconsectetuer adipiscing elit, sed
            </p>
          </div>
          <div className="content-below-image">
            <p className="regular-paragraph">
              adipiscing elit, sed diam nonummy nibh euismod . Ut wisi enim ad minim veniam,   consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis  elit, sed diam nonummy nibh  magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur <strong>adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo</strong>
            </p>
            <p className="regular-paragraph">
              consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo
            </p>
            <p className="regular-paragraph">
              consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorperz suscipit lobortis nisl ut aliquip ex ea commodo
            </p>
          </div>
        </div>
      </section>

    <Suggestions />
    <Footer />
    </div>
  );
};

export default Blog1;