import React, {useState, useEffect} from 'react';

import {LineChart} from 'react-native-chart-kit';

import {
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {
  Container,
  ContainerLoading,
  Legend,
  LegendItem,
  TitleLegend,
  TitleNo,
} from './styles';

import Database from '../../database/database';

const db = new Database();

import ChartConfig from '../../Config/ChartConfig';

export default function Graph() {
  const screenWidth = Dimensions.get('window').height;

  const [data, setData] = useState({
    labels: [''],
    datasets: [],
  });

  const [widthGraph, setWidthGraph] = useState(300);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // await db.initDB();
      // await db.store(28, 29, 30, 31);
      // await db.deleteDataOfTable();

      const response = await db.index();
      var x = [];
      var y1 = [];
      var y2 = [];
      var y3 = [];
      var y4 = [];

      for (let i = 0; i < response.rows.length; ++i) {
        const item = response.rows.item(i);
        console.tron.log(item.date);
        x.push(item.date.split('.')[0]);
        y1.push(item.temperatura);
        y2.push(item.umidade_solo);
        y3.push(item.umidade_ar);
        y4.push(Math.abs(16 - item.altura));
      }
      setWidthGraph(response.rows.length * 50);
      setLoading(false);
      response.rows.length &&
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
      {!loading ? (
        data.datasets.length > 0 ? (
          <>
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
              <LineChart
                withShadow={false}
                fromZero={true}
                data={data}
                verticalLabelRotation={25}
                height={screenWidth - 160}
                width={widthGraph}
                chartConfig={ChartConfig}
                bezier
                onDataPointClick={value => {
                  ToastAndroid.show(String(value.value), ToastAndroid.SHORT);
                }}
              />
            </ScrollView>
          </>
        ) : (
          <ContainerLoading>
            <TitleNo>Não existem dados</TitleNo>
          </ContainerLoading>
        )
      ) : (
        <ContainerLoading>
          <ActivityIndicator size={50} color="#00ff00" />
        </ContainerLoading>
      )}
    </Container>
  );
}

Graph.navigationOptions = () => ({
  title: 'Graph',
});
