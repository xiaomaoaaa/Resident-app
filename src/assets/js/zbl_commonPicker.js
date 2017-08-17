import {
    Picker
} from './zbl_picker.min.js'
export let zbl_commonPicker = function(nameEle,chooseArr,title) {

    var picker = new Picker({
        data: [chooseArr],
        selectedIndex: [20],
        title: title
    })

    picker.show()

    picker.on('picker.select', function(selectedVal, selectedIndex) {
        console.log(chooseArr[selectedIndex[0]].text)
        nameEle.innerHTML = chooseArr[selectedIndex[0]].text
    })

}
