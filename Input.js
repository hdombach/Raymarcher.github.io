export function AttachNumberInputs(viewInfo) {
    var inputs = document.getElementsByClassName("numberinput");

    var info = viewInfo;

    for (const input of inputs) {
        input.value = info[input.id];
        input.onchange = function(event) {
            info[input.id] = input.value;
        };
    }
}

export function AttachMouseInput(viewInfo, element) {
    var isMouseDown = false;


    element.onmousedown = function(event) {
        isMouseDown = true;
    }

    element.onmouseup = function(event) {
        isMouseDown = false;
    }

    element.onmouseleave = function(event) {
        isMouseDown = false;
    }

    element.onmousemove = function(event) {
        if (isMouseDown) {

            var movement = vec3.create();
            vec3.set(movement, event.movementX * -0.003, event.movementY * 0.003, 0);

            if (event.shiftKey) {
                vec3.scale(movement, movement, -0.5);
                viewInfo.rotateCamera(movement);
            } else {
                viewInfo.moveCamera(movement);
            }
        }
    }

    element.onwheel = function(event) {

        if (event.ctrlKey || event.shiftKey) {

            //move camera foward

            var movement = vec3.create();
            vec3.set(movement, 0, 0, event.deltaY * -0.01);
    
            viewInfo.moveCamera(movement);
        } else {

            

            var movement = vec2.create();
            vec2.set(movement, event.deltaX * -0.001, event.deltaY * 0.001);
    
            viewInfo.rotateCamera(movement);
            
        }
    }
}