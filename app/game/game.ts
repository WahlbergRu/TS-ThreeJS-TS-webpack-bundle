import * as THREE from 'three';
import {CubicGrid} from "../elements/cubic-grid";
import {Grid} from "../elements/grid";

export interface IComponentClass {
    new (): IComponent;
}
export interface IComponent {
    update: () => void;
}

export class Game{

    private _settings:any;
    public get settings():any {
        return this._settings;
    }
    public set settings(settings:any) {
        this._settings = settings;
    }


    public camera:THREE.Camera;
    public scene;
    public renderer;

    //Render logic
    public animation(){
        window.requestAnimationFrame( this.animation );
        this.update();
    }

    public grid(){

        let cubicGrid = new CubicGrid();
        console.log(cubicGrid.figure);



        // this.components();

        // scene.add( this.cube )
        // Core.component(Cloud);
        // Core.component(FirTree);
        // Core.component(figures);
        // Core.component(Grid);
    }
        
    public init(settings:any){
        //Set settings parameters
        this.settings = settings;

        //Scene
        this.scene = new THREE.Scene();

        //Camera
        let aspect = window.innerWidth / window.innerHeight;
        let d = this._settings.camera.d;
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
        this.animation();
    } 
    
    private components = {};
    public component(Component: IComponentClass) {
        let component:any = new Component();

        console.log(component);
        // get the name of the class
        let cstr = Component.prototype.constructor.toString();
        let key = cstr.substring(9, cstr.indexOf('('));
        if (component.add){
            component.add(this._settings);
        }

        this.components[key] = component;
    } 
    
    public update(){
        for (let prop in this.components){
            let component = this.components[prop];
            component.update();
        }
        this.renderer.render( this.scene, this.camera);   
    }
}

