import React, {useState, useEffect} from 'react';

import {LineChart} from 'react-native-chart-kit';

import {ScrollView, ToastAndroid} from 'react-native';

import {Container, Title, Legend, LegendItem, TitleLegend} from './styles';

import Database from '../../database/database';

const db = new Database();

const chartConfig = {
  backgroundGradientFrom: '#1da334',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#1da334',
  backgroundGradientToOpacity: 1,
  color: () => 'white',
  strokeWidth: 1,
};

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
      // await db.deleteDataOfTable();
      // await db.initDB();

      const response = await db.index();
      var x = [];
      var y1 = [];
      var y2 = [];
      var y3 = [];
      var y4 = [];

      for (let i = 0; i < response.rows.length; ++i) {
        const item = response.rows.item(i);
        const time = new Date(item.date);
        x.push(`${time.getHours()}:${time.getMinutes()}`);
        y1.push(item.temperatura);
        y2.push(item.umidade_solo);
        y3.push(item.umidade_ar);
        y4.push(Math.abs(16 - item.altura));
      }

      setData({
        labels: x,
        datasets: [
          {
            data: y1,
            color: (opacity = 1) => '#de371d',
          },
          {
            data: y2,
            color: (opacity = 1) => 'brown',
          },
          {
            data: y3,
            color: (opacity = 1) => '#20d0e3',
          },
          {
            data: y4,
            color: (opacity = 1) => 'orange',
          },
        ],
      });
    };
    loadData();
  }, []);

  return (
    <Container>
      <Legend>
        <LegendItem inputColor="#20d0e3" />
        <TitleLegend>Umidade Ar</TitleLegend>
        <LegendItem inputColor="brown" />
        <TitleLegend>Umidade Solo</TitleLegend>
        <LegendItem inputColor="#de371d" />
        <TitleLegend>Temperatura</TitleLegend>
        <LegendItem inputColor="orange" />
        <TitleLegend>Altura</TitleLegend>
      </Legend>

      <ScrollView horizontal={true}>
        {data.labels.length > 0 ? (
          <LineChart
            withShadow={false}
            fromZero={true}
            data={data}
            verticalLabelRotation={45}
            width={700}
            height={520}
            chartConfig={chartConfig}
            bezier
            onDataPointClick={value => {
              ToastAndroid.show(String(value.value), ToastAndroid.SHORT);
            }}
          />
        ) : (
          <TitleLegend>Não existem dados</TitleLegend>
        )}
      </ScrollView>
    </Container>
  );
}

Graph.navigationOptions = () => ({
  title: 'Graph',
});
