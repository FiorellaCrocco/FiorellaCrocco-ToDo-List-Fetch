import { bottom } from "@popperjs/core";
import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, guardarTarea] = useState("");
	const [lista, guardarLista] = useState([]);
	const deleteItems = indexItem => {
		guardarLista(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};

	return (
		<>
			<div className="container text-center mt-5">
				<h1>To do</h1>
				<div className="input-group mb-3 text-center d-block ">
					<div className="form-group p-3 .bg-info">
						<label htmlFor="exampleFormControlTextarea1"></label>{" "}
						<textarea
							className="form-control"
							id="exampleFormControlTextarea1"
							rows="3"
							value={tarea}
							onChange={e => {
								guardarTarea(e.target.value);
							}}
							type="text"
							onKeyDown={e => {
								if (e.keyCode == "13") {
									let MostrarLista = [];
									for (let i = 0; i < lista.length; i++) {
										MostrarLista.push(lista[i]);
									}
									MostrarLista.push(tarea);
									guardarLista(MostrarLista);
									guardarTarea((e.target.value = ""));
								}
							}}>
							{/* onChange=
							{e => {
								guardarTarea(e.target.value);
							}}
							type="text" */}
						</textarea>
					</div>
					<ul className="list-group">
						{lista.map((cosas, index) => {
							return (
								<>
									<li
										key={index}
										className="list-group-item list-group-item-info">
										{cosas}

										<button
											className="btn btn"
											onClick={e => {
												deleteItems(index);
											}}>
											<i className="fas fa-times float-right"></i>
										</button>
									</li>
								</>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
