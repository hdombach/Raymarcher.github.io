import ViewInfo from "../Types/ViewInfo.js";
import RenderProgramManager from "./RenderProgramManager.js";

/**
 * Sets up and draws the render pipeline.
 * 
 * @param {canvas} canvas
 * 
 */
class Renderer {
    constructor(canvas, keyTracker) {
        this.canvas = canvas;
        
        this.gl = canvas.getContext("webgl");
        
        this.programManager = new RenderProgramManager(this.gl);

        this.info = new ViewInfo();

        this.keyTracker = keyTracker;

        if (this.gl === null) {
            alert("Your browser does not support webgl");
            return;
        }

        this.gl.clearColor(0.0, 0.0, 0.0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.squareBuffer = this.createSquareBuffer();
    }

    /**
     * Renders the scene
     * @param {Number} delta 
     */
    drawScene(delta) {
        this.resize();

        this.bindSquareBuffer(this.squareBuffer);
        this.bindUniforms();
        this.gl.useProgram(this.programManager.info.program);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    resize() {
        const width = Math.floor(this.canvas.clientWidth * this.info.resolutionMultiplier / 100);
        const height = Math.floor(this.canvas.clientHeight * this.info.resolutionMultiplier / 100);

        if (this.canvas.width != width || this.canvas.height != height) {
            console.log("resized");
            this.canvas.width = width;
            this.canvas.height = height;

            this.info.cameraResolutionX = width;
            this.info.cameraResolutionY = height;

            this.gl.viewport(0, 0, width, height);
        }
    }

    handleInputs() {
        var movement = vec3.create();
        var speed = 0.01;


        if (this.keyTracker.testKey("a")) {
            movement[0] -= speed;
        }
        if (this.keyTracker.testKey("d")) {
            movement[0] += speed;
        }
        if (this.keyTracker.testKey("q")) {
            movement[1] -= speed;
        }
        if (this.keyTracker.testKey("e")) {
            movement[1] += speed;
        }
        if (this.keyTracker.testKey("s")) {
            movement[2] -= speed;
        }
        if (this.keyTracker.testKey("w")) {
            movement[2] += speed;
        }

        this.info.moveCamera(movement);

        this.info.update();
    }

    /**
     * Binds the buffer as if it were four vertices creating a square. Has to be called every frame.
     * @param {ArrayBuffer} buffer 
     */
    bindSquareBuffer(buffer) {
        const numComponents = 2;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(
            this.programManager.info.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);

        this.gl.enableVertexAttribArray(
            this.programManager.info.attribLocations.vertexPosition);
    }

    bindUniforms() {
        if ("uniformLocations" in this.programManager.info) {
            this.handleInputs();

            this.gl.uniform4f(this.programManager.info.uniformLocations.cameraPosition,
                this.info.cameraPositionX, this.info.cameraPositionY,
                this.info.cameraPositionZ, 0);

            this.gl.uniform1f(this.programManager.info.uniformLocations.cameraZoom,
                this.info.cameraZoom);
            
            this.gl.uniformMatrix4fv(this.programManager.info.uniformLocations.cameraMatrix,
                false, this.info.cameraMatrix);

            this.gl.uniform1f(this.programManager.info.uniformLocations.exposure,
                this.info.exposure);

            this.gl.uniform2f(this.programManager.info.uniformLocations.cameraResolution,
                this.info.cameraResolutionX, this.info.cameraResolutionY)

            this.gl.uniform1i(this.programManager.info.uniformLocations.maxMarches,
                this.info.maxMarches);

            this.gl.uniform1f(this.programManager.info.uniformLocations.stepClamp,
                this.info.stepClamp);

            this.gl.uniform1i(this.programManager.info.uniformLocations.bulbIterations,
                this.info.bulbIterations);
        }
    }

    /**
     * Creates a vertex buffer containing four vertices
     */
    createSquareBuffer() {
        const positionBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

        const positions = [
            1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, -1.0,
        ];

        //pass positions to webgl
        this.gl.bufferData(this.gl.ARRAY_BUFFER,
            new Float32Array(positions),
            this.gl.STATIC_DRAW);

        return positionBuffer;
    }
}

export default Renderer; 