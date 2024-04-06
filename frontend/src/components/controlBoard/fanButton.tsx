import { ReactNode, useState } from "react";
import { PiFan, PiFanFill } from "react-icons/pi";


const FanButton = (): ReactNode => {
    const [fanLevel, setFanLevel] = useState<number>(0);

    const handleFanOnChange = (event: React.FormEvent): void => {
        //target = 0:   fan's off
        //target != 0:  fan's on
        setFanLevel(Number((event.target as HTMLInputElement).value));
    }


    return (
        <div className="h-full w-full p-6 rounded-xl bg-white">
            <div className="h-1/4 w-full flex ites">
                <PiFan size={35} className={`${fanLevel != 0 ? "w-0" : "sm:w-fit w-0"} text-gray-300`} />
                <PiFanFill size={35} className={`${fanLevel != 0 ? "sm:w-fit w-0" : "w-0"} text-blue-500`} />
                <span className="sm:px-5 text-2xl font-bold text-gray-500">Fan</span>
            </div>
            <div className="h-3/4 sm:h-1/2 w-full flex items-center justify-center lg:justify-start">
                <input type="range" min="0" max="3"
                    className="appearance-none bg-transparent h-1/2 w-full
                [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-gray-700 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[100%] [&::-webkit-slider-thumb]:w-1/4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-500"
                    onInput={(event: React.FormEvent) => { handleFanOnChange(event) }}
                />
            </div>
            <div className="h-1/4 w-full hidden items-center sm:flex">
                <span className={`w-1/4 text-center font-semibold text-xl ${fanLevel == 0 ? "text-cyan-400" : "text-gray-500"}`}>Off</span>
                <span className={`w-1/4 text-center font-semibold text-xl ${fanLevel == 1 ? "text-cyan-400" : "text-gray-500"}`}>Low</span>
                <span className={`w-1/4 text-center font-semibold text-xl ${fanLevel == 2 ? "text-cyan-400" : "text-gray-500"}`}>Medium</span>
                <span className={`w-1/4 text-center font-semibold text-xl ${fanLevel == 3 ? "text-cyan-400" : "text-gray-500"}`}>High</span>
            </div>
        </div>
    )
}

export default FanButton;