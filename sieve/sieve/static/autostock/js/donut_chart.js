const data = {
  labels: [
    '삼성전자',
    'SK하이닉스',
    'NAVER',
    '셀트리온',
    '카카오'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100, 40, 60],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 0
  }]
};


const config = {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    legend: {
      position: 'right',
    },
    plugins: {
      
      datalabels: {
        formatter: (value) => {
          return value + '%';
        }
      }
    }
  },
};



var myChart = new Chart(
  document.getElementById('myChart'),
  config
);