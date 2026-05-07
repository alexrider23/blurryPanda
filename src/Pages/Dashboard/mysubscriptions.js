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
} from '@chakra-ui/react'
import { px } from 'framer-motion'
import {
	IoImageOutline,
	IoFileTrayOutline,
	IoFlagOutline,
	IoMegaphoneOutline,
	IoCheckmarkDoneCircle
} from 'react-icons/io5'
import { useAuth0 } from '@auth0/auth0-react'

const SatoshiFont = `
@font-face {
	font-family: "Satoshi";
	src:
	  url("/public/Satoshi_Complete/Fonts/OTF/Satoshi-Regular.otf") format("opentype")
}
`
// 	  url("../../../public/Satoshi_Complete/Fonts/OTF/Satoshi-Regular.otf") format("opentype")


const MySubscriptions = () => {
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

			<Box flex={1} margin={33}>
				<Box
					width={604}
					height={274}
					marginTop={32}
					bgColor="white"
					borderRadius="18px"
					overflow="hidden"
				>
					<Box
						background={'linear-gradient(to right, #E2FE26, #00E1FF)'}
						borderRadius="18px 18px 0 0" // To match the rounded corners at the top of the card
					>
						<Text
							fontSize={18}
							fontWeight={700}
							color="black"
							alignItems="center"
							lineHeight="54px"
							marginTop={0}
							marginLeft={30}
						>
							Subscription
						</Text>
					</Box>
					<Box>
						<Text
							marginLeft={30}
							marginRight={187}
							fontSize={18}
							fontWeight={700}
							color="black"
						>
							Pro
						</Text>

						<Text
							marginLeft={30}
							fontSize={14}
							display={'flex'}
							color="black"
						>
							<Icon color={'#70C043'} width={22} height={22} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							100 Generations/month
							<Icon color={'#70C043'} width={22} height={22} marginLeft={6.63} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Ultra Fast Generations
							<Icon color={'#70C043'} width={22} height={22} marginLeft={6.63} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Priority Support
							<Icon color={'#70C043'} width={22} height={22} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Artwork Monetization
						</Text>
						<Button
							marginTop={33}
							marginBottom={25}
							borderRadius={50}
							fontWeight={700}
							width={187}
							height={47}
							marginLeft={26}
							fontSize={'small'}
							_hover={{
								cursor: 'pointer'
							}}
						>
							Cancel Subscription
						</Button>
					</Box>
				</Box>
				<Box
					width={604}
					height={237}
					marginTop={32}
					bgColor="white"
					borderRadius="18px"
					overflow="hidden"
				>
					<Box
						background={'linear-gradient(to right, #9662F1, #673AB7)'}
						borderRadius="18px 18px 0 0" // To match the rounded corners at the top of the card
					>
						<Text
							fontSize={18}
							fontWeight={700}
							color="black"
							alignItems="center"
							lineHeight="54px"
							marginTop={0}
							marginLeft={30}
							fontFamily={'Satoshi, sans-serif'}

						>
							Premium Benfits
						</Text>
					</Box>
					<Box>
						<Text
							marginLeft={30}
							fontSize={14}
							display={'flex'}
							color="black"
							fontFamily={'Satoshi, sans-serif'}
						>
							<Icon color={'#70C043'} width={22} height={22} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Unlimited Generations
							<Icon color={'#70C043'} width={22} height={22} marginLeft={6.63} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Ultra Fast Generations
							<Icon color={'#70C043'} width={22} height={22} marginLeft={6.63} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Priority Support
							<Icon color={'#70C043'} width={22} height={22} marginRight={6.63} as={IoCheckmarkDoneCircle} />
							Artwork Monetization
						</Text>
						<Button
							marginTop={33}
							marginBottom={23}
							borderRadius={50}
							fontWeight={700}
							color={'white'}
							width={187}
							height={47}
							marginLeft={26}
							fontSize={'small'}
							_hover={{
								cursor: 'pointer'
							}}
							background={'linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)'}
							_focus={{
								outline: 'none', // Removes the default focus outline
								border: 'none', // Remove the border on focus
							}}
						>
							Upgrade to Premium
						</Button>
					</Box>
				</Box>
			</Box>

			<Box flex={5} marginTop={33}>
				<Box
					padding={4}
					width={326}
					height={274}
					marginTop={32}
					bgColor="black"
					borderRadius="18px"
					border="2px solid white"
				>
					<Text
						fontSize={18}
						fontWeight={700}
						color="white"
						alignItems="center"
						lineHeight="54px"
						marginTop={0}
						marginLeft={30}
					>
						Credit Balance
					</Text>
					<Text
						marginRight={187}
						marginLeft={30}
						fontSize={40}
						fontWeight={700}
						color='white'
						marginTop={-18}
						marginBottom={90}
					>
						{userCreditBalance}
					</Text>
					<Button
						borderRadius={50}
						width={284}
						height={47}
						marginBottom={10}
						marginLeft={21}
						fontSize={'small'}
						onClick={handleBuyCreditButton}
						_hover={{
							cursor: 'pointer'
						}}
					>
						Buy Credits
					</Button>
				</Box>


			</Box>
		</Container>
	)
}

export default MySubscriptions