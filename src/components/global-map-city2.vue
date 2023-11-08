<template>
    <div class="city-point" :style="cityStyle">
        <div class="point-image">
            <img src="https://tentech.oss-cn-shenzhen.aliyuncs.com/svg/zuobiao.png" />
        </div>
        <div class="city-line" :style="lineStyle">
            <div class="city-mark" :style="markStyle">
                <div v-if="city.nationalFlag" class="national-flag">
                    <img :src="city.nationalFlag" />
                </div>
                <div>
                    <p class="city-locale-name">{{ $t(city.localeName) }}</p>
                    <p class="city-en-name">{{ city.enName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * 坐标系最大横坐标
         */
        coordinateWidth: {
            type: Number,
        },
        /**
         * 坐标系最大纵坐标
         */

        coordinateHeight: {
            type: Number,
        },
        /**
         * 当前地图真实宽度
         */
        mapWidth: {
            type: Number,
            required: true
        },
        /**
         * 城市标签信息 {nationalFlag: 国旗, localeName: 城市本地化名称, enName: 城市英文名称}
         */
        city: {
            type: Object,
            default: () => { }
        },
        /**
         * 连接线宽度、高度，left|right 任取一个作为高度， top|bottom任取一个作为宽度
         */
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
        /**
         * 城市中心点坐标，相对于原始坐标系的坐标
         */
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
        }
    },
    computed: {
        cityStyle() {
            let fontSize = this.getFontSize()
            return {
                left: (Math.round(this.point.x / this.coordinateWidth * 100000) / 1000) + '%',
                top: (Math.round(this.point.y / this.coordinateHeight * 100000) / 1000) + '%',
                fontSize: fontSize + 'px'
            }
        },
        lineStyle() {
            let hor = this.line.top ? 'top' : 'bottom'
            let ver = this.line.left ? 'left' : 'right'
            let width = this.getPx(this.line[hor])
            let height = this.getPx(this.line[ver])
            let style = {
                width: width + 'px',
                height: height + 'px',
            }
            style['border-' + hor + '-width'] = '1px'
            style['border-' + ver + '-width'] = '1px'
            if (hor === "top") {
                style.alignItems = "flex-start"
            } else {
                style.alignItems = "flex-end"
                style.top = -height + 'px'
            }
            if (ver === 'left') {
                style.left = -width + 'px'
            }
            return style
        },
        markStyle() {
            let hor = this.line.top ? 'top' : 'bottom'
            let ver = this.line.left ? 'left' : 'right'
            let width = this.getPx(this.line[hor])
            let height = this.getPx(this.line[ver])
            let style = {}
            if (hor === 'top') {
                style.marginTop = (height - 1) + 'px'
            } else {
                style.marginBottom = (height - 1) + 'px'
            }
            if (ver === 'left') {
                style.marginLeft = -width + 'px'
            } else {
                style.marginRight = -width + 'px'
            }
            return style
        }
    },
    mounted() {

    },
    methods: {
        getPx(px) {
            return Math.round(px * this.mapWidth / this.coordinateWidth)
        },
        getFontSize() {
            let fontSize = Math.ceil(this.mapWidth / 100)
            fontSize = fontSize < 6 ? 6 : (fontSize > 10 ? 10 : fontSize)
            return fontSize
        }
    }
}
</script>

<style scoped>
.city-point {
    position: absolute;
    width: 1px;
    height: 1px;
}

.point-image {
    position: absolute;
    background-color: #fff;
    border-radius: 20px;
    animation: breathing 1s ease 0s infinite alternate;
    width: 10px;
    height: 10px;
    left: -5px;
    top: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.point-image img {
    width: 80%;
}

.city-line {
    border-color: rgba(0, 0, 0, 0.4);
    border-style: solid;
    border-width: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
}

.city-mark {
    border-radius: 100px;
    border: 1px solid rgba(2, 90, 255, 0.55);
    background-color: rgba(247, 247, 247, 0.5);
    line-height: 1.5;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 3;
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

.city-point:hover {
    z-index: 10;
}

.city-point:hover .point-image {
    background-color: #0297FF;
}

.city-point:hover .point-image {
    animation: breathing-deep 1s ease 0s infinite alternate;
}

.city-point:hover .point-image img {
    -webkit-filter: brightness(0) invert(1);
    filter: brightness(0) invert(1);
}

.city-point:hover .city-mark {
    z-index: 990;
    background-color: rgba(247, 247, 247, 1);
    cursor: pointer;
}


@keyframes breathing {
    0% {
        box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.3);
    }

    100% {
        box-shadow: 0 0 7px 3px rgba(2, 70, 255, 0.6);
    }
}

@keyframes breathing-deep {
    0% {
        box-shadow: 0 0 5px 2px rgba(2, 70, 255, 0.3);
    }

    100% {
        box-shadow: 0 0 10px 6px rgba(2, 70, 255, 0.8);
    }
}
</style>
