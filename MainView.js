import Renderer from "./Rendering/Renderer.js"
import { AttachNumberInputs, AttachMouseInput, AttachKeyInput, AttachCloseButtons} from "./Input.js"

class MainView {
    constructor() {
        this.keyTracker = new Object();
        console.log(this.keyTracker)
        this.canvas = document.getElementById("glCanvas");
        this.renderer = new Renderer(this.canvas, this.keyTracker);
        this.lastTime = 0;

        AttachKeyInput(this.keyTracker);

        AttachNumberInputs(this.renderer.info);

        AttachMouseInput(this.renderer.info, this.canvas);

        
        /*const menu = document.getElementById("qualityMenu");
        document.getElementById("collapseButton").onclick = function() {
            menu.classList.toggle("collapsed");
        };*/

        AttachCloseButtons();

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