import * as THREE from 'three';
import {CubicGrid} from "../elements/cubic-grid";
import {Grid} from "../elements/grid";
import {HeightMap} from "../editor/heightmap";
import {IGEOJson} from "../types";
import {Api} from "../api/api";

export class Game{

    //Set settings parameters
    private _settings:any;
    public get settings():any {
        return this._settings;
    }
    public set settings(settings:any) {
        this._settings = settings;
    }


    public camera:THREE.Camera;
    public scene:THREE.Scene;
    public renderer:THREE.WebGLRenderer;

    public grid(){
        let grid = new Grid();
        grid.addGeometry(this.settings);
        this.scene.add( grid.figure );
    }

    public cubicGrid(){
        let cubicGrid = new CubicGrid();
        cubicGrid.addGeometry(this.settings);
        this.scene.add( cubicGrid.figure );
    }

    public axis(){
    }

    public heightMap(){
        let heightMap = new HeightMap();

        // terrain
        let img: any = new Image();
        //TODO: сделать добавление без рекваер
        //TODO: вынести, смерджить с настройками
        img.src = require("../assets/images/heightmap/heightmap_128.jpg");

        heightMap
            .parseImageToGeo(img)
            .then((res:number[][]) => {
                let geoJsonObject:IGEOJson = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            res
                        ]
                    },
                    "properties": {
                        "name": "Ocean"
                    }
                };

                // console.log(vertices);

                let holes = [];
                let triangles, mesh;
                let geometry = new THREE.PlaneGeometry(img.width, img.height, img.width-1, img.height-1);
                let material = new THREE.MeshPhongMaterial( {
                    color: 0xfff,
                    shading: THREE.FlatShading
                } );

                for( let i = 0; i < res.length; i++ ){
                    geometry.vertices[i].setZ(res[i][2]/10);
                }

                let objectPG = THREE.SceneUtils.createMultiMaterialObject( geometry, [material] );

                let parent = new THREE.Object3D();
                objectPG.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2) );
                parent.add(objectPG);

                this.scene.add(parent);

                return geoJsonObject;
            })
            .then((geoObj)=>{
                let options = {body: geoObj};
                return new Api().points(options);
            })
            .then((response)=>{
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });

    }
        
    public init(){
        //Scene
        this.scene = new THREE.Scene();

        //Camera
        let aspect = window.innerWidth / window.innerHeight;
        let d = this._settings.camera.d;
        this.camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );
        this.camera.position.set( d * 8, d * 8, d * 8 ); // all components equal
        this.camera.lookAt( this.scene.position ); // or the origin

        let gridHelper = new THREE.GridHelper( 10 * d, 10 * d, 0xfff, 0xfff );
        this.scene.add( gridHelper );

        // light
        let light:THREE.HemisphereLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
        light.position.set(-d * 10, d * 2, d * 2 );
        this.scene.add( light );

        //Render
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight ) ;

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.renderReverseSided = false;

        document.body.appendChild( this.renderer.domElement ) ;
        this.modelObseverable();
    }

    public modelObseverable(){
        // this.cubicGrid();
        // this.grid();
        this.heightMap();
        this.axis();


        this.animation();
    }

    //Render logic
    public animation(){
        function callbackAnimation(context){
            context.animation();
        }

        window.requestAnimationFrame(callbackAnimation.bind(null, this));
        this.renderer.render( this.scene, this.camera);
    }

}

