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
  Image
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
import TikTok from './tiktok.png'
import Coin from './coin.png'


const Promote = () => {
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
          Campaigns
        </Text>
        <Box
          position="relative"
          width="fit-content"
          height="fit-content"
          p="2px"
          borderRadius="20px"
          background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)"
          display="flex" // Align items horizontally
          alignItems="center" // Align items vertically in the center
        >
          <Flex
            width={879}
            height={163}
            bgColor="#1D1F25"
            borderRadius="18px"
            overflow="hidden"
            align="center" // Align items vertically in the center
            justify="space-between" // Distribute space between icon, text, and button
            paddingX="32px" // Add horizontal padding
          >
            <Image
              src={TikTok} // Here you use the imported image variable
              marginRight={28}
              width={100}
              height={100}
              borderRadius="full" // Makes the image rounded
            />
            {/* Text */}
            <Box flex="1" marginLeft={4}>
              <Text color="white" fontSize="18" fontWeight="700">
                Tiktok Promotion Campaign
              </Text>
              <Text color="white" fontSize="14" fontWeight="500">
                Promote Cocacao on Tiktok and earn 1000 Credits
              </Text>
            </Box>

            {/* Join Button */}
            <Button
              width={186}
              height={56}
              size="md"
              borderRadius={50}
							background={'linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)'}
              color="white"
            >
              Join
            </Button>
          </Flex>
        </Box>
        <Box
          marginTop={42}
          position="relative"
          width="fit-content"
          height="fit-content"
          p="2px"
          borderRadius="20px"
          background="linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)"
          display="flex" // Align items horizontally
          alignItems="center" // Align items vertically in the center
        >
          <Flex
            width={879}
            height={163}
            bgColor="#1D1F25"
            borderRadius="18px"
            overflow="hidden"
            align="center" // Align items vertically in the center
            justify="space-between" // Distribute space between icon, text, and button
            paddingX="32px" // Add horizontal padding
          >
            <Image
              marginLeft={-20}
              marginRight={10}
              src={Coin} // Here you use the imported image variable
              width={133}
              height={133}
              borderRadius="full" // Makes the image rounded
            />
            {/* Text */}
            <Box flex="1" marginLeft={4}>
              <Text color="white" fontSize="18" fontWeight="700">
                Enter video Contest and win Big
              </Text>
              <Text color="white" fontSize="14" fontWeight="500">
                Create a creative promotion video and earn 2000 Credits
              </Text>
            </Box>

            {/* Join Button */}
            <Button
              width={186}
              height={56}
              size="md"
              borderRadius={50}
							background={'linear-gradient(to right, #CD43FF, #FD65A6, #FC9651, #FFBD72)'}
              color="white"
            >
              Join
            </Button>
          </Flex>
        </Box>
      </Box>
    </Container>
  )
}

export default Promote