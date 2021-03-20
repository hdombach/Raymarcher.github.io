


/**
 * Handles retreiving shader files and importing correct functions.
 * NOTE: can only import one shader at a time
 */
class RenderShaderCompiler {
  constructor() {
    this.xhttp = new XMLHttpRequest();
    this._importedFiles = [];
  }

  /**
   * Retreives shader from source url and improts any functions that are required.
   * @param {String} url 
   */
  compileShader(url, onCompletion) {
    //reset the list of improted files
    this._importedFiles = [];

    this.compileFile(url, onCompletion, true);
  }



  /**
   * Imports functions of a paticular file
   * @param {String} url the urls of the shader to compile
   * @param {Function} onCompletion the functions to be run on completion. Constains the compiled code
   */
  compileFile(url, onCompletion, isAsync) {
    const request = new XMLHttpRequest();
    request.open("GET", url, isAsync);
    var compiler = this;
    console.log(url);

    request.addEventListener("load", function() {
      var searchRegExp = /(?:IMPORT )[^\n]*/g;
      var str = this.responseText;
      var matches = [...str.matchAll(searchRegExp)]
      matches.sort((a, b) => b.index - a.index)

      for (const match of matches) {
        const currentUrl = String(match).slice(7, match[0].length);

        if (!compiler._importedFiles.includes(currentUrl)) {
          compiler._importedFiles.push(currentUrl);
          var spliceIndex = match.index + match[0].length;

          var subStr = "";
  
          compiler.compileFile(currentUrl, function(compiled) {
            subStr = compiled;
          }, false);
          str = str.slice(0, spliceIndex) + "\n" + subStr + str.slice(spliceIndex);
        }
      }

      onCompletion(str);
    })

    request.send();
  }

  
}

export default RenderShaderCompiler;