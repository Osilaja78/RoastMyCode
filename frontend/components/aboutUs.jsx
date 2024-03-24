// Why choose us section in homepage.
import Image from "next/image";
import Link from "next/link";
import ghIcon from "../public/icons/ghIcon.svg";
import twitterIcon from "../public/icons/twitterIcon.svg";


export default function AboutUsComponent() {
    return (
        <div className="max-w-[1000px] mx-auto pb-20 pt-5 px-10 md:px-0">
            <h1 className="text-center text-[40px] max-w-max mx-auto mb-10">About RoastMyCode</h1>
            <div className="max-w-[600px] mx-auto my-5 text-center">
                <p>
                    At RoastMyCode, we believe that coding is not just about 
                    writing lines of code—it's about continuous improvement, 
                    creativity, and learning from one another. Our platform 
                    provides a unique and fun way for developers to receive 
                    constructive feedback on their code snippets, helping them 
                    grow and excel in their programming journey.
                </p>
                <h2 className="text-center text-[30px] my-5">The Story Behind RoastMyCode</h2>
                <p>
                    At RoastMyCode, our journey began with a simple yet powerful 
                    idea: to create a platform where developers could receive 
                    feedback on their code in a fun and engaging way. We wanted to 
                    break away from the traditional code review process and inject 
                    a sense of humor and creativity into the learning experience.
                </p>
                <h2 className="text-center text-[30px] mt-5 mb-2">Meet the Team</h2>
                <div>
                    <h3 className="text-center text-[20px] mb-2">Hameed Osilaja</h3>
                    <div className="flex gap-10 max-w-max mx-auto">
                        <Link href="https://github.com/Osilaja78" target="blank">
                            <Image src={ghIcon} alt="Github" />
                        </Link>
                        <Link href="https://twitter.com/HameedOsilaja" target="blank">
                            <Image src={twitterIcon} alt="Twitter" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}