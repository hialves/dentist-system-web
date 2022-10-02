import React from 'react'
import { LandingLayout } from '../../components/LandingLayout'
import { Hero } from '../../components/Hero'

const Landing: React.FC = () => {
  return (
    <LandingLayout>
      <Hero
        title="Título"
        subtitle="Sub título"
        image="https://kp-blog.s3.amazonaws.com/wp-content/uploads/2020/03/18091828/Landing-Page.png"
        ctaLink="/auth/sign-up"
        ctaText="Começe já"
      />
    </LandingLayout>
  )
}

export default Landing
