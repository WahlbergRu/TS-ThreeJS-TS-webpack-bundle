import * as THREE from 'three';

export interface IComponentClass {
    new (): IComponent;
}
export interface IComponent {
    update: () => void;
}

export class Game{

    public settings:any = {};
     
    public static camera:THREE.Camera;
    public static scene;
    public static renderer;
        
    public static init(settings){
        //Set settings parameters
        this.settings = settings;

        //Scene
        this.scene = new THREE.Scene()

        //Camera
        let aspect = window.innerWidth / window.innerHeight;
        let d = this.settings.camera.d;
        this.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        this.camera.position.set( d * 8, d * 8, d * 8 ); // all components equal
        this.camera.lookAt( this.scene.position ); // or the origin



        // let gridHelper = new THREE.GridHelper( 10, 10, 0x000000, 0x000000 );
        // this.scene.add( gridHelper );

        let light:THREE.HemisphereLight;
        // light
        light = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
        light.position.set(-d * 10, d * 2, d * 2 );
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
        var component:any = new Component();

        console.log(component);
        // get the name of the class
        var cstr = Component.prototype.constructor.toString();
        var key = cstr.substring(9, cstr.indexOf('('));
        if (component.add){
            component.add(this.settings);
        }

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

