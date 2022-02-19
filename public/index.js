//jshint esversion:8

let myChart = document.getElementById('canvas').getContext('2d');
let myData = Array.from(document.querySelectorAll('h5'));
let button = document.querySelector('button');

button.addEventListener('click', function(event){
  let checkButton = document.querySelectorAll('input');
  let canvas = document.querySelector('#canvas');

  if(checkButton[0].checked === false){
    // hideChart[0] = true;
    chart.data.datasets[0].hidden = true;

  }else{
    chart.data.datasets[0].hidden = false;
  }

  if(checkButton[1].checked === false){

    chart.data.datasets[1].hidden = true;
  }else{
    chart.data.datasets[1].hidden = false;
  }
chart.update();

});

// console.log(myData);
// conver string to array object of floats
// chart
// create data object for scatter plot
let dataObject1 = [];
let dataObject2 = [];
let counter = 0; // counts the number of charts need to be created
for (let i = 0; i < myData.length/2; i++){
  // create data object for chart 1
  if(counter === 0){
  let xValues = myData[counter+0].textContent.replaceAll(',', ' ').split(' ');
  let yValues = myData[counter+1].textContent.replaceAll(',', ' ').split(' ');

    for (let i = 0; i<xValues.length; i++){
      dataObject1.push({x : xValues[i], y : yValues[i]});
      }
      counter++;
    }//end if

    // create data object for chart 2
    if(counter === 1){
      let xValues = myData[counter+1].textContent.replaceAll(',', ' ').split(' ');
      let yValues = myData[counter+2].textContent.replaceAll(',', ' ').split(' ');

        for (let i = 0; i<xValues.length; i++){
          dataObject2.push({x : xValues[i], y : yValues[i]});
          }
          counter++;
    }
}// end outter for loop



// hide chart  if no valuse available
let hideChart = [false, false];


if(dataObject1.length === 0){
  hidChart[0] = true;
}
if(dataObject2.length === 0){
  hideChart[1] = true;
}


  let chart = new Chart(myChart, {
    type:'scatter',
    data:{

      datasets:[{
        label:'y_values[0]',
        backgroundColor: 'tomato',
        borderColor: 'rgb(255, 99, 132)',
        showLine: true,
        hidden: hideChart[0],
        data: dataObject1

      },
      {
        type: "scatter",
        label: 'y_values[1]',
        backgroundColor: 'orange',
        borderColor: 'blue',
        showLine: true,
        hidden: hideChart[1],
        data: dataObject2
      }
      ]
    },
    options:{
      scales:{
        x:{
          title: {
            display: true,
            align: 'center',
            text: 'x-axis'
          }
        }
      }
    }
  });

// chart.data.datasets[0].hidden;
