#pragma strict
var se1:AudioClip;


var puckPrefab:GameObject; 
var userPuckPrefab:GameObject;//Instanciate target

var _camera:Camera;



private var DistanceCameraToStage = 6;

private var pointArray:Array;
private var myAudio:AudioSource;



function playSE()//called by 'userPack.js'
{
	myAudio.PlayOneShot(se1);
}

function restart()
{
	//recreate puck instance to this point//
	var newPosition:Vector3 = new Vector3(transform.position.x , transform.position.y - 3 , transform.position.z);
	Instantiate(puckPrefab , newPosition , transform.rotation);
}

function Start () 
{

	pointArray = new Array();
	restart();
	myAudio = audio;
}


function addForceFlipPuck(targetObj:GameObject , parentTouchPoint:Vector3 , currentTouchPoint:Vector3)
{
	var direction:Vector3 = (currentTouchPoint - parentTouchPoint).normalized;//vector
	targetObj.rigidbody.velocity = direction * 10;
	targetObj.rigidbody.AddForce(targetObj.rigidbody.velocity.normalized * 20.0, ForceMode.Impulse);
}

function Update () 
{

    //var fingerCount = 0;
    
    
    if(SystemInfo.operatingSystem.Contains("iPhone") || SystemInfo.operatingSystem.Contains("Android")){
	
		for (var touch : Touch in Input.touches) {
			/*
		        if (touch.phase != TouchPhase.Ended && touch.phase != TouchPhase.Canceled){
		            fingerCount++; 
		        }
	    		*/
	    	
			if (touch.phase == TouchPhase.Began) {
	            pointArray.Push(touch);
	        }
		
		
		
			if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled) {
			 
			 	for(var i = 0 ; i < pointArray.length ; i++){
			 
					var parentTouchObj:Touch = pointArray[i];
					
					if(parentTouchObj.fingerId == touch.fingerId){//compare to touch began obj//
					
					 	//put flip puck//
					 	var parentTouchPoint_:Vector3 = new Vector3(parentTouchObj.position.x, parentTouchObj.position.y , DistanceCameraToStage); 
						var parentWorldPoint_:Vector3 = _camera.ScreenToWorldPoint(parentTouchPoint_);
						var userPackObj:GameObject = Instantiate(userPuckPrefab , parentWorldPoint_ , transform.rotation);
					 	
					 	
						//calculate add force point//
						var parentTouchPoint:Vector3 = new Vector3(parentTouchObj.position.x,  DistanceCameraToStage , parentTouchObj.position.y); 
						var currentTouchPoint:Vector3 = new Vector3(touch.position.x,   DistanceCameraToStage , touch.position.y); 
					 	
					 	addForceFlipPuck(userPackObj , parentTouchPoint , currentTouchPoint);
						
						pointArray.RemoveAt(i);
						
						break;
						
					}
				}
			
			}
			
	    }
	    
		//print ("User has " + fingerCount + " finger(s) touching the screen");
		
	}else{
	
		
		if(Input.GetButtonDown("Fire1")){
		
			pointArray.push(Input.mousePosition);
		
			
		}else if( Input.GetButtonUp("Fire1")){
		 	
		 	var mouseDownPosition:Vector3 = pointArray[0];
		 	
		 	//put flip puck//
			var putPuckPoint:Vector3 = new Vector3(mouseDownPosition.x,   mouseDownPosition.y , DistanceCameraToStage);
			var putPuckWorldPoint:Vector3 = _camera.ScreenToWorldPoint(putPuckPoint);
			var userPackObj_click:GameObject = Instantiate(userPuckPrefab , putPuckWorldPoint , transform.rotation);
		 	
		 	
		 	//calculate add force point//
			var downPoint:Vector3 = new Vector3(mouseDownPosition.x, DistanceCameraToStage,  mouseDownPosition.y); 
		 	var upPoint:Vector3 = new Vector3(Input.mousePosition.x, DistanceCameraToStage,  Input.mousePosition.y); 
		 	
			addForceFlipPuck(userPackObj_click , downPoint , upPoint);			
		 	
		 	pointArray.RemoveAt(0);
		 	
		 }
		 
	    
	}
    
        
}