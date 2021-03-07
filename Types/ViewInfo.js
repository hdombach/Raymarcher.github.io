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
            vec3.set(rotationEnd, this.cameraRotationDeltaX * 0.001, this.cameraRotationDeltaY * 0.001, 1);
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
}

export default ViewInfo;