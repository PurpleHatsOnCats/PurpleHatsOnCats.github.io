import * as main from "./main.js";
window.onload = ()=>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	main.loadSettings();

	// 2 - start up app
	main.init();
}