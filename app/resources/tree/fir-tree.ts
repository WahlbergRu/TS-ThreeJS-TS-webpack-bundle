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

        for (let iter = 1; iter > 0; iter--) {


            let buffer:number = 5;

            elem.position.x = 0;
            elem.position.y = 0;
            elem.position.z = 0;
            //TODO: merge плохо работает с отрицательными координатами
            // elem.position.y = 10;
            // // new THREE.Mesh( geometry, material )
            // if (i !== 1 || j !== 1){
            //     circleIndex++;
            //     if (circleIndex<4){
            //         elem.position.x = buffer + cloud[1][1] + Math.cos(circleIndex*Math.PI/4);
            //         elem.position.z = buffer + cloud[1][1] + Math.sin(circleIndex*Math.PI/4);
            //     } else {
            //         elem.position.x = buffer + cloud[1][1] + Math.cos(circleIndex*Math.PI/4);
            //         elem.position.z = buffer + cloud[1][1] + Math.sin(circleIndex*Math.PI/4);
            //     }
            // } else {
            //     elem.position.x = buffer + cloud[1][1] ;
            //     elem.position.z = buffer + cloud[1][1] ;
            // }

            let random = Math.random();
            // elem.rotateX(random *Math.PI/24);
            // elem.rotateY(random *Math.PI/24);


            elem.updateMatrix(); // as needed
            componentObjectMatrix.merge(elem.geometry, elem.matrix);
        }

        elem = new THREE.Mesh( componentObjectMatrix, material )

	}
    
	public update() {}
}

