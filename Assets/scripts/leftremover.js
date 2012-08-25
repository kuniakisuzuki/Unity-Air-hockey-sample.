#pragma strict
var contorller:GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {

    Destroy(other.gameObject);
    
    rightScore.score += 1;
    
    contorller.SendMessage("restart");
}