import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: props => ({
        body: {
            bg: mode('#f0e7db', '#202023')(props)
        }
    })
}

const components = {
    Heading: {
        variants: {
            // I assume section-title would be a class in html and following would be the css
            // In the case we're writing this here, it's a 'global' component. We'll be using this in many places I think.
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Links: {
        baseStyle: props => ({
            color: mode('#3d7aed', '#ff63c3')(props),
            textUnderlineOffset: 3,
        })
    }

    /* 
    Explaining mode(<arg>, <arg>)(prop)

    A high level explaination of what's going on here is mode contains two fields to determine the theme's mode, 
    light and dark, and (props) besides it is simply a leverage point for it to switch to the other mode.

    Props is holding the current state of the theme and based on what it is, it'll switch to the other. 

    */
}

const fonts = {
    heading: 'Final_Fantasy_VII',
    body: 'Final_Fantasy_VII',
}

const colors = {
    // glassTeal: '8c#8ccaf'
    // glassTeal: '#ffffff'
}

const config = {
    initialColorMode: 'light',
    useSystemColorMode: true,
}

const theme = extendTheme({
    config, 
    styles, 
    components,
    colors, 
    fonts, 
})

export default theme