// Features section for homepage.
import FeaturesCardComponent from "./featuresCard";
import AIBot from "../public/icons/aiBot.svg";
import laughAndLearn from "../public/icons/laughAndLearn.svg";
import endlessIcon from "../public/icons/endlessIcon.svg";


export default function FeaturesSection() {

    const desc1 = " Let our AI roasting bot take a humorous spin on critiquing your code snippets."
    const desc2 = "Receive feedback in a light-hearted and fun manner while still learning valuable coding insights."
    const desc3 = "Embrace the creative side of coding as our AI adds a dash of humor and wit to your code reviews."

    return (
        <div className="my-20 max-w-[1000px] mx-5">
            <h2 className="text-center text-[40px] max-w-max mx-auto mb-10">Features</h2>
            <div className="flex flex-col sm:flex-row max-w-max mx-auto flex-wrap justify-between gap-5">
                <FeaturesCardComponent
                    image={AIBot}
                    title="AI Code Roasting"
                    desc={desc1}
                />
                <FeaturesCardComponent
                    image={laughAndLearn}
                    title="Laugh and Learn"
                    desc={desc2}
                />
                <FeaturesCardComponent
                    image={endlessIcon}
                    title="Boost Your Creativity"
                    desc={desc3}
                />
            </div>
        </div>
    )
}