const VueDragPop = {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        dragPopover (e, popClass, titleClass) {
          const popHeaderEl = document.querySelector(titleClass); // ".my-popover-header");
          const dragDom = document.querySelector(popClass); // ".my-popover");

          popHeaderEl.style.cssText += ';cursor:move;';
          const sty = (function () {
            if (window.document.currentStyle) {
              return (dom, attr) => dom.currentStyle[attr];
            } else {
              return (dom, attr) => window.getComputedStyle(dom, false)[attr];
            }
          })();
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - popHeaderEl.offsetLeft;
          const disY = e.clientY - popHeaderEl.offsetTop;
          const screenWidth = document.body.clientWidth; // body当前宽度
          const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          // const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
          // const dragDomheight = dragDom.offsetHeight; // 对话框高度

          const minDragDomLeft = dragDom.offsetLeft + 180;
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - 60;

          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop = screenHeight - dragDom.offsetTop - 60;
          // console.log(sty)
          // 获取到的值带px 正则匹配替换

          let styL = sty(dragDom, 'left');
          let styR = sty(dragDom, 'right');
          styR = +styR.replace(/px/g, '');
          let styT = sty(dragDom, 'top');
          let styB = sty(dragDom, 'bottom');
          styB = +styB.replace(/px/g, '');
          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
            styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
          } else {
            styL = +styL.replace(/px/g, '');
            styT = +styT.replace(/px/g, '');
          }
          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            // console.log(e)
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            // 边界处理
            if (-left > minDragDomLeft) {
              left = -minDragDomLeft;
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft;
            }

            if (-top > minDragDomTop) {
              top = -minDragDomTop;
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop;
            }
            // console.log(left + 115);
            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            if (window.ActiveXObject || 'ActiveXObject' in window) {
              dragDom.style.cssText += `;right:${-left + styR}px;top:${top + styT}px;`;
              if (dragDom.currentStyle.top === 'auto') {
                dragDom.style.cssText += `;left:${left + styL}px;bottom:${-top + styB}px;`;
              }
            }
          };

          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
            popHeaderEl.style.cssText += ';cursor:default;';
          };
        }
      }
    });
  }
};

export default VueDragPop;
