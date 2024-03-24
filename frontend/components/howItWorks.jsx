// For teams section in homepage.
import Lottie from "lottie-react";
import pasteCodeAnimation from "../public/animations/paste-code.json";
import botRoastAnimation from "../public/animations/bot-roast.json";
import learnAnimation from "../public/animations/learn.json";
// import teamsAnimation from "../public/animations/teams-animation.json";


export default function HowItWorksComponent() {
    return (
        <div className="max-w-[750px] mx-auto px-10 md:px-0">
            <h1 className="text-[30px] md:text-[40px] text-center mb-5">How It Works</h1>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">Paste Your Code</h2>
                    <p>
                        Simply paste your code snippet into the chat box.
                    </p>
                </div>
                <Lottie
                    animationData={pasteCodeAnimation}
                    className='max-w-[500px]'
                />
            </div>
            <hr className="md:hidden"/>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center mb-5 md:mb-0">
                <Lottie animationData={botRoastAnimation} className='max-w-[400px] min-w-[350px]'/>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">AI Roasting</h2>
                    <p>
                        Watch as our AI roasting bot provides feedback with a delightful twist.
                    </p>
                </div>
            </div>
            <hr className="md:hidden"/>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center mt-5 md:mt-0">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">Learn & Improve</h2>
                    <p>
                        Enjoy the feedback in a fun and light-hearted manner while gaining valuable coding insights.
                    </p>
                </div>
                <Lottie animationData={learnAnimation} className='max-w-[400px]'/>
            </div>
            <hr className="md:hidden"/>
            {/* <div className="flex flex-col md:flex-row text-center md:text-left items-center">
                <Lottie animationData={teamsAnimation} className='max-w-[800px] min-w-[350px]'/>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">For Remote Teams:</h2>
                    <i>Bridge the Distance Gap</i>
                    <p>
                        Distance is no longer a barrier to collaboration. SketchSync 
                        becomes the shared space where remote teams connect, brainstorm, 
                        and contribute. Break down the virtual walls and collaborate as 
                        if you&apos;re in the same room.
                    </p>
                </div>
            </div> */}
        </div>
    )
}
