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
	Flex
} from '@chakra-ui/react'
import { px } from 'framer-motion'
import {
	IoImageOutline,
	IoFileTrayOutline,
	IoFlagOutline,
	IoMegaphoneOutline,
	IoCheckmarkDoneCircle,
	IoLockClosed,
} from 'react-icons/io5'
import { useAuth0 } from '@auth0/auth0-react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';



const DailyChallenge = () => {
	const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0()
	const [userCreditBalance, setUserCreditBalance] = useState(0)
	const [userSubscriptionStatus, setUserSubscriptionStatus] = useState(null)
	const [redirectToCheckout, setRedirectToCheckout] = useState(false);
	const [selectedPriceId, setSelectedPriceId] = useState(null);
	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (isAuthenticated && user) {
				const token = await getAccessTokenSilently({
					audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
					scope: "read:user"
				});
				try {
					const response = await fetch("http://localhost:3000/user/userCreditBalance", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					})

					if (!response.ok) {
						throw new Error('Failed to fetch data');
					}

					const data = await response.json();
					setUserCreditBalance(data.user);
					console.log(data);
				} catch (error) {
					console.error("Error:", error);
				}
			}
		};
		fetchData();
	}, [getAccessTokenSilently, isAuthenticated, setUserCreditBalance, user]);

	useEffect(() => {
		const fetchData = async () => {
			if (isAuthenticated && user) {
				const token = await getAccessTokenSilently({
					audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
					scope: "read:user"
				});
				if (redirectToCheckout && selectedPriceId) {
					fetch("http://localhost:3000/payment/create-one-time-payment-session", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						credentials: "include",
						body: JSON.stringify({ userId: user.sub, priceId: selectedPriceId })
					})
						.then((res) => res.json())
						.then((data) => {
							setClientSecret(data.clientSecret);
						})
						.catch((error) => {
							console.error("Error:", error);
						});
				}
			}
		}
		fetchData();
	}, [getAccessTokenSilently, isAuthenticated, user, redirectToCheckout, selectedPriceId]);

	const navigate = useNavigate();
	const handleBuyCreditButton = () => {
		navigate("/pricing");
	};

	function ChallengeBox({ title }) {
		return (
			<Box
				width={249}
				height={274}
				bgColor="#1D1F25"
				borderRadius="18px"
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				overflow="hidden"
				position="relative"
				p="2px" // This padding effectively becomes the border width
				background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
			>
				<Box
					width="full"
					height="full"
					borderRadius="18px"
					p="2px"
				>
					<Text
						color="white"
						fontSize="18"
						fontWeight="700"
						textAlign="center"
						mb={4} // Margin bottom for spacing
					>
						{title}
					</Text>
					<Icon boxSize={12} color="#70C043" as={CheckCircleIcon} />
				</Box>
			</Box>
		);
	}

	return (
		<Container
			display="flex"
			justifyContent="space-between"
			alignItems="flex-start"
		>
			<Box>
				<List>
					<ListItem height={68} width={366} display="flex" alignItems="center">
						<Icon color={'#ffffff'} as={IoImageOutline} />
						<Link color={'#ffffff'} style={{ textDecoration: 'none' }} padding={10} href="/mymangas">
							My Mangas
						</Link>
					</ListItem>
					<ListItem height={68} width={366} display="flex" alignItems="center">
						<Icon color={'#ffffff'} as={IoFileTrayOutline} />
						<Link color={'#ffffff'} style={{ textDecoration: 'none' }} padding={10} href="/mysubscriptions">
							My Subscriptions
						</Link>
					</ListItem>
					<ListItem height={68} width={366} display="flex" alignItems="center">
						<Icon color={'#ffffff'} as={IoFlagOutline} />
						<Link color={'#ffffff'} style={{ textDecoration: 'none' }} padding={10} href="/dailychallenge">
							Daily Challenges
						</Link>
					</ListItem>
					<ListItem height={68} width={366} display="flex" alignItems="center">
						<Icon color={'#ffffff'} as={IoMegaphoneOutline} />
						<Link color={'#ffffff'} style={{ textDecoration: 'none' }} padding={10} href="/promote">
							Promote
						</Link>
					</ListItem>
				</List>
			</Box>

			<Box flex={1}>
				<Text
					color={'white'}
					fontSize={32}
					fontWeight={700}
				>
					Daily Challenges
				</Text>
				<Text
					sx={{
						background: 'linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						MozBackgroundClip: 'text',
						MozTextFillColor: 'transparent',
					}}
					width={138}
					height={23}
					fontSize={17}
					fontWeight={700}

				>
					20 January 2024
				</Text>

				<Box
					position="relative"
					width="fit-content"
					height="fit-content"
					p="2px" // This padding effectively becomes the border width
					marginTop={32}
					borderRadius="20px" // slightly larger radius to accommodate the pseudo-border
					background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
					display="inline-flex" // Make the box an inline-flex container so it wraps its children tightly
				>
					<Box
						width={249}
						height={274}
						bgColor="#1D1F25"
						borderRadius="18px"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						overflow="hidden"
					>
						<Text
							color="white"
							fontSize="18"
							fontWeight="700"
							textAlign="center"
						>
							3 Manga Generation
						</Text>
						<Icon width={46} height={46} color="#70C043" as={CheckCircleIcon} />
					</Box>
				</Box>
				<Box
				>
					<Text
						width={366}
						height={46}
						color={'white'}
						fontSize={32}
						fontWeight={700}
					>
						Reward To Unlock
					</Text>
					<Button
						marginBottom={23}
						borderRadius={18}
						fontWeight={700}
						color={'white'}
						width={249}
						height={88}
						fontSize={'18'} // Adjust the font size directly on the button if you like
						_hover={{
							cursor: 'pointer',
							// any other hover styles
						}}
						background={'white'}
						_focus={{
							outline: 'none', // Removes the default focus outline
							border: 'none', // Remove the border on focus
						}}
						display="flex" // The button is a flex container
						alignItems="center" // Vertically center the children
						justifyContent="center" // Horizontally center the children
					>
						<Text
							color={'black'}
							fontSize={18}
							fontWeight={700}
							lineHeight={24.3}
							align={'center'}
						>
							10 Credits

						</Text>
					</Button>

					<Text
						width={366}
						height={46}
						color={'white'}
						fontSize={32}
						fontWeight={700}
					>
						History
					</Text>


				</Box>
				<Flex justifyContent="space-between" alignItems="center">
					<Box
						width={157}
						height={34}
						bg="#1D1F25"
						borderRadius="18px"
						display="flex"
						alignItems="center"
						justifyContent="space-around" // This spreads the contents evenly within the box
						marginRight="15px" // Adjusted spacing between the boxes
						>
						<Text color="white" fontSize="12px" fontWeight="700">
							19 Jan
						</Text>
						<Box
							paddingX="12px"
							paddingY="6px"
							bg="purple.500"
							borderRadius="18px"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Text color="white" fontSize="12px" fontWeight="700">
								10 Credits
							</Text>
						</Box>
					</Box>

					<Box
						width={157}
						height={34}
						bg="#1D1F25"
						borderRadius="18px"
						display="flex"
						alignItems="center"
						justifyContent="space-around" // This spreads the contents evenly within the box
					>
						<Text color="white" fontSize="12px" fontWeight="700">
							18 Jan
						</Text>
						<Box
							paddingX="12px"
							paddingY="6px"
							bg="purple.500"
							borderRadius="18px"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Text color="white" fontSize="12px" fontWeight="700">
								10 Credits
							</Text>
						</Box>
					</Box>
				</Flex>



			</Box>
			<Box flex={10} marginLeft={-68} marginRight={34} marginTop={145}>
				<Box
					position="relative"
					width="fit-content"
					height="fit-content"
					p="2px" // This padding effectively becomes the border width
					marginTop={32}
					borderRadius="20px" // slightly larger radius to accommodate the pseudo-border
					background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
					display="inline-flex" // Make the box an inline-flex container so it wraps its children tightly
				>
					<Box
						width={249}
						height={274}
						bgColor="#1D1F25"
						borderRadius="18px"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						overflow="hidden"
					>
						<Text
							color="white"
							fontSize="18"
							fontWeight="700"
							textAlign="center"
						>
							Invite 10 Friends To Manga Platform
						</Text>
						<Icon width={46} height={46} color="#70C043" as={CheckCircleIcon} />
					</Box>
				</Box>
			</Box>
			<Box flex={60} marginLeft={0} marginTop={145}>
				<Box
					position="relative"
					width="fit-content"
					height="fit-content"
					p="2px" // This padding effectively becomes the border width
					marginTop={32}
					borderRadius="20px" // slightly larger radius to accommodate the pseudo-border
					background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)" // Your gradient
					display="inline-flex" // Make the box an inline-flex container so it wraps its children tightly
				>
					<Box
						width={249}
						height={274}
						bgColor="#1D1F25"
						borderRadius="18px"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						overflow="hidden"
					>
						<Text
							color="white"
							fontSize="18"
							fontWeight="700"
							textAlign="center"
						>
							Post In Community
						</Text>
						<Icon width={46} height={46} color="#70C043" as={CheckCircleIcon} />
					</Box>
				</Box>
			</Box>

		</Container>
	)
}

export default DailyChallenge