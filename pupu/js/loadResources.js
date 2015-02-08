function loadResources()
{
	preload = new createjs.LoadQueue(true);
	createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);
    preload.installPlugin(createjs.Sound);
    preload.addEventListener("complete", handleComplete);
    //preload.addEventListener("fileprogress", handleStart);
    //preload.addEventListener("error", handleFileError);
    
    var manifest = P_getResources();
    preload.loadManifest(manifest);

    return preload;
}

//function stop() {
//    if (preload != null) { preload.close(); }
//}

// Load a single asset.
/*function loadAsset(target) {
    var div = document.getElementById(target.id);
    div.innerHTML = "<label>Loading...</label>";
    preload.loadFile(target.id);
}*/

function handleStart(){
    alert(preload.progress);
}
function handleComplete() {
    //alert(preload.progress);
     createjs.Sound.play("bgdAudio2","createjs.Sound.INTERRUPT_ANY",0,0,-1,1,0);
     
     //var image = preload.getResult("image2");
     //document.body.appendChild(image);
     
 }

function P_clickBtnAudio() {
     createjs.Sound.play("btnClickAudio");
 }