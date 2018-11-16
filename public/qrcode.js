(function(){
    console.log('dito');
    var qrcode = new QRCode("qrcode");    

    createAccount.addEventListener('click',function(event){
        var elText = document.getElementById("user");
        qrcode.makeCode(elText.value);
        var src= document.querySelector('#qrcode img').getAttribute('src');
        console.log(src);
        var url = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20qrcodeconvite.png;');
        window.open(url);
    });
});