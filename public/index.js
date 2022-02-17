let myChart = document.getElementById('canvas').getContext('2d');
let myData = Array.from(document.querySelectorAll('h1'));
// conver string to array object of floats
let xValues0 = myData[0].textContent.replaceAll(',', ' ').split(' ');
let yValues0 = myData[1].textContent.replaceAll(',', ' ').split(' ');



// create data object for scatter plot
let dataObject1 = [];
let dataObject2 = [
  {x:1, y:0.99},
  {x:2, y:0.74},
  {x:3, y:0.44},
  {x:4, y:0.20}
];

// hide chart 2 if no valuse available
var hidden = false;

if(dataObject2.length === 0){
  hidden = true;
}




for (var i = 0; i<xValues0.length; i++){
  dataObject1.push({x : xValues0[i], y : yValues0[i]});
}


let chart = new Chart(myChart, {
  type:'scatter',
  data:{

    datasets:[{
      label:'y_values[0]',
      backgroundColor: 'tomato',
      borderColor: 'rgb(255, 99, 132)',
      showLine: true,

      data: dataObject1

    },
    {
      type: "scatter",
      label: 'y_values[1]',
      backgroundColor: 'orange',
      borderColor: 'blue',
      showLine: true,
      hidden: hidden,
      data: dataObject2
    }
    ]
  },
  options:{}
});
