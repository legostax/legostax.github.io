var vertexShaderText = `precision mediump float;
attribute vec3 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
void main(){
    fragColor = vertColor;
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 0.0, 1.0);
}
`

var fragmentShaderText = `precision mediump float;
varying vec3 fragColor;
void main(){
    gl_FragColor = vec4(fragColor, 1.0);
}
`

var initDemo = function(){
    var canvas = document.getElementById("game-surface");
    var gl = canvas.getContext("webgl");

    if(!gl)
        gl = canvas.getContext("experimental-webgl");

    if(!gl)
        alert("Your browser doesn't support WebGL. Go get a different one.");

    /*canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,canvas.width,canvas.height)*/

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.error("error", gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        console.error("error", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error("program error", gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.error("validate error", gl.getProgramInfoLog(program));
        return;
    }

    // Buffer

    var triangleVertices = [ // each line is 1 point (X,Y), then RGB
        0.0, 0.5, 0.0,    1.0, 1.0, 0.0,
        -0.5, -0.5, 0.0,  0.7, 0.0, 1.0,
        0.5, -0.5, 0.0,  0.1, 1.0, 0.6
    ];
    var triangleVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
	
	var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	mat4.identity(worldMatrix);
	mat4.identity(viewMatrix);
	mat4.identity(projMatrix);
	
	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE);
	
    // Main render loop

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};
