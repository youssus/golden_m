import React from 'react';
import { Link } from 'react-router-dom';
import './main_blog.css';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/Footer/footer';

const Blog = () => {
  const articles = [
    {
      id: 1,
      image: "/femme_1_blog.png",
      title: "L'Art de la Renaissance",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      id: 2,
      image: "/femme_2_blog.png",
      title: "Portraits Classiques",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
      id: 3,
      image: "/femme_3_blog.png",
      title: "Maîtres de la Peinture",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.",
    },
    {
      id: 4,
      image: "/femme_4_blog.png",
      title: "Techniques Anciennes",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
    },
    {
      id: 5,
      image: "/femme_5_blog.png",
      title: "Heritage Artistique",
      description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    },
    {
      id: 6,
      image: "/femme_6_blog.png",
      title: "Galerie Moderne",
      description: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    }
  ];

  return (
    <div className="blog-page">
      <Navbar />
      <div className="blog-container">
        {/* Hero Section */}
        <section className="blog-hero">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">Découvrez nos dernières actualités</p>
        </section>

        {/* Description Section */}
        <section className="blog-description">
          <p className="blog-description-text">
            Plongez dans l'univers fascinant de l'art et de la culture à travers nos articles soigneusement sélectionnés. 
            Découvrez les secrets des maîtres, explorez les techniques ancestrales et laissez-vous inspirer par la richesse 
            de notre patrimoine artistique. Chaque article vous invite à un voyage unique au cœur de la créativité humaine, 
            où tradition et modernité se rencontrent pour créer des œuvres d'exception intemporelles.
          </p>
        </section>

        {/* Articles Section */}
        <section className="blog-articles">
          <div className="articles-grid">
            {articles.map(article => (
              <article key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <Link to={`/blog${article.id}`} className="article-link">voir plus</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
