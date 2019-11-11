import React, {useState, useEffect} from 'react';

import {LineChart} from 'react-native-chart-kit';

import {ScrollView} from 'react-native';

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: () => 'black',
  strokeWidth: 1, // optional, default 3
};

import {Container, Title} from './styles';

import Database from '../../database/database';

const db = new Database();

export default function Graph() {
  const [data, setData] = useState({
    labels: [''],
    datasets: [
      {
        data: [0],
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      // await db.store(23, 55, 72, 1, new Date().toLocaleString());

      const response = await db.index();
      var dados = [];
      for (let i = 0; i < response.rows.length; ++i) {
        dados.push(response.rows.item(i));
      }

      var x = [];
      var y1 = [];
      var y2 = [];
      var y3 = [];
      var y4 = [];

      dados.forEach(item => {
        const time = new Date(item.date).toLocaleTimeString();
        x.push(time);
        y1.push(item.temperatura);
        y2.push(item.umidade_solo);
        y3.push(item.umidade_ar);
        y4.push(item.altura);
      });

      setData({
        labels: x,
        datasets: [
          {
            data: y1,
            color: (opacity = 1) => 'red',
          },
          {
            data: y2,
            color: (opacity = 1) => 'green',
          },
          {
            data: y3,
            color: (opacity = 1) => 'blue',
          },
          {
            data: y4,
            color: (opacity = 1) => 'yellow',
          },
        ],
      });
    };
    loadData();
  }, []);

  return (
    <Container>
      <Title>Day 1</Title>
      <ScrollView horizontal={true}>
        <LineChart
          data={data}
          verticalLabelRotation={45}
          width={700}
          height={530}
          chartConfig={chartConfig}
          bezier
        />
      </ScrollView>
    </Container>
  );
}

Graph.navigationOptions = () => ({
  title: 'Graph',
});
