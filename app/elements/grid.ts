import * as THREE from 'three';
import {Game, IComponent} from '../game/game';

export default class Grid implements IComponent {

    public grid:any;

	constructor() {}

	public addGeometry(settings){
        var geometry = new THREE.PlaneBufferGeometry( settings.camera.d * 8, settings.camera.d * 8, settings.camera.d * 2, settings.camera.d * 2 );
        var material = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.15, transparent: true } );
        this.grid = new THREE.Mesh( geometry, material );
        this.grid.rotation.order = 'YXZ';
        this.grid.rotation.y = - Math.PI / 2;
        this.grid.rotation.x = - Math.PI / 2;
        this.grid.renderOrder = 1;
        this.grid.material.depthTest = false;
    }

	public add(settings){
	    this.addGeometry(settings);
        Game.scene.add( this.grid );
    }
    
	public update() {
    }
}

