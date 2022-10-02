import * as React from 'react'
import { chakra, ImageProps, forwardRef } from '@chakra-ui/react'
import logo from './logo.svg'
import android from './assets/android.svg'
import ios from './assets/ios.svg'

export const Logo = forwardRef<ImageProps, 'img'>((props, ref) => {
  return <chakra.img src={logo} boxSize="70px" ref={ref} {...props} />
})

export const Android = forwardRef<ImageProps, 'img'>((props, ref) => {
  return <chakra.img src={android} ref={ref} {...props} />
})

export const Ios = forwardRef<ImageProps, 'img'>((props, ref) => {
  return <chakra.img src={ios} ref={ref} {...props} />
})
