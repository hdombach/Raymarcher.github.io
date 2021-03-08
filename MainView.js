import Renderer from "./Rendering/Renderer.js"
import { AttachNumberInputs, AttachMouseInput } from "./Input.js"

class MainView {
    constructor() {
        this.canvas = document.querySelector("#glCanvas");
        this.renderer = new Renderer(this.canvas);
        this.lastTime = 0;

        AttachNumberInputs(this.renderer.info);

        AttachMouseInput(this.renderer.info, document.querySelector("#overlay"));
    }

    render(time) {
        const currentTime = time * 0.001; //convert to seconds
        const delta = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.renderer.drawScene(delta);

        requestAnimationFrame(newFrame);
    }
}

var mainView = new MainView();

function newFrame(time) {
    mainView.render(time);
}

newFrame(0);

window.addEventListener('wheel', (e) => {
    e.preventDefault();
  }, {passive: false} );