import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
	Icon,
	Container,
	Box,
	Heading,
	Button,
	Flex,
	Text,
	Input,
	Image,
	Select,
	Stack,
	Switch,
} from '@chakra-ui/react'
import {
	IoImageOutline,
	IoFileTrayOutline,
	IoFlagOutline,
	IoMegaphoneOutline,
	IoImage,
} from 'react-icons/io5'
import ProfilePic from './profilepic.png'

const MyProfile = () => {
	return (
		<Container
			marginTop={32}
			centerContent
		>
			<Box>
				<Heading as='h3' color={'white'} align={'center'}>
					My Profile
				</Heading>
			</Box>
			<Box
				width={1228}
				height={236}
				marginBottom={30}
				background={'#232323'}
				color={'white'}
				borderRadius="18px"
				overflow="hidden"
			>
				<Text
					marginTop={20}
					marginLeft={20}
					fontWeight={700}
					fontSize={20}
				>
					Edit your avatar
				</Text>
				<Flex
					width={618}
					height={128}
					marginLeft={20}
					marginTop={41}
				>
					<Image
						align="center"
						src={ProfilePic}
						alt="Profile Picture"
						width={128}
						height={128}
						borderRadius={'50%'} // Makes the image round
						mr={4} // Add margin right to separate the image from the text
					/>
					<Box flex="1" marginLeft={30} marginTop={-20}> {/* Use remaining space and push content to the right */}
						<Text fontSize="lg" fontWeight="bold">
							Upload a new avatar*
						</Text>
						<Box
							width={460}
							height={64}
							borderRadius={16}
							border={'1px solid'}
							borderColor={'#FFFFFF'}
						>
							<Button
								marginTop={10}
								marginLeft={12}
								leftIcon={<Icon as={IoImage} />}
								width={142}
								height={44}
								borderRadius={12}
								fontWeight={700}
								fontSize={14}
							>
								Choose File
							</Button>
						</Box>
						<Text
							marginBottom={20}
							fontWeight={400}
							fontSize={14}
						>
							JPEG 100x100
						</Text>
					</Box>
				</Flex>
			</Box>
			<Box
				width={1228}
				height={637}
				marginBottom={30}
				background={'#232323'}
				color={'white'}
				borderRadius="18px"
				overflow="hidden"
			>
				<Text
					marginLeft={20}
					fontWeight={700}
					fontSize={20}
				>
					Edit your profile
				</Text>
				<Box bg="#232323" p={4} borderRadius="lg" boxShadow="xl" width="full">
					<Flex justifyContent="space-between" marginLeft={20}>
						<Text color="white" flex={1} textAlign="start">Your name</Text>
						<Text color="white" flex={1} textAlign="start">Email address</Text>
						<Text color="white" flex={1} textAlign="start">Phone number</Text>
					</Flex>
					<Flex>
						<Input
							placeholder="Enter your name"
							width={376}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							marginLeft={20}							
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
						<Input
							placeholder="Enter your email"
							width={376}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
						<Input
							placeholder="Enter your phone"
							width={376}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
					</Flex>
				</Box>
				<Box bg="#232323" p={4} borderRadius="lg" boxShadow="xl" width="full">
					<Flex justifyContent="space-between" marginLeft={20}>
						<Text color="white" flex={1} textAlign="start">Bio</Text>
					</Flex>
					<Flex>
						<Input
							placeholder="Say something about yourself"
							width={1188}
							height={180}
							borderRadius={12}
							flex={1}
							marginRight={30}
							marginLeft={20}							
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
					</Flex>
				</Box>
				<Box bg="#232323" p={4} borderRadius="lg" boxShadow="xl" width="full">
					<Flex justifyContent="space-between" marginLeft={20}>
						<Text color="white" flex={1} textAlign="start">Location</Text>
						<Text color="white" flex={1} textAlign="start">Username</Text>
					</Flex>
					<Flex>
						<Select 
							placeholder="Country"
							width={376}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							marginLeft={20}							
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						>
							<option value='option1'>Option 1</option>
							<option value='option2'>Option 2</option>
							<option value='option3'>Option 3</option>
						</Select>
						<Input
							placeholder="John Doe"
							width={376}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
					</Flex>
				</Box>
				<Box marginTop={15} marginBottom={20}>
					<Button
						width={242.5}
						height={50}
						borderRadius={14}
						background={'#DEE8E8'}
						fontWeight={700}
						fontSize={14}
						marginLeft={20}
						color={'black'}
					>
						Cancel
					</Button>
					<Button
						width={242.5}
						height={50}
						borderRadius={14}
						background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
						fontWeight={700}
						fontSize={14}
						marginLeft={20}
						color={'white'}
					>
						Save
					</Button>
				</Box>
			</Box>
			<Box
				width={1228}
				height={509}
				marginBottom={30}
				background={'#232323'}
				color={'white'}
				borderRadius="18px"
				overflow="hidden"
			>
				<Text
					marginLeft={20}
					fontWeight={700}
					fontSize={20}
				>
					Change password
				</Text>
				<Box bg="#232323" p={4} borderRadius="lg" boxShadow="xl" width="full">
					<Flex justifyContent="space-between" marginLeft={20}>
						<Text color="white" flex={1} textAlign="start">Old password</Text>
					</Flex>
					<Flex>
						<Input
							placeholder="Say something about yourself"
							width={1188}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							marginLeft={20}							
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
					</Flex>
				</Box>
				<Box bg="#232323" p={4} borderRadius="lg" boxShadow="xl" width="full">
					<Flex justifyContent="space-between" marginLeft={20}>
						<Text color="white" flex={1} textAlign="start">New password</Text>
					</Flex>
					<Flex>
						<Input
							placeholder="Say something about yourself"
							width={1188}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							marginLeft={20}							
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
					</Flex>
				</Box>
				<Box bg="#232323" p={4} borderRadius="lg" boxShadow="xl" width="full">
					<Flex justifyContent="space-between" marginLeft={20}>
						<Text color="white" flex={1} textAlign="start">Confirm password</Text>
					</Flex>
					<Flex>
						<Input
							placeholder="Say something about yourself"
							width={1188}
							height={52}
							borderRadius={12}
							flex={1}
							marginRight={30}
							marginLeft={20}							
							bgColor="#121212"
							borderColor="#565656"
							color="white"
						/>
					</Flex>
				</Box>
				<Box marginTop={15} marginBottom={20}>
					<Button
						width={242.5}
						height={50}
						borderRadius={14}
						background={'#DEE8E8'}
						fontWeight={700}
						fontSize={14}
						marginLeft={20}
						color={'black'}
					>
						Cancel
					</Button>
					<Button
						width={242.5}
						height={50}
						borderRadius={14}
						background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
						fontWeight={700}
						fontSize={14}
						marginLeft={20}
						color={'white'}
					>
						Save
					</Button>
				</Box>
			</Box>
			<Box
				width={1228}
				height={377}
				marginBottom={30}
				background={'#232323'}
				color={'white'}
				borderRadius="18px"
				overflow="hidden"
			>
				<Text
					marginLeft={20}
					fontWeight={700}
					fontSize={20}
				>
					Notification setting
				</Text>
				<Stack align='center' direction='row'>
					<Switch size='sm' />
					<Switch size='md' />
					<Switch size='lg' />
				</Stack>
				<Text
					marginLeft={20}
				>
					New Items Notification
				</Text>
				<Text
					marginLeft={20}
				>
					Email Notification
				</Text>
				<Text
					marginLeft={20}
				>
					Two Factor Authentication
				</Text>
				<Box marginTop={15} marginBottom={20}>
					<Button
						width={242.5}
						height={50}
						borderRadius={14}
						background={'#DEE8E8'}
						fontWeight={700}
						fontSize={14}
						marginLeft={20}
						color={'black'}
					>
						Cancel
					</Button>
					<Button
						width={242.5}
						height={50}
						borderRadius={14}
						background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
						fontWeight={700}
						fontSize={14}
						marginLeft={20}
						color={'white'}
					>
						Save
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default MyProfile