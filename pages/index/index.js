var app = getApp()

Page({
  data: {
    imageBgSrc: '../../image/con-bg.jpg',
    imageAddSrc: '../../image/camera.svg',
    item: 'camera',
    isShowImage: true,
    isShowText: true,
    isProgress: false,
    isShowAgainButton: false,
    progressPercent: 0,
  },
  handleChooseImage: function () {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: [''],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          item: 'image',
          isProgress: true,
          isShowImage: false,
          isShowText: false,
        })

        uploadFile(_this, tempFilePaths[0])
      },
    })
  },
  handlePlayAgain: function () {
    this.setData({
      item: 'camera',
      imageAddSrc: '../../image/camera.svg',
      isShowImage: true,
      isShowText: true,
      isShowAgainButton: false,
    })
  }
})

function uploadFile(page, path) {
  var uploadTask = wx.uploadFile({
    url: APIHost + uploadFilePath,
    filePath: path,
    name: 'image',
    success: function (res) {
      var data = res.data
      var base64 = res.data.substring(1, res.data.length - 1)
      page.setData({
        imageAddSrc: 'data:image/jpeg;base64,' + base64,
        isProgress: false,
        isShowImage: true,
        isShowAgainButton: true
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
  uploadTask.onProgressUpdate((res) => {
    page.setData({
      progressPercent: 100
    })
  })
}