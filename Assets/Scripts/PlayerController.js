#pragma strict

import UnityEngine.UI;

public var rb : Rigidbody; 
public var velocidad : float = 20;
public var puntajeText : UI.Text;
public var winText : UI.Text;

public var bUP : Button;
public var bDOWN : UI.Button;
public var bLEFT : UI.Button;
public var bRIGHT : UI.Button;


private var capturas : int;

function SetearPuntaje() : void {
	puntajeText.text = "Puntaje: " + capturas.ToString(); 

	if (capturas == 8) {
		winText.text = "Ganaste!";
	}
}

function Start () {
	rb = gameObject.GetComponent.<Rigidbody>();
	capturas = 0;
	winText.text = "";

	SetearPuntaje();

	bUP.onClick.AddListener(function () {
        var movement : Vector3 = new Vector3(0, 0, 1 * velocidad * velocidad);
		rb.AddForce(movement);
	});

	bDOWN.onClick.AddListener(function () {
        var movement : Vector3 = new Vector3(0, 0, -1 * velocidad * velocidad);
		rb.AddForce(movement);
	});

	bLEFT.onClick.AddListener(function () {
        var movement : Vector3 = new Vector3(-1 * velocidad * velocidad, 0, 0);
		rb.AddForce(movement);
	});

	bRIGHT.onClick.AddListener(function () {
        var movement : Vector3 = new Vector3(1 * velocidad * velocidad, 0, 0);
		rb.AddForce(movement);
	});
}

function Update () {
	
}

function FixedUpdate () {
    var moveHorizontal : float = Input.GetAxis ("Horizontal");
    var moveVertical : float = Input.GetAxis ("Vertical");
    var movement : Vector3 = new Vector3(moveHorizontal * velocidad, 0, moveVertical * velocidad);

    rb.AddForce(movement);
}

function OnTriggerEnter(other: Collider) {
	if (other.gameObject.CompareTag('pickups')) {
		other.gameObject.SetActive(false);
		capturas = capturas + 1;
		SetearPuntaje();
	}
}
