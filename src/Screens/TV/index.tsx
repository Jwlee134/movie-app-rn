import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RefreshControl} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';
import {fetchTVData} from '~/store/tv';

import styled from 'styled-components/native';

import {TVNaviParamList} from '~/@types';

import useRefresh from '~/hooks/useRefresh';

import Error from '../Error';
import Loading from '../Loading';
import BigCatalogList from '~/Components/BigCatalogList';
import SubCatalogList from '~/Components/SubCatalogList';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #141414;
`;

type NavigationProp = StackNavigationProp<TVNaviParamList, 'TVHome'>;
interface Props {
  navigation: NavigationProp;
}

const TVHome = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {loading, topRated, popular, upcoming, error} = useSelector(
    (state: RootState) => state.tv,
  );
  const {handleRefresh, refreshing} = useRefresh(false);

  const {value} = useSelector((state: RootState) => state.language);

  useEffect(() => {
    dispatch(fetchTVData(value));
  }, [dispatch, value]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    <Container
      refreshControl={
        <RefreshControl
          onRefresh={handleRefresh}
          refreshing={refreshing}
          colors={['#ffffff']}
          progressBackgroundColor="#141414"
        />
      }>
      <BigCatalogList
        onPress={(id: number, title: string) => {
          navigation.push('TVDetail', {
            id,
            title,
          });
        }}
      />
      <SubCatalogList
        title="인기"
        titleStyle={{fontSize: 18, paddingLeft: 8}}
        data={popular}
        onPress={(id: number, title: string) => {
          navigation.push('TVDetail', {
            id,
            title,
          });
        }}
      />
      <SubCatalogList
        title="최고 평점"
        titleStyle={{fontSize: 18, paddingLeft: 8}}
        data={topRated}
        onPress={(id: number, title: string) => {
          navigation.push('TVDetail', {
            id,
            title,
          });
        }}
      />
      <SubCatalogList
        title="방영 예정"
        titleStyle={{fontSize: 18, paddingLeft: 8}}
        data={upcoming}
        onPress={(id: number, title: string) => {
          navigation.push('TVDetail', {
            id,
            title,
          });
        }}
      />
    </Container>
  );
};

export default TVHome;