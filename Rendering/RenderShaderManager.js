

/**
 * Shader library manages all the shaders that will be used by the gpu
 * 
 * @constructor
 * 
 * @param {gl} gl The webgl context
 * 
 * 
 */
class RenderShaderManager {
		constructor(gl) {
				this.gl = gl;


				//shaders
				this.defaultVertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);

				this.errorFragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

				this.mainFragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);


				
				//set default shaders
				this.defaultVertexShaderSource = `
					attribute vec2 vertPosition;

					varying lowp vec2 vecPosition;
					
					void main() {
						gl_Position = vec4(vertPosition, 0, 1);
						vecPosition = vertPosition;
					}
				`

				this.errorFragmentShaderSource = `
					varying lowp vec2 vecPosition;

					void main() {
						gl_FragColor = vec4(1, 1, 1, 0);
					}
				`

				
		}

		/**
		 * compiles a shader
		 * 
		 * @private
		 * 
		 * @param {Shader} shader The shader to be compiled to
		 * @param {String} source Source code of the shader
		 */
		compile(shader, source) {
				this.gl.shaderSource(shader, source);
				this.gl.compileShader(shader);

				if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
					console.log("An error occured while compiling a shader");
					console.log("Source: \n" + this.gl.getShaderSource(shader));
					console.log("Error: " + this.gl.getShaderInfoLog(shader));
					this.gl.deleteShader(shader);
				  }
		}


		set defaultVertexShaderSource(source) {
				this.compile(this.defaultVertexShader, source);
		}
		set errorFragmentShaderSource(source) {
				this.compile(this.errorFragmentShader, source);
		}
		set mainFragmentShaderSource(source) {
			this.compile(this.mainFragmentShader, source);
		}

}

export default RenderShaderManager;