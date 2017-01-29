import * as THREE from 'three';
import {Game, IComponent} from '../../../app/game/game';

export default class Cloud implements IComponent {

	private mesh : THREE.Mesh;

	constructor() {

        var geometry:THREE.Geometry,
            material,
            sphere,
            cloud,
            mapSize = 70,
            circleIndex = 0,
            cloudSize = 3,
            cloudWide = 3;
        //Make array of cloud
        // cloud =  Array.from({length: cloudWide},
        //         ()=> Array.from({length: cloudSize},
        //             () => Math.floor(Math.random() * 3+1))
        // );
        // console.log(cloud)

        cloud = [
            [1,2,1],
            [3,4,1],
            [1,1,2]
        ]

        var i = 0, j = 0;

        var cloudMatrix:THREE.Geometry|THREE.DodecahedronGeometry|THREE.IcosahedronGeometry = new THREE.Geometry();

        material = new THREE.MeshPhongMaterial( {
            color: 0x555,
            shading: THREE.FlatShading
        } );

        for (let iter = cloudWide*cloudWide; iter > 0; iter--) {
            if (iter%cloudSize===0){
                i = 0;
                j = iter/cloudSize-1;
            } else {
                i++;
            }
            if (cloud[i][j] === 0) continue
            if ((i+j)%cloudSize){
                geometry = new THREE.IcosahedronGeometry(cloud[i][j]/4, 0);
            } else {
                geometry = new THREE.DodecahedronGeometry(cloud[i][j]/4, 0);
            }

            let buffer:number = 5;
            let elem:THREE.Mesh | THREE.Geometry| THREE.BufferGeometry | any = new THREE.Mesh( geometry, material )

            if (i !== 1 || j !== 1){
                circleIndex++;
                if (circleIndex<4){
                    elem.position.x = buffer + cloud[1][1] + Math.cos(circleIndex*Math.PI/4);
                    elem.position.z = buffer + cloud[1][1] + Math.sin(circleIndex*Math.PI/4);
                } else {
                    elem.position.x = buffer + cloud[1][1] + Math.cos(circleIndex*Math.PI/4);
                    elem.position.z = buffer + cloud[1][1] + Math.sin(circleIndex*Math.PI/4);
                }
            } else {
                elem.position.x = buffer + cloud[1][1] ;
                elem.position.z = buffer + cloud[1][1] ;
            }

            let random = Math.random();
            elem.rotateX(random *Math.PI/24);
            elem.rotateY(random *Math.PI/24);


            elem.updateMatrix(); // as needed
            cloudMatrix.merge(elem.geometry, elem.matrix);
        }

        let elem = new THREE.Mesh( cloudMatrix, material );
        elem.scale.x = 5;
        elem.scale.y = 5;
        elem.scale.z = 5;
        // elem.position.x=-20;
        elem.position.y=75;
        // elem.position.z=-20;
        Game.scene.add(elem);

	}
    
	public update() {}
}

