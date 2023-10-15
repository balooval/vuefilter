export default {
    directives: {
        'click-outside': {
          bind: function(el, binding, vNode) {
            const bubble = binding.modifiers.bubble
            const handler = (e) => {
              if (bubble || (!el.contains(e.target) && el !== e.target)) {
                console.log('Call');
                  binding.value(e)
              }
            }
            el.__vueClickOutside__ = handler
            document.addEventListener('click', handler)
          },
          
          unbind: function(el, binding) {
            document.removeEventListener('click', el.__vueClickOutside__)
            el.__vueClickOutside__ = null
          }
        }
    }
}