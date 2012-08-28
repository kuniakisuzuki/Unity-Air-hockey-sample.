#pragma strict
//created user finger action. Delete this object when hit puck object or after a certain period of time.

var contorller:GameObject;

private var i = 0;



function Start () {

}

function Update () {
	if(i++ >= 8){
		Destroy(gameObject);
	}
}


function OnCollisionEnter(collisionInfo:Collision){

	if(collisionInfo.gameObject.tag == "ball"){
	
		var contorollerObj:GameObject = GameObject.FindGameObjectWithTag("contoroller");
		contorollerObj.SendMessage("playSE");
		
		Destroy(gameObject);
	}
    
}