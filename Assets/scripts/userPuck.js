#pragma strict
//ballに当たるか、一定時間経ったら消す
//var se1:AudioClip;

var contorller:GameObject;

private var i = 0;


//private var myAudio:AudioSource;


function Start () {
	//myAudio = audio;
}

function Update () {
	if(i++ >= 6){
		Destroy(gameObject);
	}
}


function OnCollisionEnter(collisionInfo:Collision){

	//print("asdasdasd");
	if(collisionInfo.gameObject.tag == "ball"){
	
		//myAudio.PlayOneShot(se1);
		
		var contorollerObj:GameObject = GameObject.FindGameObjectWithTag("contoroller");
		contorollerObj.SendMessage("playSE");
		
		Destroy(gameObject);
	}
    
}