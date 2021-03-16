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

export function AttachMinimizeButtons() {
    var menus = document.getElementsByClassName("menu");

    for (const menu of menus) {
        
        menu.children.namedItem("collapseButton").onclick = function() {
            menu.style.height = null;
            menu.classList.toggle("collapsed");
        }
    }
}

export function AttachCloseButtons() {
    var menus = document.getElementsByClassName("menu");

    for (const menu of menus) {
        menu.children.namedItem("closeBtn").onclick = function() {
            menu.style.visibility = "hidden";
            menu.style.display = "none";
        }
    }
}

export function AttachKeyInput(keyTracker) {
    keyTracker.testKey = function(key) {
        if (this[key] === undefined) {
            return false;
        } else {
            return this[key];
        }
    }

    window.onkeydown = function(event) {
        keyTracker[event.key] = true;
    }

    window.onkeyup = function(event) {
        keyTracker[event.key] = false;
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
                viewInfo.moveCamera(movement);
            } else {
                vec3.scale(movement, movement, -0.5);
                viewInfo.rotateCamera(movement);
            }
        }
    }

    element.addEventListener('wheel', (event) => {
        event.preventDefault();
        if (event.ctrlKey || event.shiftKey) {

            //move camera foward

            var movement = vec3.create();
            vec3.set(movement, 0, 0, (event.deltaY + event.deltaX) * -0.01);
    
            viewInfo.moveCamera(movement);
        } else {

            

            var movement = vec2.create();
            vec2.set(movement, event.deltaX * -0.001, event.deltaY * 0.001);
    
            viewInfo.rotateCamera(movement);
            
        }
    }, {passive: false} );
}