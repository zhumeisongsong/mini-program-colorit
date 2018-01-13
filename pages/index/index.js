var app = getApp()

var host = 'http://120.79.187.171:8888/'
var APIRoot = 'api/'
var APIHost = host + APIRoot
var uploadFilePath = 'colorit/'

Page({
  data: {
    imageBgSrc: '../../image/con-bg.jpg',
    imageAddSrc: '../../image/camera.svg',
    item: 'camera',
    loadingSrc: '../../image/loading.svg',
    isShowImage: true,
    isShowText: true,
    isProgress: false,
    progressPercent: 0,
  },
  handleChooseImage: function () {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          item: 'image',
          isProgress: true,
          isShowImage: false,
          isShowText: false,
        })

        let uploadTask = uploadFile(_this, tempFilePaths[0])
        // uploadTask.onProgressUpdate((res) => {
        //   console.log(res.progress)
        //   console.log('上传进度', res.progress)
        //   _this.setData({
        //     progressPercent: 50
        //   })
        // })
        // test(_this)
      },
    })
  }
})

function uploadFile(page, path) {
  wx.uploadFile({
    url: APIHost + uploadFilePath,
    filePath: path,
    name: 'image',
    success: function (res) {
      var data = res.data
      console.log('success')
      var base64 = res.data.substring(1, res.data.length - 1)
      page.setData({
        imageAddSrc: 'data:image/jpeg;base64,' + base64,
        isProgress: false,
        isShowImage: true
      })
    },
    fail: function (res) {
      wx.showModal({
        title: 'colorit',
        content: '上传失败,请稍后重试',
        showCancel: false
      })
    }
  })
}

function test(page) {
  wx.request({
    url: 'http://120.79.187.171:8888/api/test1',
    success: function (res) {
      page.setData({
        imageAddSrc: 'data:image/jpeg;base64,' + res.data,
        isProgress: false,
        isShowImage: true
      })
    },
    fail: function (res) {
      console.log('fail')
      console.log(res)
    }
  })
}
