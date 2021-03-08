class ViewInfo {
    constructor() {
        this.cameraPositionX = 0;
        this.cameraPositionY = 0.001;
        this.cameraPositionZ = -4.001;

        this.cameraZoom = 1.5;
        
        this.cameraResolutionX = 480;
        this.cameraResolutionY = 360;

        this.cameraRotationX = 0;
        this.cameraRotationY = 0;
        this.cameraRotationZ = 0;

        this.cameraRotationDeltaX = 0;
        this.cameraRotationDeltaY = 0;
        
        this.cameraMatrix = mat4.create();

        this.exposure = 1;

        this.quaternion = quat.create();

        this.resolutionMultiplier = 25;

        this.bulbIterations = 20;
        this.maxMarches = 100;
        this.stepClamp = 0.0001;

    }

    get cameraPostion() {
        var out = vec4.create();
        out.set(this.cameraPositionX, this.cameraPositionY, this.cameraPositionZ, 0);
    }

    update() {
        if((this.cameraRotationDeltaX != 0 || this.cameraRotationDeltaY != 0)) {
            var rotationStart = vec3.create();
            var rotationEnd = vec3.create();

            vec3.set(rotationStart, 0, 0, 1);
            vec3.set(rotationEnd, this.cameraRotationDeltaX, this.cameraRotationDeltaY, 1);
            vec3.normalize(rotationEnd, rotationEnd);

            var angle = Math.acos(vec3.dot(rotationStart, rotationEnd));

            var rotationAxis = vec3.create();
            vec3.cross(rotationAxis, rotationStart, rotationEnd);
            vec3.normalize(rotationAxis, rotationAxis);

            var rotationQuat = quat.create();
            quat.setAxisAngle(rotationQuat, rotationAxis, angle);

            quat.multiply(this.quaternion, rotationQuat, this.quaternion);

            quat.normalize(this.quaternion, this.quaternion);

            this.cameraRotationDeltaX = 0;
            this.cameraRotationDeltaY = 0;
    
            mat4.fromQuat(this.cameraMatrix, this.quaternion);

        }
    }

    rotateCamera(direction) {
        this.cameraRotationDeltaX = direction[0];
        this.cameraRotationDeltaY = direction[1];
    }

    moveCamera(direction) {
        var conj = quat.create();


        quat.conjugate(conj, this.quaternion);

        vec3.transformQuat(direction, direction, conj);


        this.cameraPositionX += direction[0];
        this.cameraPositionY += direction[1];
        this.cameraPositionZ += direction[2];
    }
}

export default ViewInfo;