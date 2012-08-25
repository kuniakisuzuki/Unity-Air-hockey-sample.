#pragma strict
var contorller:GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {

    Destroy(other.gameObject);
    
    leftScore.score += 1;
    
    contorller.SendMessage("restart");
}