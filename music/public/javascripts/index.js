var size = 32;
var box = $('body')[0];
var script = $('script')[0];
var height,width;
var canvas = document.createElement('canvas');
box.insertBefore(canvas, script);
var oGc = canvas.getContext('2d');
var Dots = [];
var lis = $("#list li");
var line;

var mV = new MusicVisualizer({
    size : size,
    visualizer : draw
});

function $(s) {
    return document.querySelectorAll(s);
}

for(var i=0;i<lis.length;i++){
    lis[i].onclick = function () {
        for(var j=0;j<lis.length;j++){
            lis[j].className = '';
        }
        this.className = 'select';

        mV.play('/media/' + this.title);
    }
}

draw.type = 'column';
//状态切换按钮
var types = $('#type li');
for(var i=0;i<types.length;i++){
    types[i].onclick = function () {
        for(var j=0;j<types.length;j++){
            types[j].className = '';
        }
        this.className = 'select';
        draw.type = this.getAttribute('data-type');
    }
}

function random(m, n) {
    return Math.round(Math.random()*(n-m) + m);
}

function getDots() {
    Dots = [];
    for(var i=0;i<size;i++){
        var x= random(0, width);
        var y = random(0, height);
        var color = 'rgba(' + random(0, 255) + ',' + random(0,255) + ',' + random(0, 255) + ', 0)';
        Dots.push({
            x : x,
            y : y,
            color : color,
            cap : 0,
            dx : random(1, 4)
        });
    }
}

function reSize() {
    width = box.clientWidth;
    height = box.clientHeight;
    canvas.width = width;
    canvas.height = height;

    //颜色渐变
    line = oGc.createLinearGradient(0, 0, 0, height);
    line.addColorStop(0, 'red');
    line.addColorStop(0.5, 'yellow');
    line.addColorStop(1, 'green');

    getDots();
}
reSize();
window.onresize = reSize;

//控制音量
$('#volume')[0].onchange = function () {
    mV.changeValue(this.value/this.max);
};
$('#volume')[0].onchange();

//绘制canvas图像函数
function draw(arr) {
    oGc.clearRect(0, 0, width, height);
    var w = width / size;
    //顶端矩形的宽度
    var cW = w * 0.5;
    var capH = cW > 10 ? 10 : cW;
    oGc.fillStyle = line;
    for(var i=0;i<size;i++){
        var o = Dots[i];
        if(draw.type == 'column'){
            var h = arr[i] / 256 * height;
            oGc.fillRect(w*i, height-h, cW, h);
            oGc.fillRect(w*i, height-o.cap-capH, cW, capH);
            o.cap--;
            if(o.cap < 0){
                o.cap = 0;
            }
            if(h > 0 && o.cap < h +40){
                o.cap = h + 40 > height - capH ? height - capH : h + 40;
            }
        }else if(draw.type == 'dot'){
            oGc.beginPath();
            var r = 10 + arr[i] / 256 * (height > width ? width : height) / 10;
            oGc.arc(o.x, o.y, r, 0, Math.PI*2, true);
            var gradient = oGc.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(1, o.color);
            oGc.fillStyle = gradient;
            oGc.fill();
            o.x += o.dx;
            o.x = o.x > width ? 0 : o.x;
        }
    }
}