import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { MusicPlayer } from "./music";

//create your first component
export function Home() {
	return (
		<div>
			<MusicPlayer></MusicPlayer>
		</div>
	);
}
