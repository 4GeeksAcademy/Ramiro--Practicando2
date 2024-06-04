import React, { useContext } from "react";
import { Context } from '../store/appContext';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export const Footer = () => {
	const { store } = useContext(Context);

	return (
		<div>
			<footer>
				<section className="d-flex justify-content-center justify-content-lg-between p-2 border-bottom" style={{ backgroundColor: '#18BEBE' }}>
					<div className="mx-auto d-flex justify-content-center grid gap-3 align-items-center">
						<div type="button" className="btn btn-link">
							<a href="https://www.instagram.com">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-instagram" viewBox="0 0 16 16">
									<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
								</svg>
							</a>
						</div>
						<div type="button" className="btn btn-link">
							<a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F%3Flocale%3Des_LA">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-facebook" viewBox="0 0 16 16">
									<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
								</svg>
							</a>
						</div>
						<div type="button" className="btn btn-link">
							<a href="https://www.whatsapp.com/?lang=es_LA">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-whatsapp" viewBox="0 0 16 16">
									<path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.133.033-.247-.016-.346-.05-.099-.445-1.073-.61-1.47-.161-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
								</svg>
							</a>
						</div>
						<div >
							<button type="button" className="btn btn-link" >
								<a href="https://www.linkedin.com/login/es">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-linkedin" viewBox="0 0 16 16">
										<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
									</svg>
								</a>
							</button>
						</div>
					</div>
				</section>

				<section>
					<div className="container text-center text-md-start mt-3">
						<div className="row mt-3">
							<div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 text-center">
								<h5 className="text-uppercase fw-bold mb-4" style={{ color: '#3A6F99' }}>Start Learning Now</h5>
								<Container className="d-flex justify-content-center">
									<Row>
										<Col xs={12} md={12}>
											<Image src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717466005/logo_altas_dib_sin_fondo_prrntr.png" rounded className="img-fluid logo" />
										</Col>
									</Row>
								</Container>
							</div>

							<div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
								<h5 className="text-uppercase fw-bold mb-4" style={{ color: '#165D95' }}>Categories</h5>
								{store?.category?.length === 0 ? (
									"No hay Category Cargada"
								) : (
									store?.category?.map((item, index) => (
										<div className="row" key={index}>
											<div className="col"><strong>{item.titleCategory}</strong></div>
											<div className="col">{item.subCategory}</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</section>

				<div className="text-center p-3" style={{ backgroundColor: '#F6CA1F' }}>
					© Copyright: Atlas E-learning, 2024
				</div>
			</footer>
		</div>
	);
};
