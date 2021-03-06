import { bottom } from "@popperjs/core";
import React, { useState, useEffect } from "react";
const UrlBase =
	"https://assets.breatheco.de/apis/fake/todos/user/FiorellaCrocco";

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
		{
			let resp = fetch(UrlBase, {
				method: "PUT",
				body: JSON.stringify(lista),
				headers: {
					"Content-Type": "application/json"
				}
			});
		}
	};

	useEffect(() => {
		fetch(UrlBase)
			.then(response => response.json())
			.then(data => guardarLista(data))
			.catch(err => console.log("Problem"));
	}, []);

	useEffect(() => {
        fetch(UrlBase, {
            method: "PUT", // or 'PUT'
            body: JSON.stringify(lista), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log("Problem"));
    }, [lista]);

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
							onKeyDown={async e => {
								if (e.keyCode == "13") {
									let MostrarLista = lista.slice();
									/* for (let i = 0; i < lista.length; i++) {
										MostrarLista.push(lista[i]);
									} */
									MostrarLista.push({
										label: tarea,
										done: false
									});

									let respuesta = await fetch(UrlBase, {
										method: "PUT",
										body: JSON.stringify(MostrarLista),
										headers: {
											"Content-Type": "application/json"
										}
									});

									if (respuesta.ok) {
										guardarLista(MostrarLista);
									}
									guardarTarea((e.target.value = ""));
								}
							}}></textarea>
					</div>
					<ul className="list-group">
						{lista.map((cosas, index) => {
							return (
								<>
									<li
										key={index}
										className="list-group-item list-group-item-info">
										{cosas.label}

										<button
											className="btn btn"
											onClick={e => {
												deleteItems(index);
											}}>
											<i className="fas fa-times float-right"></i>
										</button>
									</li>
									<ul></ul>
								</>
							);
						})}
						<p className="list-group-item list-group-item-info">
							Cantidad de tareas: {lista.length}
						</p>

						<button
							className="btn btn"
							onClick={e => {
								{
									let delet = fetch(UrlBase, {
										method: "DELETE",
										body: JSON.stringify([]),
										headers: {
											"Content-Type": "application/json"
										}
									});
								}
							}}>
							Eliminar
						</button>

						<button
							className="btn btn"
							onClick={e => {
								{
									let nuev = fetch(UrlBase, {
										method: "POST",
										body: JSON.stringify([]),
										headers: {
											"Content-Type": "application/json"
										}
									});
								}
							}}>
							Crear usuario
						</button>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Home;
