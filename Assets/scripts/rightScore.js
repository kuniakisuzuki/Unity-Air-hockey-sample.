#pragma strict


static var score:int;


function Start () {
	score = 0;
}

function Update () {
	guiText.text = score.ToString();
}