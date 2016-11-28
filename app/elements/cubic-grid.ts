import * as THREE from 'three';
import {Game, IComponent} from '../game/game';

export default class CubicGrid implements IComponent {
	
	private mesh : THREE.Mesh;

	constructor() {

        var geometry,
            material,
            cube,
            mapSize = 30;

        for (let i = 0, lenX = mapSize; i < lenX; i++) {
            for (let j = 0, lenY = mapSize; j < lenY; j++) {
                geometry = new THREE.BoxBufferGeometry(10, 0, 10);
                material = new THREE.MeshLambertMaterial({});
                cube = new THREE.Mesh(geometry, material);
                cube.position.x = i*10-mapSize/2*10;
                cube.position.y = -10;
                cube.position.z = j*10-mapSize/2*10;
                Game.scene.add( cube );
            }
        }

	}
    
	public update() {}
}

