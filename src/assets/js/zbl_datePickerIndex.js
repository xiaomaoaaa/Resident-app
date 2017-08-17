import {
    Picker
} from './zbl_picker.min.js'
export let zbl_datePickerIndex = function(nameEle) {
    var nameEl = nameEle

    var year = [{
        text: '2017',
        value: 1
    }, {
        text: '2018',
        value: 2
    }, {
        text: '2019',
        value: 3
    }, {
        text: '2020',
        value: 4
    }, {
        text: '2021',
        value: 5
    }, {
        text: '2022',
        value: 6
    }, {
        text: '2023',
        value: 7
    }, {
        text: '2024',
        value: 8
    }, {
        text: '2025',
        value: 9
    }, {
        text: '2026',
        value: 10
    }]

    var month = [{
            text: '01',
            value: 1
        },
        {
            text: '02',
            value: 2
        },
        {
            text: '03',
            value: 3
        },
        {
            text: '04',
            value: 4
        },
        {
            text: '05',
            value: 5
        },
        {
            text: '06',
            value: 6
        },
        {
            text: '07',
            value: 7
        },
        {
            text: '08',
            value: 8
        },
        {
            text: '09',
            value: 9
        },
        {
            text: '10',
            value: 10
        },
        {
            text: '11',
            value: 11
        },
        {
            text: '12',
            value: 12
        }
    ]

    var day = [{
            text: '01',
            value: 1
        }, {
            text: '02',
            value: 2
        },
        {
            text: '03',
            value: 3
        }, {
            text: '04',
            value: 4
        }, {
            text: '05',
            value: 5
        }, {
            text: '06',
            value: 6
        }, {
            text: '07',
            value: 7
        }, {
            text: '08',
            value: 8
        }, {
            text: '09',
            value: 9
        }, {
            text: '10',
            value: 10
        }, {
            text: '11',
            value: 11
        }, {
            text: '12',
            value: 12
        }, {
            text: '13',
            value: 13
        }, {
            text: '14',
            value: 14
        }, {
            text: '15',
            value: 15
        }, {
            text: '16',
            value: 16
        }, {
            text: '17',
            value: 17
        }, {
            text: '18',
            value: 18
        }, {
            text: '19',
            value: 19
        }, {
            text: '20',
            value: 20
        }, {
            text: '21',
            value: 21
        }, {
            text: '22',
            value: 22
        }, {
            text: '23',
            value: 23
        }, {
            text: '24',
            value: 24
        }, {
            text: '25',
            value: 25
        }, {
            text: '26',
            value: 26
        }, {
            text: '27',
            value: 27
        }, {
            text: '28',
            value: 28
        }, {
            text: '29',
            value: 29
        }, {
            text: '30',
            value: 30
        }, {
            text: '31',
            value: 31
        }
    ]

    var pickerDate = new Picker({
        data: [year, month, day],
        selectedIndex: [0, 6, 19],
        title: '时间选择'
    });

    pickerDate.on('picker.select', function(selectedVal, selectedIndex) {
        // console.log(document.querySelector('.selectedTime'));
        document.querySelector('.selectedTime').innerText = year[selectedIndex[0]].text + '-' + month[selectedIndex[1]].text + '-' + day[selectedIndex[2]].text;
    })

    pickerDate.on('picker.change', function(index, selectedIndex) {
        // console.log(index);
        // console.log(selectedIndex);
    });

    pickerDate.on('picker.valuechange', function(selectedVal, selectedIndex) {
        // console.log(selectedVal);
        // console.log(selectedIndex);
    });

    nameEl.addEventListener('click', function() {
        pickerDate.show();
    });
}
