//将tools定义为window对象的属性，该属性的值是一个对象
window.tools = {};
//获取鼠标位置
window.tools.getMouse = function (element) {

  //定义一个mouse的对象
  var mouse = { x: 0, y: 0 };
  //为传入的元素添加mousemove事件
  addEvent(element, "mousemove", function (e) {
    var x, y;
    //在IE中，event对象是作为window对象的一个属性存在
    var e = e || window.event;
    //获取鼠标当前位置，并作兼容处理
    //兼容Firefox、chrome、IE9及以上
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    //兼容IE8及以下，以及混杂模式下的Chrome和Safari
    else {
      x = e.clientX + document.body.scrollLeft || document.
        documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop || document.
        documentElement.scrollTop;
    }
    //将当前的坐标值减去canvas元素的偏移位置，则x、y为鼠标在canvas中的相对坐标
    x -= element.offsetLeft;
    y -= element.offsetTop;

    mouse.x = x;
    mouse.y = y;
  })
  //返回值为mouse对象
  return mouse;

  function addEvent(element, eventType, callback) {
    if (element.addEventListener) {
      // For modern browsers (including IE9 and above)
      element.addEventListener(eventType, callback);
    } else if (element.attachEvent) {
      // For older versions of IE (IE8 and below)
      element.attachEvent("on" + eventType, callback);
    } else {
      // Fallback for browsers that do not support addEventListener or attachEvent
      element["on" + eventType] = callback;
    }
  }

}

