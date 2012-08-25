#pragma strict
var se1:AudioClip;


var puckPrefab:GameObject; 
var userPuckPrefab:GameObject;//関連付けの物を使う場合は、Instanciateして使わないとステージに出ない。

var _camera:Camera;



private var  parentTouchObj:Touch;

private var touchObjArray:Array;

private var DistanceCameraToStage = 6;


private var myAudio:AudioSource;



function playSE(){
	myAudio.PlayOneShot(se1);
}

function restart(){
	//recreate puck instance to this point//
	
	var newPosition:Vector3 = new Vector3(transform.position.x , transform.position.y - 3 , transform.position.z);
	Instantiate(puckPrefab , newPosition , transform.rotation);
	
	
}

function Start () {
	//Physics.gravity = Vector3(0,  0, 0);
	touchObjArray = new Array();
	
	restart();
	
	myAudio = audio;
}

function Update () {

    var fingerCount = 0;
    
    
    //var userPackObj:GameObject = GameObject.FindGameObjectWithTag("userPack");
    
    
    /*
    if( Input.GetButtonDown("Fire1")){
	 	
	 	var screenPoint:Vector3 = Input.mousePosition;
	 	screenPoint.z = 8.2;//camera to stage distance//
	 	
	 	var worldPoint:Vector3 = _camera.ScreenToWorldPoint(screenPoint);
	 	
	 	var newBall:GameObject = Instantiate(ballPrefab , worldPoint , transform.rotation);
	 	
	 	
	 	
	 	//var direction:Vector3 = (worldPoint - transform.position).normalized;//vector
	 	//var newBall:GameObject = Instantiate(ballPrefab , transform.position , transform.rotation);
	 	//newBall.rigidbody.velocity = direction * 15.0;
	 }
    */
    
    
    
    
    
    
    
    
    for (var touch : Touch in Input.touches) {
     	//print("input in");
     	//touch.fingerId
        if (touch.phase != TouchPhase.Ended && touch.phase != TouchPhase.Canceled){
            fingerCount++;
        	//	print("count++");     
        }
    
    	/*
    		//var newPos = new Vector3(touch.position.x/480, userPackObj.transform.position.y, touch.position.y/320 ); 
    		//userPackObj.transform.position = newPos;
    
    
    		var screenTouchedPoint:Vector3 = new Vector3(touch.position.x  , userPackObj.transform.position.y, touch.position.y );  
		var worldPoint:Vector3 = _camera.ScreenToWorldPoint(screenTouchedPoint);
    	 
    		var makeNewBall:GameObject = Instantiate(ballPrefab , worldPoint , userPackObj.transform.rotation);
		
		//ball.rigidbody.velocity = direction * 15.0;
		*/
		
		
		
		
		/*
		if (touch.phase == TouchPhase.Began || touch.phase == TouchPhase.Moved) {
            var DistanceCameraToStage = 7.5;
		
			var touchPoint:Vector3 = new Vector3(touch.position.x,  touch.position.y , DistanceCameraToStage); 
		 	var worldPoint:Vector3 = _camera.ScreenToWorldPoint(touchPoint);
		 	
		 	var userPackObj:GameObject = GameObject.FindGameObjectWithTag("userPack");
		 	userPackObj.transform.position = worldPoint;
		 	
		 	//ballPrefab.transform.position = worldPoint;
		 	//var newBall:GameObject = Instantiate(ballPrefab , worldPoint , transform.rotation);
            //newBall.tag = touch.fingerId;
        }
	*/
		
		
		
		
		if (touch.phase == TouchPhase.Began) {
            //parentTouchObj = touch;
            touchObjArray.Push(touch);
        }
	
	
	
		
	
		if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled) {
		 
		 
		 	for(var i = 0 ; i < touchObjArray.length ; i++){
		 
				//compare to touch began obj//
				
				var parentTouchObj:Touch = touchObjArray[i];
				
				
				
				if(parentTouchObj.fingerId == touch.fingerId){
					
					//var userPackObj:GameObject = GameObject.FindGameObjectWithTag("userPack");
		 			
		 			
		 			
				 	//parent//
					var parentTouchPoint:Vector3 = new Vector3(parentTouchObj.position.x,  DistanceCameraToStage , parentTouchObj.position.y); 
					//var parentWorldPoint:Vector3 = _camera.ScreenToWorldPoint(parentTouchPoint);
					
					//current//
					var touchPoint:Vector3 = new Vector3(touch.position.x,   DistanceCameraToStage , touch.position.y); 
				 	//var worldPoint:Vector3 = _camera.ScreenToWorldPoint(touchPoint);
				 	 
				 	 
				 	//make new puck in parent touch point
				 	
				 	
				 	var parentTouchPoint_:Vector3 = new Vector3(parentTouchObj.position.x, parentTouchObj.position.y , DistanceCameraToStage); 
					var parentWorldPoint_:Vector3 = _camera.ScreenToWorldPoint(parentTouchPoint_);
					
				 	
				 	var userPackObj:GameObject = Instantiate(userPuckPrefab , parentWorldPoint_ , transform.rotation);
				 	//userPackObj.transform.position = worldPoint;
				 	
				 	
				 	//ballPrefab.transform.position = worldPoint;
				 	//var newBall:GameObject = Instantiate(ballPrefab , worldPoint , transform.rotation);
		            //newBall.tag = touch.fingerId;
				
				
				
					var direction:Vector3 = (touchPoint - parentTouchPoint).normalized;//vector
			 		userPackObj.rigidbody.velocity = direction * 10;
					
					userPackObj.rigidbody.AddForce(userPackObj.rigidbody.velocity.normalized * 20.0, ForceMode.Impulse);
					
					
					
					touchObjArray.RemoveAt(i);
					
					break;
				}
			}
		
			
			
			
			
			
		}
		
		
		
    }
    
    
    /*
    if (fingerCount > 0)
        print ("User has " + fingerCount + " finger(s) touching the screen");
        */
}