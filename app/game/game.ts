import * as THREE from 'three';

export interface IComponentClass {
    new (): IComponent;
}
export interface IComponent {
    update: () => void;
}

export class Game{
     
    public static camera:THREE.Camera;
    public static scene;
    public static renderer;
        
    public static init(){

        //Scene
        this.scene = new THREE.Scene()

        //Camera
        let aspect = window.innerWidth / window.innerHeight;
        let d = 50;
        this.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        this.camera.position.set( 400, 400, 400 ); // all components equal
        this.camera.lookAt( this.scene.position ); // or the origin


        // let gridHelper = new THREE.GridHelper( 10, 10, 0x000000, 0x000000 );
        // this.scene.add( gridHelper );

        // light
        let light = new THREE.HemisphereLight( 0xc2f1ee, 0x0065b0, 1 ); // soft white light
        light.position.set(-500, 100, 100);
        this.scene.add( light );

        //Render
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight ) ;

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.renderReverseSided = false;

        document.body.appendChild( this.renderer.domElement ) ;
        animation();   
    } 
    
    private static components = {};
    public static component(Component: IComponentClass) {
        var component = new Component();

        // get the name of the class
        var cstr = Component.prototype.constructor.toString();
        var key = cstr.substring(9, cstr.indexOf('('));
        
        this.components[key] = component;
    } 
    
    public static update(){
        for (var prop in this.components){
            var component = this.components[prop];
            component.update();
        }
        this.renderer.render( this.scene, this.camera);   
    }
}

// main logic/render loop
function animation() {
    window.requestAnimationFrame( animation );
    Game.update();
}

