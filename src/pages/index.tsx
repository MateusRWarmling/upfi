import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ImageFetchResponse {
  data: Image[];
  after: number;
};

const fetchImages = ({ pageParam = null }): Promise<ImageFetchResponse> =>
     api.get('/api/images', {
       params: {
        after: pageParam
       },
     }).then(response => response.data);

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages,
    {
      getNextPageParam: (lastPage, pages) => lastPage.after,
    });

   const formattedData = useMemo(() => {
     const unformattedData = data?.pages.map(page => page.data);

     return unformattedData?.flat();
   }, [data]);

    if (isLoading) {
      return <Loading />
    } 
      
    if ( isError ) {
      return <Error />
    }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        
        { hasNextPage && (
          <Button
            onClick={() => { fetchNextPage() }}
          >
            { isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
