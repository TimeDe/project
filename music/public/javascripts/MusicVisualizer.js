function MusicVisualizer(obj) {
    this.source = null;

    this.count = 0;

    this.analyser = MusicVisualizer.ac.createAnalyser();
    this.size = obj.size;
    this.analyser.fftSize = this.size * 2;

    this.gainNode = MusicVisualizer.ac[MusicVisualizer.ac.createGain ? 'createGain' : 'createGainNode']();
    this.gainNode.connect(MusicVisualizer.ac.destination);

    this.analyser.connect(this.gainNode);

    this.xhr = new XMLHttpRequest();

    this.visualizer = obj.visualizer;
    this.visualize();
}
MusicVisualizer.ac = new (window.AudioContext || window.webkitAudioContext)();

MusicVisualizer.prototype.load = function (url, fn) {
    this.xhr.abort();
    this.xhr.open('GET', url);
    this.xhr.responseType = 'arraybuffer';
    var that = this;
    this.xhr.onload = function () {
        fn(that.xhr.response);
    };
    this.xhr.send();
};

MusicVisualizer.prototype.decode = function (arraybuffer,fn) {
    MusicVisualizer.ac.decodeAudioData(arraybuffer, function (buffer) {
        fn(buffer);
    }, function (err) {
        console.log(err);
    });
};

MusicVisualizer.prototype.play = function (url) {
    var n = ++this.count;
    var that = this;
    this.source && this.stop();
    this.load(url, function (arraybuffer) {
        if(n != that.count) return;
        that.decode(arraybuffer, function (buffer) {
            if(n != that.count) return;
            var bs = MusicVisualizer.ac.createBufferSource();
            bs.connect(that.analyser);
            bs.buffer = buffer;
            bs[bs.start ? 'start' : 'nodeOn'](0);
            that.source = bs;
        })
    })
};

MusicVisualizer.prototype.stop = function () {
    this.source[this.source.stop ? 'stop' : 'nodeOff'](0);
};

MusicVisualizer.prototype.changeValue = function (percent) {
    this.gainNode.gain.value = percent * percent;
};

MusicVisualizer.prototype.visualize = function () {
    var arr = new Uint8Array(this.analyser.frequencyBinCount);

    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    //实时得到音频输出的数据
    var that = this;
    function visual() {
        that.analyser.getByteFrequencyData(arr);
        that.visualizer(arr);
        requestAnimationFrame(visual);
    }

    requestAnimationFrame(visual);
};