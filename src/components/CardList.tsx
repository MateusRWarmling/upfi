import { SimpleGrid, useDisclosure, Box, Image, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose } = useDisclosure();
  const [ imgUrl, setImageUrl] = useState('');
  
  function openModal(url) {
    setImageUrl(url)
  }

  return (
    <>
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => {
          <Card key={card.id} data={card} viewImage={() => openModal(card.url)}/>
        })}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />
    </>
  );
}
