import * as THREE from 'three';
import {OBJLoader} from '../objloader'

import {CubicGrid} from "../elements/cubic-grid";
import {Grid} from "../elements/grid";

import {HeightMap} from "../editor/heightmap";

import {IGEOJson, HeightMapOptions} from "../types";
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

    // TODO: вынести в отдельный модуль
    // public grid(){
    //     let grid = new Grid();
    //     grid.addGeometry(this.settings);
    //     this.scene.add( grid.figure );
    // }
    //
    // public cubicGrid(){
    //     let cubicGrid = new CubicGrid();
    //     cubicGrid.addGeometry(this.settings);
    //     this.scene.add( cubicGrid.figure );
    // }

    public heightMap(options){

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

                console.log(options)

                let holes = [];
                let triangles, mesh;
                let geometry = new THREE.PlaneGeometry(img.width, img.height, img.width-1, img.height-1);
                let material = new THREE.MeshPhongMaterial( {
                    color: 'rgba(255, 255, 255)',
                    shading: THREE.FlatShading
                } );

                let grid = new THREE.MeshPhongMaterial( {
                    color: 0xfff,
                    wireframe: true
                } );

                for( let i = 0; i < res.length; i++ ){
                    geometry.vertices[i].setZ(res[i][2]/10);
                }

                let objectPG = THREE.SceneUtils.createMultiMaterialObject( geometry, [material] );

                let parent = new THREE.Object3D();
                objectPG.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2) );
                parent.add(objectPG);

                this.scene.add(parent);

                if (options.grid){
                    objectPG = THREE.SceneUtils.createMultiMaterialObject( geometry, [grid] );
                    parent = new THREE.Object3D();
                    objectPG.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2) );
                    parent.add(objectPG);
                    this.scene.add(parent);
                }

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

    public testObj(){
        let manager:THREE.LoadingManager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log( item, loaded, total );
        };

        //TODO: добавить типизацию по-возможности
        let loader:any = new OBJLoader( manager );

        //TODO: избавиться от этого
        loader.load( 'app/assets/models/deer.obj', (object:THREE.Object3D) => {
            console.log(object);
            object.traverse(( child ) => {

                let material = new THREE.MeshPhongMaterial( {
                    color: 'rgba(125, 40, 200)',
                    shading: THREE.FlatShading
                } );

                if ( child instanceof THREE.Mesh ) {
                    child.material = material;
                }
            });
            object.scale.set(0.03, 0.03, 0.03);
            this.scene.add( object );
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

    public map(){
        let options:HeightMapOptions = {
            color: "rgb(255,0,0)",
            grid: false
        };
        this.heightMap(options);
    }

    public modelObseverable(){
        this.map();
        this.testObj();
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