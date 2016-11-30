import * as THREE from 'three';
import {Game, IComponent} from '../../../app/game/game';

export default class FirTree implements IComponent {

	private mesh : THREE.Mesh;

	constructor() {

        var geometry:THREE.Geometry,
            material:THREE.Material,
            elem:THREE.Mesh,
            componentObject ;

        var componentObjectMatrix:THREE.Geometry|THREE.DodecahedronGeometry|THREE.IcosahedronGeometry = new THREE.Geometry();

        material = new THREE.MeshPhongMaterial( {
            color: 0x7c6439,
            shading: THREE.FlatShading
        } );
        geometry = new THREE.BoxGeometry( 1, 4, 1 );
        elem = new THREE.Mesh( geometry, material );
        Game.scene.add(elem);

        material = new THREE.MeshPhongMaterial( {
            color: 0x2aa126,
            shading: THREE.FlatShading
        } );

        geometry = new THREE.ConeGeometry( 3, 3, 4, 1, true, Math.PI/4 );
        elem = new THREE.Mesh( geometry, material );

        for (let iter = 3; iter > 0; iter--) {

            let memoIter = 0.9**iter;

            elem.scale.x=memoIter;
            elem.scale.y=memoIter;
            elem.scale.z=memoIter;


            elem.position.x = 0;
            elem.position.y = iter*2*memoIter;
            elem.position.z = 0;

            let random = Math.random();
            // elem.rotateZZ(Math.PI/4);
            // elem.rotateY(random *Math.PI/24);

            elem.updateMatrix(); // as needed
            componentObjectMatrix.merge(elem.geometry, elem.matrix);
        }

        elem = new THREE.Mesh( componentObjectMatrix, material );

        let edges:THREE.EdgesHelper;
        edges = new THREE.EdgesHelper(elem, 0x0a541a);
        edges.material.linewidth = 24;

        Game.scene.add(elem);
        Game.scene.add(edges);

	}
    
	public update() {}
}

