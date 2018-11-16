var qrcode = new QRCode("qrcode");

function makeCode () {      
    var elText = document.getElementById("text");
    
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }
    
    qrcode.makeCode(elText.value);
}

function downloadQrCode(){
    var src= document.querySelector('#qrcode img').getAttribute('src');
    console.log(src);
    var url = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20qrcodeconvite.png;');
    window.open(url);

}

makeCode();
// downloadQrCode();

$("#text").
    on("blur", function () {
        makeCode();
        downloadQrCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
            downloadQrCode();
        }
    });
