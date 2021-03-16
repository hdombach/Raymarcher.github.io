import RenderShaderManager from "./RenderShaderManager.js";
import RenderShaderCompiler from "./RenderShaderCompiler.js";

/**
 * A library that contains all programs used by the gpu
 */
class RenderProgramManager {
    constructor(gl) {
        this.gl = gl;

        this.shaderManager = new RenderShaderManager(gl);
        this.shaderCompiler = new RenderShaderCompiler();

        this.info = new Object();

        this.mainProgram;
        //this.loadMainProgram();

        this.defaultProgram;
        this.loadDefaultProgram();

        this.useDefaultProgram();
        
        {
            var self = this;
            this.shaderCompiler.compileFile("./Rendering/Shaders/main.glsl", function(compiled) {

                self.shaderManager.mainFragmentShaderSource = compiled;
                self.loadMainProgram(self);
                self.useMainProgram(self);
            }, true);
        }
    }

    


    /**
     * 
     */
    useDefaultProgram() {
        /* Format
        this.info = {
            program: this.defaultProgram,
            attribLocations: {
                vertexPosition: this.gl.getAttribLocation(this.defaultProgram, "vertPosition")
            },
            uniformLocations: {

            }
        }
        */
       
        this.info.program = this.defaultProgram;
        if (!("attribLocations" in this.info)) {
            this.info.attribLocations = new Object();
        }
        this.info.attribLocations.vertexPosition = this.gl.getAttribLocation(this.defaultProgram, "vertPosition");
    }

    loadDefaultProgram() {
        //delete the old if it is still around
        this.gl.deleteProgram(this.defaultProgram);

        this.defaultProgram = this.gl.createProgram();

        this.gl.attachShader(this.defaultProgram, this.shaderManager.defaultVertexShader);
        this.gl.attachShader(this.defaultProgram, this.shaderManager.errorFragmentShader);

        this.gl.linkProgram(this.defaultProgram);

        if (!this.gl.getProgramParameter(this.defaultProgram, this.gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(this.defaultProgram);
            console.log("ERROR: ");
            console.log(info);
            //error
        }
    }

    useMainProgram(self) {
        /* Format:
        self.info = {
            program: self.mainProgram,
            attribLocations: {
                vertexPosition: self.gl.getAttribLocation(self.mainProgram, "vertPosition")
            },
            uniformLocations: {
                cameraPosition: self.gl.getUniformLocation(self.mainProgram, "cameraPosition"),
                cameraZoom: self.gl.getUniformLocation(self.mainProgram, "cameraZoom"),
                cameraMatrix: self.gl.getUniformLocation(self.mainProgram, "cameraMatrix"),
                cameraResolution: self.gl.getUniformLocation(self.mainProgram, "cameraResolution"),
                exposure: self.gl.getUniformLocation(self.mainProgram, "exposure")
            }
        }*/

        self.info.program = self.mainProgram;
        //attribultes
        self.info.attribLocations.vertexPosition = self.gl.getAttribLocation(self.mainProgram, "vertPosition");
        //uniforms
        if (!("uniformLocations" in self.info)) {
            self.info.uniformLocations = new Object()
        }
        self.info.uniformLocations.cameraPosition = self.gl.getUniformLocation(self.mainProgram, "cameraPosition");
        self.info.uniformLocations.cameraZoom = self.gl.getUniformLocation(self.mainProgram, "cameraZoom");
        self.info.uniformLocations.cameraMatrix = self.gl.getUniformLocation(self.mainProgram, "cameraMatrix");
        self.info.uniformLocations.cameraResolution = self.gl.getUniformLocation(self.mainProgram, "cameraResolution");
        self.info.uniformLocations.exposure = self.gl.getUniformLocation(self.mainProgram, "exposure");
        self.info.uniformLocations.maxMarches = self.gl.getUniformLocation(self.mainProgram, "maxMarches");
        self.info.uniformLocations.stepClamp = self.gl.getUniformLocation(self.mainProgram, "stepClamp");
        self.info.uniformLocations.bulbIterations = self.gl.getUniformLocation(self.mainProgram, "bulbIterations");
        self.info.uniformLocations.ambientOcclusion = self.gl.getUniformLocation(self.mainProgram, "ambientOcclusion");
    }

    loadMainProgram(self) {
        //delete old if it is still around
        self.gl.deleteProgram(self.mainProgram);

        self.mainProgram = self.gl.createProgram();

        self.gl.attachShader(self.mainProgram, self.shaderManager.defaultVertexShader);
        self.gl.attachShader(self.mainProgram, self.shaderManager.mainFragmentShader);

        self.gl.linkProgram(self.mainProgram);

        if (!self.gl.getProgramParameter(self.mainProgram, self.gl.LINK_STATUS)) {
            var info = self.gl.getProgramInfoLog(self.mainProgram);
            console.log("ERROR");
            console.log(info);
            //error
        }
    }
}

export default RenderProgramManager;