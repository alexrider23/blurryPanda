import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
	Icon,
	Container,
	Box,
	List,
	ListItem,
	Link,
	Divider,
	Stack,
	Text,
	Heading,
	Button,
	Flex,
	Badge,
	ButtonGroup,
	RadioGroup,
	Radio,
	useRadioGroup,
	Image
} from '@chakra-ui/react'
import { px } from 'framer-motion'
import {
  IoImageOutline,
  IoFileTrayOutline,
  IoFlagOutline,
  IoMegaphoneOutline,
  IoStar,
  IoHeart,
} from 'react-icons/io5'
import { useAuth0 } from '@auth0/auth0-react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FallenNinja from './fallenninja.jpg'

const MangaCard = () => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'visibility',
    defaultValue: 'Public',
  });
  
  const group = getRootProps();
  
  return (
    <Container>
      <Box
        background={'#121212'}
        borderRadius={11}
        borderColor={'white'}
        borderWidth={1}
        borderStyle={'solid'}
        overflow="hidden"
        boxShadow="2xl"
        width={325}
        height={428}
        align="center"
        position="relative" // Added for absolute positioning of children

      >
        <Box position="relative" width="full" height="auto" marginTop={10}>
          <Image
            src={FallenNinja}
            alt="Fallen Ninja"
            objectFit="cover"
            borderRadius="11px"
            width={302}
            height={258}
          />

          {/* Overlay Flex container for the star and heart ratings */}
          <Flex
            position="absolute" // Absolutely positioned within the parent Box
            top="0" // Align to the top of the image
            left="0" // Align to the left of the image
            width="full" // Same width as the image container
            justify="space-between" // Distribute space between the star and heart ratings
            p={2} // Padding within the Flex container
          >
            <Flex
              background={'black'}
              borderRadius={6}
              width={64}
              height={35}
              p={1}
              align="center"
              justify="center"
              marginTop={212}
              marginBottom={11}
              marginLeft={21}
              flex={1}
            >
              <Icon as={IoStar}
                color="#CD43FF"
                width={22}
                height={20}
              />
              <Text
                color="white"
                fontWeight={700}
                fontSize={17}
                marginRight={4}
                marginLeft={4}
              >
                4.5
              </Text>
            </Flex>
            <Flex
              background={'black'}
              borderRadius={6}
              width={64}
              height={35}
              p={1}
              align="center"
              justify="center" // Center horizontally
              marginTop={212}
              marginBottom={11}
              marginRight={13}
              marginLeft={150}
            >
              <Icon as={IoHeart}
                color="#E2FE26"
                width={22}
                height={20}
              />
              <Text
                color="white"
                fontWeight={700}
                fontSize={17}
                marginRight={4}
                marginLeft={4}
              >
                99
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box
          marginLeft={16.5}
          align={'start'}
        >
          <Text
            fontSize={18}
            fontWeight={700}
            color={'white'}
          >
            Fallen Ninja Gaiden
          </Text>
        </Box>
        <Flex marginTop={-10} marginLeft={16.5} align={'start'}>
          <Text fontSize={14} fontWeight={700} color={'white'} mb={2}>
            Visibility
          </Text>
          <Box {...group}>
            <Flex direction="row" marginTop={13} marginLeft={16.5} align={'start'} color={'white'}>
              <Radio
                {...getRadioProps({ value: 'Public' })}
                colorScheme="green"
                borderWidth={1}
                borderStyle={'solid'}
                borderColor="white" // Unchecked state border color
                _checked={{
                  bg: 'green.500',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderColor: 'white', // Checked state border color
                }}
                marginLeft={13}
                marginRight={16}
              >
                Public
              </Radio>
              <Radio
                {...getRadioProps({ value: 'Private' })}
                colorScheme="red"
                borderColor="white" // Unchecked state border color
                _checked={{
                  bg: 'red.500',
                  borderColor: 'white', // Checked state border color
                }}
              >
                Private
              </Radio>
            </Flex>
          </Box>
        </Flex>
        <Flex
          marginTop={14}
          marginBottom={16}
          marginLeft={16.5}
          align={'start'}
        >
          <Button
            width={141}
            height={50}
            borderRadius={18}
            color={'white'}
            background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
            marginRight={9}
          >
            Edit
          </Button>
          <Button
            width={141}
            height={50}
            borderRadius={18}
            color={'black'}
            background={'white'}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </Container>

  )

}

export default MangaCard