import React, {Component} from 'react';
import '../assets/styles/webcam.scss';
import yolo from 'tfjs-yolo';

class WebCam extends Component {

    myYolo = null;
    colors = {};

    componentDidMount = async () => {
        await this.setupCam();
        this.load();
        this.run();
    };

    run = async () => {
        this.refs.canvas.width = this.refs.webcam.videoWidth;
        this.refs.canvas.height = this.refs.webcam.videoHeight;
        this.refs.canvas.getContext('2d').drawImage(this.refs.webcam, 0, 0, this.refs.webcam.videoWidth, this.refs.webcam.videoHeight);
        if(this.myYolo && this.refs.canvas.width !== 0 && this.refs.canvas.height !== 0){
            this.predict();
        }
        setTimeout(this.run, 500);
    };

    setupCam = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.refs.webcam.srcObject = await navigator.mediaDevices.getUserMedia({
                'audio': false,
                'video': { facingMode: 'environment' }
            });
        }
    };

    predict = async () => {
        const start = performance.now();
        const boxes = await this.myYolo(this.refs.canvas, { numClasses: 1, classNames: ['figure'] });
        const end = performance.now();
        console.log(`Inference took ${end - start} ms`);

        this.drawBoxes(boxes);
    };

    drawBoxes = (boxes) => {
        console.log(boxes);
        this.refs.rects.innerHTML = '';

        const cw = this.refs.webcam.clientWidth;
        const ch = this.refs.webcam.clientHeight;
        const vw = this.refs.webcam.videoWidth;
        const vh = this.refs.webcam.videoHeight;

        const scaleW = cw / vw;
        const scaleH = ch / vh;

        this.refs.webcam_wrapper.style.width = `${cw}px`;
        this.refs.webcam_wrapper.style.height = `${ch}px`;

        boxes.map((box) => {
            if (!(box['class'] in this.colors)) {
                this.colors[box['class']] = '#' + Math.floor(Math.random() * 16777215).toString(16);
            }

            const rect = document.createElement('div');
            rect.className = 'rect';
            rect.style.top = `${box['top'] * scaleH}px`;
            rect.style.left = `${box['left'] * scaleW}px`;
            rect.style.width = `${box['width'] * scaleW - 4}px`;
            rect.style.height = `${box['height'] * scaleH - 4}px`;
            rect.style.borderColor = this.colors[box['class']];

            const text = document.createElement('div');
            text.className = 'text';
            text.innerText = `${box['class']} ${box['score'].toFixed(2)}`;
            text.style.color = this.colors[box['class']];

            rect.appendChild(text);
            this.refs.rects.appendChild(rect);
            return box;
        });
    };

    load = async () => {
        if (this.myYolo){
            this.myYolo.dispose();
            this.myYolo = null;
        }
        this.refs.rects.innerHTML = '';
        this.myYolo = await yolo.v3tiny(process.env.PUBLIC_URL + '/model/model.json');
    };


    render() {
        return (
            <div className="container">
                <div id="webcam-wrapper" ref="webcam_wrapper">
                    <div ref="rects" id="rects"/>
                    <video autoPlay playsInline muted ref="webcam" id="webcam"/>
                    <canvas ref="canvas" style={{position: "absolute", visibility: "hidden"}}/>
                </div>
            </div>
        );
    }
}

export default WebCam;
