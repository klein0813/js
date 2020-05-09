<div class="text-container" @click="copyAmoyPassword(courseCode)">{{ courseCode }}</div>

  const copyTextToClipboard = (text) => {
    if (!text) {
      return
    }
    let copyFrom = document.createElement('div')
    copyFrom.textContent = text
    copyFrom.style.cssText = 'width: 0px; height: 0px;'
    let body = document.getElementsByTagName('body')[0]
    body.appendChild(copyFrom)
    let rangeToSelect = document.createRange()
    rangeToSelect.selectNodeContents(copyFrom)
    let selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(rangeToSelect)
    copyFrom.contentEditable = false
    let result = false
    try {
      result = document.execCommand('copy')
    } catch (e) {
      console.log(e)
    } finally {
      body.removeChild(copyFrom)
      return result
    }
  }

      copyAmoyPassword (value) {
        if (copyTextToClipboard(value)) {
          this.$toast({
            message: '兑换码复制成功',
            duration: 3000
          })
        } else {
          this.$toast({
            message: '兑换码复制失败',
            duration: 3000
          })
        }
        this.mai.memberEvent.logPageOperate({ type: 'click', pageContent: 'Keep中奖页面', content: 'Keep中奖页面-复制兑换码-' + this.courseCode, utmSource: this.$route.query['source'] })
      },
