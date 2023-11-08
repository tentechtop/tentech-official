<template>
    <div class="city-container" :style="cityStyle">
        <div ref="cityInfo" class="city-info" :style="cityInfoStyle">
            <div v-if="city.nationalFlag" class="national-flag">
                <img :src="city.nationalFlag" />
            </div>
            <div>
                <p class="city-locale-name">{{ city.localeName }}</p>
                <p class="city-en-name">{{ city.enName }}</p>
            </div>
        </div>
        <div class="city-point" :style="pointStyle">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/zuobiao.png" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        coordinateWidth: {
            type: Number,
            // required: true
        },
        coordinateHeight: {
            type: Number,
            // required: true
        },
        mapWidth: {
            type: Number,
            required: true
        },
        city: {
            type: Object,
            default: () => { }
        },
        line: {
            type: Object,
            default: () => {
                return {
                    left: 10,
                    right: 0,
                    top: 10,
                    bottom: 0
                }
            }
        },
        point: {
            type: Object,
            default: () => {
                // x 最大值 1587,y 最大值 760，参考地图的尺寸
                return {
                    x: 0,
                    y: 0
                }
            }
        }
    },
    data() {
        return {
            cityInfoStyle: {},
            pointStyle: {}
        }
    },
    computed: {
        /* rootFontSize() {
            let fontSize = Math.ceil(this.mapWidth / 100)
            this.fontSize = fontSize < 6 ? 6 : (fontSize > 10 ? 10 : fontSize)
            return this.fontSize
        }, */
        cityStyle() {
            let lineStyleJson = {}
            let cityInfoStyleJson = {}
            let pointStyleJson = {}
            let existHor = ''
            let existVer = ''
            let pointWidth = 5
            let startX = this.point.x || 0
            if (startX > this.coordinateWidth) {
                startX = this.coordinateWidth
            }

            let startY = this.point.y || 0
            if (startY > this.coordinateHeight) {
                startY = this.coordinateHeight
            }
            let width = 0
            let height = 0
            let widthPx = 0
            let heightPx = 0

            let fontSize = Math.ceil(this.mapWidth / 100)
            fontSize = fontSize < 6 ? 6 : (fontSize > 10 ? 10 : fontSize)

            try {

                lineStyleJson.fontSize = fontSize + 'px'
                for (let key in this.line) {
                    if (key === 'left' || key === 'right') {
                        if (!existVer) {
                            existVer = key
                            lineStyleJson['border-' + key + '-width'] = '1px'
                            // 线框高度
                            height = this.line[key]
                            heightPx = this.getPx(height)
                            lineStyleJson.height = heightPx + 'px'
                        }
                    } else if (key === 'top' || key === 'bottom') {
                        if (!existHor) {
                            existHor = key
                            lineStyleJson['border-' + key + '-width'] = '1px'
                            // 线框宽度
                            width = this.line[key]
                            widthPx = this.getPx(width)
                            lineStyleJson.width = widthPx + 'px'
                        }
                    }
                }
                // 计算线框起点位置 (startX, startY)
                // 计算中心点相对位置(left|right, top|bottom)
                if (existVer === 'left') {
                    startX = startX - width
                    pointStyleJson.right = 0
                    pointStyleJson.marginRight = -pointWidth + 'px'
                } else if (existVer === 'right') {
                    pointStyleJson.left = 0
                    pointStyleJson.marginLeft = -pointWidth + 'px'
                }
                if (existHor === 'bottom') {
                    startY = startY - height
                    pointStyleJson.bottom = 0
                    pointStyleJson.marginBottom = -pointWidth + 'px'
                } else if (existHor === 'top') {
                    pointStyleJson.top = 0
                    pointStyleJson.marginTop = -pointWidth + 'px'
                }

                lineStyleJson.left = this.getPx(startX) + 'px'
                lineStyleJson.top = this.getPx(startY) + 'px'

                // 计算城市标签相对位置
                if (existVer === 'left') {
                    cityInfoStyleJson.marginRight = '100%'
                } else if (existVer === 'right') {
                    cityInfoStyleJson.marginLeft = '100%'
                }

                if (existHor === 'bottom') {
                    lineStyleJson.alignItems = 'flex-end'
                    cityInfoStyleJson.marginBottom = (heightPx - 1) + 'px'
                } else if (existHor === 'top') {
                    lineStyleJson.alignItems = 'flex-start'
                    cityInfoStyleJson.marginTop = (heightPx - 1) + 'px'
                }
            } catch (e) {

            }

            this.pointStyle = pointStyleJson
            this.cityInfoStyle = cityInfoStyleJson
            this.lineStyle = lineStyleJson
            return lineStyleJson
        },
    },
    mounted() {

    },
    methods: {
        getPx(px) {
            return Math.round(px * this.mapWidth / this.coordinateWidth)
        }
    }
}
</script>

<style scoped>
.city-container {
    border-color: rgba(0, 0, 0, 0.4);
    border-style: solid;
    border-width: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-start;

}

.city-info {
    border-radius: 100px;
    border: 1px solid rgba(2, 90, 255, 0.55);
    background-color: rgba(247, 247, 247, 0.6);
    line-height: 1.5;
    padding: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.city-container:hover .city-info {
    z-index: 990;
    background-color: rgba(247, 247, 247, 1);
    cursor: pointer;
}

.national-flag {
    border-radius: 100px;
    width: 6em;
    height: 6em;
    margin-right: 1em;
    overflow: hidden;
}

.national-flag img {
    width: 100%;
}

.city-locale-name {
    font-size: 1.6em;
    white-space: nowrap;
}

.city-en-name {
    color: rgba(2, 125, 255, 0.75);
    margin-top: 0.5em;
    font-size: 1.4em;
    white-space: nowrap;
}

.city-point {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    animation: breathing 1s ease 0s infinite alternate;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10px;
    height: 10px;
}

.city-point img {
    width: 8px;
    height: 8px;
    display: block;
    margin: 0;
    padding: 0;
}

@keyframes breathing {
    0% {
        box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.3);
    }

    100% {
        box-shadow: 0 0 10px 5px rgba(2, 70, 255, 0.8);
    }
}
</style>
