import * as THREE from 'three';
import {Game, IComponent} from '../game/game';

export class Grid implements IComponent {

    private _figure: THREE.Mesh;

    public get figure():THREE.Mesh{
        return this._figure;
    }

    public set figure(figure:THREE.Mesh){
        this._figure = figure;
    }

	constructor() {}

	public addGeometry(settings){
        var geometry = new THREE.PlaneBufferGeometry( settings.camera.d * 8, settings.camera.d * 8, settings.camera.d * 2, settings.camera.d * 2 );
        var material = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.15, transparent: true } );
        this.figure = new THREE.Mesh( geometry, material );
        this.figure.rotation.order = 'YXZ';
        this.figure.rotation.y = - Math.PI / 2;
        this.figure.rotation.x = - Math.PI / 2;
        this.figure.renderOrder = 1;
        this.figure.material.depthTest = false;
    }

	public update() {
    }
}

