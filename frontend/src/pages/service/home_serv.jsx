import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar.jsx';
import Footer from '../../components/Footer/footer.jsx';
import './home_serv.css';

const HomeServ = () => {
		const navigate = useNavigate();
		return (
			<div>
				<Navbar />
				<div className="center-image-btn">
					<button className="image-btn" onClick={() => navigate('/article')}>
						<div className="image-container">
							<img src="/puni.JPG" alt="Punicartoon" className="puni-image" />
							<div className="text-overlay">
								<div className="puni-title">PUNICARTOON</div>
								<div className="puni-subtitle">commance</div>
							</div>
						</div>
					</button>
				</div>
				<Footer />
			</div>
		);
};

export default HomeServ;