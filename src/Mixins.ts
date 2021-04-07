export default {
  methods: {
    currency: function (val: number = 0):string {
      return (val / 100).toLocaleString('zh', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }
  }
}