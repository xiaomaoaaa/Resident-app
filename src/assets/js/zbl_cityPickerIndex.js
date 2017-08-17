import {Picker} from './zbl_picker.min.js'
import {city} from './zbl_city.js'
export let zbl_cityPickerIndex = function(nameEle) {

    var nameEl = nameEle;

    var first = []; /* 省，直辖市 */
    var second = []; /* 市 */
    var third = []; /* 镇 */

    var selectedIndex = [1, 1, 1]; /* 默认选中的地区 */

    var checked = [1, 1, 1]; /* 已选选项 */

    function creatList(obj, list) {
        obj.forEach(function(item, index, arr) {
            var temp = new Object();
            temp.text = item.name;
            temp.value = index;
            list.push(temp);
        })
    }

    creatList(city, first);

    if (city[selectedIndex[0]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub, second);
    } else {
        second = [{
            text: '',
            value: 0
        }];
    }

    if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
        creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
    } else {
        third = [{
            text: '',
            value: 0
        }];
    }

    var pickerCity = new Picker({
        data: [first, second, third],
        selectedIndex: selectedIndex,
        title: '地址选择'
    });

    pickerCity.on('picker.select', function(selectedVal, selectedIndex) {
        var text1 = first[selectedIndex[0]].text;
        var text2 = second[selectedIndex[1]].text;
        var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';

        nameEl.innerText = text1 + ' ' + text2 + ' ' + text3;
    });

    pickerCity.on('picker.change', function(index, selectedIndex) {
        if (index === 0) {
            firstChange();
        } else if (index === 1) {
            secondChange();
        }

        function firstChange() {
            second = [];
            third = [];
            checked[0] = selectedIndex;
            var firstCity = city[selectedIndex];
            if (firstCity.hasOwnProperty('sub')) {
                creatList(firstCity.sub, second);

                var secondCity = city[selectedIndex].sub[0]
                if (secondCity.hasOwnProperty('sub')) {
                    creatList(secondCity.sub, third);
                } else {
                    third = [{
                        text: '',
                        value: 0
                    }];
                    checked[2] = 0;
                }
            } else {
                second = [{
                    text: '',
                    value: 0
                }];
                third = [{
                    text: '',
                    value: 0
                }];
                checked[1] = 0;
                checked[2] = 0;
            }

            pickerCity.refillColumn(1, second);
            pickerCity.refillColumn(2, third);
            pickerCity.scrollColumn(1, 0)
            pickerCity.scrollColumn(2, 0)
        }

        function secondChange() {
            third = [];
            checked[1] = selectedIndex;
            var first_index = checked[0];
            if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                var secondCity = city[first_index].sub[selectedIndex];
                creatList(secondCity.sub, third);
                pickerCity.refillColumn(2, third);
                pickerCity.scrollColumn(2, 0)
            } else {
                third = [{
                    text: '',
                    value: 0
                }];
                checked[2] = 0;
                pickerCity.refillColumn(2, third);
                pickerCity.scrollColumn(2, 0)
            }
        }

    });

    pickerCity.on('picker.valuechange', function(selectedVal, selectedIndex) {
        console.log(selectedVal);
        console.log(selectedIndex);
    });

    nameEl.addEventListener('click', function() {
        pickerCity.show();
    });
}
