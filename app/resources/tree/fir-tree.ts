import * as THREE from 'three';
import {Game, IComponent} from '../../../app/game/game';

export default class FirTree implements IComponent {

	private mesh : THREE.Mesh;

	constructor() {

        var geometry:THREE.Geometry,
            material,
            elem:THREE.Mesh,
            componentObject ;

        var componentObjectMatrix:THREE.Geometry|THREE.DodecahedronGeometry|THREE.IcosahedronGeometry = new THREE.Geometry();

        material = new THREE.MeshPhongMaterial( {
            color: 0x7c6439,
            shading: THREE.FlatShading
        } );
        geometry = new THREE.BoxGeometry( 2, 4, 2 );
        elem = new THREE.Mesh( geometry, material );
        Game.scene.add(elem);

        material = new THREE.MeshPhongMaterial( {
            color: 0x2aa126,
            shading: THREE.FlatShading
        } );

        geometry = new THREE.ConeGeometry( 3, 3, 4, 1, true, Math.PI/4 );
        elem = new THREE.Mesh( geometry, material );

        for (let iter = 5; iter > 0; iter--) {


            let buffer:number = 5;

            elem.scale.x=0.9**iter;
            elem.scale.y=0.9**iter;
            elem.scale.z=0.9**iter;


            elem.position.x = 0;
            elem.position.y = iter*1.5;
            elem.position.z = 0;

            let random = Math.random();
            // elem.rotateZZ(Math.PI/4);
            // elem.rotateY(random *Math.PI/24);

            elem.updateMatrix(); // as needed
            componentObjectMatrix.merge(elem.geometry, elem.matrix);
        }

        elem = new THREE.Mesh( componentObjectMatrix, material );
        Game.scene.add(elem);

	}
    
	public update() {}
}

