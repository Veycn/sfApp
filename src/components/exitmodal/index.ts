export default {
  props: {
    title: {
      type: String,
      value: "是否退出检测"
    },
    correctbtn: {
      type: String,
      value: "是"
    },
    errorbtn: {
      type: String,
      value: "否"
    },
    isShow: {
      type: Boolean,
      value: false
    },
    modal: {
      type: String,
      value: "nocomplete_frame_show"
    }
  },

  computed: {

  }
}