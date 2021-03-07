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
            viewInfo.cameraRotationX += event.movementX;
            viewInfo.cameraRotationY += event.movementY;

            viewInfo.cameraRotationDeltaX = event.movementX;
            viewInfo.cameraRotationDeltaY = event.movementY * -1;
        }
    }

    element.onwheel = function(event) {
        var movement = vec3.create();
        vec3.set(movement, 0, 0, 1);

        var conj = quat.create();

        quat.conjugate(conj, viewInfo.quaternion);

        vec3.transformQuat(movement, movement, conj);


        vec3.scale(movement, movement, event.deltaY * -0.01);


        viewInfo.cameraPositionX += movement[0];
        viewInfo.cameraPositionY += movement[1];
        viewInfo.cameraPositionZ += movement[2];
    }
}