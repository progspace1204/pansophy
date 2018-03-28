import React from 'react'
import illustration from '../../images/Illustration.png'

const Promo = () => {
    return (
        <div className="relative flex flex-col items-center bg-app-blackish border border-app-border rounded-lg text-center">


            <img src={illustration} alt="Illustration" className="absolute bottom-36 lg:bottom-20"/>

            <div className="flex flex-col mt-9 mb-80">
                <span className="text-xl">Get Dall-E-2 WordPress Plugin Today</span>
            </div>

            <div className="relative flex flex-col items-center space-y-10 mt-auto p-10 bg-app-glass bg-radial">
                <p className="text-sm text-white leading-7">AI generated images using the power of Dall-E-2. This OpenAI solution uses artificial intelligence to generate images from your text description you input.</p>

                <span className="absolute top-0 left-0 w-full h-full blur-3xl"></span>

                <a href="#" className="relative inline-flex items-center justify-center py-4 px-8 font-medium text-sm bg-black rounded-lg hover:bg-app-border hover:text-white z-10">Learn More</a>
            </div>

        </div>
    );
}

export default Promo;