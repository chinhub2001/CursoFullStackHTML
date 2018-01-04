function drawSelectedImage(e) {
    var ctx = document.getElementById('imageCanvas').getContext('2d');
    var url = URL.createObjectURL(e.files[0]);
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 200, 200);    
    }
    img.src = url;   
}