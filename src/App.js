import React, {Component} from 'react';
import './App.css';
import test_img from './assets/images/img_45.jpg';
import yolo from 'tfjs-yolo';
import WebCam from './components/WebCam';

class App extends Component {
    //
    // async componentDidMount() {
    //     const canvas = document.getElementById('canvas');
    //     const ctx = canvas.getContext('2d');
    //     let myYolo = await yolo.v3tiny(process.env.PUBLIC_URL + '/model/model.json');
    //     let img = new Image();
    //     const self = this;
    //     img.onload = async function () {
    //         canvas.height = img.height;
    //         canvas.width = img.width;
    //         ctx.drawImage(img, 0, 0, img.width, img.height);
    //         await self.run(myYolo, canvas, ctx);
    //     };
    //     img.src = test_img;
    // }
    //
    // async run(myYolo, canvas, ctx) {
    //     const start = performance.now();
    //     const boxes = await myYolo(canvas, {numClasses: 1, classNames: ['figure']});
    //     const end = performance.now();
    //     console.log(`Inference took ${end - start} ms`);
    //     console.log(boxes);
    //     boxes.map((box) => {
    //         ctx.lineWidth = 2;
    //         ctx.fillStyle = "red";
    //         ctx.strokeStyle = "red";
    //         ctx.rect(box["left"], box["top"], box["width"], box["height"]);
    //         ctx.fillText(box["class"], box["left"] + 5, box["top"] + 10);
    //         ctx.stroke();
    //         return box;
    //     });
    // }

    render() {
        return (
            <div className="App">
                {/*<canvas id="canvas"/>*/}
                <WebCam/>
            </div>
        );
    }
}

export default App;
