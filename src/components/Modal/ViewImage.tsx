import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent 
        bgColor="pGray.800"
        p="0"
        maxW="fit-content"
        maxH="fit-content" 
      >
        <ModalBody p="0">
          <Image src={imgUrl} maxW="900px" maxh="600px"/>
        </ModalBody>

      <ModalFooter h="2rem" justifyContent="initial">
          <Link target="_blank" href={imgUrl} fontSize="0.875rem">Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
