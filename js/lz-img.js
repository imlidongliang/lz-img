;
(function(window, undefined) {
    'use strict';
    const cache = {}

    function loadImg() {

        const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const images = document.querySelectorAll('.lz-img')

        images.forEach((item, index) => {
            const top = item.getBoundingClientRect().top
            const src = item.dataset.src || item.getAttribute('data-src')

            if (0 < top && top < clientHeight) {
                if (!cache[index]) {
                    item.setAttribute('src', src)
                    cache[index] = true
                }
            }
        })

    }

    /**
     * 节流
     *
     * @param {*} fn         回调
     * @param {*} threshold  阈值
     * @returns              function
     */
    function throttle(fn, threshold) {
        let iCan = true
        return function() {
            if (!iCan) { return }
            iCan = false
            setTimeout(() => {
                fn.apply(this, arguments)
                iCan = true
            }, threshold)
        }
    }
    window.addEventListener('DOMContentLoaded', function(e) {
        loadImg()
    })
    window.addEventListener('scroll', throttle(function(e) {
        loadImg()
    }, 100))
}(window))