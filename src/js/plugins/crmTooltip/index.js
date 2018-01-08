// export default class CrmTooltip {
//     constructor(options = {}) {
//         if (this instanceof CrmTooltip) {
//             return this;
//         }
//         let div = document.createElement('div');
//         div.className = "phone-number-tips";
//         this.dom = div;

//         this.dom.position = 'fixed';
//         document.body.appendChild(this.dom);
//     }
//     create(options = {}) {
//         let { left, top } = this._getPosition(options.target);
//         this.dom.outerText = options.target;
//         this.dom.style.display = "block";
//         this.dom.style.left = left;
//         this.dom.style.top = top;
//     }
//     _getPosition(dom) {
//         return {
//             left: dom.offsetLeft,
//             top: dom.offsetTop
//         }
//     }
//     destroy() {
//         this.dom.display = "none"
//     }
// }
import Vue from 'vue'
import ToolTip from './ToolTip.vue'

ToolTip.installToolTip = function(event, opt) {

  var options = opt

  var rect = {};
  ['top', 'left'].forEach(function(property) {
    var scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
    rect[property] = event.target.getBoundingClientRect()[property] +
      document.body[scroll] +
      document.documentElement[scroll]
  });
  ['height', 'width'].forEach(function(property) {
    rect[property] = event.target.getBoundingClientRect()[property]
  });
  options.rect = rect
  var toolTip = Vue.extend(ToolTip)

  var component = new toolTip({
    data: options
  }).$mount()
  event.target.appendChild(component.$el)
}

export default ToolTip