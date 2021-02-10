import React from "react";

export class MusicPlayer extends React.Component {
	constructor() {
		super();
		this.state = {
			datos: [],
			play: false,
			url: "",
			posicion: null
		};
		(this.player = null), (this.Play = this.Play.bind(this));
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				this.setState({ datos: data });
			});
	}
	Play(i) {
		let url = this.state.datos[i].url;
		let posicion = i;
		this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
		this.player.play();
		this.setState({ url: url, play: true, posicion: posicion });
	}

	Backwards() {
		if (this.state.posicion > 0) {
			let posicion = this.state.posicion - 1;
			let url = this.state.datos[posicion].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, posicion: posicion, play: true });
		} else {
			let posicion = this.state.datos.length - 1;
			let url = this.state.datos[posicion].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, posicion: posicion, play: true });
		}
	}

	PausePlay() {
		if (this.state.posicion == null) {
			this.Play(0);
		} else {
			let play = !this.state.play;
			play ? this.player.play() : this.player.pause();
			this.setState({ play: play });
		}
	}
	Forward() {
		if (this.state.posicion < this.state.datos.length - 1) {
			let posicion = this.state.posicion + 1;
			let url = this.state.datos[posicion].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, posicion: posicion, play: true });
		} else {
			let posicion = 0;
			let url = this.state.datos[posicion].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, posicion: posicion, play: true });
		}
	}
	CambiarSimbolo() {
		let simbolo = this.state.play
			? "fas fa-pause-circle fa-2x"
			: "fas fa-play-circle fa-2x";
		return simbolo;
	}

	render() {
		return (
			<div>
				{this.state.datos.map((song, i) => {
					return (
						<div
							className=" canciones btn btn-dark btn-lg d-flex row"
							key={i}
							onClick={() => this.Play(i)}>
							<div className="col-2 text-center">{song.id}</div>
							<div className="col-10 ">{song.name}</div>
						</div>
					);
				})}
				<audio ref={t => (this.player = t)} type="audio/mpeg"></audio>
				<div id="espacio"></div>
				<div className="barra fixed-bottom d-flex justify-content-around align-items-center">
					<div>
						<i
							className="fas fa-step-backward"
							onClick={() => this.Backwards()}></i>
					</div>
					<div>
						<i
							className={this.CambiarSimbolo()}
							onClick={() => this.PausePlay()}></i>
					</div>
					<div>
						<i
							className="fas fa-step-forward"
							onClick={() => this.Forward()}></i>
					</div>
				</div>
			</div>
		);
	}
}
